#!/usr/bin/env python3
"""
Auto-generate USER_JOURNEY_PROJECT_REGISTRY in registry.ts
from JSON files in the user-journey data directory.

New fields added:
  - org: from project.project_name split by '/' (left part)
  - sig: from meta.sig, defaults to 'other' if missing
  - projectName: from project.project_name split by '/' (right part)
  - hardware_access: from meta.persona.hardware_access
  - version: last two underscore-separated segments of report_id (e.g. 20260404_0654)
"""

import json
import os
import re

# ---------- paths ----------
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
DATA_DIR = os.path.join(REPO_ROOT, "apps", "web", "public", "data", "intelligent-analysis", "user-journey")
REGISTRY_FILE = os.path.join(REPO_ROOT, "apps", "web", "src", "modules", "intelligent-analysis", "UserJourney", "rawData", "registry.ts")

# ---------- helpers ----------

def to_entry_key(filename: str) -> str:
    """Convert filename (without .json) to a valid TS object key (all underscores)."""
    name = filename.replace(".json", "")
    # Replace hyphens and any non-alphanumeric/underscore with underscore
    key = re.sub(r"[^a-zA-Z0-9_]", "_", name)
    # Collapse multiple underscores
    key = re.sub(r"_+", "_", key)
    return key.strip("_")


def to_project_key(org: str, project_name_part: str) -> str:
    """Build projectKey like cann_cann_recipes_infer."""
    combined = f"{org}/{project_name_part}"
    key = re.sub(r"[^a-zA-Z0-9_]", "_", combined)
    key = re.sub(r"_+", "_", key)
    return key.strip("_")


def extract_version(report_id: str) -> str:
    """
    Extract version from report_id.
    The version is the last two underscore-separated segments joined by '_'.
    e.g. 'cann_elec_ops_simulation,_20260404_0654' -> '20260404_0654'
    """
    # Clean any stray comma/space
    clean = re.sub(r"[,\s]", "_", report_id)
    clean = re.sub(r"_+", "_", clean).strip("_")
    parts = clean.split("_")
    if len(parts) >= 2:
        return f"{parts[-2]}_{parts[-1]}"
    return clean


def build_version_with_branch(version: str, branch: str) -> str:
    """
    Append branch to version string.
    e.g. version='20260408_1824', branch='master' -> '20260408_1824_master'
    """
    return f"{version}@{branch}"


def parse_json_file(filepath: str) -> dict | None:
    try:
        with open(filepath, encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"  [WARN] Failed to parse {filepath}: {e}")
        return None


# ---------- main ----------

def collect_entries(data_dir: str) -> list[dict]:
    entries = []
    for fname in sorted(os.listdir(data_dir)):
        if not fname.endswith(".json"):
            continue

        fpath = os.path.join(data_dir, fname)
        data = parse_json_file(fpath)
        if data is None:
            continue

        meta = data.get("meta", {})
        project = data.get("project", {})
        persona = meta.get("persona", {})

        # --- report_id & version ---
        report_id: str = meta.get("report_id", "")
        version_base = extract_version(report_id)
        branch: str = project.get("branch", "master") or "master"
        version = build_version_with_branch(version_base, branch)

        # --- project_name parts ---
        full_project_name: str = project.get("project_name", "")
        if "/" in full_project_name:
            org, proj_part = full_project_name.split("/", 1)
        else:
            # Fallback: guess org from filename prefix
            org = fname.split("_")[0]
            proj_part = full_project_name or fname.replace(".json", "")

        org = org.strip().lower()
        proj_part = proj_part.strip()

        # --- label (same as project_name in json) ---
        label = full_project_name.strip() if full_project_name else fname.replace(".json", "")

        # --- sig ---
        sig: str = meta.get("sig", "other") or "other"

        # --- hardware_access ---
        hardware_access: str = persona.get("hardware_access", "")

        # --- keys ---
        entry_key = to_entry_key(fname)
        project_key = to_project_key(org, proj_part)

        # --- report path (web-public relative) ---
        report_path = f"/data/intelligent-analysis/user-journey/{fname}"

        entries.append({
            "entry_key": entry_key,
            "projectKey": project_key,
            "label": label,
            "reportPath": report_path,
            "version": version,
            "org": org,
            "sig": sig,
            "projectName": proj_part,
            "hardware_access": hardware_access,
        })
        print(f"  [OK] {fname}  ->  {entry_key}")

    return entries


def render_ts(entries: list[dict]) -> str:
    """Render the full registry.ts content."""

    def indent(lines: list[str], spaces: int = 2) -> str:
        pad = " " * spaces
        return "\n".join(pad + l for l in lines)

    entry_blocks = []
    for e in entries:
        block = [
            f"{e['entry_key']}: {{",
            f"  projectKey: '{e['projectKey']}',",
            f"  label: '{e['label']}',",
            f"  reportPath:",
            f"    '{e['reportPath']}',",
            f"  version: '{e['version']}',",
            f"  org: '{e['org']}',",
            f"  sig: '{e['sig']}',",
            f"  projectName: '{e['projectName']}',",
            f"  hardware_access: '{e['hardware_access']}',",
            f"}},",
        ]
        entry_blocks.append(indent(block, 2))

    registry_body = "\n".join(entry_blocks)

    ts = f"""export const USER_JOURNEY_PROJECT_REGISTRY = {{
{registry_body}
}} as const;

export type UserJourneyProjectFileKey =
  keyof typeof USER_JOURNEY_PROJECT_REGISTRY;

export type UserJourneyProjectKey =
  (typeof USER_JOURNEY_PROJECT_REGISTRY)[UserJourneyProjectFileKey]['projectKey'];

const registryEntries = Object.entries(USER_JOURNEY_PROJECT_REGISTRY) as Array<
  [
    UserJourneyProjectFileKey,
    (typeof USER_JOURNEY_PROJECT_REGISTRY)[UserJourneyProjectFileKey]
  ]
>;

export const USER_JOURNEY_PROJECT_REPORT_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {{
    acc[fileKey] = entry.reportPath;

    return acc;
  }},
  {{}} as Record<UserJourneyProjectFileKey, string>
);

export const USER_JOURNEY_PROJECT_KEY_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {{
    acc[fileKey] = entry.projectKey as UserJourneyProjectKey;

    return acc;
  }},
  {{}} as Record<UserJourneyProjectFileKey, UserJourneyProjectKey>
);

export const USER_JOURNEY_PROJECT_LABEL_MAP = registryEntries.reduce(
  (acc, [, entry]) => {{
    const projectKey = entry.projectKey as UserJourneyProjectKey;

    if (!acc[projectKey]) {{
      acc[projectKey] = entry.label;
    }}

    return acc;
  }},
  {{}} as Record<UserJourneyProjectKey, string>
);

export const USER_JOURNEY_PROJECT_VERSION_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {{
    acc[fileKey] = entry.version;

    return acc;
  }},
  {{}} as Record<UserJourneyProjectFileKey, string>
);

export const USER_JOURNEY_PROJECT_DEFAULT_FILE_MAP = registryEntries.reduce(
  (acc, [fileKey, entry]) => {{
    const projectKey = entry.projectKey as UserJourneyProjectKey;

    if (!acc[projectKey]) {{
      acc[projectKey] = fileKey;
    }}

    return acc;
  }},
  {{}} as Record<UserJourneyProjectKey, UserJourneyProjectFileKey>
);

export const USER_JOURNEY_FALLBACK_PROJECT: UserJourneyProjectFileKey =
  'cann_ops_math_20260325_2335';

export const USER_JOURNEY_PROJECT_OPTIONS = Object.entries(
  USER_JOURNEY_PROJECT_LABEL_MAP
).map(([projectKey, label]) => ({{
  value: projectKey as UserJourneyProjectKey,
  label: `\u9879\u76ee ${{label}}`,
}}));

export const USER_JOURNEY_PROJECT_VERSION_OPTIONS_MAP = Object.keys(
  USER_JOURNEY_PROJECT_LABEL_MAP
).reduce(
  (acc, currentProjectKey) => {{
    const projectKey = currentProjectKey as UserJourneyProjectKey;

    acc[projectKey] = registryEntries
      .filter(([, entry]) => entry.projectKey === projectKey)
      .map(([fileKey, entry]) => ({{
        value: fileKey,
        label: `\u7248\u672c ${{entry.version}}`,
      }}));

    return acc;
  }},
  {{}} as Record<
    UserJourneyProjectKey,
    Array<{{
      value: UserJourneyProjectFileKey;
      label: string;
    }}>
  >
);

export const USER_JOURNEY_COMPARE_PROJECT_OPTIONS = registryEntries.map(
  ([fileKey, entry]) => ({{
    value: fileKey,
    label: `${{entry.label}}\uff08${{entry.version}}\uff09`,
  }})
);

export type RegistryFilterOptions = {{
  org?: string;
  sig?: string;
  projectKey?: UserJourneyProjectKey;
  hardware_access?: string;
}};

export const filterRegistryEntries = (
  filters: RegistryFilterOptions
): Array<
  [
    UserJourneyProjectFileKey,
    (typeof USER_JOURNEY_PROJECT_REGISTRY)[UserJourneyProjectFileKey],
  ]
> => {{
  return registryEntries.filter(([, entry]) => {{
    if (filters.org && entry.org !== filters.org) return false;
    if (filters.sig && entry.sig !== filters.sig) return false;
    if (filters.projectKey && entry.projectKey !== filters.projectKey)
      return false;
    if (
      filters.hardware_access &&
      entry.hardware_access !== filters.hardware_access
    )
      return false;
    return true;
  }});
}};
"""
    return ts


def compress_log_files(log_dir: str) -> None:
    """
    Minify all JSON files under log_dir in-place (remove unnecessary whitespace).
    Skips files that are already minified (single line) or cannot be parsed.
    """
    if not os.path.isdir(log_dir):
        print(f"\n[LOG] Log directory not found, skipping: {log_dir}")
        return

    json_files = [f for f in sorted(os.listdir(log_dir)) if f.lower().endswith(".json")]
    if not json_files:
        print("\n[LOG] No JSON files found in log directory.")
        return

    print(f"\nCompressing log files in: {log_dir}")
    total_before = 0
    total_after = 0

    for fname in json_files:
        fpath = os.path.join(log_dir, fname)
        try:
            before = os.path.getsize(fpath)
            with open(fpath, encoding="utf-8") as f:
                raw = f.read()

            # Already a single non-empty line → already minified
            if "\n" not in raw.strip():
                print(f"  [SKIP] {fname}  (already minified, {before:,} bytes)")
                total_before += before
                total_after += before
                continue

            data = json.loads(raw)
            minified = json.dumps(data, ensure_ascii=False, separators=(",", ":"))

            with open(fpath, "w", encoding="utf-8") as f:
                f.write(minified)

            after = len(minified.encode("utf-8"))
            saved = before - after
            pct = saved / before * 100 if before else 0
            total_before += before
            total_after += after
            print(f"  [OK]   {fname}  {before:>10,} -> {after:>10,} bytes  (-{pct:.1f}%)")

        except Exception as e:
            print(f"  [WARN] {fname}: {e}")
            total_before += os.path.getsize(fpath)
            total_after += os.path.getsize(fpath)

    saved_total = total_before - total_after
    pct_total = saved_total / total_before * 100 if total_before else 0
    print(f"\n  Total: {total_before:,} -> {total_after:,} bytes  saved {saved_total:,} bytes ({pct_total:.1f}%)")


def main():
    print(f"Scanning: {DATA_DIR}")
    entries = collect_entries(DATA_DIR)
    print(f"\nTotal entries: {len(entries)}")

    ts_content = render_ts(entries)

    with open(REGISTRY_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"\nRegistry written to:\n  {REGISTRY_FILE}")

    # Compress log JSON files
    log_dir = os.path.join(DATA_DIR, "log")
    compress_log_files(log_dir)


if __name__ == "__main__":
    main()
