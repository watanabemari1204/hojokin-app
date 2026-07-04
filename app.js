const grants = [
  {
    name: "中小企業省力化投資補助金",
    agency: "中小企業庁",
    region: "全国",
    purpose: "設備投資",
    status: "公募中",
    maxAmount: 1500,
    rate: "1/2目安",
    deadline: "公募回ごとに変動",
    expenses: ["省力化設備", "カタログ掲載製品", "導入関連費"],
    combinable: ["IT導入補助金", "業務改善助成金"],
    detail: "人手不足解消につながる設備導入を支援。対象製品・枠・従業員規模で上限が変わります。",
    source: "https://shoryokuka.smrj.go.jp/"
  },
  {
    name: "IT導入補助金",
    agency: "経済産業省・中小企業庁",
    region: "全国",
    purpose: "DX",
    status: "公募中",
    maxAmount: 450,
    rate: "1/2から4/5",
    deadline: "公募回ごとに変動",
    expenses: ["ソフトウェア", "クラウド利用料", "PC・レジ等"],
    combinable: ["ものづくり補助金", "業務改善助成金"],
    detail: "会計、受発注、決済、EC、セキュリティなどのITツール導入を支援します。",
    source: "https://it-shien.smrj.go.jp/"
  },
  {
    name: "ものづくり・商業・サービス生産性向上促進補助金",
    agency: "中小企業庁",
    region: "全国",
    purpose: "設備投資",
    status: "準備中",
    maxAmount: 4000,
    rate: "1/2から2/3",
    deadline: "公募回ごとに変動",
    expenses: ["機械装置", "システム構築", "外注費", "専門家経費"],
    combinable: ["IT導入補助金"],
    detail: "革新的な製品・サービス開発や生産プロセス改善に向けた投資を支援します。",
    source: "https://portal.monodukuri-hojo.jp/"
  },
  {
    name: "事業再構築補助金",
    agency: "中小企業庁",
    region: "全国",
    purpose: "創業",
    status: "準備中",
    maxAmount: 15000,
    rate: "1/3から3/4",
    deadline: "公募回ごとに変動",
    expenses: ["建物費", "機械装置", "広告宣伝", "研修費"],
    combinable: ["自治体創業助成"],
    detail: "新市場進出、事業転換、業態転換など思い切った事業再構築を支援します。",
    source: "https://jigyou-saikouchiku.go.jp/"
  },
  {
    name: "業務改善助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 600,
    rate: "3/4から9/10",
    deadline: "年度予算により変動",
    expenses: ["設備投資", "コンサルティング", "人材育成"],
    combinable: ["IT導入補助金", "省力化投資補助金"],
    detail: "事業場内最低賃金の引き上げと生産性向上投資を組み合わせて支援します。",
    source: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/shienjigyou/03.html"
  },
  {
    name: "東京都 創業助成事業",
    agency: "東京都中小企業振興公社",
    region: "東京都",
    purpose: "創業",
    status: "準備中",
    maxAmount: 400,
    rate: "2/3以内",
    deadline: "募集期ごとに変動",
    expenses: ["賃借料", "広告費", "器具備品", "従業員人件費"],
    combinable: ["IT導入補助金", "小規模事業者持続化補助金"],
    detail: "都内で創業予定または創業間もない事業者の初期費用を支援します。",
    source: "https://startup-station.jp/m2/services/sogyokassei/"
  },
  {
    name: "小規模事業者持続化補助金",
    agency: "日本商工会議所・全国商工会連合会",
    region: "全国",
    purpose: "DX",
    status: "公募中",
    maxAmount: 250,
    rate: "2/3目安",
    deadline: "公募回ごとに変動",
    expenses: ["販路開拓", "ウェブサイト関連", "展示会", "機械装置"],
    combinable: ["自治体販路開拓補助"],
    detail: "小規模事業者の販路開拓や業務効率化の取り組みを支援します。",
    source: "https://r6.jizokukahojokin.info/"
  },
  {
    name: "省エネルギー投資促進支援事業費補助金",
    agency: "資源エネルギー庁",
    region: "全国",
    purpose: "省エネ",
    status: "公募中",
    maxAmount: 150000,
    rate: "1/3から1/2",
    deadline: "年度公募ごとに変動",
    expenses: ["高効率設備", "EMS", "更新工事"],
    combinable: ["自治体省エネ補助"],
    detail: "工場・事業場の省エネルギー性能を高める設備更新を支援します。",
    source: "https://sii.or.jp/"
  },
  {
    name: "成長型中小企業等研究開発支援事業 Go-Tech",
    agency: "中小企業庁",
    region: "全国",
    purpose: "研究開発",
    status: "公募中",
    maxAmount: 9750,
    rate: "2/3以内",
    deadline: "年度公募ごとに変動",
    expenses: ["研究開発費", "試作品開発", "外注費", "大学等連携費"],
    combinable: ["ものづくり補助金"],
    detail: "中小企業が大学・公設試験研究機関などと連携して行う高度な研究開発を支援します。",
    source: "https://www.chusho.meti.go.jp/"
  },
  {
    name: "事業承継・M&A補助金",
    agency: "中小企業庁",
    region: "全国",
    purpose: "事業承継",
    status: "公募中",
    maxAmount: 800,
    rate: "1/2から2/3",
    deadline: "公募回ごとに変動",
    expenses: ["設備投資", "店舗改装", "専門家活用", "廃業費"],
    combinable: ["小規模事業者持続化補助金"],
    detail: "事業承継やM&Aを契機にした新たな取り組み、専門家活用、廃業費用などを支援します。",
    source: "https://jsh.go.jp/"
  },
  {
    name: "雇用調整助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 1000,
    rate: "休業手当等の一部助成",
    deadline: "支給対象期間により変動",
    expenses: ["休業手当", "教育訓練", "出向"],
    combinable: ["人材開発支援助成金"],
    detail: "景気変動などにより事業活動を縮小する事業主が雇用維持を図る場合の助成金です。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "キャリアアップ助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 120,
    rate: "コース別定額助成",
    deadline: "取り組み前の計画届が必要",
    expenses: ["正社員化", "処遇改善", "賃金規定整備"],
    combinable: ["業務改善助成金"],
    detail: "非正規雇用労働者の正社員化や処遇改善を行う事業主を支援します。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "両立支援等助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 360,
    rate: "コース別定額助成",
    deadline: "制度利用・復帰時期により変動",
    expenses: ["育児休業", "介護休業", "柔軟な働き方制度"],
    combinable: ["人材確保等支援助成金"],
    detail: "仕事と育児・介護の両立支援制度を整備し、利用を促進する事業主を支援します。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "人材確保等支援助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 1000,
    rate: "コース別助成",
    deadline: "計画認定・実施時期により変動",
    expenses: ["雇用管理改善", "介護福祉機器", "テレワーク", "賃金改善"],
    combinable: ["業務改善助成金"],
    detail: "職場定着や人材確保に向けた雇用管理制度、設備、テレワーク導入などを支援します。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "産業雇用安定助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 1000,
    rate: "コース別助成",
    deadline: "出向・再就職支援計画により変動",
    expenses: ["出向運営", "賃金", "教育訓練"],
    combinable: ["雇用調整助成金"],
    detail: "在籍型出向やスキルアップを通じた雇用維持・労働移動を支援します。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "中途採用等支援助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 100,
    rate: "コース別定額助成",
    deadline: "採用計画・雇入れ時期により変動",
    expenses: ["中途採用拡大", "UIJターン採用", "生涯現役起業"],
    combinable: ["人材確保等支援助成金"],
    detail: "中途採用拡大や移住者採用、起業時の雇用創出などを支援する助成金です。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "地域雇用開発助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 1600,
    rate: "設置整備費・雇入れ人数に応じて助成",
    deadline: "計画書提出が必要",
    expenses: ["事業所設置", "設備整備", "地域雇用"],
    combinable: ["自治体企業立地補助"],
    detail: "雇用機会が不足する地域で事業所設置と雇用創出を行う事業主を支援します。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "トライアル雇用助成金",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 60,
    rate: "対象者・期間別定額助成",
    deadline: "雇入れ後の申請期限あり",
    expenses: ["試行雇用", "若年者採用", "障害者雇用"],
    combinable: ["キャリアアップ助成金"],
    detail: "就職が困難な求職者を一定期間試行雇用する事業主を支援します。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "65歳超雇用推進助成金",
    agency: "高齢・障害・求職者雇用支援機構",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 160,
    rate: "制度整備内容に応じて助成",
    deadline: "制度実施後の申請期限あり",
    expenses: ["定年引上げ", "継続雇用制度", "高年齢者評価制度"],
    combinable: ["人材確保等支援助成金"],
    detail: "高年齢者が働き続けられる制度整備や雇用管理改善を支援します。",
    source: "https://www.jeed.go.jp/"
  },
  {
    name: "障害者雇用納付金制度に基づく助成金",
    agency: "高齢・障害・求職者雇用支援機構",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 4500,
    rate: "対象設備・措置により変動",
    deadline: "事前認定・申請が必要",
    expenses: ["作業施設整備", "介助者配置", "通勤対策", "職場適応"],
    combinable: ["トライアル雇用助成金"],
    detail: "障害者の雇用継続に必要な施設・設備・介助措置などを支援します。",
    source: "https://www.jeed.go.jp/"
  },
  {
    name: "観光地・観光産業再生支援事業",
    agency: "観光庁",
    region: "全国",
    purpose: "観光",
    status: "準備中",
    maxAmount: 10000,
    rate: "事業類型により変動",
    deadline: "年度公募ごとに変動",
    expenses: ["宿泊施設改修", "観光コンテンツ", "受入環境整備", "高付加価値化"],
    combinable: ["自治体観光補助"],
    detail: "観光地の再生、高付加価値化、宿泊施設や観光コンテンツ整備を支援します。",
    source: "https://www.mlit.go.jp/kankocho/"
  },
  {
    name: "インバウンド受入環境整備高度化事業",
    agency: "観光庁",
    region: "全国",
    purpose: "観光",
    status: "公募中",
    maxAmount: 1500,
    rate: "1/2以内",
    deadline: "公募回ごとに変動",
    expenses: ["多言語対応", "キャッシュレス", "Wi-Fi", "バリアフリー"],
    combinable: ["IT導入補助金"],
    detail: "訪日外国人旅行者の受入環境を整える設備・システム導入を支援します。",
    source: "https://www.mlit.go.jp/kankocho/"
  },
  {
    name: "物流脱炭素化促進事業",
    agency: "国土交通省・環境省",
    region: "全国",
    purpose: "脱炭素",
    status: "公募中",
    maxAmount: 5000,
    rate: "1/3から1/2",
    deadline: "年度公募ごとに変動",
    expenses: ["EVトラック", "充電設備", "共同配送システム", "倉庫省エネ"],
    combinable: ["省エネルギー投資促進支援事業費補助金"],
    detail: "物流分野の脱炭素化に向けた車両、設備、共同配送等の導入を支援します。",
    source: "https://www.env.go.jp/"
  },
  {
    name: "二酸化炭素排出抑制対策事業費等補助金",
    agency: "環境省",
    region: "全国",
    purpose: "脱炭素",
    status: "公募中",
    maxAmount: 50000,
    rate: "1/3から2/3",
    deadline: "執行団体の公募ごとに変動",
    expenses: ["再エネ設備", "蓄電池", "省CO2設備", "ZEB"],
    combinable: ["自治体脱炭素補助"],
    detail: "事業者・自治体の脱炭素設備導入、建築物の省CO2化、再エネ活用などを支援します。",
    source: "https://www.env.go.jp/"
  },
  {
    name: "中小企業等海外展開支援事業",
    agency: "JETRO・中小企業庁",
    region: "全国",
    purpose: "販路開拓",
    status: "公募中",
    maxAmount: 1000,
    rate: "事業類型により変動",
    deadline: "募集回ごとに変動",
    expenses: ["海外展示会", "越境EC", "専門家相談", "市場調査"],
    combinable: ["小規模事業者持続化補助金"],
    detail: "海外販路開拓、輸出、越境EC、現地調査などを支援する制度候補です。",
    source: "https://www.jetro.go.jp/"
  },
  {
    name: "JAPANブランド育成支援等事業",
    agency: "中小企業庁",
    region: "全国",
    purpose: "販路開拓",
    status: "準備中",
    maxAmount: 500,
    rate: "2/3以内",
    deadline: "年度公募ごとに変動",
    expenses: ["ブランド開発", "海外PR", "展示会", "EC整備"],
    combinable: ["海外展開支援事業"],
    detail: "地域産品やサービスのブランド化、海外需要獲得、販路開拓を支援します。",
    source: "https://www.chusho.meti.go.jp/"
  },
  {
    name: "農業次世代人材投資資金・経営開始資金",
    agency: "農林水産省",
    region: "全国",
    purpose: "農業",
    status: "随時",
    maxAmount: 150,
    rate: "定額支援",
    deadline: "自治体募集により変動",
    expenses: ["新規就農", "経営開始", "研修"],
    combinable: ["自治体就農支援"],
    detail: "新規就農者の経営開始や研修期間を支援する制度候補です。",
    source: "https://www.maff.go.jp/"
  },
  {
    name: "強い農業づくり総合支援交付金",
    agency: "農林水産省",
    region: "全国",
    purpose: "農業",
    status: "公募中",
    maxAmount: 50000,
    rate: "1/2以内等",
    deadline: "都道府県・事業計画により変動",
    expenses: ["共同利用施設", "産地基幹施設", "機械設備", "流通改善"],
    combinable: ["自治体農業補助"],
    detail: "産地の収益力強化や共同利用施設整備などを支援する交付金です。",
    source: "https://www.maff.go.jp/"
  },
  {
    name: "食品産業の輸出向けHACCP等対応施設整備事業",
    agency: "農林水産省",
    region: "全国",
    purpose: "設備投資",
    status: "公募中",
    maxAmount: 50000,
    rate: "1/2以内",
    deadline: "年度公募ごとに変動",
    expenses: ["衛生管理設備", "製造ライン改修", "認証対応", "輸出対応施設"],
    combinable: ["海外展開支援事業"],
    detail: "食品事業者が輸出先規制やHACCP等に対応するための施設整備を支援します。",
    source: "https://www.maff.go.jp/"
  },
  {
    name: "文化芸術振興費補助金",
    agency: "文化庁",
    region: "全国",
    purpose: "販路開拓",
    status: "準備中",
    maxAmount: 2000,
    rate: "事業類型により変動",
    deadline: "公募ごとに変動",
    expenses: ["公演制作", "文化資源活用", "広報", "海外展開"],
    combinable: ["自治体文化芸術補助"],
    detail: "文化芸術団体や事業者の活動継続、発信、地域文化資源活用などを支援します。",
    source: "https://www.bunka.go.jp/"
  },
  {
    name: "東京都 中小企業デジタルツール導入促進支援事業",
    agency: "東京都",
    region: "東京都",
    purpose: "DX",
    status: "公募中",
    maxAmount: 100,
    rate: "1/2以内",
    deadline: "募集回ごとに変動",
    expenses: ["業務ソフト", "クラウド", "EC", "予約管理"],
    combinable: ["IT導入補助金"],
    detail: "都内中小企業のデジタルツール導入による業務効率化を支援します。",
    source: "https://www.tokyo-kosha.or.jp/"
  },
  {
    name: "東京都 中小企業ニューマーケット開拓支援事業",
    agency: "東京都中小企業振興公社",
    region: "東京都",
    purpose: "販路開拓",
    status: "公募中",
    maxAmount: 0,
    rate: "販路開拓支援",
    deadline: "募集回ごとに変動",
    expenses: ["販路相談", "マッチング", "営業支援"],
    combinable: ["小規模事業者持続化補助金"],
    detail: "都内中小企業の優れた製品・技術の販路開拓を専門家が支援します。",
    source: "https://www.tokyo-kosha.or.jp/"
  },
  {
    name: "大阪府 中小企業向け省エネ・再エネ設備補助",
    agency: "大阪府",
    region: "大阪府",
    purpose: "脱炭素",
    status: "準備中",
    maxAmount: 1000,
    rate: "1/2以内",
    deadline: "年度予算により変動",
    expenses: ["太陽光", "蓄電池", "高効率空調", "省エネ診断"],
    combinable: ["省エネルギー投資促進支援事業費補助金"],
    detail: "府内事業者の省エネ・再エネ設備導入を支援する自治体制度候補です。",
    source: "https://www.pref.osaka.lg.jp/"
  },
  {
    name: "福岡県 中小企業生産性向上支援補助金",
    agency: "福岡県",
    region: "福岡県",
    purpose: "設備投資",
    status: "公募中",
    maxAmount: 500,
    rate: "1/2以内",
    deadline: "募集回ごとに変動",
    expenses: ["機械装置", "システム", "省力化設備", "専門家費"],
    combinable: ["中小企業省力化投資補助金"],
    detail: "県内中小企業の生産性向上に向けた設備・システム導入を支援する自治体制度候補です。",
    source: "https://www.pref.fukuoka.lg.jp/"
  },
  {
    name: "デジタル田園都市国家構想交付金 デジタル実装タイプ",
    agency: "内閣府・内閣官房",
    region: "全国",
    purpose: "DX",
    status: "公募中",
    maxAmount: 100000,
    rate: "事業類型により変動",
    deadline: "国の募集回・自治体計画により変動",
    expenses: ["地域DX", "行政サービス", "データ連携基盤", "マイナンバー活用", "住民向けアプリ"],
    combinable: ["自治体DX補助", "地域公共交通DX支援"],
    detail: "自治体等が地域課題解決のためにデジタル実装を進める交付金。民間事業者は自治体事業の受託・連携先として関わるケースがあります。",
    source: "https://www.chisou.go.jp/sousei/about/mirai/policy/policy1.html"
  },
  {
    name: "新しい地方経済・生活環境創生交付金 デジタル実装型",
    agency: "内閣府",
    region: "全国",
    purpose: "DX",
    status: "準備中",
    maxAmount: 100000,
    rate: "事業類型により変動",
    deadline: "国の募集回・自治体計画により変動",
    expenses: ["自治体DX", "地域アプリ", "キャッシュレス", "データ連携", "スマートシティ"],
    combinable: ["デジタル田園都市国家構想交付金 デジタル実装タイプ"],
    detail: "地方創生の新しい交付金枠。自治体が申請主体となり、地域企業のDX実装・実証・システム導入に波及する候補です。",
    source: "https://www.chisou.go.jp/"
  },
  {
    name: "地方創生推進交付金",
    agency: "内閣府",
    region: "全国",
    purpose: "DX",
    status: "準備中",
    maxAmount: 50000,
    rate: "1/2等",
    deadline: "自治体計画・募集回により変動",
    expenses: ["地域産業DX", "観光DX", "移住定住", "雇用創出", "データ活用"],
    combinable: ["自治体企業支援補助"],
    detail: "自治体の地方創生事業を支援する交付金。地域事業者は自治体事業や委託・補助メニューを通じて対象になる場合があります。",
    source: "https://www.chisou.go.jp/"
  },
  {
    name: "地方創生拠点整備交付金",
    agency: "内閣府",
    region: "全国",
    purpose: "設備投資",
    status: "準備中",
    maxAmount: 150000,
    rate: "1/2等",
    deadline: "自治体計画・募集回により変動",
    expenses: ["地域拠点", "産業支援施設", "観光施設", "交流施設", "デジタル設備"],
    combinable: ["観光地・観光産業再生支援事業"],
    detail: "地方創生に資する拠点施設の整備を支援する交付金。自治体が申請主体で、民間連携事業の可能性があります。",
    source: "https://www.chisou.go.jp/"
  },
  {
    name: "地域デジタル基盤活用推進事業",
    agency: "総務省",
    region: "全国",
    purpose: "DX",
    status: "公募中",
    maxAmount: 10000,
    rate: "1/2等",
    deadline: "年度公募ごとに変動",
    expenses: ["ローカル5G", "IoT", "データ連携", "地域課題解決システム"],
    combinable: ["デジタル田園都市国家構想交付金 デジタル実装タイプ"],
    detail: "地域課題の解決に向けたデジタル基盤、通信、IoT等の実装・実証を支援する制度候補です。",
    source: "https://www.soumu.go.jp/"
  },
  {
    name: "自治体情報システム標準化・共通化関連支援",
    agency: "デジタル庁・総務省",
    region: "全国",
    purpose: "DX",
    status: "随時",
    maxAmount: 100000,
    rate: "対象経費により変動",
    deadline: "自治体移行計画により変動",
    expenses: ["基幹システム移行", "ガバメントクラウド", "データ移行", "運用設計"],
    combinable: ["地域デジタル基盤活用推進事業"],
    detail: "自治体の基幹業務システム標準化・共通化に関する支援。ITベンダーや地域SIerの案件探索にも関係します。",
    source: "https://www.digital.go.jp/"
  },
  {
    name: "中小企業サイバーセキュリティ対策促進助成金",
    agency: "東京都中小企業振興公社",
    region: "東京都",
    purpose: "DX",
    status: "公募中",
    maxAmount: 1500,
    rate: "1/2以内",
    deadline: "募集回ごとに変動",
    expenses: ["UTM", "EDR", "脆弱性診断", "セキュリティ監視", "規程整備"],
    combinable: ["IT導入補助金"],
    detail: "都内中小企業のサイバーセキュリティ対策設備・サービス導入を支援するDX系助成金です。",
    source: "https://www.tokyo-kosha.or.jp/"
  },
  {
    name: "DXリスキリング助成金",
    agency: "東京都",
    region: "東京都",
    purpose: "DX",
    status: "公募中",
    maxAmount: 100,
    rate: "3/4以内等",
    deadline: "募集回ごとに変動",
    expenses: ["DX研修", "eラーニング", "外部講座", "資格取得"],
    combinable: ["人材開発支援助成金 デジタル人材育成枠"],
    detail: "都内企業の従業員向けDX人材育成・リスキリングを支援する助成金候補です。",
    source: "https://www.hataraku.metro.tokyo.lg.jp/"
  },
  {
    name: "大阪府 DX推進補助金・デジタル化支援",
    agency: "大阪府・支援機関",
    region: "大阪府",
    purpose: "DX",
    status: "準備中",
    maxAmount: 500,
    rate: "1/2以内等",
    deadline: "年度予算・募集回により変動",
    expenses: ["業務システム", "EC", "クラウド", "データ活用", "専門家支援"],
    combinable: ["IT導入補助金"],
    detail: "府内中小企業のデジタル化・DX推進を支援する自治体系補助金候補。年度ごとの名称変更に注意が必要です。",
    source: "https://www.pref.osaka.lg.jp/"
  },
  {
    name: "福岡県 DX・デジタル化推進支援補助金",
    agency: "福岡県・支援機関",
    region: "福岡県",
    purpose: "DX",
    status: "準備中",
    maxAmount: 500,
    rate: "1/2以内等",
    deadline: "年度予算・募集回により変動",
    expenses: ["クラウド", "生産管理", "販売管理", "EC", "データ分析"],
    combinable: ["IT導入補助金"],
    detail: "県内中小企業のDX・デジタル化を支援する自治体系補助金候補。正式名称と公募期間は年度ごとに確認します。",
    source: "https://www.pref.fukuoka.lg.jp/"
  },
  {
    name: "中小企業新事業進出補助金",
    agency: "中小企業庁・中小企業基盤整備機構",
    region: "全国",
    purpose: "設備投資",
    status: "公募中",
    maxAmount: 9000,
    rate: "1/2",
    deadline: "公募回ごとに変動",
    expenses: ["建物費", "機械装置", "システム構築", "技術導入", "広告宣伝"],
    combinable: ["IT導入補助金", "事業承継・M&A補助金"],
    detail: "既存事業と異なる新市場・高付加価値事業への進出を支援し、企業規模拡大と賃上げにつなげる制度です。",
    source: "https://shinjigyou-shinshutsu.smrj.go.jp/entry"
  },
  {
    name: "中小企業成長加速化補助金",
    agency: "中小企業庁",
    region: "全国",
    purpose: "設備投資",
    status: "準備中",
    maxAmount: 50000,
    rate: "1/2",
    deadline: "2次公募終了・次回情報待ち",
    expenses: ["建物費", "機械装置", "ソフトウェア", "外注費", "大規模投資"],
    combinable: ["中小企業新事業進出補助金"],
    detail: "売上高100億円超を目指す中小企業の大胆な投資を支援する、上限5億円規模の成長投資制度です。",
    source: "https://www.chusho.meti.go.jp/koukai/hojyokin/kobo/2026/260224001.html"
  },
  {
    name: "地域の人事部支援事業",
    agency: "経済産業省",
    region: "全国",
    purpose: "雇用",
    status: "準備中",
    maxAmount: 3000,
    rate: "公募要領による",
    deadline: "年度公募ごとに変動",
    expenses: ["人材確保", "人材育成", "キャリア支援", "地域連携", "運営費"],
    combinable: ["人材確保等支援助成金"],
    detail: "複数の地域企業を束ね、自治体・金融機関・教育機関等と連携して人材の確保・育成・定着に取り組む事業を支援します。",
    source: "https://www.meti.go.jp/policy/sme_chiiki/jinjibu/index.html"
  }
];

const latestNews = [
  {
    level: "high",
    label: "公募中 / 7月24日締切",
    title: "事業承継・M&A補助金 第十五次公募",
    summary: "第十五次公募は2026年6月19日に申請受付を開始し、7月24日まで受け付けています。承継・M&Aを機にした設備、専門家活用、廃業・再チャレンジ等の取組を対象にコース別で確認が必要です。",
    difference: "後継者探しだけではなく、承継後の成長投資やM&A後の統合、専門家費用まで含めて検討できる点が特徴です。",
    target: "事業承継・M&Aを予定し、承継後の投資や経営革新を行う中小企業等",
    checkedAt: "中小企業庁確認 2026-06-23",
    grantName: "事業承継・M&A補助金",
    source: "https://www.chusho.meti.go.jp/koukai/hojyokin/index.html"
  },
  {
    level: "medium",
    label: "第7回公募要領公開 / 受付開始予定",
    title: "中小企業省力化投資補助事業 一般型 第7回",
    summary: "第7回の公募要領が公開され、申請受付は2026年7月上旬から7月下旬予定です。人手不足工程の省力化を設備・システム導入で進める企業は、投資計画と賃上げ計画を先に整理できます。",
    difference: "カタログ注文型と異なり、個別現場に合わせた設備・システムの導入を計画しやすい一般型です。",
    target: "人手不足の解消、生産性向上、自動化を進める中小企業・小規模事業者",
    checkedAt: "中小企業庁確認 2026-06-23",
    grantName: "中小企業省力化投資補助金",
    source: "https://www.chusho.meti.go.jp/koukai/hojyokin/index.html"
  },
  {
    level: "medium",
    label: "第4回受付終了 / 次回情報待ち",
    title: "中小企業新事業進出補助金 第4回",
    summary: "第4回の応募申請は2026年6月19日18時で終了しました。次回公募と採択結果の更新を監視します。",
    difference: "IT導入補助金のような既存業務のデジタル化ではなく、既存事業と異なる新市場・高付加価値事業への進出が中心です。事業計画と賃上げへのつながりが重視されます。",
    target: "新しい製品・サービス・市場へ進出する中小企業",
    checkedAt: "公式確認 2026-06-22",
    grantName: "中小企業新事業進出補助金",
    source: "https://shinjigyou-shinshutsu.smrj.go.jp/entry_application"
  },
  {
    level: "medium",
    label: "大型補助 / 次回公募待ち",
    title: "中小企業成長加速化補助金 上限5億円",
    summary: "売上高100億円超を目指す中小企業の大規模投資を支援。2次公募は2026年3月26日に締め切られました。",
    difference: "持続化補助金やIT導入補助金より投資規模が大きく、100億宣言、賃上げ、外需獲得、地域経済への波及など成長戦略が中心です。",
    target: "大規模設備投資で売上100億円超を目指す中小企業",
    checkedAt: "公式確認 2026-02-24",
    grantName: "中小企業成長加速化補助金",
    source: "https://www.chusho.meti.go.jp/koukai/hojyokin/kobo/2026/260224001.html"
  },
  {
    level: "medium",
    label: "2026年5月資料更新",
    title: "地域の人事部支援事業",
    summary: "地域企業の人材確保・育成・定着を、自治体や金融機関、教育機関などと一体で進める仕組みです。",
    difference: "1社単独の採用費を補助する制度ではなく、複数企業を束ねた地域全体の人材戦略を支援する点が大きな違いです。",
    target: "地域企業群を束ねる民間事業者・支援機関等",
    checkedAt: "公式資料 2026-05",
    grantName: "地域の人事部支援事業",
    source: "https://www.meti.go.jp/policy/sme_chiiki/jinjibu/index.html"
  },
  {
    level: "high",
    label: "令和8年度 最新パッケージ",
    title: "賃上げ支援助成金パッケージ",
    summary: "業務改善、人材開発、人材確保、キャリアアップなど、設備・人への投資と賃上げを支援する助成金が整理されました。",
    difference: "単独の補助金ではなく、設備投資、研修、正社員化、雇用管理改善など目的別の助成金を横断して選べるパッケージです。",
    target: "賃上げ・正社員化・人材育成・生産性向上を行う事業主",
    checkedAt: "公式確認 2026-06-22",
    grantName: "業務改善助成金",
    source: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/package_00007.html"
  }
];

grants.push({
  name: "人材開発支援助成金",
  agency: "厚生労働省",
  region: "全国",
  purpose: "雇用",
  status: "随時",
  maxAmount: 1000,
  rate: "コース別助成",
  deadline: "訓練開始前の計画届が必要",
  expenses: ["職務関連訓練", "DX研修", "リスキリング", "eラーニング", "訓練中賃金"],
  combinable: ["IT導入補助金", "業務改善助成金"],
  detail: "従業員の職務に関連した専門知識・技能の習得、DX人材育成、事業展開に伴うリスキリング等を支援します。",
  source: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyoiku_kunren/index.html"
});

grants.push(
  {
    name: "オーバーツーリズム受入環境整備促進事業",
    agency: "観光庁",
    region: "全国",
    purpose: "観光",
    status: "公募中",
    maxAmount: 5000,
    rate: "1/2以内",
    deadline: "2026-07-17 12:00",
    expenses: ["観光客受入環境", "混雑対策", "設備整備", "動線整備", "地域連携"],
    combinable: ["観光地経営の高度化事業（人材育成補助金）"],
    detail: "民間事業者等が自治体と連携し、オーバーツーリズムの未然防止・抑制に向けた面的な受入環境整備を行う事業を支援します。",
    source: "https://www.mlit.go.jp/kankocho/kobo08_00057.html"
  },
  {
    name: "観光地経営の高度化事業（人材育成補助金）",
    agency: "観光庁",
    region: "全国",
    purpose: "観光",
    status: "公募中",
    maxAmount: 0,
    rate: "公募要領による",
    deadline: "2026-06-30 17:00",
    expenses: ["人材育成プログラム", "観光経営人材", "研修", "地域連携"],
    combinable: ["人材開発支援助成金"],
    detail: "観光地を牽引する観光地経営人材の育成を目的とした研修・人材育成プログラム等を支援します。",
    source: "https://www.mlit.go.jp/kankocho/kobo06_00060.html"
  },
  {
    name: "インバウンド安全・安心対策推進事業",
    agency: "観光庁",
    region: "全国",
    purpose: "観光",
    status: "公募中",
    maxAmount: 0,
    rate: "1/2以内",
    deadline: "2026-09-25 17:00",
    expenses: ["観光案内所", "災害対応", "医療受入", "多言語対応", "安全対策"],
    combinable: ["オーバーツーリズム受入環境整備促進事業"],
    detail: "観光施設、店舗、医療機関、自治体等による訪日外国人旅行者の安全・安心確保に必要な環境整備を支援します。",
    source: "https://www.mlit.go.jp/kankocho/kobo08_00055.html"
  },
  {
    name: "産業雇用安定助成金（災害特例人材確保支援コース）",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 0,
    rate: "賃金の一部を助成",
    deadline: "助成対象期間 2026-12-31まで",
    expenses: ["在籍型出向", "出向期間中賃金", "雇用維持"],
    combinable: ["雇用調整助成金"],
    detail: "能登半島地震の影響を受けた事業主が、在籍型出向により雇用を維持する場合に出向元・出向先双方を支援します。",
    source: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/sankosaigai.html"
  }
);

const officialGrantLinks = {
  "中小企業省力化投資補助金": "https://shoryokuka.smrj.go.jp/",
  "IT導入補助金": "https://it-shien.smrj.go.jp/",
  "ものづくり・商業・サービス生産性向上促進補助金": "https://portal.monodukuri-hojo.jp/",
  "事業再構築補助金": "https://jigyou-saikouchiku.go.jp/",
  "業務改善助成金": "https://www.mhlw.go.jp/bunya/roudoukijun/jigyousya/shienjigyou/03.html",
  "東京都 創業助成事業": "https://startup-station.jp/m2/services/sogyokassei/",
  "小規模事業者持続化補助金": "https://r6.jizokukahojokin.info/",
  "省エネルギー投資促進支援事業費補助金": "https://sii.or.jp/",
  "事業承継・M&A補助金": "https://jsh.go.jp/",
  "雇用調整助成金": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/pageL07.html",
  "キャリアアップ助成金": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/part_haken/jigyounushi/career.html",
  "両立支援等助成金": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/shokuba_kosodate/ryouritsu01/",
  "65歳超雇用推進助成金": "https://www.jeed.go.jp/elderly/subsidy/index.html",
  "障害者雇用納付金制度に基づく助成金": "https://www.jeed.go.jp/disability/subsidy/index.html",
  "デジタル田園都市国家構想交付金 デジタル実装タイプ": "https://www.chisou.go.jp/sousei/about/mirai/policy/policy1.html",
  "中小企業新事業進出補助金": "https://shinjigyou-shinshutsu.smrj.go.jp/entry",
  "中小企業成長加速化補助金": "https://www.chusho.meti.go.jp/koukai/hojyokin/kobo/2026/260224001.html",
  "地域の人事部支援事業": "https://www.meti.go.jp/policy/sme_chiiki/jinjibu/index.html"
  ,"人材開発支援助成金": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyoiku_kunren/index.html",
  "人材確保等支援助成金": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000199292_00005.html",
  "成長型中小企業等研究開発支援事業 Go-Tech": "https://www.chusho.meti.go.jp/sapoin/index.php",
  "トライアル雇用助成金": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/trial_koyou.html",
  "オーバーツーリズム受入環境整備促進事業": "https://www.mlit.go.jp/kankocho/kobo08_00057.html",
  "観光地経営の高度化事業（人材育成補助金）": "https://www.mlit.go.jp/kankocho/kobo06_00060.html",
  "インバウンド安全・安心対策推進事業": "https://www.mlit.go.jp/kankocho/kobo08_00055.html",
  "産業雇用安定助成金（災害特例人材確保支援コース）": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/sankosaigai.html"
};

grants.forEach((grant) => {
  grant.officialUrl = officialGrantLinks[grant.name] || "";
  grant.verified = Boolean(grant.officialUrl);
  if (grant.verified) grant.source = grant.officialUrl;
});

const newBusinessGrant = grants.find((grant) => grant.name === "中小企業新事業進出補助金");
if (newBusinessGrant) {
  newBusinessGrant.status = "準備中";
  newBusinessGrant.deadline = "第4回受付終了（2026-06-19）";
}

const incomingGrantFeed = [
  {
    name: "自治体GX設備更新支援補助金",
    agency: "自治体・外郭団体",
    region: "大阪府",
    purpose: "省エネ",
    status: "公募中",
    maxAmount: 1200,
    rate: "1/2以内",
    deadline: "予算上限に達し次第終了",
    expenses: ["高効率空調", "LED", "断熱改修", "省エネ診断"],
    combinable: ["IT導入補助金", "業務改善助成金"],
    detail: "地域事業者のエネルギーコスト削減に向けた設備更新を支援する新着候補です。",
    source: "https://www.jgrants-portal.go.jp/"
  },
  {
    name: "人材開発支援助成金 デジタル人材育成枠",
    agency: "厚生労働省",
    region: "全国",
    purpose: "雇用",
    status: "随時",
    maxAmount: 1000,
    rate: "経費助成・賃金助成",
    deadline: "訓練開始前の計画届が必要",
    expenses: ["研修費", "外部講師", "eラーニング", "賃金助成"],
    combinable: ["IT導入補助金"],
    detail: "従業員のDX、AI、クラウド、セキュリティ研修などに使える助成金候補です。",
    source: "https://www.mhlw.go.jp/"
  },
  {
    name: "福岡県スタートアップ実証支援事業",
    agency: "福岡県",
    region: "福岡県",
    purpose: "創業",
    status: "公募中",
    maxAmount: 800,
    rate: "2/3以内",
    deadline: "募集期ごとに変動",
    expenses: ["実証費", "開発費", "専門家経費", "広報費"],
    combinable: ["小規模事業者持続化補助金"],
    detail: "新規事業の実証実験や地域課題解決型サービスの立ち上げを支援する新着候補です。",
    source: "https://www.jgrants-portal.go.jp/"
  },
  {
    name: "KOMAKIYA動画ピックアップ 地域DX・自治体連携補助",
    agency: "KOMAKIYA動画メモ・公式確認待ち",
    region: "全国",
    purpose: "DX",
    status: "準備中",
    maxAmount: 100000,
    rate: "制度ごとに確認",
    deadline: "動画公開日・公式公募により確認",
    expenses: ["自治体DX", "地域アプリ", "業務システム", "データ連携", "AI活用"],
    combinable: ["デジタル田園都市国家構想交付金 デジタル実装タイプ", "IT導入補助金"],
    detail: "KOMAKIYA動画で扱われる可能性が高い地域DX・自治体連携テーマを、公式制度へ突合するための候補として追加します。",
    source: "https://youtube.com/@akiramakinoya?si=Xy5iF1Jw-ScwrphV"
  },
  {
    name: "KOMAKIYA動画ピックアップ 中小企業DX・省力化補助",
    agency: "KOMAKIYA動画メモ・公式確認待ち",
    region: "全国",
    purpose: "DX",
    status: "公募中",
    maxAmount: 1500,
    rate: "制度ごとに確認",
    deadline: "動画公開日・公式公募により確認",
    expenses: ["ITツール", "省力化設備", "AI", "クラウド", "セキュリティ"],
    combinable: ["IT導入補助金", "中小企業省力化投資補助金", "業務改善助成金"],
    detail: "KOMAKIYA動画の補助金速報から、中小企業のDX・省力化に関係する制度を拾うための確認用候補です。",
    source: "https://youtube.com/@akiramakinoya?si=Xy5iF1Jw-ScwrphV"
  }
];

const videoInsights = [
  {
    channel: "KOMAKIYA (@akiramakinoya)",
    topic: "動画から補助金・助成金・交付金の制度名を抽出",
    detail: "動画タイトル、概要欄、字幕が取得できる場合は字幕から、制度名・上限額・締切・対象者を候補化します。"
  },
  {
    channel: "KOMAKIYA (@akiramakinoya)",
    topic: "デジタル田園都市・地域DX・自治体DXの話題を優先検知",
    detail: "自治体が申請主体の交付金でも、民間事業者が受託・連携・再補助で関係する可能性があるため検索対象に残します。"
  },
  {
    channel: "KOMAKIYA (@akiramakinoya)",
    topic: "動画情報は公式公募要領へ突合",
    detail: "動画由来の情報は速報扱いにして、jGrants、内閣府、厚労省、自治体ページで確定情報へ更新します。"
  }
];

const sources = [
  {
    name: "jGrants",
    owner: "デジタル庁",
    type: "公式",
    url: "https://www.jgrants-portal.go.jp/",
    note: "国・自治体の補助金検索と電子申請。制度ID、募集期間、対象者、申請フォーム連携の中核候補。"
  },
  {
    name: "ミラサポplus",
    owner: "中小企業庁",
    type: "公式",
    url: "https://mirasapo-plus.go.jp/",
    note: "中小企業向け支援制度、事例、電子申請サポート情報の確認先。"
  },
  {
    name: "厚生労働省 助成金",
    owner: "厚生労働省",
    type: "公式",
    url: "https://www.mhlw.go.jp/",
    note: "雇用、賃上げ、人材開発、両立支援など助成金の一次情報。"
  },
  {
    name: "各自治体・外郭団体",
    owner: "都道府県・市区町村",
    type: "公式",
    url: "https://www.j-lis.go.jp/spd/map-search/cms_1069.html",
    note: "地域限定の補助金・交付金。所在地条件と予算終了ステータスの更新が重要。"
  },
  {
    name: "KOMAKIYA YouTube (@akiramakinoya)",
    owner: "専門家・補助金解説動画",
    type: "速報・解説",
    url: "https://youtube.com/@akiramakinoya?si=Xy5iF1Jw-ScwrphV",
    note: "動画タイトル・概要欄・字幕から補助金、助成金、交付金、DX、デジタル田園都市などの制度候補を抽出する参考ソース。採択条件や締切は必ず公式公募要領へ突合します。"
  }
];

const filters = {
  keyword: document.querySelector("#keywordInput"),
  region: document.querySelector("#regionSelect"),
  purpose: document.querySelector("#purposeSelect"),
  status: document.querySelector("#statusSelect")
};

const grantList = document.querySelector("#grantList");
const latestNewsList = document.querySelector("#latestNewsList");
const comboList = document.querySelector("#comboList");
const sourceList = document.querySelector("#sourceList");
const videoInsightList = document.querySelector("#videoInsightList");
const resultCount = document.querySelector("#resultCount");
const maxSingle = document.querySelector("#maxSingle");
const comboTotal = document.querySelector("#comboTotal");
const refreshButton = document.querySelector("#refreshButton");
const refreshResult = document.querySelector("#refreshResult");
const lastUpdated = document.querySelector("#lastUpdated");
const updateMessage = document.querySelector("#updateMessage");
const grantDetailDialog = document.querySelector("#grantDetailDialog");
const grantDetailTitle = document.querySelector("#grantDetailTitle");
const grantDetailAgency = document.querySelector("#grantDetailAgency");
const grantDetailBody = document.querySelector("#grantDetailBody");
const grantOfficialLink = document.querySelector("#grantOfficialLink");
const closeGrantDetail = document.querySelector("#closeGrantDetail");
const closeGrantDetailBottom = document.querySelector("#closeGrantDetailBottom");
const startApplicationPrepFromDialog = document.querySelector("#startApplicationPrepFromDialog");
const tryMonodukuriPrep = document.querySelector("#tryMonodukuriPrep");
const prepSelectedGrant = document.querySelector("#prepSelectedGrant");
const prepWorkbench = document.querySelector("#prepWorkbench");
const counselingForm = document.querySelector("#counselingForm");
const simulationResults = document.querySelector("#simulationResults");
const simulationCount = document.querySelector("#simulationCount");
const simulationTotal = document.querySelector("#simulationTotal");
const topMatchName = document.querySelector("#topMatchName");
const counselingNotes = document.querySelector("#counselingNotes");
const investmentAmountInput = document.querySelector("#investmentAmount");
const investmentUndecidedInput = document.querySelector("#investmentUndecided");
const jgrantsStatus = document.querySelector("#jgrantsStatus");
const regionalPolicySelect = document.querySelector("#regionalPolicySelect");
const regionalGrantList = document.querySelector("#regionalGrantList");
const rankingMetric = document.querySelector("#rankingMetric");
const prefectureRankingChart = document.querySelector("#prefectureRankingChart");
const backToTop = document.querySelector("#backToTop");
let activeGrantForPrep = null;

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const regionalBlocks = {
  "北海道地方": ["北海道"],
  "東北地方": ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  "関東・甲信越地方": ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "山梨県", "長野県"],
  "東海・北陸地方": ["富山県", "石川県", "福井県", "岐阜県", "静岡県", "愛知県", "三重県"],
  "近畿地方": ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  "中国地方": ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  "四国地方": ["徳島県", "香川県", "愛媛県", "高知県"],
  "九州・沖縄地方": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"]
};

const regionalPolicyProfiles = {
  "北海道地方": { headline: "食・観光・再生可能エネルギーを成長産業へ", description: "広い土地と一次産業、観光資源を生かし、農林水産業の高付加価値化、物流省力化、寒冷地GX、通年観光を組み合わせる提案が有効です。" },
  "東北地方": { headline: "地域資源の高付加価値化と人手不足対応", description: "農林水産・製造・観光の地域資源に、DX、省力化、事業承継、再生可能エネルギーを重ねる政策との相性が高い地域です。" },
  "関東・甲信越地方": { headline: "DX・研究開発・スタートアップと地域産業を接続", description: "都市部の技術・人材・市場と、製造業、農業、観光など各県の産業基盤を結ぶ実証、設備投資、人材確保の提案が中心になります。" },
  "東海・北陸地方": { headline: "ものづくり高度化とGX・事業承継", description: "製造業の集積を生かし、自動化、AI品質管理、脱炭素設備、サプライチェーン強靱化、技能承継を一体で進める提案が有効です。" },
  "近畿地方": { headline: "ものづくり・観光・ライフサイエンスの新事業化", description: "製造技術、大学・研究機関、文化観光を基盤に、新製品開発、インバウンド対応、ヘルスケア、商店街活性化を組み合わせやすい地域です。" },
  "中国地方": { headline: "地域製造業の転換と中山間地域の持続性", description: "製造業のGX転換、物流・交通の省力化、農林水産品の販路開拓、観光周遊、地域企業の事業承継が重要な提案軸です。" },
  "四国地方": { headline: "一次産業・観光・ヘルスケアの地域実装", description: "農林水産品のブランド化、観光消費の拡大、移動・医療課題のDX、省エネ設備を小規模事業者にも導入しやすくする提案が有効です。" },
  "九州・沖縄地方": { headline: "成長投資・観光・半導体・食の外需獲得", description: "半導体関連投資、農林水産・食品輸出、観光高付加価値化、スタートアップ、再生可能エネルギーを地域雇用へつなげる政策が中心です。" }
};

const prefectureSpecialties = {
  "北海道":"農業・酪農・食品、観光、宇宙、再生可能エネルギー", "青森県":"農林水産・食品、観光、エネルギー", "岩手県":"自動車・半導体、農林水産、復興・観光", "宮城県":"水産・食品、ものづくり、DX・スタートアップ", "秋田県":"再生可能エネルギー、農業、事業承継", "山形県":"精密ものづくり、食品、観光", "福島県":"復興、新産業・ロボット、再生可能エネルギー",
  "茨城県":"研究開発、ものづくり、農業", "栃木県":"自動車・航空、食品、観光", "群馬県":"自動車・製造、省力化、温泉観光", "埼玉県":"中小製造、物流、DX", "千葉県":"臨海産業、農水産、観光・物流", "東京都":"スタートアップ、DX、GX、医療・金融、商店街", "神奈川県":"研究開発、ライフサイエンス、製造・脱炭素", "新潟県":"食品・農業、金属加工、雪国観光", "山梨県":"半導体・精密、ワイン・農業、観光", "長野県":"精密・電子、食品、山岳観光",
  "富山県":"医薬品、機械・金属、環境", "石川県":"伝統工芸、機械、観光・復興", "福井県":"眼鏡・繊維・機械、恐竜観光", "岐阜県":"航空宇宙、陶磁器・木工、観光", "静岡県":"輸送機器、食品・茶、観光", "愛知県":"自動車・航空宇宙、スタートアップ、GX", "三重県":"半導体・輸送機器、観光、農水産",
  "滋賀県":"環境・水、製造、観光", "京都府":"文化観光、大学研究、伝統産業・スタートアップ", "大阪府":"ライフサイエンス、GX、DX、商業・スタートアップ", "兵庫県":"製造・港湾、航空宇宙、観光", "奈良県":"観光・文化、木材、地域商業", "和歌山県":"農林水産、観光、宇宙・デジタル",
  "鳥取県":"農業、食品、観光、地域DX", "島根県":"IT、人材還流、観光、特殊鋼", "岡山県":"化学・製造、繊維、農業", "広島県":"自動車、造船、観光、GX", "山口県":"化学・素材、医療、観光", "徳島県":"LED・化学、医療、農林水産", "香川県":"物流・造船、食品、観光", "愛媛県":"紙・化学、造船、柑橘・観光", "高知県":"農林水産、防災、観光",
  "福岡県":"半導体、スタートアップ、物流・食", "佐賀県":"半導体、陶磁器、農業・観光", "長崎県":"造船・海洋、観光、水産", "熊本県":"半導体、農業・食品、観光", "大分県":"半導体・自動車、温泉観光、エネルギー", "宮崎県":"農畜産・食品、観光、再エネ", "鹿児島県":"畜産・食品、宇宙、観光・離島", "沖縄県":"観光、物流、IT、スタートアップ、島しょGX"
};

const proposalByPurpose = {
  "DX":"予約・受発注・会計・顧客管理を連携し、AIを使った需要予測や業務自動化まで段階的に導入する。",
  "設備投資":"人手不足工程を特定し、省力化設備と作業標準化、賃上げ計画を一つの投資計画にまとめる。",
  "雇用":"採用だけでなく、正社員化、リスキリング、働き方改善、定着率向上を一体の人材計画にする。",
  "脱炭素":"電力・燃料使用量を可視化し、高効率設備、再エネ、断熱改修を投資回収年数とともに提案する。",
  "創業":"地域課題と顧客像を明確にし、創業費、販路開拓、実証、専門家支援を段階別に組み合わせる。",
  "販路開拓":"地域産品・技術をEC、展示会、インバウンド、海外輸出へ展開し、売上目標まで数値化する。",
  "研究開発":"大学・支援機関との共同開発、試作、知財取得、実証、量産設備までの工程表を作る。",
  "観光":"滞在時間と客単価を伸ばす体験商品、多言語化、予約DX、二次交通を一体で設計する。",
  "農業":"スマート農業、省力化、加工・ブランド化、冷蔵物流、輸出をつないだ六次産業化を検討する。",
  "事業承継":"後継者・M&Aだけでなく、承継後の設備更新、DX、新商品開発を同時に計画する。",
  "その他":"制度の対象経費から逆算せず、地域課題、事業効果、雇用・売上への波及を先に整理する。"
};

function getPolicyBlock(prefecture) {
  return Object.keys(regionalBlocks).find((block) => regionalBlocks[block].includes(prefecture)) || "関東・甲信越地方";
}

function populateRegionSelects() {
  const searchRegion = document.querySelector("#regionSelect");
  const counselingRegion = document.querySelector("#counselingRegion");
  searchRegion.insertAdjacentHTML("beforeend", prefectures.map((name) => `<option value="${name}">${name}</option>`).join(""));
  counselingRegion.innerHTML = prefectures.map((name) => `<option value="${name}"${name === "東京都" ? " selected" : ""}>${name}</option>`).join("");
  regionalPolicySelect.innerHTML = prefectures.map((name) => `<option value="${name}"${name === "東京都" ? " selected" : ""}>${name}</option>`).join("");
}

function grantRegions(grant) {
  return grant.regions?.length ? grant.regions : [grant.region || "全国"];
}

function isNationwide(grant) {
  return grantRegions(grant).includes("全国");
}

function matchesRegion(grant, prefecture) {
  return isNationwide(grant) || grantRegions(grant).some((region) => (
    region === prefecture || regionalBlocks[region]?.includes(prefecture)
  ));
}

function formatAmount(amount) {
  if (!amount || amount <= 0) return "要確認";
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString("ja-JP")}億円`;
  }
  return `${amount.toLocaleString("ja-JP")}万円`;
}

function inferPurpose(item) {
  const text = `${item.title || ""} ${item.institution_name || ""} ${item.use_purpose || ""}`;
  if (/DX|デジタル|IT|AI|システム|クラウド/i.test(text)) return "DX";
  if (/省力|自動化|設備|機械/.test(text)) return "設備投資";
  if (/雇用|人材|研修|リスキリング/.test(text)) return "雇用";
  if (/省エネ|脱炭素|GX|再生可能/.test(text)) return "脱炭素";
  if (/創業|起業|スタートアップ/.test(text)) return "創業";
  if (/販路|海外展開|輸出/.test(text)) return "販路開拓";
  if (/研究|開発|実証/.test(text)) return "研究開発";
  if (/承継|M&A/.test(text)) return "事業承継";
  if (/観光|宿泊|インバウンド/.test(text)) return "観光";
  if (/農業|林業|水産/.test(text)) return "農業";
  return "その他";
}

function formatJGrantsDate(value) {
  if (!value) return "公式ページで確認";
  return value.slice(0, 10).replaceAll("-", "/");
}

function normalizeJGrants(item) {
  const area = item.target_area_search || "全国";
  const regions = area.split("/").map((name) => name.trim()).filter(Boolean);
  const nationwide = regions.includes("全国");
  const regionLabel = nationwide
    ? "全国"
    : regions.length > 3
      ? `${regions.slice(0, 2).join("・")}ほか${regions.length - 2}県`
      : regions.join("・");
  const officialTitle = item.title || "名称未設定の補助金";
  return {
    name: `${officialTitle} [${item.name || item.id}]`,
    officialTitle,
    grantCode: item.name || item.id,
    agency: item.institution_name || "Jグランツ掲載機関",
    region: nationwide ? "全国" : regions[0] || "全国",
    regions,
    regionLabel,
    purpose: inferPurpose(item),
    status: "公募中",
    maxAmount: Math.round((Number(item.subsidy_max_limit) || 0) / 10000),
    rate: item.subsidy_rate || "要確認",
    deadline: formatJGrantsDate(item.acceptance_end_datetime),
    expenses: [item.use_purpose || "対象経費は公式公募要領で確認"],
    combinable: [],
    detail: item.subsidy_catch_phrase || item.detail || `${item.institution_name || "実施機関"}がJグランツに掲載している公募中の制度です。`,
    officialUrl: item.front_subsidy_detail_page_url || `https://www.jgrants-portal.go.jp/subsidy/${encodeURIComponent(item.id)}`,
    source: item.front_subsidy_detail_page_url || `https://www.jgrants-portal.go.jp/subsidy/${encodeURIComponent(item.id)}`,
    verified: true,
    jgrantsId: item.id,
    isJGrants: true
  };
}

function isAdministrativeEntry(item) {
  return /状況報告|実績報告|事業完了後|完了後申請|変更申請|交付申請済|概算払|精算払|請求手続/.test(item.title || "");
}

async function syncJGrantsCatalog() {
  try {
    const endpoint = location.protocol === "file:"
      ? "http://127.0.0.1:4178/api/jgrants"
      : "/api/jgrants";
    let payload;
    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      if (response.ok) payload = await response.json();
    } catch (error) {
      payload = null;
    }
    if (!payload) {
      const keywords = ["補助金", "助成金", "DX", "省力化", "人材", "創業", "観光", "農業", "脱炭素", "研究開発"];
      const responses = await Promise.all(keywords.map(async (keyword) => {
        const query = new URLSearchParams({ keyword, sort: "created_date", order: "DESC", acceptance: "1" });
        const officialResponse = await fetch(`https://api.jgrants-portal.go.jp/exp/v1/public/subsidies?${query}`);
        if (!officialResponse.ok) return [];
        return (await officialResponse.json()).result || [];
      }));
      const unique = new Map(responses.flat().map((item) => [item.id, item]));
      payload = {
        checkedAt: getCurrentTimestamp(),
        count: unique.size,
        subsidies: [...unique.values()]
      };
    }
    const existingIds = new Set(grants.map((grant) => grant.jgrantsId).filter(Boolean));
    const additions = payload.subsidies
      .filter((item) => !existingIds.has(item.id) && !isAdministrativeEntry(item))
      .map(normalizeJGrants);
    grants.push(...additions);
    jgrantsStatus.textContent = `Jグランツ公式データ ${payload.count.toLocaleString("ja-JP")}件を同期済み（${payload.checkedAt}）`;
    render();
    return additions.length;
  } catch (error) {
    jgrantsStatus.textContent = "Jグランツ公式データの同期に失敗しました。更新ボタンで再試行できます。";
    return 0;
  }
}

function matchesGrant(grant) {
  const keyword = filters.keyword.value.trim().toLowerCase();
  const keywordTarget = [
    grant.name,
    grant.agency,
    grant.purpose,
    grant.detail,
    grant.expenses.join(" ")
  ].join(" ").toLowerCase();

  return (
    grant.verified &&
    (!keyword || keywordTarget.includes(keyword)) &&
    (filters.region.value === "all" || matchesRegion(grant, filters.region.value)) &&
    (filters.purpose.value === "all" || grant.purpose === filters.purpose.value) &&
    (filters.status.value === "all" || grant.status === filters.status.value)
  );
}

function getCombo(grantPool) {
  const sorted = [...grantPool]
    .filter((grant) => grant.status !== "準備中")
    .sort((a, b) => b.maxAmount - a.maxAmount);

  const chosen = [];
  const usedPurposes = new Set();

  for (const grant of sorted) {
    const hasConflict = chosen.some((item) => !item.combinable.includes(grant.name) && item.purpose === grant.purpose);
    if (!hasConflict && !usedPurposes.has(grant.purpose)) {
      chosen.push(grant);
      usedPurposes.add(grant.purpose);
    }
    if (chosen.length === 4) break;
  }

  return chosen;
}

function renderGrants(grantPool) {
  grantList.innerHTML = grantPool
    .map(
      (grant) => `
        <article class="grant-card ${grant.isNew ? "new-grant" : ""}">
          <div>
            <h3>${grant.officialTitle || grant.name}</h3>
            ${grant.isJGrants ? `<span class="grant-code">公式登録 ${grant.grantCode} / ${grant.regionLabel}</span>` : ""}
            <p>${grant.detail}</p>
            <div class="meta">
              ${grant.isNew ? '<span class="tag fresh">新着</span>' : ""}
              <span class="tag status">${grant.status}</span>
              <span class="tag">${grant.regionLabel || grant.region}</span>
              <span class="tag">${grant.purpose}</span>
              <span class="tag">補助率 ${grant.rate}</span>
              <span class="tag">締切 ${grant.deadline}</span>
            </div>
          </div>
          <div class="amount-box">
            <span>最大採択額</span>
            <strong>${formatAmount(grant.maxAmount)}</strong>
            <button class="detail-action" type="button" data-grant-name="${encodeURIComponent(grant.name)}">要件・詳細を見る</button>
            <button class="prep-action" type="button" data-start-application="${encodeURIComponent(grant.name)}">要件確認・10案生成</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderRegionalStrategy(prefecture = regionalPolicySelect.value || "東京都") {
  const block = getPolicyBlock(prefecture);
  const profile = regionalPolicyProfiles[block];
  const allCandidates = grants.filter((grant) => grant.verified && matchesRegion(grant, prefecture));
  const localGrants = allCandidates.filter((grant) => !isNationwide(grant));
  const purposeCounts = localGrants.reduce((counts, grant) => {
    counts[grant.purpose] = (counts[grant.purpose] || 0) + 1;
    return counts;
  }, {});
  const topPurposes = Object.entries(purposeCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const proposalPurposes = topPurposes.length ? topPurposes.map(([purpose]) => purpose) : ["DX", "設備投資", "雇用"];
  const largest = allCandidates.reduce((max, grant) => Math.max(max, grant.maxAmount || 0), 0);

  document.querySelector("#regionalPrefecture").textContent = prefecture;
  document.querySelector("#regionalHeadline").textContent = profile.headline;
  document.querySelector("#regionalDescription").textContent = profile.description;
  document.querySelector("#regionalGrantCount").textContent = `${localGrants.length.toLocaleString("ja-JP")}件`;
  document.querySelector("#regionalAllCount").textContent = `${allCandidates.length.toLocaleString("ja-JP")}件`;
  document.querySelector("#regionalMaxAmount").textContent = formatAmount(largest);

  const dataTheme = topPurposes.length
    ? topPurposes.map(([purpose, count]) => `<li><strong>${purpose}</strong><span>地域限定制度 ${count}件</span></li>`).join("")
    : "<li><strong>地域限定情報を確認中</strong><span>全国制度を中心に提案を組み立てます</span></li>";
  document.querySelector("#regionalThemes").innerHTML = `
    <div class="policy-feature"><span>産業・地域資源</span><strong>${prefectureSpecialties[prefecture]}</strong></div>
    <div class="policy-feature"><span>現在の公募から見える重点</span><ul>${dataTheme}</ul></div>
  `;

  document.querySelector("#regionalProposals").innerHTML = proposalPurposes.slice(0, 4).map((purpose, index) => `
    <article>
      <span>${String(index + 1).padStart(2, "0")} / ${purpose}</span>
      <p>${proposalByPurpose[purpose] || proposalByPurpose["その他"]}</p>
    </article>
  `).join("");

  const highlighted = [...localGrants].sort((a, b) => (b.maxAmount || 0) - (a.maxAmount || 0)).slice(0, 6);
  regionalGrantList.innerHTML = highlighted.length
    ? highlighted.map((grant) => `
        <article>
          <div>
            <span>${grant.purpose} / ${grant.deadline}</span>
            <h3>${grant.officialTitle || grant.name}</h3>
            <p>${grant.regionLabel || grant.region} / 最大 ${formatAmount(grant.maxAmount)}</p>
          </div>
          <button class="detail-action" type="button" data-grant-name="${encodeURIComponent(grant.name)}">詳細</button>
        </article>
      `).join("")
    : `<div class="regional-empty"><strong>現在、Jグランツに地域限定制度の掲載がありません。</strong><span>${prefecture}を対象に含む全国制度${allCandidates.length}件から提案できます。</span></div>`;
}

function localGrantsFor(prefecture) {
  return grants.filter((grant) => grant.verified && !isNationwide(grant) && matchesRegion(grant, prefecture));
}

function renderPrefectureRanking() {
  const metric = rankingMetric.value;
  const rankingConfig = {
    count: {
      description: "全国制度を除く、Jグランツ掲載の地域限定制度数で比較しています。",
      value: (items) => items.length,
      format: (value) => `${value}件`
    },
    maxAmount: {
      description: "地域限定制度のうち、掲載されている最大採択額で比較しています。上限未掲載の制度は集計対象外です。",
      value: (items) => items.reduce((max, item) => Math.max(max, item.maxAmount || 0), 0),
      format: (value) => formatAmount(value)
    },
    digital: {
      description: "地域限定制度のうち、DX・AI・IT・省力化・自動化に関する制度数で比較しています。",
      value: (items) => items.filter((item) => item.purpose === "DX" || /DX|AI|IT|デジタル|省力化|自動化/.test(searchableGrantText(item))).length,
      format: (value) => `${value}件`
    }
  }[metric];
  const ranked = prefectures
    .map((prefecture) => ({ prefecture, value: rankingConfig.value(localGrantsFor(prefecture)) }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  const maxValue = ranked[0]?.value || 1;

  document.querySelector("#rankingDescription").textContent = rankingConfig.description;
  prefectureRankingChart.innerHTML = ranked.length
    ? ranked.map((item, index) => `
        <button class="ranking-row" type="button" data-ranking-prefecture="${item.prefecture}" aria-label="${item.prefecture}の政策分析を表示">
          <span class="ranking-rank">${index + 1}</span>
          <span class="ranking-name">${item.prefecture}</span>
          <span class="ranking-track"><span class="ranking-bar" style="width: ${Math.max(7, Math.round((item.value / maxValue) * 100))}%"></span></span>
          <strong>${rankingConfig.format(item.value)}</strong>
        </button>
      `).join("")
    : `<div class="regional-empty"><strong>ランキングを作成するための地域限定制度を同期中です。</strong></div>`;
}

function renderLatestNews() {
  latestNewsList.innerHTML = latestNews
    .map(
      (news) => `
        <article class="news-card is-${news.level}">
          <div>
            <span class="news-kicker">${news.label}</span>
            <h3>${news.title}</h3>
            <p>${news.summary}</p>
            <div class="news-comparison">
              <strong>今までと何が違う？</strong>
              ${news.difference}
            </div>
          </div>
          <div class="news-meta">
            <span>主な対象</span>
            <strong>${news.target}</strong>
            <span>${news.checkedAt}</span>
            ${news.grantName ? `<button class="detail-action" type="button" data-news-grant="${encodeURIComponent(news.grantName)}">要件を確認</button>` : ""}
            <a href="${news.source}" target="_blank" rel="noreferrer">公式更新情報</a>
          </div>
        </article>
      `
    )
    .join("");
}

async function syncMakinoyaDailyNews() {
  const status = document.querySelector("#newsSourceStatus");
  try {
    const endpoint = location.protocol === "file:"
      ? "http://127.0.0.1:4178/api/makinoya-feed"
      : "/api/makinoya-feed";
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error("feed unavailable");
    const payload = await response.json();
    const existingTitles = new Set(latestNews.map((item) => item.title));
    const additions = payload.news.filter((item) => !existingTitles.has(item.title));
    latestNews.unshift(...additions);
    renderLatestNews();
    status.textContent = `マキノヤ先生の動画を確認 ${payload.checkedAt} / 新着${additions.length}件`;
    return additions.length;
  } catch (error) {
    status.textContent = "動画速報の自動取得はサーバー起動時に有効 / 公式確認済みメモを表示中";
    return 0;
  }
}

latestNewsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-news-grant]");
  if (!button) return;
  const name = decodeURIComponent(button.dataset.newsGrant);
  const grant = grants.find((item) => item.name === name);
  if (grant) openGrantDetail(grant);
});

function getApplicantDescription(grant) {
  if (grant.name.includes("交付金") || grant.agency.includes("内閣府")) {
    return "主な申請主体は地方公共団体です。民間事業者は連携先、受託先、再補助先として参加できる場合があります。";
  }
  if (grant.agency.includes("厚生労働省") || grant.name.includes("助成金")) {
    return "雇用保険適用事業所など、各コースの要件を満たす事業主が中心です。実施前の計画届が必要な制度があります。";
  }
  if (!isNationwide(grant)) {
    return `${grant.regionLabel || grantRegions(grant).join("・")}内に本店・事業所を置く事業者等が中心です。所在地、創業年数、税の滞納がないこと等を確認します。`;
  }
  return "国内の中小企業・小規模事業者等が中心です。業種、資本金、従業員数、事業期間など制度固有の条件があります。";
}

function getRequirementItems(grant) {
  const items = [
    getApplicantDescription(grant),
    `対象となる取り組みが「${grant.purpose}」の政策目的に合致していること。`,
    `対象経費は ${grant.expenses.join("、")} など。交付決定前の契約・発注は対象外になる場合があります。`,
    `補助率・助成率は ${grant.rate}。上限額は申請枠、従業員規模、賃上げ等で変動します。`
  ];

  if (grant.status === "準備中") {
    items.push("現在は準備中・次回公募待ちの候補です。募集開始日と公募要領の公開を確認してください。");
  } else {
    items.push(`申請状況は「${grant.status}」。締切は「${grant.deadline}」です。予算到達で早期終了する場合があります。`);
  }
  return items;
}

function getGoalLabels(profile) {
  const labels = {
    hire: "人材採用",
    laborSaving: "省力化",
    reskill: "リスキリング",
    ai: "AI導入",
    newBusiness: "新事業",
    dx: "DX・クラウド化",
    wage: "賃上げ",
    sales: "販路開拓",
    energy: "省エネ・脱炭素",
    succession: "事業承継・M&A",
    export: "海外展開",
    startup: "創業"
  };
  return profile.goals.map((goal) => labels[goal] || goal);
}

function buildGrantPlanIdeas(grant, profile) {
  const goalLabels = getGoalLabels(profile);
  const expenses = grant.expenses.slice(0, 3);
  const memo = document.querySelector("#companyMemo")?.value.trim();
  const website = document.querySelector("#companyWebsite")?.value.trim();
  const baseDocuments = ["会社ホームページ", "会社概要", "直近決算書", "見積書", "事業計画メモ", "従業員数が分かる資料"];
  const targetAmount = profile.investmentUndecided
    ? grant.maxAmount
    : Math.min(grant.maxAmount, Math.round(profile.investment * 0.5));
  const themes = [
    ["AI外観検査・品質管理", "検査工程の属人化を減らし、不良率低下と検査時間短縮を狙う。", ["設備仕様書", "AIツール見積書", "現行検査工程の説明"]],
    ["省力化設備・自動搬送", "人手不足工程を設備導入で置き換え、作業時間と残業を減らす。", ["設備カタログ", "導入前後の工程表", "人員配置表"]],
    ["新製品試作・高付加価値化", "既存技術を活かして新製品を試作し、新市場への販売を狙う。", ["試作品仕様", "ターゲット市場資料", "販売計画"]],
    ["生産管理システム導入", "受注、在庫、工程、原価を一元管理し、納期短縮と粗利改善を狙う。", ["システム見積書", "業務フロー", "導入スケジュール"]],
    ["EC・BtoB受注のデジタル化", "既存販路に加え、オンライン受注や顧客管理を強化する。", ["Web制作見積", "商品一覧", "販路計画"]],
    ["脱炭素・省エネ設備更新", "高効率設備へ更新し、エネルギーコストとCO2排出量を下げる。", ["電気料金明細", "設備比較資料", "省エネ効果試算"]],
    ["賃上げ連動の生産性向上", "設備投資で付加価値を高め、賃上げ原資を作る計画にする。", ["賃金台帳", "賃上げ計画", "付加価値額の試算"]],
    ["小ロット・短納期対応", "多品種少量生産に対応し、単価向上と受注機会拡大を狙う。", ["受注実績", "工程別リードタイム", "設備見積書"]],
    ["地域連携・共同開発", "地域企業や研究機関と連携し、技術開発や販路開拓につなげる。", ["連携先資料", "共同開発計画", "契約・覚書案"]],
    ["海外・広域販路開拓", "品質や独自技術を訴求し、展示会、越境EC、代理店開拓を進める。", ["海外販路資料", "展示会見積", "販売先候補リスト"]]
  ];

  return themes.map(([title, summary, extraDocs], index) => ({
    id: `plan-${index + 1}`,
    title,
    summary,
    fit: [
      `${profile.region}、従業員${profile.employees}名規模`,
      goalLabels.length ? goalLabels.join("、") : grant.purpose,
      memo || "会社メモ未入力",
      website || "会社HP未入力"
    ],
    amount: index < 3 ? grant.maxAmount : Math.max(0, targetAmount - index * 30),
    expenses: expenses.length ? expenses : ["機械装置", "システム構築", "外注費"],
    documents: [...baseDocuments, ...extraDocs],
    next: "この案を選んだら、別の書類作成アプリに制度情報・会社情報・選択案・必要書類リストを渡す。"
  }));
}

function renderApplicationPrep(grant) {
  activeGrantForPrep = grant;
  const profile = readCounselingProfile();
  const ideas = buildGrantPlanIdeas(grant, profile);
  const requirements = getRequirementItems(grant);
  prepSelectedGrant.textContent = grant.officialTitle || grant.name;
  prepWorkbench.innerHTML = `
    <div class="prep-summary">
      <div>
        <p class="section-label">${grant.agency} / ${grant.regionLabel || grant.region}</p>
        <h3>${grant.officialTitle || grant.name}</h3>
        <p>${grant.detail}</p>
      </div>
      <div class="prep-summary-metrics">
        <article><span>最大採択額</span><strong>${formatAmount(grant.maxAmount)}</strong></article>
        <article><span>補助率</span><strong>${grant.rate}</strong></article>
        <article><span>締切</span><strong>${grant.deadline}</strong></article>
      </div>
    </div>

    <div class="prep-review-grid">
      <section class="prep-panel">
        <div class="prep-panel-heading">
          <span>Requirements</span>
          <h3>制度要件レビュー</h3>
        </div>
        <ul class="review-list">
          ${requirements.map((item) => `<li><label><input type="checkbox" checked /> ${item}</label></li>`).join("")}
        </ul>
      </section>

      <section class="prep-panel">
        <div class="prep-panel-heading">
          <span>Company Fit</span>
          <h3>会社情報から確認すること</h3>
        </div>
        <ul class="review-list">
          <li><label><input type="checkbox" checked /> 会社ホームページ、事業内容、主要商品、強みを確認する</label></li>
          <li><label><input type="checkbox" checked /> 従業員数、所在地、業種、投資予定額を確認する</label></li>
          <li><label><input type="checkbox" checked /> 見積書、決算書、既存設備、導入予定設備を確認する</label></li>
          <li><label><input type="checkbox" checked /> 採択されやすい切り口を複数案で比較する</label></li>
        </ul>
      </section>
    </div>

    <section class="prep-panel">
      <div class="prep-panel-heading">
        <span>10 Proposals</span>
        <h3>申請計画案 10個</h3>
      </div>
      <div class="grant-proposal-list">
        ${ideas.map((idea, index) => `
          <article class="proposal-card">
            <div>
              <span>${String(index + 1).padStart(2, "0")} / 狙える上限目安 ${formatAmount(idea.amount)}</span>
              <h4>${idea.title}</h4>
              <p>${idea.summary}</p>
              <div class="proposal-meta">
                ${idea.expenses.map((expense) => `<span>${expense}</span>`).join("")}
              </div>
              <details>
                <summary>必要書類を見る</summary>
                <ul>${idea.documents.map((doc) => `<li>${doc}</li>`).join("")}</ul>
              </details>
            </div>
            <button class="select-proposal-action" type="button" data-proposal="${idea.id}">この案を選ぶ</button>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="handoff-panel">
      <div>
        <p class="section-label">Next App</p>
        <h3>書類作成アプリは別で作る</h3>
        <p>ここでは公開情報と会社情報から申請案を選ぶところまで。選んだ案を、別で作る申請書入力アプリに渡して、公式フォーマットへの入力を行います。</p>
      </div>
      <div class="gate-checks">
        <span class="gate-pass">制度情報を引き継ぐ</span>
        <span class="gate-pass">選択案を引き継ぐ</span>
        <span class="gate-pass">必要書類リストを引き継ぐ</span>
        <span class="gate-warn">申請書入力は別アプリ</span>
      </div>
    </section>
  `;
  document.querySelector("#application-prep").scrollIntoView({ behavior: "smooth", block: "start" });
}

function startMonodukuriTrial() {
  const trialGrant = grants.find((grant) => grant.name.includes("ものづくり・商業・サービス生産性向上促進補助金"));
  if (!trialGrant) return;

  document.querySelector("#companyType").value = "corporation";
  document.querySelector("#industry").value = "manufacturing";
  document.querySelector("#counselingRegion").value = "東京都";
  document.querySelector("#employeeCount").value = "12";
  document.querySelector("#businessYears").value = "8";
  document.querySelector("#investmentAmount").value = "1200";
  document.querySelector("#investmentUndecided").checked = false;
  document.querySelector("#wageIncrease").checked = true;
  document.querySelector("#gBizId").checked = true;
  document.querySelectorAll('input[name="goal"]').forEach((input) => {
    input.checked = ["newBusiness", "dx", "laborSaving", "wage"].includes(input.value);
  });

  renderApplicationPrep(trialGrant);
}

function openGrantDetail(grant) {
  activeGrantForPrep = grant;
  grantDetailAgency.textContent = `${grant.agency} / ${grant.regionLabel || grant.region}${grant.grantCode ? ` / ${grant.grantCode}` : ""}`;
  grantDetailTitle.textContent = grant.officialTitle || grant.name;
  grantOfficialLink.href = grant.source;
  const employeeTierDetail = grant.name === "中小企業新事業進出補助金"
    ? `
      <section class="dialog-section">
        <h3>従業員数別の補助金額</h3>
        <ul>
          <li>20人以下: 750万円～2,500万円（賃上げ特例3,000万円）</li>
          <li>21～50人: 750万円～4,000万円（賃上げ特例5,000万円）</li>
          <li>51～100人: 750万円～5,500万円（賃上げ特例7,000万円）</li>
          <li>101人以上: 750万円～7,000万円（賃上げ特例9,000万円）</li>
        </ul>
        <p>補助率は1/2です。通常は対象経費1,500万円程度以上でなければ補助下限750万円に届きません。</p>
      </section>
    `
    : "";
  grantDetailBody.innerHTML = `
    <section class="dialog-section">
      <div class="detail-grid">
        <div><span>最大採択額</span><strong>${formatAmount(grant.maxAmount)}</strong></div>
        <div><span>補助率・助成率</span><strong>${grant.rate}</strong></div>
        <div><span>申請状況</span><strong>${grant.status}</strong></div>
        <div><span>締切</span><strong>${grant.deadline}</strong></div>
      </div>
    </section>
    ${employeeTierDetail}
    <section class="dialog-section">
      <h3>制度の概要</h3>
      <p>${grant.detail}</p>
    </section>
    <section class="dialog-section">
      <h3>主な対象者・要件</h3>
      <ul>${getRequirementItems(grant).map((item) => `<li>${item}</li>`).join("")}</ul>
    </section>
    <section class="dialog-section">
      <h3>併用候補</h3>
      <p>${grant.combinable.length ? grant.combinable.join("、") : "併用可否は公募要領と実施機関への確認が必要です。"}</p>
    </section>
    <section class="dialog-section notice">
      <h3>申請前の確認</h3>
      <p>ここに表示する要件は検索用の整理情報です。最終判断は公式掲載先の最新公募要領・交付要綱・申請様式で行ってください。</p>
    </section>
  `;
  if (!grantDetailDialog.open) grantDetailDialog.showModal();
  history.replaceState(null, "", `#grant=${encodeURIComponent(grant.name)}`);
}

grantList.addEventListener("click", (event) => {
  const prepButton = event.target.closest("[data-start-application]");
  if (prepButton) {
    const grant = grants.find((item) => item.name === decodeURIComponent(prepButton.dataset.startApplication));
    if (grant) renderApplicationPrep(grant);
    return;
  }
  const button = event.target.closest("[data-grant-name]");
  if (!button) return;
  const name = decodeURIComponent(button.dataset.grantName);
  const grant = grants.find((item) => item.name === name);
  if (grant) openGrantDetail(grant);
});

function closeDetailDialog() {
  grantDetailDialog.close();
  history.replaceState(null, "", location.pathname + location.search);
}

closeGrantDetail.addEventListener("click", closeDetailDialog);
closeGrantDetailBottom.addEventListener("click", closeDetailDialog);
startApplicationPrepFromDialog.addEventListener("click", () => {
  if (activeGrantForPrep) {
    closeDetailDialog();
    renderApplicationPrep(activeGrantForPrep);
  }
});
tryMonodukuriPrep.addEventListener("click", startMonodukuriTrial);
grantDetailDialog.addEventListener("click", (event) => {
  if (event.target === grantDetailDialog) closeDetailDialog();
});
grantDetailDialog.addEventListener("close", () => {
  if (location.hash.startsWith("#grant=")) {
    history.replaceState(null, "", location.pathname + location.search);
  }
});

function openGrantFromHash() {
  if (!location.hash.startsWith("#grant=")) return;
  const name = decodeURIComponent(location.hash.slice("#grant=".length));
  const grant = grants.find((item) => item.name === name);
  if (grant) openGrantDetail(grant);
}

window.addEventListener("hashchange", openGrantFromHash);

function renderCombo(grantPool) {
  const combo = getCombo(grantPool);
  const total = combo.reduce((sum, grant) => sum + grant.maxAmount, 0);
  comboTotal.textContent = formatAmount(total);

  comboList.innerHTML = combo.length
    ? combo
        .map(
          (grant, index) => `
            <article class="combo-card">
              <h3>${index + 1}. ${grant.officialTitle || grant.name}</h3>
              <p>${grant.purpose}枠として ${formatAmount(grant.maxAmount)}。対象経費: ${grant.expenses.join("、")}。</p>
            </article>
          `
        )
        .join("")
    : `<article class="combo-card notice"><h3>組み合わせ候補がありません</h3><p>条件を広げると候補が表示されます。</p></article>`;
}

const goalRules = {
  hire: ["雇用", "人材", "採用", "正社員"],
  laborSaving: ["省力化", "設備投資", "生産性", "機械装置"],
  reskill: ["人材開発", "研修", "教育訓練", "リスキリング"],
  ai: ["AI", "DX", "IT", "ソフトウェア", "システム"],
  newBusiness: ["新事業", "新市場", "事業再構築", "創業"],
  dx: ["DX", "IT", "デジタル", "クラウド", "システム"],
  wage: ["賃上げ", "業務改善", "キャリアアップ", "雇用"],
  sales: ["販路", "持続化", "広告", "展示会", "EC"],
  energy: ["省エネ", "脱炭素", "高効率", "再エネ"],
  succession: ["事業承継", "M&A"],
  export: ["海外", "輸出", "越境EC"],
  startup: ["創業", "起業", "新事業"]
};

const industryRules = {
  manufacturing: ["ものづくり", "機械", "研究開発", "設備"],
  construction: ["建物", "設備", "省エネ"],
  retail: ["販路", "EC", "IT", "持続化"],
  food: ["観光", "宿泊", "販路", "持続化", "省力化"],
  it: ["DX", "IT", "デジタル", "システム", "研究開発"],
  medical: ["雇用", "省力化", "IT", "人材"],
  transport: ["物流", "省力化", "脱炭素", "設備"],
  agriculture: ["農業", "設備", "販路"],
  service: ["IT", "雇用", "販路", "新事業"],
  other: []
};

function fractionRate(rateText) {
  const match = rateText.match(/(\d+)\/(\d+)/);
  return match ? Number(match[1]) / Number(match[2]) : 0.5;
}

function searchableGrantText(grant) {
  return [grant.officialTitle || grant.name, grant.agency, grant.purpose, grant.detail, ...grant.expenses].join(" ");
}

function expenseBucket(grant) {
  const text = searchableGrantText(grant);
  if (/研修|教育|人材|雇用|賃金/.test(text)) return "people";
  if (/省エネ|脱炭素|再エネ/.test(text)) return "energy";
  if (/IT|DX|AI|デジタル|クラウド|システム/.test(text)) return "digital";
  if (/販路|広告|展示会|EC/.test(text)) return "marketing";
  if (/承継|M&A/.test(text)) return "succession";
  return "equipment";
}

function calculateGrantFinance(grant, profile) {
  if (grant.name === "中小企業新事業進出補助金") {
    if (profile.employees === 0) {
      return {
        estimate: 0,
        cap: 0,
        specialCap: 0,
        eligible: false,
        note: "従業員0名は対象外です。応募申請時点で常時使用する従業員が必要です。"
      };
    }
    let cap = 2500;
    let specialCap = 3000;
    if (profile.employees >= 101) {
      cap = 7000;
      specialCap = 9000;
    } else if (profile.employees >= 51) {
      cap = 5500;
      specialCap = 7000;
    } else if (profile.employees >= 21) {
      cap = 4000;
      specialCap = 5000;
    }
    if (profile.investmentUndecided) {
      return {
        estimate: cap,
        cap,
        specialCap,
        eligible: true,
        note: `投資額未定のため、従業員${profile.employees}名区分の通常上限${formatAmount(cap)}を表示しています。満額には補助率1/2で対象経費${formatAmount(cap * 2)}程度が必要です。大規模賃上げ特例は最大${formatAmount(specialCap)}です。`
      };
    }
    const calculated = Math.min(cap, Math.round(profile.investment * 0.5));
    if (calculated < 750) {
      return {
        estimate: 0,
        cap,
        specialCap,
        eligible: false,
        note: `補助下限750万円に届きません。補助率1/2のため、対象経費は少なくとも1,500万円程度必要です。現在の予定投資額は${formatAmount(profile.investment)}です。`
      };
    }
    return {
      estimate: calculated,
      cap,
      specialCap,
      eligible: true,
      note: `従業員${profile.employees}名区分の通常上限は${formatAmount(cap)}、大規模賃上げ特例は最大${formatAmount(specialCap)}です。`
    };
  }
  if (profile.investmentUndecided) {
    if (!grant.maxAmount || grant.maxAmount <= 0) {
      return {
        estimate: 0,
        cap: 0,
        specialCap: 0,
        eligible: false,
        note: "上限額は申請類型・対象者により異なるため、公式公募要領で確認が必要です。"
      };
    }
    return {
      estimate: grant.maxAmount,
      cap: grant.maxAmount,
      specialCap: grant.maxAmount,
      eligible: true,
      note: `投資額未定のため、条件をすべて満たした場合の制度上限${formatAmount(grant.maxAmount)}を表示しています。必要事業費は公募要領で確認してください。`
    };
  }
  if (/助成金/.test(grant.name) && grant.purpose === "雇用") {
    const estimate = Math.min(grant.maxAmount, Math.max(0, profile.employees * 60));
    return {
      estimate,
      cap: grant.maxAmount,
      specialCap: grant.maxAmount,
      eligible: estimate > 0,
      note: "従業員数を使った面談用概算です。実額は対象労働者数・コース・実施内容で変わります。"
    };
  }
  const estimate = Math.min(grant.maxAmount, Math.round(profile.investment * fractionRate(grant.rate)));
  return {
    estimate,
    cap: grant.maxAmount,
    specialCap: grant.maxAmount,
    eligible: estimate > 0,
    note: `予定投資額×補助率${grant.rate}を制度上限と比較した概算です。`
  };
}

function evaluateGrant(grant, profile) {
  if (!grant.verified) return null;
  if (!matchesRegion(grant, profile.region)) return null;
  if (profile.employees === 0 && (/雇用|賃金|従業員/.test(searchableGrantText(grant)))) return null;
  if (profile.companyType === "startup" && /事業承継|雇用調整|成長加速化/.test(grant.name)) return null;

  const text = searchableGrantText(grant);
  const reasons = [];
  let score = 20;
  let goalMatches = 0;
  const matchedGoals = [];

  profile.goals.forEach((goal) => {
    const keyword = goalRules[goal].find((item) => text.includes(item));
    if (keyword) {
      goalMatches += 1;
      matchedGoals.push(goal);
      score += 18;
      reasons.push(`希望する取り組み「${keyword}」と制度目的が一致`);
    }
  });

  if (goalMatches === 0) return null;

  const industryKeyword = industryRules[profile.industry].find((item) => text.includes(item));
  if (industryKeyword) {
    score += 12;
    reasons.push(`事業分野と「${industryKeyword}」の対象経費・目的が近い`);
  }

  if (!isNationwide(grant) && grantRegions(grant).includes(profile.region)) {
    score += 12;
    reasons.push(`${profile.region}の地域要件に一致`);
  }
  if (profile.wageIncrease && /賃上げ|業務改善|キャリアアップ|成長/.test(text)) {
    score += 12;
    reasons.push("賃上げ計画による要件・加点との相性がよい");
  }
  if (profile.gBizId && /中小企業|IT導入|省力化|ものづくり|新事業/.test(text)) {
    score += 5;
    reasons.push("GビズID取得済みで電子申請準備を進めやすい");
  }
  if (profile.businessYears <= 5 && /創業/.test(text)) {
    score += 12;
    reasons.push("創業後年数が創業支援と合いやすい");
  }
  if (profile.investment >= 1000 && /設備|省力化|ものづくり|成長/.test(text)) score += 8;
  if ((profile.goals.includes("ai") || profile.goals.includes("dx")) && grant.name === "IT導入補助金") {
    score += 28;
    reasons.unshift("AI・DX・クラウド導入の第一候補");
  }
  if (profile.goals.includes("laborSaving") && grant.name.includes("省力化投資補助金")) {
    score += 28;
    reasons.unshift("省力化設備導入の第一候補");
  }
  if (profile.goals.includes("reskill") && grant.name === "人材開発支援助成金") {
    score += 30;
    reasons.unshift("リスキリング・職業訓練の第一候補");
  }
  if (profile.goals.includes("newBusiness") && grant.name === "中小企業新事業進出補助金") {
    score += 28;
    reasons.unshift("新市場・高付加価値事業への進出に特化");
  }
  if (grant.status === "公募中" || grant.status === "随時") score += 6;
  if (grant.status === "準備中") score -= 18;

  if (!reasons.length) return null;
  const finance = calculateGrantFinance(grant, profile);
  if (!finance.eligible) {
    reasons.push(finance.note);
  }
  return {
    grant,
    score: Math.min(score, 99),
    estimate: finance.estimate,
    cap: finance.cap,
    specialCap: finance.specialCap,
    financeNote: finance.note,
    goalMatches,
    matchedGoals,
    reasons,
    bucket: expenseBucket(grant)
  };
}

function readCounselingProfile() {
  return {
    companyType: document.querySelector("#companyType").value,
    industry: document.querySelector("#industry").value,
    region: document.querySelector("#counselingRegion").value,
    employees: Number(document.querySelector("#employeeCount").value),
    businessYears: Number(document.querySelector("#businessYears").value),
    investment: Number(document.querySelector("#investmentAmount").value),
    investmentUndecided: document.querySelector("#investmentUndecided").checked,
    wageIncrease: document.querySelector("#wageIncrease").checked,
    gBizId: document.querySelector("#gBizId").checked,
    goals: Array.from(document.querySelectorAll('input[name="goal"]:checked')).map((input) => input.value)
  };
}

function renderSimulation(matches, profile) {
  const chosen = [];
  profile.goals.forEach((goal) => {
    const match = matches.find((item) =>
      item.estimate > 0 && item.matchedGoals.includes(goal) && !chosen.includes(item)
    );
    if (match && chosen.length < 4) chosen.push(match);
  });
  const total = chosen.reduce((sum, match) => sum + match.estimate, 0);

  simulationResults.hidden = false;
  simulationCount.textContent = `${matches.length}件`;
  simulationTotal.textContent = formatAmount(total);
  topMatchName.textContent = matches[0] ? (matches[0].grant.officialTitle || matches[0].grant.name) : "該当なし";
  comboTotal.textContent = formatAmount(total);
  counselingNotes.innerHTML = `
    <strong>面談メモ</strong><br>
    従業員${profile.employees}名、${profile.investmentUndecided ? "投資額未定（制度上限で試算）" : `投資予定${formatAmount(profile.investment)}`}、選択目的${profile.goals.length}件で診断しました。
    ${profile.investmentUndecided ? "表示額は条件を満たした場合の最大採択額です。満額に必要な対象経費を確認して事業計画を逆算してください。" : "概算額は採択を保証するものではなく、同一経費の重複を避けた最大4制度の目安です。"}
  `;
  comboList.innerHTML = matches.length
    ? matches.slice(0, 8).map((match, index) => `
        <article class="combo-card match-card">
          <div>
            <span class="match-rank">適合度 ${match.score}% / ${index + 1}位</span>
            <h3>${match.grant.officialTitle || match.grant.name}</h3>
            <ul class="match-reasons">${match.reasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>
          </div>
          <div class="match-estimate">
            <span>採択額の概算</span>
            <strong>${match.estimate > 0 ? formatAmount(match.estimate) : "対象外見込み"}</strong>
            <span>今回の従業員区分上限 ${formatAmount(match.cap)}</span>
            <span>${match.financeNote}</span>
            <button class="detail-action" type="button" data-grant-name="${encodeURIComponent(match.grant.name)}">要件・公式ページ</button>
          </div>
        </article>
      `).join("")
    : `<article class="combo-card notice"><h3>条件に合う確認済み制度がありません</h3><p>目的を追加するか、投資内容・所在地を見直してください。</p></article>`;
}

counselingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = readCounselingProfile();
  if (!profile.goals.length) {
    counselingNotes.textContent = "取り組みたいことを1つ以上選択してください。";
    simulationResults.hidden = false;
    return;
  }
  const matches = grants
    .map((grant) => evaluateGrant(grant, profile))
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || b.estimate - a.estimate);
  renderSimulation(matches, profile);
});

investmentUndecidedInput.addEventListener("change", () => {
  investmentAmountInput.disabled = investmentUndecidedInput.checked;
  investmentAmountInput.required = !investmentUndecidedInput.checked;
  investmentAmountInput.closest("label").classList.toggle("is-disabled", investmentUndecidedInput.checked);
});

comboList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-grant-name]");
  if (!button) return;
  const grant = grants.find((item) => item.name === decodeURIComponent(button.dataset.grantName));
  if (grant) openGrantDetail(grant);
});

prepWorkbench.addEventListener("click", (event) => {
  const button = event.target.closest(".select-proposal-action");
  if (!button || !activeGrantForPrep) return;
  button.textContent = "選択済み";
  button.disabled = true;
  const result = document.createElement("div");
  result.className = "reflection-result";
  result.innerHTML = `
    <strong>${activeGrantForPrep.officialTitle || activeGrantForPrep.name} の申請案を選択しました</strong>
    <span>次に作る別アプリへ、制度情報、会社情報、選択した計画案、必要書類リストを渡す想定です。公開情報の確認アプリと申請書入力アプリは分けます。</span>
  `;
  button.closest(".proposal-card").append(result);
});

function renderSources() {
  videoInsightList.innerHTML = videoInsights
    .map(
      (insight) => `
        <article class="video-insight-card">
          <span class="tag reference">動画解析メモ</span>
          <h3>${insight.topic}</h3>
          <p>${insight.channel} / ${insight.detail}</p>
        </article>
      `
    )
    .join("");

  sourceList.innerHTML = sources
    .map(
      (source) => `
        <article class="source-card">
          <span class="tag source-type ${source.type === "公式" ? "official" : "reference"}">${source.type}</span>
          <h3>${source.name}</h3>
          <p>${source.owner} / ${source.note}</p>
          <a href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a>
        </article>
      `
    )
    .join("");
}

function render() {
  const grantPool = grants.filter(matchesGrant);
  const largest = grantPool.reduce((max, grant) => Math.max(max, grant.maxAmount), 0);

  resultCount.textContent = grantPool.length.toLocaleString("ja-JP");
  maxSingle.textContent = formatAmount(largest);
  renderGrants(grantPool);
  renderRegionalStrategy();
  renderPrefectureRanking();
  comboTotal.textContent = "診断で計算";
}

Object.values(filters).forEach((element) => element.addEventListener("input", render));

regionalPolicySelect.addEventListener("change", () => {
  filters.region.value = regionalPolicySelect.value;
  document.querySelector("#counselingRegion").value = regionalPolicySelect.value;
  render();
});

rankingMetric.addEventListener("change", renderPrefectureRanking);

prefectureRankingChart.addEventListener("click", (event) => {
  const row = event.target.closest("[data-ranking-prefecture]");
  if (!row) return;
  const prefecture = row.dataset.rankingPrefecture;
  regionalPolicySelect.value = prefecture;
  filters.region.value = prefecture;
  document.querySelector("#counselingRegion").value = prefecture;
  render();
  document.querySelector("#regional").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#counselingRegion").addEventListener("change", (event) => {
  regionalPolicySelect.value = event.target.value;
  filters.region.value = event.target.value;
  render();
});

filters.region.addEventListener("change", () => {
  if (filters.region.value !== "all") regionalPolicySelect.value = filters.region.value;
  renderRegionalStrategy();
});

document.querySelector("#showAllRegionalGrants").addEventListener("click", () => {
  filters.region.value = regionalPolicySelect.value;
  render();
  location.hash = "search";
});

regionalGrantList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-grant-name]");
  if (!button) return;
  const grant = grants.find((item) => item.name === decodeURIComponent(button.dataset.grantName));
  if (grant) openGrantDetail(grant);
});

function updateBackToTop() {
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
updateBackToTop();

function getCurrentTimestamp() {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function mergeNewGrants(incomingGrants) {
  const existingNames = new Set(grants.map((grant) => grant.name));
  const additions = incomingGrants
    .filter((grant) => !existingNames.has(grant.name))
    .map((grant) => ({ ...grant, isNew: true }));

  grants.unshift(...additions);
  return additions.length;
}

async function fetchLatestGrants() {
  // 本番ではここを `/api/grants/sync` などに差し替え、サーバー側で公式情報を収集・正規化します。
  await new Promise((resolve) => setTimeout(resolve, 900));
  return incomingGrantFeed;
}

let lastSyncMs = 0;
let refreshInFlight = false;

async function runFullRefresh({ viaButton = false } = {}) {
  if (refreshInFlight) return;
  refreshInFlight = true;
  if (viaButton) {
    refreshButton.textContent = "更新中...";
    refreshButton.disabled = true;
  }
  try {
    const [videoNewsCount, jgrantsCount] = await Promise.all([
      syncMakinoyaDailyNews(),
      syncJGrantsCatalog()
    ]);
    const latestGrants = await fetchLatestGrants();
    const addedCount = mergeNewGrants(latestGrants);

    lastSyncMs = Date.now();
    lastUpdated.textContent = getCurrentTimestamp();
    refreshResult.textContent = `公式制度${jgrantsCount}件追加 / 動画速報${videoNewsCount}件`;
    updateMessage.textContent =
      addedCount > 0
        ? `${addedCount}件の新しい制度を取り込みました。`
        : "新しい制度はありません。最新状態です。";
    render();
  } catch (error) {
    updateMessage.textContent = "更新に失敗しました。公式ソース接続を確認してください。";
    refreshResult.textContent = "更新失敗";
  } finally {
    refreshInFlight = false;
    if (viaButton) {
      refreshButton.textContent = "最新情報を更新";
      refreshButton.disabled = false;
    }
  }
}

refreshButton.addEventListener("click", () => runFullRefresh({ viaButton: true }));

renderSources();
populateRegionSelects();
renderLatestNews();
render();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", openGrantFromHash, { once: true });
} else {
  openGrantFromHash();
}
runFullRefresh();

// 毎朝9:00に自動更新。1分毎の判定なのでスリープ復帰・跨ぎ起動でも直近の9時分を拾う
function lastScheduledBoundary(now) {
  const boundary = new Date(now);
  boundary.setHours(9, 0, 0, 0);
  if (now < boundary) boundary.setDate(boundary.getDate() - 1);
  return boundary.getTime();
}
setInterval(() => {
  if (lastSyncMs && lastSyncMs < lastScheduledBoundary(new Date())) {
    runFullRefresh();
  }
}, 60 * 1000);
