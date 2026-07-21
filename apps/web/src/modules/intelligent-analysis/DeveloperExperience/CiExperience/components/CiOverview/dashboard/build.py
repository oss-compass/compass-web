#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
构建单文件自包含看板 HTML。
流程:从样例 saved_resource.html 抽取真实 DATA(唯一数据源)→ 内联 dashboard.css / dashboard.js
     → 生成 CANN_CICD_Dashboard.html(零依赖、可直接静态部署)。
"""
import json
import re
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE.parent / "CI 度量与改进 · CANN GitCode Action — v2 结构设计稿 20260718_files" / "saved_resource.html"
OUT = HERE / "CANN_CICD_Dashboard.html"
OUT_OV = HERE / "CANN_CICD_Overview.html"


def extract_data(html: str) -> dict:
    """定位 `const DATA = {` 并用花括号配平抽取对象字面量,解析为 dict。"""
    key = "const DATA = "
    i = html.index(key) + len(key)
    assert html[i] == "{", "DATA 起始不是 { "
    depth, j, in_str, esc = 0, i, False, False
    while j < len(html):
        c = html[j]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    j += 1
                    break
        j += 1
    literal = html[i:j]
    return json.loads(literal)


HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>社区 CI/CD 能力与体验看板 · CANN GitCode Action</title>
<style>
{css}
</style>
</head>
<body>
<div class="wrap">

  <div class="topbar card">
    <span class="brand"><span class="logo">◆</span> Cogito 智能分析</span>
    <div class="tabs"><span>社区入门体验</span><span>Issue 贡献体验</span><span class="on">CI 度量与改进</span></div>
    <span class="spacer"></span>
    <span class="readonly">面向:社区 CI/CD 管理与基础设施团队</span>
    <button class="iconbtn" id="themebtn" onclick="toggleTheme()" title="切换深浅色" aria-label="切换主题">☾</button>
  </div>

  <div class="metaband">
    <span class="chip">📦 <b>gitcode · cann</b></span>
    <div class="seg" role="tablist" aria-label="仓库切换">
      <button id="tab-runtime" onclick="setRepo('runtime')">runtime</button>
      <button id="tab-opsnn" class="on" onclick="setRepo('opsnn')">ops-nn</button>
    </div>
    <span class="chip" id="chip-wf">workflow: ops_nn_action</span>
    <span class="chip">数据底座:验证仓 <b>gitcode-ci-lab</b> 日粒度落库</span>
    <span class="spacer"></span>
    <button class="btn" onclick="window.print()">导出 / 打印</button>
  </div>

  <div class="banner">🧭 <b>看板回答四个问题</b>:构建<b>稳不稳</b>、反馈<b>快不快</b>、开发者<b>顺不顺</b>、算力<b>值不值</b>,总目标服务于<b>贡献者使用体验</b>。
    🏷️ 数字由验证仓 <b>gitcode-ci-lab</b> 实测生成(2026-07-11→07-18);渲染层零硬编码;<b>不打总分</b>,改进效果看指标曲线 + 落地标注 + 前后对比。</div>

  <div id="sec-top"></div>
  <div id="sec-mid"></div>
  <div id="sec-bottom"></div>

  <footer>Cogito · 社区 CI/CD 能力与体验看板 v2 · 面向:社区 CI/CD 管理与基础设施团队(稳定性/效率/交互体验/成本整体看护,总目标=贡献者使用体验)<br>
    不打总分,改进效果 = 指标曲线 + 改进项标注 + 前后对比 · 数据来源:验证仓 gitcode-ci-lab 实测</footer>
</div>

<script>
window.DATA = {data};
</script>
<script>
{js}
</script>
</body>
</html>
"""


OVERVIEW_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>社区 CI/CD 总览看板 · CANN GitCode Action</title>
<style>
{css}
</style>
</head>
<body>
<div class="wrap">

  <div class="topbar card">
    <div class="ov-title">
      <span class="t1"><span class="logo">◆</span> Cogito 智能分析 · 社区 CI/CD 总览看板</span>
      <span class="t2">面向：社区基础设施负责人 · 社区体验负责人</span>
    </div>
    <span class="spacer"></span>
    <a class="linkbtn" href="CANN_CICD_Dashboard.html" target="_blank" rel="noopener">进入详细看板 →</a>
    <button class="iconbtn" id="themebtn" onclick="toggleTheme()" title="切换深浅色" aria-label="切换主题">☾</button>
  </div>

  <div class="metaband">
    <span class="chip">📦 <b>gitcode · cann</b> · runtime + ops-nn</span>
    <span class="chip">数据底座：验证仓 <b>gitcode-ci-lab</b> 日粒度落库</span>
    <span class="chip">观测窗：2026-07-12 → 07-17 · W29 期中预览</span>
    <span class="spacer"></span>
    <button class="btn" onclick="window.print()">导出 / 打印</button>
  </div>

  <div class="banner">🧭 <b>一屏看懂两件事</b>：建设<b>稳不稳 / 算力值不值</b>(基础设施负责人)、反馈<b>快不快 / 开发者顺不顺</b>(体验负责人)；
    🏷️ 数字由验证仓实测生成，渲染层零硬编码；<b>不打总分</b>，看关键指标、责任归属与问题闭环。</div>

  <div id="app"></div>

  <footer>Cogito · 社区 CI/CD 总览看板 · 面向：社区基础设施负责人 / 社区体验负责人<br>
    不打总分 · 数据来源：验证仓 gitcode-ci-lab 实测 · 详细问题定位见各仓「详细看板」</footer>
</div>

<script>
window.DATA = {data};
</script>
<script>
{js}
</script>
</body>
</html>
"""


def main():
    html = SRC.read_text(encoding="utf-8")
    data = extract_data(html)
    data_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))

    # 详细看板
    css = (HERE / "dashboard.css").read_text(encoding="utf-8")
    js = (HERE / "dashboard.js").read_text(encoding="utf-8")
    out = (HTML_TEMPLATE
           .replace("{css}", css)
           .replace("{data}", data_json)
           .replace("{js}", js))
    OUT.write_text(out, encoding="utf-8")
    print(f"OK -> {OUT}  ({round(len(out.encode('utf-8')) / 1024)} KB)  repos={list(data.keys())}")

    # 总览看板（复用 dashboard.css 令牌 + overview.css 专属样式 + overview.js）
    ov_css = css + "\n" + (HERE / "overview.css").read_text(encoding="utf-8")
    ov_js = (HERE / "overview.js").read_text(encoding="utf-8")
    ov = (OVERVIEW_TEMPLATE
          .replace("{css}", ov_css)
          .replace("{data}", data_json)
          .replace("{js}", ov_js))
    OUT_OV.write_text(ov, encoding="utf-8")
    print(f"OK -> {OUT_OV}  ({round(len(ov.encode('utf-8')) / 1024)} KB)  repos={list(data.keys())}")


if __name__ == "__main__":
    main()
