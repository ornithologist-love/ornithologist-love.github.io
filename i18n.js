// 全站中英文文案配置（修改本文件后，直接刷新浏览器即可生效）
window.I18N = {
  meta: {
    title: {
      en: 'Heron — Agent Harness & Engine Tooling',
      zh: 'Heron — Agent Harness 与引擎工具链',
    },
  },

  nav: {
    tabOverview:  { en: 'Overview',       zh: '作品总览' },
    tabBenchmark: { en: 'Eval Benchmark', zh: '评测基准' },
    runtime:   { en: 'Runtime',   zh: '自动化' },
    platform:  { en: 'Platform',  zh: '效能平台' },
    engine:    { en: 'Engine',    zh: '引擎' },
    changelog: { en: 'Changelog', zh: '更新日志' },
    faq:       { en: 'FAQ',       zh: 'FAQ' },
    langBtn:   { en: '中文',       zh: 'EN' },
    contact:   { en: 'Get in touch', zh: '联系我' },
  },

  hero: {
    titleHtml: {
      en: 'The toolmaker for <em>agents and engines.</em>',
      zh: '构建 Agent<br /><em>与引擎工具链</em>',
    },
    subtitleHtml: {
      en: '<b>Agent harnesses</b>, durable graph orchestration, engine build platforms and real-time game UI. Deterministic by design, measured in production.',
      zh: '专注 <b>Agent Harness</b>、持久化图编排、引擎研发效能平台与实时游戏 UI。以确定性架构为底座，以生产环境实测为准绳。',
    },
    newBadge: { en: 'New', zh: '新' },
    newLink:  { en: 'Heron Console, live in your browser →', zh: 'Heron 控制台，浏览器内直接试用 →' },
    ctaLive:  { en: 'Try it live', zh: '在线体验' },
    ctaHire:  { en: 'Hire me',     zh: '取得联系' },
    openFull: { en: 'Open full screen ↗', zh: '全屏打开 ↗' },
  },

  scenes: {
    review: {
      tab:  { en: 'Review gate', zh: '人工审阅' },
      note: {
        en: "An agent's PR review is parked at a durable HumanReview checkpoint. Approve it right here, and watch it resume from the same superstep.",
        zh: 'Agent 的 PR 评审停留在持久化 HumanReview 检查点；点击批准，流程即从当前超步恢复执行。',
      },
    },
    build: {
      tab:  { en: 'Live build', zh: '跨机构建' },
      note: {
        en: 'A cross-machine build in flight: Windows and Linux subgraphs are dispatched to different runners and report back in real time.',
        zh: '跨机联合构建：Windows 与 Linux 子图分别派发至不同执行机，实时回传状态与日志。',
      },
    },
    recovery: {
      tab:  { en: 'Failure & recovery', zh: '失败恢复' },
      note: {
        en: 'A failure pinned to one node: dependants are skipped, Recovery runs, and Finally always releases resources.',
        zh: '故障精确定位至单节点：下游依赖自动跳过，触发 Recovery 恢复，并由 Finally 统一释放资源。',
      },
    },
    launch: {
      tab:  { en: 'Launch', zh: '发起运行' },
      note: {
        en: 'Typed launch: the runner publishes a form, validates parameters and previews the plan before anything runs.',
        zh: '强类型启动：按目标机器生成参数表单并完成校验，在执行前预览完整流程拓扑。',
      },
    },
    fleet: {
      tab:  { en: 'Fleet', zh: '执行机' },
      note: {
        en: 'The fleet: runners connect outbound, advertise capabilities, and lease work from the control plane.',
        zh: '执行机集群：节点主动外连控制面并上报环境能力，基于租约拉取派发任务。',
      },
    },
  },

  tracks: {
    careerLabel: { en: 'Career', zh: '职业' },
    zjut:    { en: 'BEng, Software Engineering', zh: '软件工程 · 学士' },
    leeds:   { en: 'MSc, High-Performance Graphics & Games Eng.', zh: '高性能图形与游戏工程 · 硕士' },
    booming: { en: 'Chaos Engine · Owner of UI, Editor & Asset Frameworks', zh: '自研引擎 Chaos · UI / 编辑器 / 资产框架负责人' },
    nowTime: { en: '2026.03 — now', zh: '2026.03 — 至今' },
    tencent: { en: 'TiMi J3 · Engine efficiency, Agent Harness', zh: '天美 J3 · 引擎效能、Agent Harness' },

    stackLabel: { en: 'Stack', zh: '技术栈' },
    stackFlow:  { en: 'engine → platform → agents', zh: '引擎 → 平台 → Agent' },
    colEngine:  { en: 'Engine & graphics', zh: '引擎与图形' },
    colDevops:  { en: 'Build & DevOps',    zh: '构建与效能' },
    colRuntime: { en: 'Runtime & services', zh: '运行时与服务' },
    colAgents:  { en: 'Agents',            zh: 'Agent' },
  },

  statement: {
    bodyHtml: {
      en: '<b>An engineer for the agent era.</b>Three years of shipping tools across game engines, build farms and agent harnesses, with performance budgets, deterministic state and benchmarks at the core.',
      zh: '<b>以引擎级工程标准，构建 Agent 与研发工具链</b>通过研发工具链实践，从自研游戏引擎、构建集群演进至 Agent Harness 与自动化底座，围绕性能预算、确定性状态与量化评测构建系统。',
    },
    fig1Title: { en: 'Performance budgets', zh: '性能预算' },
    fig1Body:  {
      en: 'Slow tools get abandoned. Every project starts with a profiler, not a rewrite.',
      zh: '迟缓的工具终将被弃用。任何优化均以 Profiler 实测数据为起点，而非盲目重写。',
    },
    fig2Title: { en: 'Deterministic state', zh: '确定性状态' },
    fig2Body:  {
      en: 'Editors and long-running agents fail the same way: untracked state. Persist first, commit atomically, resume anywhere.',
      zh: '复杂编辑器与长程 Agent 面临相同的核心问题：状态失控。坚持结果先落盘、经屏障原子提交，确保任意节点均可恢复。',
    },
    fig3Title: { en: 'Measured agents', zh: '量化评测' },
    fig3Body:  {
      en: 'No agent capability ships without a benchmark: pass rate, token cost and latency on real tasks.',
      zh: '每项 Agent 能力上线前均需通过基准评测：在真实任务上持续追踪通过率、Token 成本与端到端耗时。',
    },
  },

  runtime: {
    title: { en: 'Automation, defined in typed code.', zh: '以强类型代码定义自动化' },
    desc:  {
      en: 'A LangGraph-style durable graph engine on .NET 8. Write a flow in a restricted C# DSL, verify it locally in seconds, and run it deterministically on a multi-tenant cloud.',
      zh: '基于 .NET 8 的持久化图执行引擎。以边界明确的强类型 C# DSL 编排流程，支持本地秒级验证与云端多租户确定性执行。',
    },
    viewSource: { en: 'View source →', zh: '查看源码 →' },
    l1Title: { en: 'Durable supersteps',  zh: '持久化超步' },
    l1Body:  {
      en: 'Superstep + Channel + atomic Barrier; outcomes persist before commit; graph fingerprints guard resumes.',
      zh: 'Superstep + Channel + Barrier 原子提交；Outcome 先落盘，恢复时严格核对图指纹。',
    },
    l2Title: { en: 'Human in the loop', zh: '人工介入（Human-in-the-loop）' },
    l2Body:  {
      en: 'HumanReview interrupts park a run; the process can exit and resume later from the same step.',
      zh: '遇到审批节点自动落盘挂起，哪怕进程退出重启，也能在审批后从原节点无缝接续。',
    },
    l3Title: { en: 'Concurrency control', zh: '跨进程并发控制' },
    l3Body:  {
      en: 'Cross-process mutex limits, plus static and bounded dynamic fan-out.',
      zh: '支持跨进程资源互斥锁，以及固定分支与按集合动态展开。',
    },
    l4Title: { en: 'Cloud, multi-tenant', zh: '云端多租户调度' },
    l4Body:  {
      en: 'Remote workers, cross-machine subgraphs with lease inheritance, 20 standard MCP tools.',
      zh: '远程执行机、跨机子图派发与租约继承，对外暴露 20 个标准 MCP 工具。',
    },
  },

  codeNotes: {
    review: {
      en: "<b>HumanReview.</b> The node interrupts, the run parks in AwaitingReview, and the process may exit. Hours later it resumes from this exact step with the reviewer's answer.",
      zh: '<b>人工审阅：</b>节点触发中断后运行落盘挂起（AwaitingReview），进程可直接退出；几小时后审阅通过，带着审阅意见从当前节点原样恢复。',
    },
    parallel: {
      en: '<b>Parallel branches.</b> Independent fixed branches run in the same superstep and join at the barrier. A <code>When</code> at the start of a branch gates the whole branch.',
      zh: '<b>并行分支：</b>多条独立分支在同一超步并发执行，并在 Barrier 处同步汇合；分支开头的 <code>When</code> 可按条件整段跳过。',
    },
    map: {
      en: '<b>Dynamic fan-out.</b> One branch per item, keyed so each child run can resume on its own. Results come back ordered by selection.',
      zh: '<b>按集合动态展开：</b>运行时每个条目生成一条独立分支，按稳定 key 绑定检查点以支持单分支恢复，汇合后按原序返回结果列表。',
    },
    mutex: {
      en: '<b>Cross-process locks.</b> Keys come from the typed input, so two flows writing the same output directory never collide, even from different entry points.',
      zh: '<b>跨进程资源锁：</b>互斥键直接从强类型输入提取，哪怕从不同客户端或 CLI 发起，写同一输出目录的流程也会自动排队。',
    },
    finally: {
      en: '<b>Finally.</b> Success, failure, cancellation and early return all enter cleanup. A pending review pauses the run before cleanup, so nothing is torn down while a person is still deciding.',
      zh: '<b>Finally 兜底收尾：</b>无论成功、失败、取消还是提前返回都会进入收尾阶段；而在等待人工审阅期间不会提前触发清理，防止现场被误拆。',
    },
  },

  evals: {
    titleHtml: {
      en: 'Baked-in measurement.<br />Self-improving DSL.',
      zh: '内建基准评测<br />驱动 DSL 持续演进',
    },
    desc: {
      en: 'The DSL was designed for agents, then redesigned by them. Real tasks feed a benchmark; where agents failed, the DSL and Skills changed, twice.',
      zh: 'DSL 面向 Agent 编写场景设计，并依据实测反馈持续收敛：将真实业务任务纳入基准评测，针对高频出错模式先后完成两轮 DSL 与 Skill 迭代。',
    },
    s1Title: { en: 'C# codebase', zh: 'C# 源码' },
    s1Body:  { en: 'Typed DSL and API references exported automatically.', zh: '从源码自动导出强类型 DSL 与 API 签名清单。' },
    s2Title: { en: 'Skill library', zh: 'Skill 参考库' },
    s2Body:  { en: 'What the agent reads before it writes a flow.', zh: '供 Agent 在编写流程前查阅的规范与签名。' },
    s3Title: { en: 'Eval set', zh: '评测集' },
    s3Body:  { en: 'Desensitised production tasks plus LangGraph benchmark cases.', zh: '脱敏真实业务任务 + LangGraph 基准用例。' },
    s4Title: { en: 'Validator & scorer', zh: '校验与评分器' },
    s4Body:  { en: 'In-house, deterministic grading of every run.', zh: '自研确定性判分器，逐次校验编译与运行结果。' },
    loopNote: {
      en: 'Agent feedback drives the next DSL refactor and Skill revision, then the same benchmark runs again.',
      zh: '依据报错分布重构 DSL 与 Skill 文档，再以同一套基准集复测验证。',
    },
    openBenchmark: {
      en: 'Open Full Eval Benchmark & Model Arena →',
      zh: '查看完整基准评测与模型横评 →',
    },
  },

  layers: {
    title: { en: 'Five layers, local-first.', zh: '五层架构，本地优先' },
    desc:  {
      en: 'High-dimensional C# and engine logic narrowed into a small, typed surface: fast to verify on a laptop, deterministic in the cloud.',
      zh: '将复杂的引擎工具与工程逻辑收敛为精简的强类型接口：兼顾本地快速验证与云端确定性调度。',
    },
    l5Title: { en: 'Cloud scheduling & observability', zh: '云端多租户调度与观测' },
    l5Body:  {
      en: 'Tenant service, remote workers, structured event streams, node-level error attribution, artifact verification.',
      zh: '租户控制面、远程执行机、结构化事件流、节点级错误归因与产物校验。',
    },
    l4Body: {
      en: '20 standard MCP tools and a Skill library, so any agent can author and operate flows.',
      zh: '20 个标准 MCP 工具与配套 Skill，使 Agent 能够自主编写、调度并观测自动化流程。',
    },
    l3Title: { en: 'Agent-friendly DSL', zh: '面向 Agent 的强类型 DSL' },
    l3Body:  {
      en: 'A restricted, strongly-typed CodeFirst DSL the compiler can check before anything runs.',
      zh: '边界清晰的 CodeFirst C# DSL，在运行前由编译器完成类型与拓扑校验。',
    },
    l2Title: { en: 'Automation framework', zh: '自动化业务框架' },
    l2Body:  {
      en: 'Templates, typed parameters, run history and the building blocks of real business flows.',
      zh: '提供流程模板、强类型参数表单、运行历史与制品归档等开箱即用的业务底座。',
    },
    l1Title: { en: 'Pregel kernel', zh: 'Pregel 图执行内核' },
    l1Body:  {
      en: 'The BSP execution engine: supersteps, barriers, checkpoints, interrupts and locks.',
      zh: 'BSP 执行引擎：超步推进、Barrier 同步、持久化检查点、中断恢复与资源锁。',
    },
  },

  platform: {
    title: { en: 'One platform for the whole build farm.', zh: '统一平台，托管整套构建集群与流水线' },
    desc:  {
      en: 'A cross-platform engineering base for a UE5 project: Windows/Mac desktop hosts, Linux cloud, Web and Android, all wired into automation and MCP.',
      zh: '面向 UE5 项目的跨端研发效能平台：覆盖 Windows/Mac 桌面端、Linux 服务端、Web 与 Android，统一接入自动化图与 MCP 工具集。',
    },
    fleetLive: { en: 'illustrative · live', zh: '示意 · 实时' },
    stat1: { en: 'Windows build machines', zh: '台 Windows 构建机' },
    stat2: { en: 'CI pipelines',           zh: '条流水线' },
    stat3: { en: 'higher cluster utilisation', zh: '集群利用率提升' },

    c1Title: { en: 'Distributed compilation · rebuilds <10 min', zh: '分布式联合编译 · 重编压至 10 分钟内' },
    c1Body:  {
      en: 'Modified Unreal Horde Server with UBA pooling compute; tuned deployment and UBT to cut contention.',
      zh: '深度定制 Unreal Horde Server 并结合 UBA 池化多机算力，调优部署与 UBT 流程以消除资源抢占。',
    },
    c2Title: { en: 'Fleet ops & idle-GPU AI', zh: '集群运维与闲时 GPU 算力借用' },
    c2Body:  {
      en: 'Heartbeats, controlled hot updates, RDP remote control; a Llama.cpp scheduler lends idle GPUs to models.',
      zh: '支持心跳监测、受控热更新与一键 RDP 远控；构建机闲时自动出借 GPU 运行本地模型服务。',
    },
    c3Title: { en: 'Performance telemetry', zh: '跨端性能采集与异常告警' },
    c3Body:  {
      en: 'Unified capture buckets across PC/mobile; parallel parsing, downsampling, trend comparison and daily anomaly alerts via MCP.',
      zh: '统一 PC 与移动端帧率、GPU、内存采集口径；支持并行解析、降采样、多版本趋势对比及每日异常告警，并通过 MCP 开放查询。',
    },
    c4Title: { en: 'Toolchain & remote access', zh: '工程工具链与移动端协同' },
    c4Body:  {
      en: 'P4 gates, TAPD, artifact distribution and device debugging as automation nodes; UE5/Houdini PCG plugins; a Kuikly Android client.',
      zh: '将 P4 提交门禁、TAPD、包体分发与真机调试封装为标准自动化节点；配套维护 UE5/Houdini PCG 插件与 Kuikly Android 客户端。',
    },

    obsTitle: { en: 'The cloud observer: builds that diagnose themselves.', zh: '云端观测者：构建流程的自主诊断与自愈' },
    obsBody:  {
      en: 'An always-on observer watches the build farm over 20 Streamable HTTP MCP tools. When a pipeline hangs or fails, it dispatches a read-only agent session onto the target runner to inspect logs, attribute the root cause, and retry within policy—freeing engineers from babysitting builds.',
      zh: '常驻云端的观测 Agent 通过 20 个标准 MCP 工具统一接入构建集群与自动化控制面。当流水线超时或失败时，自动向目标构建机派发只读诊断会话、提取现场日志定界根因，并在策略范围内执行自愈重试，把工程师从人工盯盘中解放出来。',
    },
    obsStat: { en: 'standard MCP tools · schedule & diagnose', zh: '标准 MCP 工具 · 调度与远程取证' },
  },

  engine: {
    titleHtml: {
      en: 'UI, Editor, and Asset<br />Frameworks from the ground up.',
      zh: '三种引擎框架：<br />UI、编辑器与资产管线',
    },
    desc: {
      en: 'Framework owner on a proprietary C++ engine: architected the in-game & hybrid UI frameworks, the multi-world asset editor framework, and the cross-DCC asset pipeline across Autodesk, Blender and UE.',
      zh: '主导局内/局外 UI 框架、类 UE 多世界编辑器框架及跨 DCC 美术资产管线的架构设计与性能。',
    },
    bar1:   { en: 'Out-of-game UI, logic + render', zh: '局外 UI 逻辑 + 渲染' },
    bar2:   { en: 'Progress rings & map tints: custom shader vs SVG', zh: '环形进度与地图染色：自定义 Shader 替代 SVG' },
    delta1: { en: 'VRAM', zh: '局外显存' },
    delta2: { en: 'Dynamic icon drawing', zh: '动态 Icon 绘制效率' },

    f1Title: { en: 'In-Game C++ UI Framework (0 → 1)', zh: '局内 C++ UI 框架（0 → 1）' },
    f1Body:  {
      en: 'Built a native C++ UI runtime & declarative DSL for high-concurrency FPS HUD, minimap and world map; defined asset & layering standards.',
      zh: '从零构建面向 FPS 高并发场景的原生 C++ UI 运行时与声明式 DSL，承载 HUD 与大小地图，建立局内 UI 资产与分层规范。',
    },
    f2Title: { en: 'Hybrid UI & D3D12/Vulkan Shader Framework', zh: '局外混合 UI 与材质渲染框架' },
    f2Body:  {
      en: 'Cut CoherentUI frame time by 75% and VRAM by 55%+, fixed V8 crashes/leaks, replaced SVG with custom D3D12/Vulkan shaders (−95%), and shipped 3D UI & atlases.',
      zh: '将 CoherentUI 帧耗时降低 75%、显存降低 55%+，根治 V8 崩溃与泄漏；打通 D3D12/Vulkan 自定义材质替代 SVG（耗时降 95%），落地 3D UI 与动态 Atlas。',
    },
    f3Title: { en: 'Multi-Tab, Multi-World Editor Framework', zh: '多 Tab / 多 World 编辑器框架' },
    f3Body:  {
      en: 'Architected multi-swapchain, multi-window and multi-world support; unified animation, mesh, material and texture editors around a shared scene tree & Undo/Redo core.',
      zh: '实现底层多 Swapchain、多 Window 与多 World 架构，构建基于场景节点树、Undo/Redo 与数据绑定的统一编辑器底座，整合动画、模型、贴图等多页签编辑器。',
    },
    f4Title: { en: 'Cross-DCC Asset Pipeline Framework', zh: '跨 DCC 资产管线与转换框架' },
    f4Body:  {
      en: 'Owned FBX/glTF import-export across 3ds Max, Maya, Blender and UE; cut parse/write times by 70–90%, exported 3,000+ prefab levels in <5 min, and sped up 80k+ texture builds by 67%.',
      zh: '主导跨越 3ds Max、Maya、Blender 与 UE 的 FBX / glTF 资产管线框架；读写耗时降低 70–90%，支撑 3000+ Prefab 大型关卡导出与 8 万+ 贴图快速转换。',
    },

    aStat1: { en: 'faster parse & write',       zh: '解析读写耗时降低' },
    aStat2: { en: 'smaller assets',             zh: '资产体积缩减' },
    aStat3: { en: 'prefab levels in <5 min',    zh: 'Prefab 关卡 5 分钟内导出' },
    aStat4: { en: '80k+ texture conversion',    zh: '8 万+ 贴图转换耗时' },
    aFoot:  {
      en: 'LOD meshes · physics collision · skeletal & facial animation · destructibles · camera tracks',
      zh: '覆盖 LODMesh · 物理碰撞体 · 骨骼与表情动画 · 可破坏物 · 相机轨道',
    },
  },

  changelog: {
    title: { en: 'Release history.', zh: '经历与演进' },
    desc:  { en: 'Every version shipped something people used daily.', zh: '每个阶段均交付了投入团队日常生产的工具与系统。' },
    v3Title: { en: 'Agent Harness & AIOps', zh: 'Agent Harness 与引擎效能' },
    v3Body:  {
      en: 'Tencent TiMi J3, engine efficiency. The engine DevOps platform, UE5 editor & PCG tooling.',
      zh: '腾讯天美 J3 引擎技术组。图运行时、引擎研发效能平台及 UE5 编辑器/PCG 工具链。',
    },
    v2Title: { en: 'Engine UI, Editor & Asset Frameworks', zh: '引擎 UI、编辑器与资产框架' },
    v2Body:  {
      en: 'Booming Tech, Chaos Engine. Framework owner across in-game/hybrid UI, multi-world editor and cross-DCC asset pipelines.',
      zh: '不鸣科技 Chaos 引擎。担任 UI、多世界编辑器与跨 DCC 资产管线三大核心框架负责人。',
    },
    v1_1Title: { en: 'MSc, High-Performance Graphics & Games Engineering', zh: '高性能图形与游戏工程 · 硕士' },
    v1_1Body:  { en: 'University of Leeds.', zh: '英国利兹大学（University of Leeds）' },
    v1_0Title: { en: 'BEng, Software Engineering', zh: '软件工程 · 学士' },
    v1_0Body:  { en: 'Zhejiang University of Technology.', zh: '浙江工业大学' },
  },

  faq: {
    title: { en: 'Frequently asked questions', zh: '技术选型与常见问答' },
    q1: { en: 'Why a Pregel graph instead of a plain agent loop?', zh: '为什么采用 Pregel 图引擎，而非纯 Agent Loop？' },
    a1: {
      en: 'A plain loop drifts over long tasks and loses everything when the process dies. Supersteps with outcomes persisted before an atomic barrier commit turn non-deterministic model calls into a state machine you can replay, inspect and resume, even after a human review that takes a day.',
      zh: '纯 Loop 在长程任务中容易发生上下文漂移，且进程异常退出后状态即丢失。通过「超步推进 + Outcome 先落盘 + Barrier 原子提交」，可将非确定性的模型调用收敛为可重放、可审计的状态机，即使历经数小时的人工审阅也能原位恢复。',
    },
    q2: { en: 'Why a restricted, strongly-typed DSL?', zh: '为什么要设计边界收敛的强类型 DSL？' },
    a2: {
      en: 'Agents write better code against a small typed surface than against a whole engine codebase. The compiler catches mistakes first, local checks take seconds, and cloud runs stay deterministic. The DSL was reshaped twice based on where agents actually failed.',
      zh: '相比直接操作庞大的业务代码库，Agent 在精简的强类型 DSL 上生成代码的准确率显著更高。编译器可在运行前拦截语法与类型错误，本地数秒内即可完成验证，云端执行也保持确定性。该 DSL 已依据 Agent 实测报错分布完成了两轮迭代收敛。',
    },
    q3: { en: 'Why does the harness matter more than the prompt?', zh: '为什么 Harness 比 Prompt 更重要？' },
    a3: {
      en: 'Reliability comes from typed contracts, durable checkpoints, structured events and pass@k / pass^k evals, not a longer system prompt. Node-level attribution tells you where it broke; the benchmark tells you whether the fix generalised.',
      zh: '工程可靠性源于强类型契约、持久化检查点、结构化事件流以及 pass@k / pass^k 量化评测，而非冗长的系统提示词。节点级归因用于精准定位故障步骤，基准评测则用于验证修复在全局任务上的有效性。',
    },
    q4: { en: 'What does a game-engine background bring to agent infrastructure?', zh: '游戏引擎背景对构建 Agent 基础设施有何助益？' },
    a4: {
      en: 'Habits: profile before optimising, treat budgets as hard limits, and design state so Undo/Redo is always possible. Those transfer directly to runtimes where an agent may run for hours.',
      zh: '核心在于工程习惯：先 Profile 再动手优化、将性能预算视为硬性边界、按支持 Undo/Redo 的标准设计状态流转。这些原则可直接迁移至需要长时稳定运行的 Agent 运行时。',
    },
    q5: { en: 'Is the console demo real?', zh: '页面上的控制台 Demo 是真实系统吗？' },
    a5: {
      en: 'The UI is the real Vue 3 console. Its backend is swapped for an in-browser simulator of the Go control plane, so runs, reviews and failures behave the same but reset when you reload.',
      zh: '前端即为真实的 Vue 3 生产控制台，仅将后端替换为运行于浏览器内存中的 Go 控制面模拟器：触发运行、人工审阅、阶段/节点图切换与失败恢复的交互均与生产环境一致，刷新页面即可重置。',
    },
    q6: { en: 'When are you available?', zh: '目前关注哪些方向的机会？' },
    a6: {
      en: "Currently employed — open to conversations now for roles after the Lunar New Year, focusing on Agent Harnesses, AIOps and developer tooling. Email is the fastest way to reach me.",
      zh: '目前在职，重点关注 Agent Harness、AIOps 与开发者工具链方向；欢迎先聊，年后可考虑新机会，邮件联系最快。',
    },
  },

  cta: {
    titleHtml: {
      en: 'Built for your team.<br /><span>Available to Chat.</span>',
      zh: '面向工程团队<br /><span>欢迎来聊</span>',
    },
    desc: {
      en: "Agent Harness · AIOps · Developer tooling. Let's build the runtime your agents deserve.",
      zh: 'Agent Harness · AIOps · 开发者工具链。共同构建稳定、可观测的 Agent 运行底座。',
    },
    btnContact: { en: 'Get in touch',    zh: '邮件联系' },
    btnDemo:    { en: 'Try the console', zh: '体验控制台' },
  },

  footer: {
    colProduct:  { en: 'Product',      zh: '产品' },
    linkSource:  { en: 'Source',       zh: '源码' },
    colWork:     { en: 'Work',         zh: '作品' },
    linkPlatform:{ en: 'Engine DevOps', zh: '引擎效能平台' },
    linkChanges: { en: 'Changelog',    zh: '更新日志' },
    colContact:  { en: 'Contact',      zh: '联系' },
  },

  evalBench: {
    title: {
      en: 'Pregel Automation Eval Benchmark (15 Tasks × 3 Trials)',
      zh: 'Pregel 自动化评测基准（15 题 × 3 次运行）',
    },
    heroSubHtml: {
      en: '15 desensitised production &amp; composite orchestration tasks × 3 independent runs per model (45 trials/model) · Covering <b>Part 01 Skill &amp; Toolchain Ablation (V1 → V2)</b> and <b>Part 02 V2 Cross-Model Benchmark</b>',
      zh: '15 道脱敏真实业务与复合编排题 × 每模型 3 次独立运行（45 次/模型）· 涵盖 <b>Part 01 同模型 Skill 与工具链消融（V1 → V2）</b> 与 <b>Part 02 V2 跨模型横评</b>',
    },
    ablationTitle: {
      en: 'Skill & Toolchain Ablation (V1 Baseline → V2 Harness)',
      zh: 'Skill 与工具链消融实验（V1 基线 → V2 Harness）',
    },
    subHtml: {
      en: 'Fixed model: <span class="mono">DeepSeek-V4.1-Flash</span> · Same 15 production tasks, comparing 90 total runs before (V1 Baseline) and after (V2 Harness) <span class="mono">heron-pregel-csx</span> Skill &amp; CLI toolchain refinement',
      zh: '固定测试模型：<span class="mono">DeepSeek-V4.1-Flash</span> · 同一套 15 道真实业务题，对比优化 <span class="mono">heron-pregel-csx</span> Skill 与 CLI 工具链前（V1 基线）后（V2 Harness）共 90 次运行轨迹',
    },
    benchModeAblation: { en: 'Skill Ablation (V1 → V2)', zh: 'Skill 消融 (V1 → V2)' },
    benchModeModels:   { en: 'V2 Cross-Model Arena',     zh: 'V2 跨模型横评' },
    modelsTitle: {
      en: 'V2 Cross-Model Benchmark',
      zh: 'V2 跨模型横评',
    },
    modelsSubHtml: {
      en: 'Evaluated on <b>Windows x64</b> + <span class="mono">DSH 0.2.2-rc.5</span> after upgrading to V2 Harness &amp; <span class="mono">heron-pregel-csx</span> Skill (15 tasks × 3 trials = 45 trials/model, PowerShell 7 + .NET 8 CLI)',
      zh: '全部模型均在升级至 V2 Harness 与 <span class="mono">heron-pregel-csx</span> Skill 后实测 · 统一运行环境：<b>Windows x64</b> · <span class="mono">DSH 0.2.2-rc.5</span> · PowerShell 7 + .NET 8 CLI（15 题 × 3 次运行 = 45 次/模型）',
    },
    modelsWhyFlashHtml: {
      en: '<strong>Model Selection Note — Why focus on Flash &amp; lightweight tiers rather than flagship frontier models?</strong><br />1. <b>Harness-first task-model fit:</b> Authoring and maintaining routine automation graphs are high-frequency execution workloads. A core design goal of a well-engineered DSL and Harness is to narrow the problem space so that fast, lightweight models reliably reach <code>97.8%–100%</code> pass rates—avoiding unnecessary reliance on heavy flagship models for everyday engineering workflows.<br />2. <b>Evaluation budget &amp; cost-efficiency:</b> Each model evaluation executes 45 full multi-turn agent trajectories with real compilation and CLI verification; focusing on high-throughput, cost-effective tiers keeps continuous regression benchmarking sustainable under a personal evaluation budget.<br />3. <b>Provider &amp; API routing:</b> Models run via the <code>CodeBuddy</code> provider by default, while Gemini models are routed directly through the official <code>Google Gemini API</code>.',
      zh: '<strong>选型说明：为什么横评聚焦于 Flash / 轻量级模型，而非旗舰级主力模型？</strong><br />1. <b>场景定位与架构验证（Harness 赋能轻量模型）：</b>日常自动化脚本的编写与编排属于高频执行类（Worker）任务。强类型 DSL 与 Harness 的核心设计目标之一，正是通过收敛问题空间与确定性校验降低对模型参数规模的依赖——实测表明轻量级模型在 V2 Harness 下已能稳定达到 <code>97.8%–100%</code> 的通过率，无需在常规工程流水线中过度消耗旗舰级算力。<br />2. <b>评测成本与可持续性：</b>单模型基准需完整执行 45 轮长程多步 Agent 会话与真实编译验证；在个人评测预算约束下，聚焦高吞吐、高性价比模型能够支撑多轮次、可复现的回归基准测试。<br />3. <b>接入渠道说明：</b>评测模型默认使用 <code>CodeBuddy</code> 渠道，Gemini 系列模型则通过 <code>Google Gemini API</code> 接入。',
    },
    scopeRaw:     { en: 'All Passed',       zh: '全部跑通' },
    scopeInLimit: { en: 'Passed ≤45m',      zh: '45 分钟内跑通' },
    navKpi:       { en: 'Key Metrics',      zh: '核心指标' },
    navModels:    { en: 'Model Compare',    zh: '模型对比' },
    navRel:       { en: 'Pass@k / Pass^k',  zh: 'Pass@k / Pass^k' },
    navDim:       { en: 'By Category',      zh: '题型分组' },
    navStack:     { en: 'Per-Task Charts',  zh: '逐题柱状图' },
    navTable:     { en: '15-Task Details',  zh: '15 题明细' },

    scatterTitle: { en: 'Capability vs Efficiency', zh: '能力 vs 效率散点图' },
    scatterDesc:  { en: 'Y-axis is pure Capability Score Cap (75–90, orthogonal to speed); top-left is stronger & faster/cheaper. Hover any model point for full metrics.', zh: '纵轴为纯能力分 Cap（75–90 区间放大，与横轴效率严格正交），越靠左上角代表能力越高且越快/越省；悬停圆点查看完整指标。' },
    scatterXDur:  { en: 'X: P50 Duration (m)', zh: 'X: 中位耗时 (m)' },
    scatterXTok:  { en: 'X: Tok / Pass (k)',   zh: 'X: 单次 Token (k)' },
    barTitle:     { en: 'Model Comparison', zh: '模型横向对比柱状图' },
    barDesc:      { en: 'All models run on V2 Harness and scored on the 0–90 decoupled scale (60% Cap + 40% Spd), using DeepSeek-V4.1-Flash as reference.', zh: '全部模型均在 V2 Harness 下运行，统一按 0–90 解耦总分制（60% 能力分 + 40% 速度分）计分，并以 DeepSeek-V4.1-Flash 为对照基准。' },
    mTotal:       { en: 'Total (0–90)', zh: '综合总分' },
    mCap:         { en: 'Cap Score',    zh: '能力分 (Cap)' },
    mSpd:         { en: 'Spd Score',    zh: '速度分 (Spd)' },
    mPass1:       { en: 'Pass@1',       zh: 'Pass@1' },
    mPassPow3:    { en: 'Pass^3',       zh: 'Pass^3' },

    relTitle: { en: 'Pass@k & Pass^k Curves', zh: 'Pass@k 与 Pass^k 曲线' },
    relDescHtml: {
      en: '<span class="mono">Pass@k</span> measures reach ("solved at least once in k tries"); <span class="mono">Pass^k</span> measures consistency ("solved all k tries in a row").',
      zh: '<span class="mono">Pass@k</span> 衡量能力上限（试 k 次至少跑通 1 次）；<span class="mono">Pass^k</span> 衡量工程稳定性（连续 k 次全部跑通）。',
    },
    cmodeBoth: { en: 'Both Curves',  zh: '两条都看' },
    cmodePow:  { en: 'Pass^k Only',  zh: '只看 Pass^k' },
    cmodeAt:   { en: 'Pass@k Only',  zh: '只看 Pass@k' },
    relFormulaHtml: {
      en: '3 trials per task: <code>Pass@3</code> means solved at least 1 of 3; <code>Pass^3</code> means solved all 3 of 3 (the bar for production reliability).',
      zh: '每题独立运行 3 次：<code>Pass@3</code> 代表 3 次里至少跑通 1 次；<code>Pass^3</code> 代表 3 次全部跑通（工程生产落地的真实可用线）。',
    },

    statusTitle: { en: '45-Trial Outcome & Step Efficiency', zh: '45 次运行状态分布与步数效率' },
    statusDesc:  { en: 'Click any status segment to filter the task table below.', zh: '点击状态色块可过滤下方 15 题明细表。' },

    dimTitle: { en: 'Breakdown by Category & Difficulty', zh: '按题型与难度分组拆解' },
    dimDesc:  { en: 'Click any row to filter the task table below (click again to clear).', zh: '点击任意分组行可联动过滤下方 15 题明细表（再次点击取消）。' },
    dimCat:   { en: 'By Category (5)',     zh: '按题型 (5 类)' },
    dimTier:  { en: 'By Difficulty (L1–L3)', zh: '按难度 (L1–L3)' },
    dimAi:    { en: 'AI Node vs Standard', zh: '是否含 AI 节点' },

    modeScore: { en: 'Task Score (Pass@1 + Pass@3)', zh: '单题得分构成 (Pass@1/3)' },
    modeTrial: { en: '3-Trial Score Stack (T1/T2/T3)', zh: '3 次得分堆叠 (T1/T2/T3)' },
    modeDur:   { en: '3-Trial Duration Stack (T1/T2/T3)', zh: '3 次耗时堆叠 (T1/T2/T3)' },
    modeTok:   { en: 'Output Token Stack (T1/T2/T3)', zh: '输出 Token 堆叠 (T1/T2/T3)' },

    formulaBadge:  { en: 'SCORING FORMULA', zh: 'SCORING FORMULA · 综合计分公式' },
    formulaToggle: { en: 'How scoring works', zh: '计分规则拆解' },
    term1Title:   { en: 'Cap · Capability Score (0–90)', zh: 'Cap · 能力分（满分 90）' },
    term1BodyHtml:{
      en: 'Per task: <code>3V × (0.7·Pass@1 + 0.3·Pass@3)</code> where difficulty weight <code>L1: V=1</code>, <code>L2: V=2</code>, <code>L3: V=3</code> (sum of <code>3V</code> across 15 tasks = 90)',
      zh: '单题能力分 <code>3V × (0.7·Pass@1 + 0.3·Pass@3)</code>，难度权重 <code>L1: V=1</code>、<code>L2: V=2</code>、<code>L3: V=3</code>（15 题 × 3 次满分共 90 分）',
    },
    term2Title:   { en: 'Spd · Speed Score (0–90)', zh: 'Spd · 速度分（满分 90）' },
    term2BodyHtml:{
      en: 'Each passing trial earns <code>V × f(t)</code> after deducting <code>1.5m</code> CLI/compile overhead (<code>t′ = max(0, t−1.5m)</code>): <code>0–15m</code> <code>1.00→0.35</code>, <code>15–30m</code> <code>→0.17</code>, <code>30–45m</code> <code>→0.10</code>, <code>&gt;45m</code> <code>0.05</code>',
      zh: '每个通过试次按 <code>V × f(t)</code> 计速度分（先扣 <code>1.5m</code> 编译/CLI 底噪 <code>t′ = max(0, t−1.5m)</code>）：<code>0–15m</code> <code>1.00→0.35</code>，<code>15–30m</code> <code>→0.17</code>，<code>30–45m</code> <code>→0.10</code>，<code>&gt;45m</code> 保底 <code>0.05</code>',
    },
    term3Title:   { en: 'Total = 0.60 Cap + 0.40 Spd', zh: 'Total = 0.60 Cap + 0.40 Spd · 综合总分' },
    term3BodyHtml:{
      en: 'Decouples capability (60% guaranteed upon passing) and speed (40% bonus) into a unified 0–90 benchmark score',
      zh: '能力（做对即保底拿 60% 权重）与速度（40% 权重）解耦计分后合成 0–90 综合总分；切换到「45 分钟内跑通」口径时，>45m 试次不计入限时通过率',
    },
    annotations: {
      '05':  { en: 'V1 abort · V2 T2 95m', zh: 'V1 早退 · V2 T2 95m' },
      '18':  { en: 'V1 aborted', zh: 'V1 早退' },
      '17A': { en: 'Extra self-tests', zh: 'V2 多轮自测' },
    },
    tokenNoteHtml: {
      en: '<strong>Annotations:</strong> In V1, tasks <code>05</code> / <code>18</code> hit environment or permission errors and aborted early (<code>0/3</code>); V2 completed all runs (<code>3/3</code>), so its cumulative bars are taller. Trial 2 of <code>05</code> alone ran for 94.9m. Across all 15 tasks, V2 median duration dropped <code>10.3m → 3.3m</code> (<b>−68%</b>) and tokens per passing run dropped <code>69.7k → 41.7k</code> (<b>−40%</b>).',
      zh: '<strong>标注说明：</strong>V1 在 <code>05</code> / <code>18</code> 题因撞到环境或沙箱权限报错而提前退出（<code>0/3</code>），V2 则全部跑通（<code>3/3</code>）因此累加柱更高（其中 <code>05</code> 第 2 次单次耗时 94.9 分钟）。全局 15 题整体来看，V2 单次中位耗时从 <code>10.3m → 3.3m</code>（<b>缩短 68%</b>），单次跑通平均输出 Token 从 <code>69.7k → 41.7k</code>（<b>降低 40%</b>）。',
    },

    tableTitle: { en: '15-Task Execution Details (V1 vs V2)', zh: '15 道题运行明细（V1 vs V2）' },
    tableDesc:  { en: 'Click headers to sort; click any row to expand per-trial step counts, tool calls, durations, verifier notes and the frozen task prompt.', zh: '点击表头可排序；点击任意题目行可展开 V1 / V2 三次运行的步数、工具调用、耗时、判分结论与冻结题面原文。' },
    searchPlaceholder: { en: 'Search task ID / title / notes...', zh: '搜索题号 / 标题 / 备注...' },
    catAll:     { en: 'All Categories', zh: '全部题型' },
    qfAll:      { en: 'All 15 Tasks',   zh: '全部 15 题' },
    qfImproved: { en: 'V2 Improved',    zh: 'V2 提升题' },
    qfNotFull:  { en: 'Pass^3 < 100%',  zh: '未满分 (Pass^3<1)' },
    qfTimeout:  { en: 'Has >45m Long Run', zh: '含 >45m 长耗时' },
    qfAi:       { en: 'AI-Node Tasks',  zh: 'AI 节点题' },
    resetBtn:   { en: 'Reset Filters',  zh: '重置筛选' },

    thId:     { en: 'ID',                  zh: '题号' },
    thTask:   { en: 'Task',                zh: '题目' },
    thPass:   { en: 'Pass V1 → V2',        zh: '通过 V1 → V2' },
    thDur:    { en: 'Avg Duration (V2)',   zh: '平均耗时 (V2)' },
    thTok:    { en: 'Output Tokens (V2)',  zh: '输出 Token (V2)' },
    thScore:  { en: 'Score (V2)',          zh: '得分 (V2)' },

    titles: {
      '01':  'Hello Pregel',
      '02':  'PerfDog XLSX to JSON',
      '02A': 'PerfDog Export + WeCom Hook',
      '04':  'Schedule & Reschedule Cron Task',
      '07':  'Build Agent PowerShell 7 Debug',
      '10':  'Corrupted PerfDogTools Repair',
      '12':  'Weekly Report Preset & Offline Preview',
      '17':  'Perf Report Tier Fan-Out',
      '17A': 'Multi-Site Offline Batch Import',
      '18':  'AI Node Report Handoff',
      '18A': 'Frozen-Data AI Weekly Summary',
      '18B': 'Headless DSH Mock MCP & Skill Injection',
      '19':  'Weekly Report Parallel Branches',
      '19A': 'Pre-Release Dual-Path Gate Check',
      '05':  'End-to-End Daily Perf Report Automation',
    },
    categories: {
      '基础建图与调度': 'Graph Authoring & Scheduling',
      '文件解析与集成': 'File Parsing & Integration',
      '代码排障与修复': 'Debugging & Code Repair',
      '动态展开与分支': 'Dynamic Fan-Out & Branching',
      'AI 节点与复合链路': 'AI Nodes & Composite Flows',
    },
    tiers: {
      'L1 基础': 'L1 Basic',
      'L2 进阶': 'L2 Intermediate',
      'L3 复合 / AI': 'L3 Composite / AI',
    },
    modes: {
      '新建图': 'New Graph',
      '参数接入': 'Param Wiring',
      '改造既有图': 'Extend Graph',
      '配置运维': 'Config & Cron',
      '排障修复': 'Bug Fix',
    },
    dimLabels: {
      '基础建图与调度': 'Graph Authoring & Scheduling',
      '文件解析与集成': 'File Parsing & Integration',
      '代码排障与修复': 'Debugging & Code Repair',
      '动态展开与分支': 'Dynamic Fan-Out & Branching',
      'AI 节点与复合链路': 'AI Nodes & Composite Flows',
      'L1 基础': 'L1 Basic',
      'L2 进阶': 'L2 Intermediate',
      'L3 复合 / AI': 'L3 Composite / AI',
      '常规 Pregel / 工具编排': 'Standard Pregel / Tool Flows',
      '含 AI 节点 / DSH 嵌套': 'With AI Node / Nested DSH',
    },
    reviews: {
      '通过全部验收': 'Passed all verification checks',
      '未通过（failed）': 'Failed verification',
      '运行中途停止/未正常收包（15.7 分钟，无退出码）': 'Aborted mid-run without final artifact (15.7m, no exit code)',
      '运行中途停止/未正常收包（18.1 分钟，无退出码）': 'Aborted mid-run without final artifact (18.1m, no exit code)',
      'DSH 在 30 分钟后以退出码 1 结束，未交齐有效证据；运行时给出通用失败提示': 'DSH exited with code 1 after 30m without required evidence',
      '实际向企微生产域名发送了一次占位 key 请求，返回无效 key；题面要求全程本地': 'Sent placeholder key request to live WeCom domain instead of staying local-only',
      '核对三组 CLI 验证、独立运行与输出；Map 使用 Sequential，混合按 epic→medium，单项 low，空组输出空汇总。用交付的运行日志与状态记录补足旧验证器仅查固定归档路径的缺口。': 'Verified all 3 CLI runs & outputs; Sequential Map with epic→medium / low ordering and empty-group summary',
      '留有部分案例证据，Agent 达到 30 分钟启动时限后退出，未完成整份交付。': 'Partial evidence only; agent hit the 30m timeout before completing delivery',
      '两站真实重叠，同站串行，拒绝后读回前值，混合总计 8，空组总计 0。禁用 ID 仅留在计划字段，没有子运行。': 'Two sites overlapped in parallel, same-site serialized, rollback value verified, disabled IDs excluded from sub-runs',
      '真实 AI 节点在 Windows 启动无头 DSH 时失败，原始证据显示其状态目录不在外层 Agent 的可写工作区内': 'AI node failed to spawn headless DSH on Windows: state dir outside outer sandbox writable workspace',
      '尝试在个人 .ksf/Graphs 下写答卷，被工作区权限拒绝，之后卡在权限申请': 'Attempted to write under user .ksf/Graphs, blocked by workspace permission check',
      '上游记录可读；缺失与空文件负例均到达下游归档校验并停止。两份正例报告字段与判定正确，原件和归档一致。': 'Upstream records readable; missing/empty negative cases caught by downstream archive check; positive reports matched',
      '内层 DSH 未能在现有 Windows 评测沙箱启动，没有真实 AI 会话或 report.md。': 'Inner headless DSH failed to start inside Windows eval sandbox; no AI session or report.md produced',
      '报告明确区分已有采集结果、未发现未知状态记录和历史源未采集；上期条目只作为排除说明，冻结请求关闭三类工具。': 'Report cleanly distinguished collected data, empty findings, and uncollected legacy sources; tools disabled in frozen request',
      '分类和冻结请求正确，但报告只写历史来源未采集，遗漏已采集范围内没有发现的说明。': 'Classification and frozen request valid, but report omitted statement confirming zero findings in collected scope',
      '三组内容齐全，明确区分未采集与已采集无其他发现；冻结请求的 Tools、MCP 和 Skills 都是空数组。': 'All 3 sections complete, distinguishing uncollected vs empty collected scope; Tools/MCP/Skills empty in frozen request',
      '外层会话达 48.15 分钟后手动停止，未完成全量交付': 'Outer session manually stopped at 48.15m before full delivery',
      'Trial 2 通过：成功注入模拟 MCP 与 skill 并完成输出': 'Trial 2 passed: injected mock MCP & skill into headless DSH and verified output',
      '公开双路有重叠，内部审批节点实际状态是 Succeeded，未满足图上整支 Skipped。': 'Public dual branches overlapped, but internal approval nodes ran (Succeeded) instead of being Skipped',
      '三组决定 allow/allow/hold；两次公开运行读取重叠，内部两个审批节点 Skipped 且无读取痕迹；汇总在已启用分支后开始。': 'Decisions allow/allow/hold verified; public runs overlapped, internal approval nodes Skipped, summary ran after active branches',
      '未完成日报主图，在排查 Windows 内层 DSH 状态目录权限时结束。': 'Ended while debugging Windows inner DSH state directory permissions before finishing main daily report graph',
      '写出了日报图源码，运行在“准备汇总素材”处因路径为空失败，并未生成当天汇总。': 'Authored daily report graph, but execution failed at "Prepare Summary Inputs" due to empty path',
      '四组日报和当天汇总已归档并通过本地回读。': 'All 4 group reports and daily summary archived and verified via local read-back',
    },
  },
}
