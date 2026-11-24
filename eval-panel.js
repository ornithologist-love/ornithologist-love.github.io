window.initEvalPanel = () => {
  if (window.__evalPanelInited || !window.EVAL_BENCHMARK_DATA) return;
  window.__evalPanelInited = true;
  const DATA = window.EVAL_BENCHMARK_DATA;
  const state = {
    scope: "raw",         // raw | inlimit
    theme: "auto",        // auto | light | dark
    curveMode: "both",    // both | pow | at
    dimMode: "category",  // category | tier | aiNode
    chartMode: "score-contrib", // score-contrib | trial-score | duration-trials | tokens-stack
    scatterX: "dur",      // dur | tok
    barMetric: "totalScore", // totalScore | capScore | spdScore | passAt1 | passPow3
    selectedDimKey: null,
    statusBucketFilter: null,
    quickFilter: "all",
    catFilter: "ALL",
    search: "",
    sortKey: "id",
    sortDir: "asc",
    expandedIds: new Set(),
  };

  const tooltip = document.getElementById("tooltip");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[m]));
  const pct = (v) => (v * 100).toFixed(1) + "%";
  const fmtInt = (n) => Math.round(n).toLocaleString("en-US");
  const fmtK = (n) => n >= 100000 ? `${Math.round(n / 1000)}k` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n));
  const metricCell = (mainText, delta, fmtAbs, lowerIsBetter, zeroTol = 0.005) => {
    const isZero = Math.abs(delta) < zeroTol;
    const arrow = isZero ? "" : (delta > 0 ? "↑" : "↓");
    const cls = isZero ? "zero" : ((lowerIsBetter ? delta < 0 : delta > 0) ? "good" : "bad");
    const sub = isZero ? "±0" : `${arrow}${fmtAbs(Math.abs(delta))}`;
    return `<div class="m-main">${mainText}</div><div class="m-sub ${cls}">${sub}</div>`;
  };
  const isZh = () => document.documentElement.lang === "zh-CN";
  const eb = () => (window.I18N && window.I18N.evalBench) || {};
  const trMap = (group, key) => isZh() ? key : ((eb()[group] && eb()[group][key]) || key);
  const trTitle = (q) => isZh() ? q.title : ((eb().titles && eb().titles[q.id]) || q.title);

  const BUCKET_META = {
    passed_in_limit: { get label() { return isZh() ? "有效通过 (≤45m)" : "Passed (≤45m)"; }, color: "var(--v2)", dot: "pass" },
    passed_timeout: { get label() { return isZh() ? "超 45m 跑通 (>45m)" : "Passed (>45m)"; }, color: "var(--warn)", dot: "timeout" },
    failed: { get label() { return isZh() ? "未通过" : "Failed"; }, color: "var(--danger)", dot: "fail" },
    environment_blocked: { get label() { return isZh() ? "环境阻塞" : "Env Blocked"; }, color: "#d49b27", dot: "blocked" },
    manual_stopped: { get label() { return isZh() ? "手动停止/中断" : "Stopped"; }, color: "var(--slate)", dot: "stopped" },
    outbound_violation: { get label() { return isZh() ? "越界违规" : "Outbound Violation"; }, color: "var(--purple)", dot: "outbound" },
  };

  function showTooltip(ev, htmlBody) {
    tooltip.innerHTML = htmlBody;
    tooltip.classList.add("visible");
    positionTooltip(ev);
  }
  function positionTooltip(ev) {
    const pad = 14;
    const rect = tooltip.getBoundingClientRect();
    let x = ev.clientX + 16;
    let y = ev.clientY - 12;
    if (x + rect.width + pad > window.innerWidth) x = ev.clientX - rect.width - 16;
    if (y + rect.height + pad > window.innerHeight) y = window.innerHeight - rect.height - pad;
    if (y < pad) y = pad;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }
  function hideTooltip() {
    tooltip.classList.remove("visible");
  }

  function renderAAScatter() {
    const wrap = document.getElementById("aaScatterChart");
    if (!wrap || !DATA.models) return;
    const z = isZh();
    const models = DATA.models.filter(m => m.id !== "ds-v1");
    const isDur = state.scatterX === "dur";
    const W = 920, H = 260, L = 48, R = 890, T = 28, B = 216;
    const xMin = 0;
    const xMax = isDur ? 15 : 80000;
    const yMin = 75, yMax = 93;
    const xOf = (v) => L + ((v - xMin) / (xMax - xMin)) * (R - L);
    const yOf = (v) => B - ((v - yMin) / (yMax - yMin)) * (B - T);

    let svg = `<g class="chart-grid">`;
    const xTicks = isDur ? [0, 3, 6, 9, 12, 15] : [0, 20000, 40000, 60000, 80000];
    for (const xv of xTicks) {
      const x = xOf(xv);
      const lbl = isDur ? `${xv}m` : `${Math.round(xv / 1000)}k`;
      svg += `<line x1="${x.toFixed(1)}" y1="${T}" x2="${x.toFixed(1)}" y2="${B}"/><text x="${x.toFixed(1)}" y="${B + 16}" text-anchor="middle">${lbl}</text>`;
    }
    for (const yv of [75, 80, 85, 90]) {
      const y = yOf(yv);
      svg += `<line x1="${L}" y1="${y.toFixed(1)}" x2="${R}" y2="${y.toFixed(1)}"/><text x="${L - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end">${yv}</text>`;
    }
    svg += `</g>`;

    // Cap = 90 full-score reference line
    const y90 = yOf(90);
    svg += `<line x1="${L}" y1="${y90.toFixed(1)}" x2="${R}" y2="${y90.toFixed(1)}" stroke="var(--accent)" stroke-opacity="0.4" stroke-dasharray="4 4" stroke-width="1"/>`;
    svg += `<text x="${R}" y="${(y90 - 8).toFixed(1)}" text-anchor="end" style="font-size:9px;fill:var(--accent-text);opacity:0.85">${z ? "Cap 90 · 满分基线 (45/45)" : "Cap 90 · Full Pass Baseline (45/45)"}</text>`;

    svg += `<text x="${(L + R) / 2}" y="${H - 6}" text-anchor="middle" style="font-size:10.5px;fill:var(--dim)">${isDur ? (z ? "中位耗时 P50（分钟，越靠左越快）" : "Median Duration P50 (min, lower is faster)") : (z ? "每跑通 1 次平均输出 Token（越靠左越省）" : "Output Tokens / Pass (lower is cheaper)")}</text>`;

    const getX = (m) => isDur ? m.p50DurationMin : m.outputTokensPerPass;
    const lblPos = {
      "gemini-4-hydrogen-low-v2": { dx: 0, dy: -12, anchor: "middle" },
      "glm-53-flash-v2":          { dx: 8, dy: -12, anchor: "start" },
      "hy4-flash-v2":             { dx: 0, dy: 14,  anchor: "middle" },
      "gpt-6-luna-v2":            { dx: 0, dy: -12, anchor: "middle" },
      "hy4-v2":                   { dx: 0, dy: 14,  anchor: "middle" },
      "glm-53-v2":                { dx: 9, dy: 0,   anchor: "start" },
      "ds-v2":                    { dx: 0, dy: 14,  anchor: "middle" },
      "claude-haiku-55-v2":       { dx: 9, dy: 0,   anchor: "start" },
    };

    models.forEach(m => {
      const xv = getX(m);
      if (xv == null) return;
      const cx = xOf(xv);
      const cy = yOf(m.capScore);
      const pos = lblPos[m.id] || { dx: 9, dy: 0, anchor: "start" };
      const valTag = isDur ? `${m.p50DurationMin.toFixed(1)}m` : fmtK(m.outputTokensPerPass);
      svg += `<circle class="aa-dot" data-mid="${m.id}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="${m.color}" stroke="var(--panel)" stroke-width="1.6" style="cursor:pointer"/>`;
      svg += `<text x="${(cx + pos.dx).toFixed(1)}" y="${(cy + pos.dy).toFixed(1)}" dominant-baseline="central" text-anchor="${pos.anchor}" style="font-size:8.5px;font-weight:600;fill:var(--text)">${esc(m.short)} · ${valTag}</text>`;
    });

    wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${svg}</svg>`;
    wrap.querySelectorAll(".aa-dot").forEach(dot => {
      dot.addEventListener("mousemove", (ev) => {
        const m = models.find(x => x.id === dot.dataset.mid);
        showTooltip(ev, `
          <div class="tt-head"><span>${esc(m.name)}</span><span class="pill">${esc(m.badge)}</span></div>
          <div class="tt-grid">
            <span class="tt-k">${z ? "综合总分 (0–90)" : "Total Score (0–90)"}</span><span class="tt-v pos">${m.totalScore.toFixed(2)}</span>
            <span class="tt-k">${z ? "能力分 Cap / 速度分 Spd" : "Cap / Spd Score"}</span><span class="tt-v">${m.capScore.toFixed(1)} / ${m.spdScore.toFixed(1)}</span>
            <span class="tt-k">Pass@1 / Pass^3</span><span class="tt-v">${pct(m.passAt1)} / ${pct(m.passPow3)}</span>
            <span class="tt-k">${z ? "中位耗时 P50" : "Median Duration P50"}</span><span class="tt-v">${m.p50DurationMin.toFixed(2)}m</span>
            <span class="tt-k">${z ? "每次通过 Token" : "Tokens / Pass"}</span><span class="tt-v">${fmtK(m.outputTokensPerPass)}</span>
          </div>
        `);
      });
      dot.addEventListener("mouseleave", hideTooltip);
    });
  }

  function renderBarList(targetId, metric) {
    const wrap = document.getElementById(targetId);
    if (!wrap || !DATA.models) return;
    const isDur = metric === "p50DurationMin";
    const isPct = metric === "passAt1" || metric === "passPow3";
    const maxMap = { totalScore: 90, capScore: 90, spdScore: 90, passAt1: 1, passPow3: 1 };
    const maxV = maxMap[metric] || 90;
    const v2Models = DATA.models.filter(m => m.id !== "ds-v1");
    const baseModel = v2Models.find(m => m.id === "ds-v2");
    const sorted = v2Models.slice().sort((a, b) => isDur ? (a[metric] - b[metric]) : (b[metric] - a[metric]));

    const fmtVal = (v) => isDur ? `${v.toFixed(2)}m` : isPct ? pct(v) : `${v.toFixed(2)} / 90`;
    wrap.innerHTML = `<div class="aa-bars">${sorted.map(m => {
      const v = m[metric];
      const wPct = Math.min(100, Math.max(4, (v / maxV) * 100));
      let deltaTxt = "";
      if (baseModel && m.id !== "ds-v2") {
        const bv = baseModel[metric];
        const diffPct = ((v - bv) / bv) * 100;
        deltaTxt = `${diffPct >= 0 ? "+" : ""}${diffPct.toFixed(0)}% vs DeepSeek-V4.1-Flash`;
      }
      return `
        <div class="aa-bar-row">
          <div class="aa-bar-head">
            <span class="aa-bar-name"><span class="swatch" style="background:${m.color}"></span>${esc(m.name)}</span>
            <span class="aa-bar-val">${fmtVal(v)}${deltaTxt ? `<small>${deltaTxt}</small>` : ""}</span>
          </div>
          <div class="aa-bar-track"><div class="aa-bar-fill" style="width:${wPct.toFixed(1)}%;background:${m.color}"></div></div>
          <div class="aa-bar-sub">
            <span>Cap ${m.capScore.toFixed(1)}</span>
            <span>Spd ${m.spdScore.toFixed(1)}</span>
            <span>Pass@1 ${pct(m.passAt1)}</span>
            <span>Pass^3 ${pct(m.passPow3)}</span>
            <span>P50 ${m.p50DurationMin.toFixed(1)}m</span>
            <span>${fmtK(m.outputTokensPerPass)}/pass</span>
          </div>
        </div>
      `;
    }).join("")}</div>`;
  }

  function renderAABarChart() {
    renderBarList("aaBarChart", state.barMetric);
  }

  function renderHeroAndKPI() {
    const v1 = DATA.versions.v1;
    const v2 = DATA.versions.v2;
    const inLimit = state.scope === "inlimit";

    const v1PassArr = inLimit ? v1.passAtKInLimit : v1.passAtK;
    const v2PassArr = inLimit ? v2.passAtKInLimit : v2.passAtK;
    const v1PowArr = inLimit ? v1.passPowKInLimit : v1.passPowK;
    const v2PowArr = inLimit ? v2.passPowKInLimit : v2.passPowK;
    const v1TrialsOk = inLimit ? v1.inLimitPassedTrials : v1.passedTrials;
    const v2TrialsOk = inLimit ? v2.inLimitPassedTrials : v2.passedTrials;
    const v1All3 = inLimit ? v1.all3InLimitQuestions : v1.all3StableQuestions;
    const v2All3 = inLimit ? v2.all3InLimitQuestions : v2.all3StableQuestions;
    const v1Cov = inLimit ? v1.coveredInLimitQuestions : v1.coveredQuestions;
    const v2Cov = inLimit ? v2.coveredInLimitQuestions : v2.coveredQuestions;

    const z = isZh();
    document.getElementById("highlightsStrip").innerHTML = z ? `
      <span><strong>通过率跃升：</strong>单次通过率 (Pass@1) <code>${pct(v1PassArr[0])} → ${pct(v2PassArr[0])}</code> · 三次全过率 (Pass^3) <code>${pct(v1PowArr[2])} → ${pct(v2PowArr[2])}</code></span>
      <span><strong>复合难题突破：</strong>05 端到端性能日报 <code>0/3 → 3/3</code>（含 1 次 94.9m 长耗时试次）；18B 无头 DSH 工具注入 <code>1/3 → 3/3</code></span>
      <span><strong>耗时与成本：</strong>单次中位耗时 <code>${v1.durationSession.p50.toFixed(1)}m → ${v2.durationSession.p50.toFixed(1)}m</code>（<b>−68%</b>）· 单次跑通 Token <code>69.7k → 41.7k</code>（<b>−40%</b>）</span>
    ` : `
      <span><strong>Pass Rate Leap:</strong> First-try (Pass@1) <code>${pct(v1PassArr[0])} → ${pct(v2PassArr[0])}</code> · 3-of-3 stable (Pass^3) <code>${pct(v1PowArr[2])} → ${pct(v2PowArr[2])}</code></span>
      <span><strong>Hard Tasks Solved:</strong> 05 Daily Perf Report <code>0/3 → 3/3</code> (incl. one 94.9m long run); 18B Mock MCP Injection <code>1/3 → 3/3</code></span>
      <span><strong>Latency &amp; Cost:</strong> Median duration <code>${v1.durationSession.p50.toFixed(1)}m → ${v2.durationSession.p50.toFixed(1)}m</code> (<b>−68%</b>) · Tokens/pass <code>69.7k → 41.7k</code> (<b>−40%</b>)</span>
    `;

    const kpis = [
      {
        label: z ? (inLimit ? "45 分钟内通过率 (Pass@1)" : "单次通过率 (Pass@1)") : (inLimit ? "Pass@1 (≤45m Effective)" : "First-Try Pass Rate (Pass@1)"),
        badge: z ? `${v1TrialsOk}→${v2TrialsOk}/45 次` : `${v1TrialsOk}→${v2TrialsOk}/45 runs`,
        before: pct(v1PassArr[0]),
        after: pct(v2PassArr[0]),
        delta: `+${((v2PassArr[0] - v1PassArr[0]) * 100).toFixed(1)} pp`,
        sub: z ? `45 次运行中通过 ${v1TrialsOk} → ${v2TrialsOk} 次` : `Passed ${v1TrialsOk}/45 → ${v2TrialsOk}/45 total trials`,
      },
      {
        label: z ? "3 次至少过 1 次 (Pass@3)" : "Solved ≥1 of 3 (Pass@3)",
        badge: z ? `${v1Cov}→${v2Cov}/15 题` : `${v1Cov}→${v2Cov}/15 tasks`,
        before: pct(v1PassArr[2]),
        after: pct(v2PassArr[2]),
        delta: `+${((v2PassArr[2] - v1PassArr[2]) * 100).toFixed(1)} pp`,
        sub: `Pass@2: ${pct(v1PassArr[1])} → ${pct(v2PassArr[1])}`,
      },
      {
        label: z ? "3 次全部通过 (Pass^3)" : "Solved All 3 of 3 (Pass^3)",
        badge: z ? `${v1All3}→${v2All3}/15 题` : `${v1All3}→${v2All3}/15 tasks`,
        before: pct(v1PowArr[2]),
        after: pct(v2PowArr[2]),
        delta: `+${((v2PowArr[2] - v1PowArr[2]) * 100).toFixed(1)} pp`,
        sub: `Pass^2: ${pct(v1PowArr[1])} → ${pct(v2PowArr[1])}`,
      },
      {
        label: z ? "综合得分（能力 60% + 速度 40%）" : "Weighted Score (60% Cap + 40% Spd)",
        badge: z ? `满分 ${DATA.benchmark.maxPossibleScore}` : `Max ${DATA.benchmark.maxPossibleScore}`,
        before: v1.scoreBeforeFalseGreenReview.toFixed(2),
        after: v2.scoreBeforeFalseGreenReview.toFixed(2),
        delta: z ? `+${(v2.scoreBeforeFalseGreenReview - v1.scoreBeforeFalseGreenReview).toFixed(2)} 分` : `+${(v2.scoreBeforeFalseGreenReview - v1.scoreBeforeFalseGreenReview).toFixed(2)} pts`,
        sub: z ? `能力分 ${v2.capScore.toFixed(1)} · 速度分 ${v2.spdScore.toFixed(1)}（四档反比例）` : `Cap ${v2.capScore.toFixed(1)} · Spd ${v2.spdScore.toFixed(1)} (4-tier decay)`,
      },
      {
        label: z ? "单次运行中位耗时 (P50)" : "Median Session Duration (P50)",
        badge: z ? `总计 ${v2.durationSession.totalHours}h` : `Total ${v2.durationSession.totalHours}h`,
        before: `${v1.durationSession.p50.toFixed(1)}m`,
        after: `${v2.durationSession.p50.toFixed(1)}m`,
        delta: `${(v2.durationSession.p50 - v1.durationSession.p50) >= 0 ? "+" : ""}${(v2.durationSession.p50 - v1.durationSession.p50).toFixed(1)}m P50`,
        sub: `P90: ${v1.durationSession.p90.toFixed(1)}m → ${v2.durationSession.p90.toFixed(1)}m`,
      },
      {
        label: z ? "总输出 Token / 单次成本" : "Output Tokens / Cost per Pass",
        badge: `Cache ${pct(v2.tokens.cacheHitRate)}`,
        before: `${(v1.tokens.totalOutput / 1e6).toFixed(2)}M`,
        after: `${(v2.tokens.totalOutput / 1e6).toFixed(2)}M`,
        delta: z ? `每次通过 −40%` : `−40% tok / pass`,
        sub: z ? `每跑通 1 次平均 ${fmtInt(v1.tokens.outputTokensPerPass)} → ${fmtInt(v2.tokens.outputTokensPerPass)} tok` : `Avg ${fmtInt(v1.tokens.outputTokensPerPass)} → ${fmtInt(v2.tokens.outputTokensPerPass)} tok/pass`,
      },
    ];

    document.getElementById("kpiGrid").innerHTML = kpis.map(k => `
      <div class="kpi-card">
        <div class="kpi-label"><span>${esc(k.label)}</span><span class="pill">${esc(k.badge)}</span></div>
        <div class="kpi-val num"><small>${esc(k.before)} →</small><span>${esc(k.after)}</span></div>
        <div class="kpi-delta pos">${esc(k.delta)}</div>
        <div class="kpi-sub">${esc(k.sub)}</div>
      </div>
    `).join("");
  }

  function renderReliabilityChart() {
    const v1 = DATA.versions.v1;
    const v2 = DATA.versions.v2;
    const inLimit = state.scope === "inlimit";
    const v1At = inLimit ? v1.passAtKInLimit : v1.passAtK;
    const v2At = inLimit ? v2.passAtKInLimit : v2.passAtK;
    const v1Pow = inLimit ? v1.passPowKInLimit : v1.passPowK;
    const v2Pow = inLimit ? v2.passPowKInLimit : v2.passPowK;

    const W = 560, H = 250, L = 52, R = 520, T = 26, B = 210;
    const xs = [125, 290, 455];
    const yOf = (v) => B - v * (B - T);

    let grid = "";
    for (const val of [0, 0.25, 0.5, 0.75, 1]) {
      const y = yOf(val);
      grid += `<line x1="${L}" y1="${y}" x2="${R}" y2="${y}"/><text x="${L - 8}" y="${y + 4}" text-anchor="end">${Math.round(val * 100)}%</text>`;
    }

    const lines = [];
    if (state.curveMode === "both" || state.curveMode === "at") {
      lines.push({ name: "V1 Pass@k", arr: v1At, color: "var(--v1)", dash: "", labelDy: 16 });
      lines.push({ name: "V2 Pass@k", arr: v2At, color: "var(--v2)", dash: "", labelDy: -10 });
    }
    if (state.curveMode === "both" || state.curveMode === "pow") {
      lines.push({ name: "V1 Pass^k", arr: v1Pow, color: "var(--v1)", dash: "6,4", labelDy: 16 });
      lines.push({ name: "V2 Pass^k", arr: v2Pow, color: "var(--v2)", dash: "6,4", labelDy: 17 });
    }

    let svgBody = `<g class="chart-grid">${grid}</g>`;
    for (const s of lines) {
      const pts = xs.map((x, i) => `${x},${yOf(s.arr[i]).toFixed(2)}`).join(" ");
      svgBody += `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2.8" ${s.dash ? `stroke-dasharray="${s.dash}"` : ""}/>`;
      xs.forEach((x, i) => {
        const y = yOf(s.arr[i]);
        // Avoid duplicate label at k=1 when Pass^1 == Pass@1 in dual-curve mode
        if (state.curveMode === "both" && i === 0 && s.name.includes("Pass^k")) {
          svgBody += `<circle cx="${x}" cy="${y.toFixed(2)}" r="5" fill="var(--surface)" stroke="${s.color}" stroke-width="2.6"/>`;
          return;
        }
        const dy = (s.name.includes("V2 Pass^k") && Math.abs(v2Pow[i] - v2At[i]) < 0.08 && state.curveMode === "both") ? 18 : s.labelDy;
        svgBody += `<circle cx="${x}" cy="${y.toFixed(2)}" r="5" fill="var(--surface)" stroke="${s.color}" stroke-width="2.6"/>`;
        svgBody += `<text x="${x}" y="${(y + dy).toFixed(2)}" text-anchor="middle" style="fill:${s.color};font-weight:700">${pct(s.arr[i])}</text>`;
      });
    }

    // Interactive invisible hover hitboxes for k=1,2,3
    xs.forEach((x, i) => {
      svgBody += `<text x="${x}" y="234" text-anchor="middle" style="font-weight:700;fill:var(--text-secondary)">k = ${i + 1}</text>`;
      svgBody += `<rect class="curve-hit" data-k="${i}" x="${x - 65}" y="${T - 10}" width="130" height="${B - T + 28}" fill="transparent" style="cursor:crosshair"/>`;
    });

    const wrap = document.getElementById("reliabilityChart");
    wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${svgBody}</svg>`;
    wrap.querySelectorAll(".curve-hit").forEach(el => {
      el.addEventListener("mousemove", (ev) => {
        const k = Number(el.dataset.k);
        const z = isZh();
        showTooltip(ev, `
          <div class="tt-head"><span>k = ${k + 1} (${z ? (inLimit ? "≤45m 限时口径" : "全部跑通口径") : (inLimit ? "≤45m Effective" : "All Passed")})</span></div>
          <div class="tt-grid">
            <span class="tt-k">V1 Pass@${k + 1}</span><span class="tt-v">${pct(v1At[k])}</span>
            <span class="tt-k">V2 Pass@${k + 1}</span><span class="tt-v pos">${pct(v2At[k])}</span>
            <span class="tt-k">V1 Pass^${k + 1}</span><span class="tt-v">${pct(v1Pow[k])}</span>
            <span class="tt-k">V2 Pass^${k + 1}</span><span class="tt-v pos">${pct(v2Pow[k])}</span>
          </div>
          <div class="tt-sep"></div>
          <div style="color:var(--muted);font-size:11px">${z ? `Pass@k 提升 ${(100 * (v2At[k] - v1At[k])).toFixed(1)} pp；Pass^k 提升 ${(100 * (v2Pow[k] - v1Pow[k])).toFixed(1)} pp。` : `Pass@k +${(100 * (v2At[k] - v1At[k])).toFixed(1)} pp; Pass^k +${(100 * (v2Pow[k] - v1Pow[k])).toFixed(1)} pp.`}</div>
        `);
      });
      el.addEventListener("mouseleave", hideTooltip);
    });
  }

  function renderStatusAndProcess() {
    const z = isZh();
    const buckets = ["passed_in_limit", "passed_timeout", "failed", "environment_blocked", "manual_stopped", "outbound_violation"];
    const renderVerBar = (verKey, label) => {
      const sb = DATA.versions[verKey].statusBreakdown;
      const segs = buckets.filter(b => sb[b].count > 0).map(b => {
        const cnt = sb[b].count;
        const w = (cnt / 45) * 100;
        return `<div class="status-seg" data-ver="${verKey}" data-bucket="${b}" style="width:${w}%;background:${BUCKET_META[b].color}">${cnt >= 3 ? cnt : ""}</div>`;
      }).join("");
      return `
        <div class="status-stack-row">
          <div class="status-stack-head"><span>${label} (${z ? "45 次运行" : "45 trials"})</span><span class="num">${DATA.versions[verKey].passedTrials}/45 ${z ? "通过" : "passed"}</span></div>
          <div class="status-stack-track">${segs}</div>
        </div>
      `;
    };

    const legend = buckets.map(b => `<span class="legend-item"><span class="swatch" style="background:${BUCKET_META[b].color}"></span>${BUCKET_META[b].label}</span>`).join("");
    const activeChip = state.statusBucketFilter ? `<div style="margin-top:8px"><span class="pill ok">${z ? "已按状态筛选：" : "Filtered by status: "}${BUCKET_META[state.statusBucketFilter].label} <button id="clearBucketBtn" style="border:0;background:none;color:inherit;cursor:pointer;font-weight:700">✕</button></span></div>` : "";
    const sc = document.getElementById("statusComposition");
    sc.innerHTML = `<div class="legend">${legend}</div>${renderVerBar("v1", z ? "V1 基线" : "V1 Baseline")}${renderVerBar("v2", z ? "V2 当前" : "V2 Current")}${activeChip}`;

    sc.querySelectorAll(".status-seg").forEach(seg => {
      seg.addEventListener("mousemove", (ev) => {
        const ver = seg.dataset.ver;
        const b = seg.dataset.bucket;
        const info = DATA.versions[ver].statusBreakdown[b];
        showTooltip(ev, `
          <div class="tt-head"><span>${ver.toUpperCase()} · ${BUCKET_META[b].label}</span><span class="num">${info.count}/45 (${pct(info.count / 45)})</span></div>
          <div style="color:var(--muted);line-height:1.45">${info.trials.slice(0, 12).join(", ")}${info.trials.length > 12 ? (z ? ` 等 ${info.trials.length} 次` : ` (+${info.trials.length - 12} more)`) : ""}</div>
          <div class="tt-sep"></div>
          <div style="color:var(--accent);font-size:11px">${z ? "点击筛选包含此状态的题目" : "Click to filter tasks with this status"}</div>
        `);
      });
      seg.addEventListener("mouseleave", hideTooltip);
      seg.addEventListener("click", () => {
        state.statusBucketFilter = state.statusBucketFilter === seg.dataset.bucket ? null : seg.dataset.bucket;
        renderStatusAndProcess();
        renderQuestionTable();
      });
    });
    const clr = document.getElementById("clearBucketBtn");
    if (clr) clr.addEventListener("click", () => { state.statusBucketFilter = null; renderStatusAndProcess(); renderQuestionTable(); });

    const p1 = DATA.versions.v1.process, p2 = DATA.versions.v2.process;
    const t1 = DATA.versions.v1.tokens, t2 = DATA.versions.v2.tokens;
    document.getElementById("processMiniGrid").innerHTML = (z ? [
      ["中位对话轮次", `${p1.medianSteps} → ${p2.medianSteps} 步`, `总计 ${fmtInt(p1.totalSteps)} → ${fmtInt(p2.totalSteps)}`],
      ["中位工具调用", `${p1.medianToolCalls} → ${p2.medianToolCalls} 次`, `总计 ${fmtInt(p1.totalToolCalls)} → ${fmtInt(p2.totalToolCalls)}`],
      ["工具报错率", `${pct(p1.toolErrorRate)} → ${pct(p2.toolErrorRate)}`, `${p1.totalToolErrors} → ${p2.totalToolErrors} 次报错`],
      ["Prompt Cache 命中", `${pct(t1.cacheHitRate)} → ${pct(t2.cacheHitRate)}`, `V2 Cache ${(t2.totalCacheRead / 1e6).toFixed(1)}M`],
    ] : [
      ["Median Turns", `${p1.medianSteps} → ${p2.medianSteps} steps`, `Total ${fmtInt(p1.totalSteps)} → ${fmtInt(p2.totalSteps)}`],
      ["Median Tool Calls", `${p1.medianToolCalls} → ${p2.medianToolCalls} calls`, `Total ${fmtInt(p1.totalToolCalls)} → ${fmtInt(p2.totalToolCalls)}`],
      ["Tool Error Rate", `${pct(p1.toolErrorRate)} → ${pct(p2.toolErrorRate)}`, `${p1.totalToolErrors} → ${p2.totalToolErrors} errors`],
      ["Prompt Cache Hit", `${pct(t1.cacheHitRate)} → ${pct(t2.cacheHitRate)}`, `V2 Cache ${(t2.totalCacheRead / 1e6).toFixed(1)}M`],
    ]).map(([l, v, s]) => `<div class="proc-stat"><div class="lbl">${l}</div><div class="val num">${v}</div><div class="kpi-sub">${s}</div></div>`).join("");
  }

  function renderDimensionTable() {
    const z = isZh();
    const rows = DATA.dimensions[state.dimMode];
    const inLimit = state.scope === "inlimit";
    const head = `
      <table class="dim-table">
        <thead><tr>
          <th>${z ? "分组" : "Group"}</th>
          <th>${z ? "题数" : "Tasks"}</th>
          <th>${z ? "V1 → V2 通过次数" : "V1 → V2 Passed Trials"}</th>
          <th>Pass@1 (V1→V2)</th>
          <th>${z ? "Pass^3 三次全过 (V1→V2)" : "Pass^3 3/3 Stable (V1→V2)"}</th>
          <th>${z ? "中位耗时 (V1→V2)" : "Med Duration (V1→V2)"}</th>
          <th>${z ? "中位工具数 (V1→V2)" : "Med Tool Calls (V1→V2)"}</th>
          <th>${z ? "得分 (V1→V2)" : "Score (V1→V2)"}</th>
        </tr></thead>
        <tbody>
          ${rows.map(r => {
            const p1 = inLimit ? r.v1.passAt1InLimit : r.v1.passAt1;
            const p2 = inLimit ? r.v2.passAt1InLimit : r.v2.passAt1;
            const s1 = inLimit ? r.v1.passPow3InLimit : r.v1.passPow3;
            const s2 = inLimit ? r.v2.passPow3InLimit : r.v2.passPow3;
            const selected = state.selectedDimKey === `${state.dimMode}:${r.key}` ? "selected" : "";
            return `
              <tr class="dim-row ${selected}" data-key="${esc(r.key)}">
                <td><strong>${esc(trMap("dimLabels", r.label))}</strong><div class="kpi-sub">${r.questionIds.join(", ")}</div></td>
                <td class="num">${r.questionCount}</td>
                <td class="num">${r.v1.passedTrials}/${r.v1.totalTrials} → <b>${r.v2.passedTrials}/${r.v2.totalTrials}</b></td>
                <td class="num">${pct(p1)} → <b class="pos">${pct(p2)}</b></td>
                <td class="num">${pct(s1)} → <b class="${s2 >= 0.99 ? "pos" : "warn-text"}">${pct(s2)}</b></td>
                <td class="num">${r.v1.medianDurationMin.toFixed(1)}m → ${r.v2.medianDurationMin.toFixed(1)}m</td>
                <td class="num">${r.v1.medianToolCalls} → ${r.v2.medianToolCalls}</td>
                <td class="num">${r.v1.totalScore.toFixed(2)} → <b>${r.v2.totalScore.toFixed(2)}</b></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
    const wrap = document.getElementById("dimTableWrap");
    wrap.innerHTML = head;
    wrap.querySelectorAll(".dim-row").forEach(tr => {
      tr.addEventListener("click", () => {
        const tag = `${state.dimMode}:${tr.dataset.key}`;
        state.selectedDimKey = state.selectedDimKey === tag ? null : tag;
        renderDimensionTable();
        renderQuestionTable();
      });
    });
  }

  function renderStackedChart() {
    const z = isZh();
    const qs = DATA.questions;
    const mode = state.chartMode;
    const W = 1120, H = 310, L = 58, R = 1095, T = 56, B = 266;
    const stepX = (R - L) / qs.length;
    const barW = 19;

    const titleMap = z ? {
      "score-contrib": ["逐题单题得分对比（Pass@1 与 Pass@3 构成）", "单题按难度权重赋分（L1=1, L2=2, L3=3）：深色为首过率 Pass@1 (70%) 贡献，浅色为三次覆盖率 Pass@3 (30%) 贡献；悬停查看 3 次运行详情。"],
      "trial-score": ["逐题 3 次运行得分堆叠（T1 + T2 + T3）", "按第 1 / 2 / 3 次运行自下而上堆叠单次得分，悬停查看每次耗时、步数与效率系数。"],
      "duration-trials": ["逐题 3 次运行耗时堆叠（T1 + T2 + T3，分钟）", "按第 1 / 2 / 3 次运行自下而上堆叠耗时（分钟），悬停查看单次耗时与是否超过 45 分钟参考线。"],
      "tokens-stack": ["逐题 3 次运行输出 Token 堆叠（T1 + T2 + T3）", "按第 1 / 2 / 3 次运行自下而上堆叠输出 Token（单位 k），悬停查看每次具体输出量与耗时。"],
    } : {
      "score-contrib": ["Per-Task Score Breakdown (Pass@1 vs Pass@3 Contribution)", "Weighted by difficulty (L1=1, L2=2, L3=3): dark segment = Pass@1 (70%) contribution, light segment = Pass@3 (30%) contribution; hover for 3-trial breakdown."],
      "trial-score": ["Per-Task 3-Trial Score Stack (T1 + T2 + T3)", "Stacks Trial 1 / 2 / 3 scores bottom-to-top; hover any segment to inspect duration, step count and time factor."],
      "duration-trials": ["Per-Task 3-Trial Duration Stack (T1 + T2 + T3, Minutes)", "Stacks Trial 1 / 2 / 3 session durations bottom-to-top; hover to inspect individual trial duration and >45m status."],
      "tokens-stack": ["Per-Task 3-Trial Output Token Stack (T1 + T2 + T3)", "Stacks Trial 1 / 2 / 3 output tokens (k) bottom-to-top; hover any segment to inspect per-trial tokens and duration."],
    };
    document.getElementById("stackedTitle").textContent = titleMap[mode][0];
    document.getElementById("stackedDesc").textContent = titleMap[mode][1];
    const stackNote = document.getElementById("stackNote");
    if (stackNote) stackNote.hidden = !(mode === "tokens-stack" || mode === "duration-trials");

    const legendEl = document.getElementById("stackedLegend");
    if (mode === "score-contrib") {
      legendEl.innerHTML = z ? `
        <span class="legend-item"><span class="swatch" style="background:var(--v1)"></span>V1 Pass@1 贡献 (70%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v1-soft)"></span>V1 Pass@3 贡献 (30%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v2)"></span>V2 Pass@1 贡献 (70%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v2-soft)"></span>V2 Pass@3 贡献 (30%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--warn)"></span>含 >45m 长耗时试次</span>
      ` : `
        <span class="legend-item"><span class="swatch" style="background:var(--v1)"></span>V1 Pass@1 (70%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v1-soft)"></span>V1 Pass@3 (30%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v2)"></span>V2 Pass@1 (70%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v2-soft)"></span>V2 Pass@3 (30%)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--warn)"></span>Has >45m Long Run</span>
      `;
    } else {
      legendEl.innerHTML = z ? `
        <span class="legend-item"><span class="swatch" style="background:var(--v1)"></span>V1 Trial 1/2/3（逐段叠加）</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v2)"></span>V2 Trial 1/2/3（逐段叠加）</span>
        <span class="legend-item"><span class="swatch" style="background:var(--warn)"></span>含 >45m 长耗时试次</span>
      ` : `
        <span class="legend-item"><span class="swatch" style="background:var(--v1)"></span>V1 Trial 1/2/3 (Stacked)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--v2)"></span>V2 Trial 1/2/3 (Stacked)</span>
        <span class="legend-item"><span class="swatch" style="background:var(--warn)"></span>Has >45m Long Run</span>
      `;
    }

    let maxVal = 1;
    if (mode === "score-contrib" || mode === "trial-score") {
      maxVal = Math.max(...qs.flatMap(q => [q.v1.score, q.v2.score]));
    } else if (mode === "duration-trials") {
      maxVal = Math.max(...qs.flatMap(q => [
        q.v1.trials.reduce((s, t) => s + t.durationMin, 0),
        q.v2.trials.reduce((s, t) => s + t.durationMin, 0),
      ]));
    } else {
      maxVal = Math.max(...qs.flatMap(q => [q.v1.tokens.output, q.v2.tokens.output])) / 1000;
    }

    const ticks = 4;
    let svg = `<g class="chart-grid">`;
    for (let i = 0; i <= ticks; i++) {
      const val = (maxVal * i) / ticks;
      const y = B - ((B - T) * i) / ticks;
      const lbl = mode === "tokens-stack" ? `${Math.round(val)}k` : mode === "duration-trials" ? `${val.toFixed(0)}m` : val.toFixed(1);
      svg += `<line x1="${L}" y1="${y.toFixed(1)}" x2="${R}" y2="${y.toFixed(1)}"/><text x="${L - 8}" y="${y + 4}" text-anchor="end">${lbl}</text>`;
    }
    svg += `</g>`;

    const trialShadesV1 = ["#445b7d", "#5c79a4", "#829ec7"];
    const trialShadesV2 = ["#0c6148", "#168a67", "#48bc97"];

    qs.forEach((q, idx) => {
      const cx = L + stepX * (idx + 0.5);
      const drawPair = [
        { ver: "v1", x: cx - barW - 2, colors: ["var(--v1)", "var(--v1-soft)"], shades: trialShadesV1 },
        { ver: "v2", x: cx + 2, colors: ["var(--v2)", "var(--v2-soft)"], shades: trialShadesV2 },
      ];
      const pairTops = [];

      drawPair.forEach(p => {
        const qv = q[p.ver];
        const late = qv.trials.filter(t => t.timedOut);
        let topY = B;

        if (mode === "score-contrib") {
          const h1 = (qv.scorePassAt1Part / maxVal) * (B - T);
          const h2 = (qv.scorePassAt3Part / maxVal) * (B - T);
          topY = B - h1 - h2;
          svg += `<rect class="interactive-bar stack-seg" data-qid="${q.id}" data-ver="${p.ver}" data-seg="${z ? "Pass@1 贡献 (70%)" : "Pass@1 (70%)"}" data-segval="${qv.scorePassAt1Part.toFixed(3)}" x="${p.x}" y="${(B - h1).toFixed(2)}" width="${barW}" height="${Math.max(h1, 0).toFixed(2)}" rx="0" fill="${p.colors[0]}"/>`;
          svg += `<rect class="interactive-bar stack-seg" data-qid="${q.id}" data-ver="${p.ver}" data-seg="${z ? "Pass@3 贡献 (30%)" : "Pass@3 (30%)"}" data-segval="${qv.scorePassAt3Part.toFixed(3)}" x="${p.x}" y="${topY.toFixed(2)}" width="${barW}" height="${Math.max(h2, 0).toFixed(2)}" rx="0" fill="${p.colors[1]}"/>`;
          if (qv.score > 0.05) {
            svg += `<text x="${p.x + barW / 2}" y="${(topY - 5).toFixed(1)}" text-anchor="middle" style="font-size:10px;font-weight:650">${qv.score.toFixed(2)}</text>`;
            topY -= 16;
          }
        } else if (mode === "trial-score") {
          let curY = B;
          qv.trials.forEach((t, ti) => {
            const h = (t.score / maxVal) * (B - T);
            if (h > 0) {
              curY -= h;
              svg += `<rect class="interactive-bar stack-seg" data-qid="${q.id}" data-ver="${p.ver}" data-trial="${t.trial}" data-seg="Trial ${t.trial}" data-segval="${t.score.toFixed(3)}" x="${p.x}" y="${curY.toFixed(2)}" width="${barW}" height="${h.toFixed(2)}" rx="0" fill="${p.shades[ti]}" stroke="var(--surface)" stroke-width="0.7"/>`;
            }
          });
          topY = curY;
        } else if (mode === "duration-trials") {
          let curY = B;
          qv.trials.forEach((t, ti) => {
            const h = (t.durationMin / maxVal) * (B - T);
            if (h > 0) {
              curY -= h;
              svg += `<rect class="interactive-bar stack-seg" data-qid="${q.id}" data-ver="${p.ver}" data-trial="${t.trial}" data-seg="${z ? `Trial ${t.trial} 耗时` : `Trial ${t.trial} Duration`}" data-segval="${t.durationMin.toFixed(2)}m" x="${p.x}" y="${curY.toFixed(2)}" width="${barW}" height="${Math.max(h, 1.5).toFixed(2)}" rx="0" fill="${p.shades[ti]}" stroke="var(--surface)" stroke-width="0.7"/>`;
            }
          });
          topY = curY;
        } else {
          let curY = B;
          qv.trials.forEach((t, ti) => {
            const valK = t.tokens.output / 1000;
            const h = (valK / maxVal) * (B - T);
            if (h > 0) {
              curY -= h;
              svg += `<rect class="interactive-bar stack-seg" data-qid="${q.id}" data-ver="${p.ver}" data-trial="${t.trial}" data-seg="${z ? `Trial ${t.trial} 输出` : `Trial ${t.trial} Output`}" data-segval="${fmtInt(t.tokens.output)}" x="${p.x}" y="${curY.toFixed(2)}" width="${barW}" height="${Math.max(h, 1.5).toFixed(2)}" rx="0" fill="${p.shades[ti]}" stroke="var(--surface)" stroke-width="0.7"/>`;
            }
          });
          topY = curY;
        }

        pairTops.push(late.length ? topY - 18 : topY);
        if (late.length) {
          const warnY = Math.min(topY - 7, B - 12);
          svg += `<rect x="${p.x + barW / 2 - 14}" y="${(warnY - 11).toFixed(1)}" width="28" height="14" fill="var(--warn-bg)" stroke="var(--warn)" stroke-width="0.8"/>`;
          svg += `<text x="${p.x + barW / 2}" y="${(warnY - 1).toFixed(1)}" text-anchor="middle" style="fill:var(--warn);font-size:9.5px;font-weight:700">&gt;45m</text>`;
        }
      });

      const note = (mode === "tokens-stack" || mode === "duration-trials") && eb().annotations && eb().annotations[q.id];
      if (note) {
        const label = z ? note.zh : note.en;
        const minTop = Math.min(...pairTops);
        const ny = Math.max(14, minTop - 12);
        const isLast = idx === qs.length - 1;
        const ax = isLast ? cx + barW + 2 : cx;
        svg += `<line x1="${cx}" y1="${(ny + 3).toFixed(1)}" x2="${cx}" y2="${(minTop - 2).toFixed(1)}" stroke="var(--line2)" stroke-dasharray="2 2"/>`;
        svg += `<text class="bar-note" x="${ax}" y="${ny.toFixed(1)}" text-anchor="${isLast ? "end" : "middle"}">${esc(label)}</text>`;
      }

      svg += `<text class="q-axis-lbl" data-qid="${q.id}" x="${cx}" y="${B + 19}" text-anchor="middle" style="font-weight:700;cursor:pointer;fill:var(--text-secondary)">${q.id}</text>`;
      svg += `<text x="${cx}" y="${B + 34}" text-anchor="middle" style="font-size:10px;fill:var(--muted)">V=${q.weight}</text>`;
    });

    const wrap = document.getElementById("stackedChartWrap");
    wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="min-width:860px">${svg}</svg>`;

    const jumpToQuestion = (qid) => {
      state.expandedIds.add(qid);
      renderQuestionTable();
      const row = document.getElementById(`qrow-${qid}`);
      if (row) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });
        row.classList.remove("flash");
        void row.offsetWidth;
        row.classList.add("flash");
      }
    };

    wrap.querySelectorAll(".stack-seg").forEach(el => {
      el.addEventListener("mousemove", (ev) => {
        const z = isZh();
        const q = qs.find(x => x.id === el.dataset.qid);
        const ver = el.dataset.ver;
        const qv = q[ver];
        const segTitle = el.dataset.seg;
        const segVal = el.dataset.segval;
        const trialsHtml = qv.trials.map(t => {
          const badge = t.timedOut ? (z ? ">45m 跑通" : "Passed >45m") : (t.passed ? (z ? "通过" : "Pass") : BUCKET_META[t.bucket].label);
          return `<div class="tt-trial-row"><span>Trial ${t.trial} (${badge})</span><span class="num">${t.durationMin.toFixed(2)}m · ${t.steps}${z ? "步" : "st"} · ${fmtInt(t.tokens.output)} tok · <b>${t.score.toFixed(2)}${z ? "分" : "pt"}</b></span></div>`;
        }).join("");

        showTooltip(ev, `
          <div class="tt-head"><span>${q.id} · ${esc(trTitle(q))}</span><span class="pill">${ver.toUpperCase()}</span></div>
          <div style="color:var(--muted);margin-bottom:6px">${esc(trMap("categories", q.category))} · ${esc(trMap("tiers", q.tier))} · ${z ? "权重" : "Weight"} V=${q.weight}</div>
          <div class="tt-grid">
            <span class="tt-k">${z ? "当前分段" : "Segment"} (${esc(segTitle)})</span><span class="tt-v">${esc(segVal)}</span>
            <span class="tt-k">${z ? "本柱总得分 / 通过" : "Total Score / Passed"}</span><span class="tt-v">${qv.score.toFixed(3)} ${z ? "分" : "pt"} (${qv.passed}/3)</span>
            <span class="tt-k">Pass@1 / Pass^3</span><span class="tt-v">${pct(qv.passAtK[0])} / ${pct(qv.passPowK[2])}</span>
            <span class="tt-k">${z ? "平均耗时 / 输出Token" : "Avg Duration / Out Tok"}</span><span class="tt-v">${qv.avgDurationMin.toFixed(2)}m / ${fmtInt(qv.tokens.output)}</span>
          </div>
          <div class="tt-sep"></div>
          <div class="tt-trials">${trialsHtml}</div>
          <div style="color:var(--accent);font-size:11px;margin-top:6px">${z ? "点击柱体定位并展开下方该题明细" : "Click bar to jump to & expand task details below"}</div>
        `);
      });
      el.addEventListener("mouseleave", hideTooltip);
      el.addEventListener("click", () => jumpToQuestion(el.dataset.qid));
    });
    wrap.querySelectorAll(".q-axis-lbl").forEach(el => {
      el.addEventListener("click", () => jumpToQuestion(el.dataset.qid));
    });
  }

  function getFilteredAndSortedQuestions() {
    let list = DATA.questions.slice();
    if (state.catFilter !== "ALL") list = list.filter(q => q.category === state.catFilter);
    if (state.selectedDimKey) {
      const [field, val] = state.selectedDimKey.split(":");
      list = list.filter(q => String(q[field]) === val);
    }
    if (state.statusBucketFilter) {
      list = list.filter(q => [...q.v1.trials, ...q.v2.trials].some(t => t.bucket === state.statusBucketFilter));
    }
    if (state.quickFilter === "improved") list = list.filter(q => q.deltaPassed > 0 || q.deltaScore > 0.3);
    else if (state.quickFilter === "notfull") list = list.filter(q => q.v2.passed < 3);
    else if (state.quickFilter === "timeout") list = list.filter(q => [...q.v1.trials, ...q.v2.trials].some(t => t.timedOut));
    else if (state.quickFilter === "ai") list = list.filter(q => q.aiNode);

    if (state.search.trim()) {
      const kw = state.search.trim().toLowerCase();
      list = list.filter(q =>
        q.id.toLowerCase().includes(kw) ||
        q.title.toLowerCase().includes(kw) ||
        trTitle(q).toLowerCase().includes(kw) ||
        q.category.toLowerCase().includes(kw) ||
        trMap("categories", q.category).toLowerCase().includes(kw) ||
        q.v2.trials.some(t => t.review.toLowerCase().includes(kw) || trMap("reviews", t.review).toLowerCase().includes(kw))
      );
    }

    const dir = state.sortDir === "asc" ? 1 : -1;
    const keyFn = {
      id: q => q.id,
      v1Passed: q => q.v1.passed,
      v2Passed: q => q.v2.passed,
      delta: q => q.deltaPassed,
      v2PassPow3: q => q.v2.passPowK[2],
      v2Dur: q => q.v2.avgDurationMin,
      v2Steps: q => q.v2.medianTools,
      v2OutTok: q => q.v2.tokens.output,
      v2Score: q => q.v2.score,
    }[state.sortKey] || (q => q.id);

    list.sort((a, b) => {
      const va = keyFn(a), vb = keyFn(b);
      if (typeof va === "string") return va.localeCompare(vb) * dir;
      return (va - vb) * dir;
    });
    return list;
  }

  function renderDots(trials, isV1) {
    const z = isZh();
    return `<span class="trial-dots">${trials.map(t => {
      let cls = BUCKET_META[t.bucket].dot;
      if (isV1 && t.bucket === "passed_in_limit") cls = "v1pass";
      const title = `T${t.trial}: ${BUCKET_META[t.bucket].label} · ${t.durationMin.toFixed(2)}m · ${t.steps}${z ? "步" : " steps"} · ${t.toolCalls}${z ? "工具" : " tools"}`;
      return `<span class="tdot ${cls}" title="${esc(title)}"></span>`;
    }).join("")}</span>`;
  }

  function renderTrialCard(t, ver) {
    const z = isZh();
    const meta = BUCKET_META[t.bucket];
    const pillCls = t.bucket === "passed_in_limit" ? "ok" : t.bucket === "passed_timeout" ? "warn" : "bad";
    const toolsText = Object.entries(t.topTools || {}).slice(0, 4).map(([k, v]) => `${k}×${v}`).join(" · ");
    return `
      <div class="trial-card">
        <div class="trial-card-head">
          <span>Trial ${t.trial} <span class="pill ${pillCls}">${esc(meta.label)}</span></span>
          <span class="num">${t.durationMin.toFixed(2)}m · ${z ? "系数" : "Factor"} ${(t.timeFactor * 100).toFixed(0)}% · <b>${t.score.toFixed(3)} ${z ? "分" : "pt"}</b></span>
        </div>
        <div class="trial-card-metrics num">
          <span>${z ? "轮次" : "Steps"} ${t.steps}</span>
          <span>${z ? `工具调用 ${t.toolCalls}（报错 ${t.toolErrors}）` : `Tools ${t.toolCalls} (err ${t.toolErrors})`}</span>
          <span>Out ${fmtInt(t.tokens.output)}</span>
          <span>Cache ${(t.tokens.cacheRead / 1e6).toFixed(2)}M (${pct(t.cacheHitRate)})</span>
          ${toolsText ? `<span>Top: ${esc(toolsText)}</span>` : ""}
        </div>
        <div class="trial-card-review">${esc(trMap("reviews", t.review))}</div>
      </div>
    `;
  }

  function renderQuestionTable() {
    const z = isZh();
    const list = getFilteredAndSortedQuestions();
    document.getElementById("tableCountHint").textContent = z ? `显示 ${list.length} / ${DATA.questions.length} 题` : `Showing ${list.length} / ${DATA.questions.length} tasks`;
    const tbody = document.getElementById("questionTbody");

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:28px;color:var(--muted)">${z ? "没有匹配筛选条件的题目，请点击「重置筛选」。" : "No tasks match the current filters. Click \"Reset Filters\"."}</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(q => {
      const isOpen = state.expandedIds.has(q.id);
      const inLimit = state.scope === "inlimit";
      const v1Cnt = inLimit ? q.v1.passedInLimit : q.v1.passed;
      const v2Cnt = inLimit ? q.v2.passedInLimit : q.v2.passed;
      const dPassed = v2Cnt - v1Cnt;
      const hasTimeout = q.v2.trials.some(t => t.timedOut);
      const tierCode = q.tier.slice(0, 2);
      const tierCls = tierCode.toLowerCase();
      const mainRow = `
        <tr class="q-row ${isOpen ? "open" : ""}" id="qrow-${q.id}" data-toggle="${q.id}" tabindex="0">
          <td class="q-id-cell"><span class="q-caret">${isOpen ? "▾" : "▸"}</span><span class="q-id-badge mono">${q.id}</span></td>
          <td>
            <div class="q-title-wrap">
              <div class="q-title-line">
                <span class="q-title-text" title="${esc(trTitle(q))}">${esc(trTitle(q))}</span>
                ${q.weight > 1 ? `<span class="q-flag warn" title="${z ? `权重 V=${q.weight}` : `Weight V=${q.weight}`}">×${q.weight}</span>` : ""}
                ${q.aiNode ? `<span class="q-flag ai" title="${z ? "AI 节点" : "AI Node"}">AI</span>` : ""}
                ${hasTimeout ? `<span class="q-flag warn" title="${z ? "含 >45m 长耗时试次" : "Has >45m long run"}">⏱</span>` : ""}
              </div>
              <div class="q-meta-line"><span class="q-tier ${tierCls}">${tierCode}</span><span>${esc(trMap("categories", q.category))}</span></div>
            </div>
          </td>
          <td class="num">${renderDots(q.v1.trials, true)}<span class="q-arrow">→</span>${renderDots(q.v2.trials, false)}<b style="margin-left:6px">${v2Cnt}/3</b><span class="q-delta ${dPassed > 0 ? "pos" : (dPassed < 0 ? "neg" : "zero")}">${dPassed > 0 ? "+" + dPassed : (dPassed < 0 ? dPassed : "±0")}</span></td>
          <td class="num r">${metricCell(`${q.v2.avgDurationMin.toFixed(1)}m`, q.v2.avgDurationMin - q.v1.avgDurationMin, v => `${v.toFixed(1)}m`, true, 0.05)}</td>
          <td class="num r">${metricCell(fmtK(q.v2.tokens.output), q.v2.tokens.output - q.v1.tokens.output, fmtK, true, 500)}</td>
          <td class="num r">${metricCell(q.v2.score.toFixed(2), q.v2.score - q.v1.score, v => v.toFixed(2), false, 0.005)}</td>
        </tr>
      `;
      if (!isOpen) return mainRow;
      const drawer = `
        <tr class="drawer-row">
          <td colspan="6">
            <div class="drawer-inner">
              <div class="drawer-meta"><span>${z ? "模式" : "Mode"}: ${esc(trMap("modes", q.mode))}</span><span>${z ? "中位工具" : "Median tools"}: ${q.v1.medianTools} → <b>${q.v2.medianTools}</b></span><span>${z ? "中位轮次" : "Median steps"}: ${q.v1.medianSteps} → <b>${q.v2.medianSteps}</b></span><span>V2 Pass^3: ${pct(q.v2.passPowK[2])}</span></div>
              <div class="drawer-cols">
                <div class="ver-box">
                  <h4><span>${z ? "V1 基线 · 3 次运行轨迹" : "V1 Baseline · 3 Trials"}</span><span class="num">${q.v1.passed}/3 · Pass^3 ${pct(q.v1.passPowK[2])} · ${q.v1.score.toFixed(3)} ${z ? "分" : "pt"}</span></h4>
                  ${q.v1.trials.map(t => renderTrialCard(t, "v1")).join("")}
                </div>
                <div class="ver-box">
                  <h4><span>${z ? "V2 当前 · 3 次运行轨迹" : "V2 Current · 3 Trials"}</span><span class="num pos">${q.v2.passed}/3 · Pass^3 ${pct(q.v2.passPowK[2])} · ${q.v2.score.toFixed(3)} ${z ? "分" : "pt"}</span></h4>
                  ${q.v2.trials.map(t => renderTrialCard(t, "v2")).join("")}
                </div>
              </div>
              <details class="prompt-box">
                <summary style="cursor:pointer;font-weight:650;color:var(--accent)">${z ? "查看冻结题面原文" : "View Frozen Task Prompt (ZH)"}</summary>
                <pre>${esc(q.prompt)}</pre>
              </details>
            </div>
          </td>
        </tr>
      `;
      return mainRow + drawer;
    }).join("");

    const toggleRow = (id) => {
      if (state.expandedIds.has(id)) state.expandedIds.delete(id);
      else state.expandedIds.add(id);
      renderQuestionTable();
    };
    tbody.querySelectorAll("[data-toggle]").forEach(row => {
      row.addEventListener("click", () => toggleRow(row.dataset.toggle));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleRow(row.dataset.toggle);
        }
      });
    });
  }

  // Bind UI controls
  document.querySelectorAll("#scopeToggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.scope = btn.dataset.scope;
      document.querySelectorAll("#scopeToggle button").forEach(b => b.classList.toggle("active", b === btn));
      renderHeroAndKPI();
      renderReliabilityChart();
      renderDimensionTable();
      renderQuestionTable();
    });
  });

  document.querySelectorAll("#curveModeToggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.curveMode = btn.dataset.cmode;
      document.querySelectorAll("#curveModeToggle button").forEach(b => b.classList.toggle("active", b === btn));
      renderReliabilityChart();
    });
  });

  document.querySelectorAll("#dimToggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.dimMode = btn.dataset.dim;
      document.querySelectorAll("#dimToggle button").forEach(b => b.classList.toggle("active", b === btn));
      renderDimensionTable();
    });
  });

  document.querySelectorAll("#scatterXToggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.scatterX = btn.dataset.sx;
      document.querySelectorAll("#scatterXToggle button").forEach(b => b.classList.toggle("active", b === btn));
      renderAAScatter();
    });
  });

  document.querySelectorAll("#aaBarToggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.barMetric = btn.dataset.bm;
      document.querySelectorAll("#aaBarToggle button").forEach(b => b.classList.toggle("active", b === btn));
      renderAABarChart();
    });
  });

  document.querySelectorAll("#chartModeToggle button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.chartMode = btn.dataset.mode;
      document.querySelectorAll("#chartModeToggle button").forEach(b => b.classList.toggle("active", b === btn));
      renderStackedChart();
    });
  });

  const catSelect = document.getElementById("catSelect");
  const uniqueCats = [...new Set(DATA.questions.map(q => q.category))];
  function syncCatOptions() {
    const prev = catSelect.value || "ALL";
    const allLabel = isZh() ? "全部题型" : "All Categories";
    catSelect.innerHTML = `<option value="ALL">${esc(allLabel)}</option>` + uniqueCats.map(c => `<option value="${esc(c)}">${esc(trMap("categories", c))}</option>`).join("");
    catSelect.value = prev;
  }
  syncCatOptions();
  catSelect.addEventListener("change", () => { state.catFilter = catSelect.value; renderQuestionTable(); });
  document.getElementById("searchInput").addEventListener("input", (e) => { state.search = e.target.value; renderQuestionTable(); });
  document.querySelectorAll("#quickChips .chip").forEach(c => {
    c.addEventListener("click", () => {
      state.quickFilter = c.dataset.qfilter;
      document.querySelectorAll("#quickChips .chip").forEach(x => x.classList.toggle("active", x === c));
      renderQuestionTable();
    });
  });
  document.getElementById("resetFilterBtn").addEventListener("click", () => {
    state.selectedDimKey = null;
    state.statusBucketFilter = null;
    state.quickFilter = "all";
    state.catFilter = "ALL";
    state.search = "";
    document.getElementById("searchInput").value = "";
    catSelect.value = "ALL";
    document.querySelectorAll("#quickChips .chip").forEach(x => x.classList.toggle("active", x.dataset.qfilter === "all"));
    renderDimensionTable();
    renderStatusAndProcess();
    renderQuestionTable();
  });

  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.sort;
      if (state.sortKey === k) state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      else { state.sortKey = k; state.sortDir = k === "id" ? "asc" : "desc"; }
      document.querySelectorAll(".sort-btn").forEach(b => {
        b.classList.toggle("active", b === btn);
        const dirEl = b.querySelector(".sort-dir");
        if (dirEl) dirEl.textContent = b === btn ? (state.sortDir === "asc" ? "▲" : "▼") : "";
      });
      renderQuestionTable();
    });
  });

  function renderAll() {
    syncCatOptions();
    renderHeroAndKPI();
    renderAAScatter();
    renderAABarChart();
    renderReliabilityChart();
    renderStatusAndProcess();
    renderDimensionTable();
    renderStackedChart();
    renderQuestionTable();
  }
  window.refreshEvalPanelLang = renderAll;
  renderAll();
};
