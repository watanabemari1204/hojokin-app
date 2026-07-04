// AIコンサルタントモード — 分析→計画書作成→AI審査→改善→根拠管理→バージョン比較→案件管理(CRM)
// APIキー持ち込み式（ブラウザのlocalStorageのみに保存。サーバーには送らない）

(() => {
  "use strict";

  const STORE_KEY = "gmnConsultantV1";
  const API_KEY_STORE = "gmnAnthropicKey";
  const CLAUDE_MODEL = "claude-opus-4-8";

  // ---------- 会社情報の項目定義（不足情報自動検知の基準） ----------
  const COMPANY_FIELDS = [
    { key: "name", label: "会社名", type: "text", placeholder: "例: 株式会社サンプル製作所" },
    { key: "industry", label: "業種", type: "text", placeholder: "例: 金属加工業" },
    { key: "location", label: "所在地", type: "text", placeholder: "例: 石川県金沢市" },
    { key: "employees", label: "社員数", type: "text", placeholder: "例: 12名（正社員8名・パート4名）" },
    { key: "business", label: "事業内容", type: "textarea", placeholder: "何を・誰に・どうやって提供しているか。主要取引先や強みも。" },
    { key: "sales", label: "直近の売上・利益（決算情報）", type: "textarea", placeholder: "例: 2025年度 売上1.2億円・営業利益800万円。前年比+5%。" },
    { key: "wages", label: "賃金情報・賃上げ予定", type: "textarea", placeholder: "例: 平均月給28万円。2027年3月までに給与支給総額+3%を計画。" },
    { key: "competitors", label: "競合情報", type: "textarea", placeholder: "例: 県内同業3社。当社は小ロット短納期が強みだが価格競争が激化。" },
    { key: "investment", label: "導入したい設備・システムと概算費用", type: "textarea", placeholder: "例: AI外観検査装置一式 1,200万円（見積取得済）。" },
    { key: "schedule", label: "導入スケジュール", type: "textarea", placeholder: "例: 交付決定後3ヶ月で発注→6ヶ月で設置・検収→翌月から稼働。" },
    { key: "kpi", label: "目標KPI", type: "textarea", placeholder: "例: 検査工数を月120時間→40時間に削減。不良流出率0.8%→0.1%。3年で売上+15%。" },
  ];

  const DOC_ITEMS = [
    { key: "kessansho", label: "決算書（直近2期分）" },
    { key: "mitsumori", label: "見積書" },
    { key: "kyuyo", label: "給与台帳・賃金台帳" },
    { key: "gaiyo", label: "会社案内・HP情報" },
  ];

  const CASE_STATUSES = ["準備中", "計画書作成中", "申請済", "採択", "不採択"];

  // ---------- プロンプト（まり指定の仕様） ----------
  const SYSTEM_CONSULTANT = `あなたは日本国内の補助金制度を専門とする補助金コンサルタントです。
補助金審査員が短時間で理解しやすく、高評価を得やすい事業計画書を作成してください。
以下を必ず守ってください。
・論理の飛躍をしない
・会社情報を根拠に記載する
・誇張しない
・AI特有の文章を書かない
・句読点を不自然に多用しない
・人間が時間をかけて作成したような自然な文章にする
・事業背景→課題→解決策→導入内容→効果→KPI→将来性が自然につながるように構成する
・審査項目を満たす文章にする
・具体的な数値や根拠を盛り込む
・入力情報だけでは判断できない内容は推測せず、その節のmissing_infoに列挙する
・存在しない実績・数値・取引先・データを絶対に捏造しない
・各節のevidenceには、その文章の根拠にした入力項目名（会社名、決算情報、見積、賃金情報など）を挙げる`;

  const SYSTEM_REVIEWER = `あなたは補助金の審査員です。提出された事業計画書を、実際の審査と同じ厳しさで採点してください。
評価項目: 論理性・実現可能性・市場分析・競合分析・収益計画・KPI・補助金要件との一致・加点項目・減点リスク・文章品質（各100点満点）。
adoption_probabilityは採択可能性（100点満点）。甘い点数をつけず、根拠の薄い箇所・数値の裏付け不足を具体的に指摘してください。
improvementsには「加点項目不足」「賃上げ計画が弱い」「DX効果の記述不足」「地域貢献の記述不足」「市場分析不足」「数値根拠不足」など、
この補助金で採択されやすくなる具体的な改善提案を書き、追加の事実情報が必要な場合はneeds_user_input=trueにしてください。`;

  const SYSTEM_IMPROVER = `あなたは補助金コンサルタントです。事業計画書とAI審査員の指摘を受け取り、指摘を反映した改訂版を作成してください。
・審査員の指摘に対応する加筆・修正を行う（市場規模不足→市場データの構成を補強、数値根拠不足→KPIと算定根拠を明確化、競合分析不足→競合比較を追加）
・ただし事実の捏造は絶対にしない。会社情報に無い事実が必要な指摘は、文章を直すのではなくmissing_infoに「ユーザーに確認すべき情報」として残す
・改善していない節もsectionsに全て含めて、完全な計画書として返す
・evidenceは維持・更新する`;

  const SYSTEM_COMBINER = `あなたは補助金コンサルタントです。会社情報と公募中の補助金候補リストから、この会社が狙うべき補助金の組み合わせを提案してください。
・併用可否（同一経費への重複申請は不可）に注意し、目的別に使い分ける組み合わせにする
・grant_namesには候補リストにある正式名称をそのまま使う（リストに無い制度名を作らない）
・alternativesには「不採択だった場合の代替案」を必ず含める`;

  const SYSTEM_EXPLAINER = `あなたは補助金コンサルタントです。事業計画書の特定の節について「なぜこの文章を書いたのか」を、
補助金の要件・審査基準・加点要素の観点から、専門家でない経営者にもわかる言葉で簡潔に説明してください。300字以内。`;

  // ---------- 構造化出力スキーマ ----------
  const PLAN_SCHEMA = {
    type: "object",
    properties: {
      sections: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            body: { type: "string" },
            evidence: { type: "array", items: { type: "string" } },
            missing_info: { type: "array", items: { type: "string" } },
          },
          required: ["title", "body", "evidence", "missing_info"],
          additionalProperties: false,
        },
      },
    },
    required: ["sections"],
    additionalProperties: false,
  };

  const REVIEW_SCHEMA = {
    type: "object",
    properties: {
      adoption_probability: { type: "integer" },
      summary: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            score: { type: "integer" },
            comment: { type: "string" },
          },
          required: ["name", "score", "comment"],
          additionalProperties: false,
        },
      },
      improvements: {
        type: "array",
        items: {
          type: "object",
          properties: {
            issue: { type: "string" },
            suggestion: { type: "string" },
            needs_user_input: { type: "boolean" },
          },
          required: ["issue", "suggestion", "needs_user_input"],
          additionalProperties: false,
        },
      },
    },
    required: ["adoption_probability", "summary", "items", "improvements"],
    additionalProperties: false,
  };

  const COMBO_SCHEMA = {
    type: "object",
    properties: {
      combinations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            grant_names: { type: "array", items: { type: "string" } },
            reason: { type: "string" },
            caution: { type: "string" },
          },
          required: ["title", "grant_names", "reason", "caution"],
          additionalProperties: false,
        },
      },
      alternatives: {
        type: "array",
        items: {
          type: "object",
          properties: {
            scenario: { type: "string" },
            plan: { type: "string" },
          },
          required: ["scenario", "plan"],
          additionalProperties: false,
        },
      },
    },
    required: ["combinations", "alternatives"],
    additionalProperties: false,
  };

  // ---------- 永続化 ----------
  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY));
      if (raw && Array.isArray(raw.cases)) return raw;
    } catch (error) { /* 破損時は初期化 */ }
    return { cases: [], activeCaseId: null };
  }

  const state = loadState();

  function persist() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  function activeCase() {
    return state.cases.find((c) => c.id === state.activeCaseId) || null;
  }

  function newCase(name) {
    const c = {
      id: `case_${Date.now()}`,
      name: name || "新規案件",
      status: "準備中",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      company: {},
      docs: {},
      targetGrantIds: [],
      versions: [],
      combo: null,
      log: [],
    };
    state.cases.unshift(c);
    state.activeCaseId = c.id;
    persist();
    return c;
  }

  function touch(c, logKind, logText) {
    c.updatedAt = new Date().toISOString();
    if (logKind) c.log.unshift({ ts: new Date().toISOString(), kind: logKind, text: logText || "" });
    persist();
  }

  // ---------- Claude呼び出し ----------
  // 1) APIキーがあれば直接Claude APIへ（Web版・ローカル版共通）
  // 2) キーが無くてもローカル版（127.0.0.1）は /api/consult 経由でこの端末のClaude Codeを使う（キー不要）
  const IS_LOCAL = location.hostname === "127.0.0.1" || location.hostname === "localhost";

  function getApiKey() {
    return localStorage.getItem(API_KEY_STORE) || "";
  }

  async function callClaude(options) {
    if (getApiKey()) return callClaudeDirect(options);
    if (IS_LOCAL) return callClaudeLocal(options);
    throw new Error("APIキーが未設定です。右上の「API設定」から登録してください。（Macの補助金アプリならキー無しで使えます）");
  }

  async function callClaudeLocal({ system, user, schema, onProgress }) {
    const ticker = onProgress ? setInterval(() => onProgress(0), 1000) : null;
    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ system, user, schema: schema || null }),
      });
      let data = null;
      try { data = await response.json(); } catch (error) { /* 非JSON応答 */ }
      if (!response.ok || !data || data.error) throw new Error((data && data.error) || `ローカルAIエラー (${response.status})`);
      return schema ? data.json : data.text;
    } finally {
      if (ticker) clearInterval(ticker);
    }
  }

  async function callClaudeDirect({ system, user, schema, maxTokens = 16000, onProgress }) {
    const key = getApiKey();
    const body = {
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      stream: true,
      thinking: { type: "adaptive" },
      system,
      messages: [{ role: "user", content: user }],
    };
    if (schema) body.output_config = { format: { type: "json_schema", schema } };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let message = `APIエラー (${response.status})`;
      try {
        const err = await response.json();
        if (err.error && err.error.message) message = err.error.message;
      } catch (error) { /* 本文なし */ }
      if (response.status === 401) message = "APIキーが無効です。API設定を確認してください。";
      if (response.status === 429) message = "利用制限に達しました。少し待ってから再実行してください。";
      throw new Error(message);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    let stopReason = null;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop();
      for (const eventChunk of events) {
        const dataLine = eventChunk.split("\n").find((line) => line.startsWith("data: "));
        if (!dataLine) continue;
        let payload;
        try {
          payload = JSON.parse(dataLine.slice(6));
        } catch (error) { continue; }
        if (payload.type === "content_block_delta" && payload.delta && payload.delta.type === "text_delta") {
          text += payload.delta.text;
          if (onProgress) onProgress(text.length);
        }
        if (payload.type === "message_delta" && payload.delta && payload.delta.stop_reason) {
          stopReason = payload.delta.stop_reason;
        }
      }
    }
    if (stopReason === "refusal") throw new Error("AIがこの内容の生成を辞退しました。入力内容を見直してください。");
    if (stopReason === "max_tokens") throw new Error("出力が長すぎて途中で切れました。入力を分割して再実行してください。");
    if (!schema) return text;
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error("AIの出力の解析に失敗しました。もう一度実行してください。");
    }
  }

  // ---------- 不足情報検知 ----------
  function detectMissing(c) {
    const missing = [];
    for (const field of COMPANY_FIELDS) {
      if (!(c.company[field.key] || "").trim()) missing.push(field.label);
    }
    for (const doc of DOC_ITEMS) {
      if (!c.docs[doc.key]) missing.push(doc.label);
    }
    const latest = latestVersion(c);
    if (latest) {
      for (const section of latest.plan.sections) {
        for (const info of section.missing_info || []) {
          if (!missing.includes(info)) missing.push(`【AI検知】${info}`);
        }
      }
    }
    return missing;
  }

  function latestVersion(c) {
    return c.versions.length ? c.versions[c.versions.length - 1] : null;
  }

  // ---------- 入力情報の文字列化 ----------
  function companyProfileText(c) {
    const lines = COMPANY_FIELDS.map((field) => `【${field.label}】${(c.company[field.key] || "").trim() || "（未入力）"}`);
    const docs = DOC_ITEMS.map((doc) => `${doc.label}: ${c.docs[doc.key] ? "手元にある" : "未提出"}`).join(" / ");
    return `${lines.join("\n")}\n【書類の状況】${docs}`;
  }

  function selectedGrants(c) {
    if (typeof grants === "undefined") return [];
    return c.targetGrantIds.map((id) => grants.find((g) => (g.jgrantsId || g.name) === id)).filter(Boolean);
  }

  function grantSummaryText(list) {
    if (!list.length) return "（対象補助金が未選択。一般的なものづくり・持続化・IT導入等を想定して構成する）";
    return list.map((g) => `・${g.name}（実施: ${g.agency || "要確認"} / 上限: ${g.maxAmount ? `${g.maxAmount.toLocaleString("ja-JP")}万円` : "要確認"} / 補助率: ${g.rate || "要確認"} / 締切: ${g.deadline || "要確認"}）`).join("\n");
  }

  // ---------- AIアクション ----------
  async function generatePlan(c) {
    const user = `以下の会社について、対象補助金の申請用事業計画書を作成してください。

# 会社情報
${companyProfileText(c)}

# 対象補助金
${grantSummaryText(selectedGrants(c))}

構成は「事業背景」「経営課題」「解決策」「導入内容」「期待される効果」「KPI・数値目標」「将来性・発展性」「補助金要件との対応」の8節。`;
    const plan = await callClaude({ system: SYSTEM_CONSULTANT, user, schema: PLAN_SCHEMA, onProgress: progressTicker("計画書を執筆中") });
    const version = { n: c.versions.length + 1, createdAt: new Date().toISOString(), plan, review: null };
    c.versions.push(version);
    touch(c, "生成", `Version ${version.n} を作成`);
    return version;
  }

  async function reviewVersion(c, version) {
    const user = `以下の事業計画書を審査してください。

# 対象補助金
${grantSummaryText(selectedGrants(c))}

# 会社情報（事実確認用）
${companyProfileText(c)}

# 事業計画書（Version ${version.n}）
${version.plan.sections.map((s) => `## ${s.title}\n${s.body}`).join("\n\n")}`;
    version.review = await callClaude({ system: SYSTEM_REVIEWER, user, schema: REVIEW_SCHEMA, onProgress: progressTicker("AI審査員が採点中") });
    touch(c, "審査", `Version ${version.n}: 採択可能性${version.review.adoption_probability}点`);
    return version.review;
  }

  async function improveAndRereview(c) {
    const base = latestVersion(c);
    if (!base || !base.review) throw new Error("先にAI審査を実行してください。");
    const user = `# 現在の事業計画書（Version ${base.n}）
${base.plan.sections.map((s) => `## ${s.title}\n${s.body}`).join("\n\n")}

# AI審査員の指摘
総評: ${base.review.summary}
${base.review.items.map((item) => `・${item.name}: ${item.score}点 — ${item.comment}`).join("\n")}

# 改善提案
${base.review.improvements.map((imp) => `・${imp.issue} → ${imp.suggestion}`).join("\n")}

# 会社情報（事実の範囲。これ以外の事実を作らない）
${companyProfileText(c)}`;
    const plan = await callClaude({ system: SYSTEM_IMPROVER, user, schema: PLAN_SCHEMA, onProgress: progressTicker("指摘を反映して改訂中") });
    const version = { n: c.versions.length + 1, createdAt: new Date().toISOString(), plan, review: null };
    c.versions.push(version);
    touch(c, "改善", `Version ${version.n} に改訂`);
    await reviewVersion(c, version);
    return version;
  }

  async function proposeCombo(c) {
    if (typeof grants === "undefined" || !grants.length) throw new Error("補助金データの読み込みを待ってから実行してください。");
    const candidates = grants
      .filter((g) => g.verified && g.status !== "終了")
      .slice(0, 60)
      .map((g) => `・${g.name}｜目的:${g.purpose || "-"}｜上限:${g.maxAmount ? `${g.maxAmount}万円` : "-"}｜締切:${g.deadline || "-"}`)
      .join("\n");
    const user = `# 会社情報
${companyProfileText(c)}

# 公募中の補助金候補（Jグランツ実データ）
${candidates}`;
    c.combo = await callClaude({ system: SYSTEM_COMBINER, user, schema: COMBO_SCHEMA, onProgress: progressTicker("組み合わせを検討中") });
    touch(c, "組み合わせ", `${c.combo.combinations.length}案を提案`);
    return c.combo;
  }

  async function explainSection(c, section) {
    const user = `# 対象補助金
${grantSummaryText(selectedGrants(c))}

# 説明してほしい節
## ${section.title}
${section.body}`;
    return callClaude({ system: SYSTEM_EXPLAINER, user, maxTokens: 1500 });
  }

  // ---------- バージョン比較（文単位diff） ----------
  function splitSentences(text) {
    return (text || "").split(/(?<=。|\n)/).map((s) => s.trim()).filter(Boolean);
  }

  function diffSentences(oldText, newText) {
    const a = splitSentences(oldText);
    const b = splitSentences(newText);
    const table = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = a.length - 1; i >= 0; i--) {
      for (let j = b.length - 1; j >= 0; j--) {
        table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
      }
    }
    const out = [];
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { out.push({ type: "same", text: a[i] }); i++; j++; }
      else if (table[i + 1][j] >= table[i][j + 1]) { out.push({ type: "del", text: a[i] }); i++; }
      else { out.push({ type: "add", text: b[j] }); j++; }
    }
    while (i < a.length) { out.push({ type: "del", text: a[i] }); i++; }
    while (j < b.length) { out.push({ type: "add", text: b[j] }); j++; }
    return out;
  }

  // ---------- UI ----------
  const el = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  let progressTimer = null;
  function progressTicker(label) {
    const started = Date.now();
    return () => {
      const seconds = Math.floor((Date.now() - started) / 1000);
      setBusy(`${label}…（${seconds}秒経過）`);
    };
  }

  function setBusy(message) {
    const bar = el("consultBusy");
    if (!message) {
      bar.hidden = true;
      if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
      document.querySelectorAll("#consultant button").forEach((b) => { b.disabled = false; });
      return;
    }
    bar.hidden = false;
    bar.textContent = message;
    document.querySelectorAll("#consultant .consult-actions button, #consultant .combo-head button").forEach((b) => { b.disabled = true; });
  }

  function fmtDate(iso) {
    return iso ? new Date(iso).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
  }

  function deadlineBadge(deadline) {
    if (!deadline) return "";
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
    if (Number.isNaN(days)) return "";
    if (days < 0) return `<span class="consult-deadline is-over">締切超過</span>`;
    if (days <= 14) return `<span class="consult-deadline is-soon">締切まで${days}日</span>`;
    return `<span class="consult-deadline">締切まで${days}日</span>`;
  }

  function renderCaseList() {
    const list = el("consultCaseList");
    if (!state.cases.length) {
      list.innerHTML = `<p class="consult-empty">案件がまだありません。「新しい案件」から始めてください。</p>`;
      return;
    }
    list.innerHTML = state.cases.map((c) => {
      const latest = latestVersion(c);
      const score = latest && latest.review ? `${latest.review.adoption_probability}点` : "未審査";
      const grantsList = selectedGrants(c);
      const nearest = grantsList.map((g) => g.deadline).filter(Boolean).sort()[0];
      return `<button type="button" class="consult-case${c.id === state.activeCaseId ? " is-active" : ""}" data-case="${c.id}">
        <strong>${escapeHtml(c.name)}</strong>
        <span class="consult-case-meta">${escapeHtml(c.status)}｜採択可能性 ${score}｜v${c.versions.length}</span>
        <span class="consult-case-meta">${grantsList.length ? escapeHtml(grantsList[0].name).slice(0, 30) : "補助金未選択"} ${deadlineBadge(nearest)}</span>
      </button>`;
    }).join("");
  }

  function renderCompanyForm(c) {
    const wrap = el("consultCompanyFields");
    wrap.innerHTML = COMPANY_FIELDS.map((field) => {
      const value = escapeHtml(c.company[field.key] || "");
      if (field.type === "textarea") {
        return `<label class="consult-field is-wide">${field.label}<textarea data-company="${field.key}" rows="2" placeholder="${escapeHtml(field.placeholder)}">${value}</textarea></label>`;
      }
      return `<label class="consult-field">${field.label}<input type="text" data-company="${field.key}" value="${value}" placeholder="${escapeHtml(field.placeholder)}" /></label>`;
    }).join("");
    el("consultDocs").innerHTML = DOC_ITEMS.map((doc) => `<label class="consult-doc"><input type="checkbox" data-doc="${doc.key}" ${c.docs[doc.key] ? "checked" : ""}/> ${doc.label}</label>`).join("");
  }

  function renderMissing(c) {
    const missing = detectMissing(c);
    const box = el("consultMissing");
    if (!missing.length) {
      box.innerHTML = `<strong>不足情報なし</strong><p>計画書作成に必要な情報が揃っています。</p>`;
      box.classList.add("is-ok");
      return;
    }
    box.classList.remove("is-ok");
    box.innerHTML = `<strong>不足情報（${missing.length}件）</strong><ul>${missing.map((m) => `<li>□ ${escapeHtml(m)}</li>`).join("")}</ul>`;
  }

  function renderGrantPicker(c) {
    const selected = selectedGrants(c);
    el("consultGrantSelected").innerHTML = selected.length
      ? selected.map((g) => `<span class="consult-grant-chip">${escapeHtml(g.name)} ${deadlineBadge(g.deadline)}<button type="button" data-remove-grant="${escapeHtml(g.jgrantsId || g.name)}" aria-label="外す">×</button></span>`).join("")
      : `<p class="consult-empty">検索して対象補助金を選んでください（複数可）。</p>`;
  }

  function renderGrantSearch(keyword) {
    const box = el("consultGrantResults");
    if (!keyword || typeof grants === "undefined") { box.innerHTML = ""; return; }
    const lower = keyword.toLowerCase();
    const hits = grants.filter((g) => g.verified && `${g.name} ${g.agency || ""}`.toLowerCase().includes(lower)).slice(0, 8);
    box.innerHTML = hits.length
      ? hits.map((g) => `<button type="button" class="consult-grant-hit" data-add-grant="${escapeHtml(g.jgrantsId || g.name)}"><strong>${escapeHtml(g.name)}</strong><span>${g.maxAmount ? `上限${g.maxAmount.toLocaleString("ja-JP")}万円` : "上限要確認"}｜締切 ${escapeHtml(g.deadline || "要確認")}</span></button>`).join("")
      : `<p class="consult-empty">該当なし。検索語を変えてください。</p>`;
  }

  function renderCombo(c) {
    const box = el("consultComboResult");
    if (!c.combo) { box.innerHTML = ""; return; }
    box.innerHTML = `
      ${c.combo.combinations.map((combo) => `<article class="consult-combo-card">
        <strong>${escapeHtml(combo.title)}</strong>
        <p class="consult-combo-grants">${combo.grant_names.map((n) => escapeHtml(n)).join("＋")}</p>
        <p>${escapeHtml(combo.reason)}</p>
        <p class="consult-combo-caution">注意: ${escapeHtml(combo.caution)}</p>
      </article>`).join("")}
      <article class="consult-combo-card is-alt">
        <strong>不採択だった場合の代替案</strong>
        ${c.combo.alternatives.map((alt) => `<p><em>${escapeHtml(alt.scenario)}</em> → ${escapeHtml(alt.plan)}</p>`).join("")}
      </article>`;
  }

  function renderVersions(c) {
    const tabs = el("consultVersionTabs");
    if (!c.versions.length) { tabs.innerHTML = ""; el("consultPlan").innerHTML = `<p class="consult-empty">「事業計画書を作成」を押すと、AIコンサルタントが下書きを執筆します。</p>`; el("consultReview").innerHTML = ""; return; }
    const current = Number(tabs.dataset.current || latestVersion(c).n);
    tabs.innerHTML = c.versions.map((version) => `<button type="button" class="consult-vtab${version.n === current ? " is-active" : ""}" data-version="${version.n}">Version ${version.n}${version.review ? `（${version.review.adoption_probability}点）` : ""}</button>`).join("")
      + (c.versions.length > 1 ? `<button type="button" class="consult-vtab is-diff${tabs.dataset.diff === "1" ? " is-active" : ""}" data-diff-toggle="1">改善点を色分け表示</button>` : "");
    const version = c.versions.find((item) => item.n === current) || latestVersion(c);
    renderPlan(c, version, tabs.dataset.diff === "1");
    renderReview(version);
  }

  function renderPlan(c, version, withDiff) {
    const previous = withDiff && version.n > 1 ? c.versions.find((item) => item.n === version.n - 1) : null;
    el("consultPlan").innerHTML = version.plan.sections.map((section, index) => {
      let bodyHtml;
      if (previous) {
        const prevSection = previous.plan.sections.find((s) => s.title === section.title) || previous.plan.sections[index];
        bodyHtml = diffSentences(prevSection ? prevSection.body : "", section.body)
          .map((part) => part.type === "same" ? escapeHtml(part.text) : part.type === "add" ? `<mark class="diff-add">${escapeHtml(part.text)}</mark>` : `<del class="diff-del">${escapeHtml(part.text)}</del>`)
          .join("");
      } else {
        bodyHtml = escapeHtml(section.body).replace(/\n/g, "<br/>");
      }
      const evidence = (section.evidence || []).length
        ? `<p class="consult-evidence">根拠: ${section.evidence.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</p>`
        : "";
      const missing = (section.missing_info || []).length
        ? `<p class="consult-section-missing">要確認: ${section.missing_info.map((item) => escapeHtml(item)).join("／")}</p>`
        : "";
      return `<article class="consult-plan-section">
        <header><h4>${escapeHtml(section.title)}</h4><button type="button" class="consult-why" data-why="${index}">なぜこの文章？</button></header>
        <p class="consult-plan-body">${bodyHtml}</p>
        ${evidence}${missing}
        <div class="consult-why-answer" data-why-answer="${index}" hidden></div>
      </article>`;
    }).join("");
  }

  function renderReview(version) {
    const box = el("consultReview");
    if (!version.review) { box.innerHTML = ""; return; }
    const review = version.review;
    const scoreClass = (score) => score >= 80 ? "is-good" : score >= 60 ? "is-mid" : "is-low";
    box.innerHTML = `
      <div class="consult-score-head">
        <div class="consult-score-total ${scoreClass(review.adoption_probability)}"><span>採択可能性</span><strong>${review.adoption_probability}<small>点</small></strong></div>
        <p>${escapeHtml(review.summary)}</p>
      </div>
      <table class="consult-score-table">
        <tbody>${review.items.map((item) => `<tr><th>${escapeHtml(item.name)}</th><td class="${scoreClass(item.score)}">${item.score}点</td><td>${escapeHtml(item.comment)}</td></tr>`).join("")}</tbody>
      </table>
      <div class="consult-improvements">
        <strong>採択率を上げる改善提案</strong>
        <ul>${review.improvements.map((imp) => `<li><em>${escapeHtml(imp.issue)}</em> — ${escapeHtml(imp.suggestion)}${imp.needs_user_input ? `<span class="consult-need-input">要追加情報</span>` : ""}</li>`).join("")}</ul>
      </div>`;
  }

  function renderLog(c) {
    el("consultLog").innerHTML = c.log.slice(0, 12).map((entry) => `<li><span>${fmtDate(entry.ts)}</span> ${escapeHtml(entry.kind)}: ${escapeHtml(entry.text)}</li>`).join("") || `<li class="consult-empty">まだ履歴がありません。</li>`;
  }

  function renderApiStatus() {
    const status = el("consultApiStatus");
    if (getApiKey()) {
      status.textContent = "APIキー設定済み";
      status.classList.remove("is-missing");
    } else if (IS_LOCAL) {
      status.textContent = "この端末のClaudeで動作中（キー不要）";
      status.classList.remove("is-missing");
    } else {
      status.textContent = "APIキー未設定";
      status.classList.add("is-missing");
    }
  }

  function renderAll() {
    renderCaseList();
    renderApiStatus();
    const c = activeCase();
    const workbench = el("consultWorkbench");
    if (!c) { workbench.hidden = true; el("consultNoCase").hidden = false; return; }
    workbench.hidden = false;
    el("consultNoCase").hidden = true;
    el("consultCaseName").value = c.name;
    el("consultCaseStatus").innerHTML = CASE_STATUSES.map((status) => `<option${status === c.status ? " selected" : ""}>${status}</option>`).join("");
    renderCompanyForm(c);
    renderMissing(c);
    renderGrantPicker(c);
    renderCombo(c);
    renderVersions(c);
    renderLog(c);
  }

  // ---------- 出力（印刷/PDF・Word） ----------
  function planDocumentHtml(c, version) {
    const grantNames = selectedGrants(c).map((g) => g.name).join("、") || "（対象補助金）";
    return `<!doctype html><html lang="ja"><head><meta charset="utf-8"/><title>事業計画書_${escapeHtml(c.name)}</title>
      <style>body{font-family:"Hiragino Mincho ProN","Yu Mincho",serif;color:#1a1a1a;line-height:1.9;max-width:720px;margin:40px auto;padding:0 24px;}h1{font-size:22px;border-bottom:2px solid #1a1a1a;padding-bottom:8px;}h2{font-size:16px;margin-top:28px;border-left:4px solid #0d9b7d;padding-left:10px;}p{margin:8px 0;white-space:pre-wrap;}.meta{color:#555;font-size:12px;}</style></head><body>
      <h1>事業計画書</h1>
      <p class="meta">${escapeHtml(c.company.name || c.name)}｜対象: ${escapeHtml(grantNames)}｜Version ${version.n}（${new Date(version.createdAt).toLocaleDateString("ja-JP")}）</p>
      ${version.plan.sections.map((section) => `<h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p>`).join("")}
      </body></html>`;
  }

  function printPlan(c) {
    const version = latestVersion(c);
    if (!version) return;
    const win = window.open("", "_blank");
    win.document.write(planDocumentHtml(c, version));
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  }

  function exportWord(c) {
    const version = latestVersion(c);
    if (!version) return;
    const blob = new Blob(["﻿", planDocumentHtml(c, version)], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `事業計画書_${c.name}_v${version.n}.doc`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // ---------- イベント ----------
  async function runAction(action) {
    const c = activeCase();
    if (!c) return;
    try {
      await action(c);
    } catch (error) {
      alert(error.message || String(error));
    } finally {
      setBusy(null);
      renderAll();
    }
  }

  function wireEvents() {
    el("consultNewCase").addEventListener("click", () => {
      const name = prompt("案件名（顧客名や会社名）を入力してください", "");
      if (name === null) return;
      newCase(name.trim() || "新規案件");
      renderAll();
    });

    el("consultCaseList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-case]");
      if (!button) return;
      state.activeCaseId = button.dataset.case;
      persist();
      renderAll();
    });

    el("consultCaseName").addEventListener("change", (event) => {
      const c = activeCase();
      if (!c) return;
      c.name = event.target.value.trim() || c.name;
      touch(c);
      renderCaseList();
    });

    el("consultCaseStatus").addEventListener("change", (event) => {
      const c = activeCase();
      if (!c) return;
      c.status = event.target.value;
      touch(c, "状況", c.status);
      renderCaseList();
      renderLog(c);
    });

    el("consultDeleteCase").addEventListener("click", () => {
      const c = activeCase();
      if (!c || !confirm(`案件「${c.name}」を削除しますか？（元に戻せません）`)) return;
      state.cases = state.cases.filter((item) => item.id !== c.id);
      state.activeCaseId = state.cases.length ? state.cases[0].id : null;
      persist();
      renderAll();
    });

    el("consultCompanyFields").addEventListener("change", (event) => {
      const input = event.target.closest("[data-company]");
      if (!input) return;
      const c = activeCase();
      c.company[input.dataset.company] = input.value;
      touch(c);
      renderMissing(c);
      renderCaseList();
    });

    el("consultDocs").addEventListener("change", (event) => {
      const input = event.target.closest("[data-doc]");
      if (!input) return;
      const c = activeCase();
      c.docs[input.dataset.doc] = input.checked;
      touch(c);
      renderMissing(c);
    });

    el("consultGrantSearchInput").addEventListener("input", (event) => renderGrantSearch(event.target.value.trim()));

    el("consultGrantResults").addEventListener("click", (event) => {
      const button = event.target.closest("[data-add-grant]");
      if (!button) return;
      const c = activeCase();
      if (!c.targetGrantIds.includes(button.dataset.addGrant)) {
        c.targetGrantIds.push(button.dataset.addGrant);
        touch(c, "補助金", "対象補助金を追加");
      }
      el("consultGrantSearchInput").value = "";
      renderGrantSearch("");
      renderGrantPicker(c);
      renderCaseList();
    });

    el("consultGrantSelected").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-grant]");
      if (!button) return;
      const c = activeCase();
      c.targetGrantIds = c.targetGrantIds.filter((id) => id !== button.dataset.removeGrant);
      touch(c);
      renderGrantPicker(c);
    });

    el("consultComboButton").addEventListener("click", () => runAction(async (c) => {
      setBusy("組み合わせを検討中…");
      await proposeCombo(c);
    }));

    el("consultGenerate").addEventListener("click", () => runAction(async (c) => {
      setBusy("計画書を執筆中…");
      const version = await generatePlan(c);
      el("consultVersionTabs").dataset.current = version.n;
    }));

    el("consultReviewButton").addEventListener("click", () => runAction(async (c) => {
      const version = latestVersion(c);
      if (!version) throw new Error("先に事業計画書を作成してください。");
      setBusy("AI審査員が採点中…");
      await reviewVersion(c, version);
    }));

    el("consultImprove").addEventListener("click", () => runAction(async (c) => {
      setBusy("指摘を反映して改訂中…");
      const version = await improveAndRereview(c);
      el("consultVersionTabs").dataset.current = version.n;
    }));

    el("consultVersionTabs").addEventListener("click", (event) => {
      const tabs = el("consultVersionTabs");
      const diffToggle = event.target.closest("[data-diff-toggle]");
      if (diffToggle) {
        tabs.dataset.diff = tabs.dataset.diff === "1" ? "" : "1";
        renderVersions(activeCase());
        return;
      }
      const tab = event.target.closest("[data-version]");
      if (!tab) return;
      tabs.dataset.current = tab.dataset.version;
      renderVersions(activeCase());
    });

    el("consultPlan").addEventListener("click", (event) => {
      const button = event.target.closest("[data-why]");
      if (!button) return;
      const c = activeCase();
      const tabs = el("consultVersionTabs");
      const version = c.versions.find((item) => item.n === Number(tabs.dataset.current)) || latestVersion(c);
      const section = version.plan.sections[Number(button.dataset.why)];
      const answerBox = document.querySelector(`[data-why-answer="${button.dataset.why}"]`);
      if (!answerBox.hidden) { answerBox.hidden = true; return; }
      answerBox.hidden = false;
      answerBox.textContent = "AIが説明を作成中…";
      explainSection(c, section)
        .then((text) => { answerBox.textContent = text; })
        .catch((error) => { answerBox.textContent = `エラー: ${error.message}`; });
    });

    el("consultPrint").addEventListener("click", () => printPlan(activeCase()));
    el("consultWord").addEventListener("click", () => exportWord(activeCase()));

    el("consultApiButton").addEventListener("click", () => {
      const current = getApiKey();
      const input = prompt("Anthropic APIキーを入力してください（この端末のブラウザにだけ保存されます）", current ? "（設定済み・変更する場合のみ入力）" : "");
      if (input === null) return;
      const value = input.trim();
      if (!value || value.startsWith("（")) return;
      if (!value.startsWith("sk-ant-")) { alert("sk-ant- で始まるAPIキーを入力してください。"); return; }
      localStorage.setItem(API_KEY_STORE, value);
      renderApiStatus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!el("consultant")) return;
    wireEvents();
    renderAll();
  });
})();
