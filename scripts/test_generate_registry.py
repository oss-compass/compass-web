"""Regression tests for the user-journey registry generator.

Run from the repository root:
    python -m unittest discover -s scripts -p "test_generate_registry.py"
The repository's Node.js runtime parses the emitted registry object.
"""
import json
import os
from pathlib import Path
import runpy
import shutil
import subprocess
import sys
import tempfile
import unittest

GENERATOR = Path(os.environ.get(
    "REGISTRY_GENERATOR_PATH",
    str(Path(__file__).with_name("generate_registry.py")),
)).resolve()
generator = runpy.run_path(str(GENERATOR))
NODE = shutil.which("node")


def read_registry(content):
    if NODE is None:
        raise RuntimeError("Node.js is required to parse the generated registry")
    parser = """
const fs = require('fs');
const vm = require('vm');
const content = fs.readFileSync(0, 'utf8');
const end = content.indexOf('\\n} as const;');
if (end < 0) throw new Error('Registry object terminator not found');
const object = content.slice(0, end + 2).replace(/^export /, '');
const registry = vm.runInNewContext(
  object + '\\nJSON.stringify(USER_JOURNEY_PROJECT_REGISTRY)'
);
process.stdout.write(registry);
"""
    result = subprocess.run(
        [NODE, "-e", parser],
        input=content, text=True, encoding="utf-8",
        capture_output=True, check=True, timeout=10,
    )
    return json.loads(result.stdout)


class RegistryRenderingTests(unittest.TestCase):
    def entry(self, **values):
        result = {
            "entry_key": "cann_ops_math_20261007_1200",
            "projectKey": "cann_ops_math",
            "label": "cann/ops-math",
            "reportPath": "/data/intelligent-analysis/user-journey/report.json",
            "version": "20261007_1200@master",
            "org": "cann",
            "sig": "math",
            "projectName": "ops-math",
            "hardware_access": "remote",
        }
        result.update(values)
        return result

    def assert_round_trip(self, entry):
        registry = read_registry(generator["render_ts"]([entry]))
        expected = {key: str(value) for key, value in entry.items() if key != "entry_key"}
        self.assertEqual(registry, {entry["entry_key"]: expected})

    def test_ordinary_metadata(self):
        self.assert_round_trip(self.entry())

    def test_apostrophes_in_branch_and_metadata(self):
        self.assert_round_trip(self.entry(
            version="20261007_1200@feature/o'brien",
            label="Contributor's project",
            hardware_access="Owner's machine",
        ))

    def test_backslashes_are_not_javascript_escapes(self):
        self.assert_round_trip(self.entry(hardware_access=r"C:\tools\new"))

    def test_line_breaks_and_controls_round_trip(self):
        self.assert_round_trip(self.entry(
            label="first\nsecond\rthird\tfourth",
            hardware_access="line\nquote \" and slash \\",
        ))

    def test_unicode_and_line_separators(self):
        self.assert_round_trip(self.entry(
            label="中文项目 \u2028 \u2029 \U0001f600",
            projectName="数学",
        ))

    def test_existing_non_string_values_keep_text_coercion(self):
        self.assert_round_trip(self.entry(sig=42, hardware_access=None))

    def test_entry_keys_starting_with_digits(self):
        self.assert_round_trip(self.entry(entry_key="20261007_ops_math"))

    def test_collect_preserves_branch_and_newest_first(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for date, branch in [
                ("20261006_0900", "master"),
                ("20261007_1200", "feature/o'brien"),
            ]:
                data = {
                    "meta": {"report_id": "cann_ops_math_" + date,
                             "persona": {"hardware_access": "line\nnext"}},
                    "project": {"project_name": "cann/ops-math", "branch": branch},
                }
                (root / ("cann_ops_math_" + date + ".json")).write_text(
                    json.dumps(data), encoding="utf-8")
            entries = generator["collect_entries"](str(root))
            registry = read_registry(generator["render_ts"](entries))
            self.assertEqual(list(registry), [
                "cann_ops_math_20261007_1200", "cann_ops_math_20261006_0900",
            ])
            latest = registry["cann_ops_math_20261007_1200"]
            self.assertEqual(latest["version"], "20261007_1200@feature/o'brien")
            self.assertEqual(latest["hardware_access"], "line\nnext")
            self.assertEqual(latest["sig"], "other")
            self.assertEqual(latest["projectKey"], "cann_ops_math")

    def test_cli_writes_parseable_registry_and_preserves_report(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            scripts = root / "scripts"
            scripts.mkdir()
            target = scripts / "generate_registry.py"
            target.write_bytes(GENERATOR.read_bytes())
            data_dir = root / "apps/web/public/data/intelligent-analysis/user-journey"
            data_dir.mkdir(parents=True)
            registry_file = root / (
                "apps/web/src/modules/intelligent-analysis/UserJourney/rawData/registry.ts")
            registry_file.parent.mkdir(parents=True)
            report = {
                "meta": {"report_id": "cann_ops_math_20261007_1200",
                         "persona": {"hardware_access": "Owner's lab\nremote"}},
                "project": {"project_name": "cann/ops-math",
                            "branch": "feature/o'brien"},
            }
            report_path = data_dir / "cann_ops_math_20261007_1200.json"
            report_path.write_text(json.dumps(report), encoding="utf-8")
            report_before = report_path.read_bytes()
            env = dict(os.environ, PYTHONIOENCODING="utf-8")
            subprocess.run([sys.executable, str(target)], check=True,
                           capture_output=True, text=True, encoding="utf-8",
                           env=env, timeout=10)
            registry = read_registry(registry_file.read_text(encoding="utf-8"))
            entry = registry["cann_ops_math_20261007_1200"]
            self.assertEqual(entry["version"], "20261007_1200@feature/o'brien")
            self.assertEqual(entry["hardware_access"], "Owner's lab\nremote")
            self.assertEqual(report_path.read_bytes(), report_before)


if __name__ == "__main__":
    unittest.main()
