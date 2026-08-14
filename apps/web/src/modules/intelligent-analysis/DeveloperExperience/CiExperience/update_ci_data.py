#!/usr/bin/env python3
"""
从 rawdata/saved_resource.html 提取 CI 数据，更新所有仓库的 JSON 文件。
用法: python3 update_ci_data.py
"""
import base64
import gzip
import json
import pathlib
import re

RAWDATA_HTML = pathlib.Path(__file__).parent / "rawdata" / "CI 度量与改进(日观测板 _ 周复盘)_files" / "saved_resource.html"
OUT_DIR = pathlib.Path(__file__).parent
JOURNEY_PATH = OUT_DIR / "components" / "CiReport" / "ci-journey.json"


def main():
    if not RAWDATA_HTML.exists():
        print(f"错误: 找不到 {RAWDATA_HTML}")
        print("请先把保存的 HTML 和 _files 文件夹放到 rawdata/ 目录下")
        return 1

    html = RAWDATA_HTML.read_text(encoding="utf-8")
    m = re.search(r'const __DATAZ = "([^"]+)"', html)
    if not m:
        print("错误: 无法从 HTML 中提取 DATA 数据")
        return 1

    raw = base64.b64decode(m.group(1))
    data = json.loads(gzip.decompress(raw))

    # 1. 更新主数据文件 ci-*-data.json
    for repo, repo_data in data.items():
        fname = OUT_DIR / f"ci-{repo}-data.json"
        fname.write_text(json.dumps(repo_data, ensure_ascii=False, indent=2), encoding="utf-8")
        days = repo_data.get("days", [])
        print(f"Updated: {fname.name} ({len(json.dumps(repo_data))} bytes, latest={days[-1] if days else 'N/A'})")

    # 2. 更新旅程数据 ci-journey.json（供总览页面使用）
    def convert_stats(stage):
        """将 stats 从数组格式 [label, value] 转换为对象格式 {label, v}"""
        raw_stats = stage.get("stats", [])
        converted = []
        for item in raw_stats:
            if isinstance(item, list) and len(item) == 2:
                converted.append({"label": item[0], "v": item[1]})
            elif isinstance(item, dict) and "label" in item:
                converted.append(item)
        stage["stats"] = converted
        return stage

    journey_data = {}
    for repo, repo_data in data.items():
        days = repo_data.get("days", [])
        boards = {}
        for day in days:
            board = repo_data["boards"][day]
            if "journey" in board:
                stages = []
                for stage in board["journey"]:
                    stages.append(convert_stats(stage.copy()))
                journey_board = {
                    "day": day,
                    "date": day,
                    "note": board.get("journey_note", ""),
                    "scores": board.get("scores", None),
                    "stages": stages
                }
                if "unsegProblems" in board:
                    journey_board["unsegProblems"] = board["unsegProblems"]
                boards[day] = journey_board

        journey_data[repo] = {
            "projectName": repo,
            "workflow": repo_data.get("workflow", ""),
            "days": days,
            "boards": boards
        }

    JOURNEY_PATH.write_text(json.dumps(journey_data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Updated: ci-journey.json ({len(json.dumps(journey_data))} bytes)")

    print(f"\nTotal repos: {len(data)}")
    print("Next.js 会自动检测文件变化并重新编译，刷新页面即可看到最新数据。")
    return 0


if __name__ == "__main__":
    exit(main())
