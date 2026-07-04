from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlencode, urlparse
from urllib.request import Request, urlopen
import html
import json
import os
import re
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parent
FEED_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCpsDJin8MZKIaIxtKlcK25g"
CHANNEL_URL = "https://www.youtube.com/@akiramakinoya/videos"
KEYWORDS = ("補助金", "助成金", "給付金", "支援金", "交付金", "DX", "省力化", "持続化")
JGRANTS_API = "https://api.jgrants-portal.go.jp/exp/v1/public/subsidies"
JGRANTS_KEYWORDS = ("補助金", "助成金", "DX", "省力化", "人材", "創業", "観光", "農業", "脱炭素", "研究開発")
PREFECTURES = (
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
)
JGRANTS_CACHE = {"expires_at": datetime.min, "payload": None}
DATA_DIR = ROOT / "data"
JGRANTS_SNAPSHOT = DATA_DIR / "jgrants_snapshot.json"
NEWS_SNAPSHOT = DATA_DIR / "news_snapshot.json"


def save_snapshot(path, payload):
    try:
        DATA_DIR.mkdir(exist_ok=True)
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
    except Exception:
        pass


def load_snapshot(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def comparison_for(title):
    if "成長" in title or "5億" in title or "５億" in title:
        return "小規模な販路開拓やIT導入より投資規模が大きく、賃上げや企業成長の計画が重視されるタイプです。"
    if "持続化" in title:
        return "大型設備投資ではなく、小規模事業者の販路開拓や広告・店舗・ウェブ施策が中心です。"
    if "DX" in title or "デジタル" in title:
        return "一般的な設備補助と違い、業務システム、クラウド、AI、データ活用などデジタル投資が中心です。"
    if "給付金" in title or "支援金" in title:
        return "設備購入後の経費補助ではなく、対象要件を満たした場合の定額給付・支援が中心の可能性があります。"
    return "従来制度から対象者、上限額、公募期間が変わっている可能性があります。公式公募要領との比較が必要です。"


def clean_text(value):
    value = html.unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value or "")
    return re.sub(r"\s+", " ", value).strip()


def news_item(title, source, published="", description=""):
    summary = description[:180] if description else "最新動画のタイトルから補助金・助成金関連の更新を検知しました。"
    return {
        "level": "high",
        "label": "マキノヤ先生 新着動画",
        "title": title,
        "summary": summary,
        "difference": comparison_for(title),
        "target": "動画内で案内される対象者を公式要領で確認",
        "checkedAt": f"動画公開 {published}" if published else "動画ページ確認",
        "grantName": "",
        "source": source,
    }


def fetch_news_from_rss():
    request = Request(FEED_URL, headers={"User-Agent": "Mozilla/5.0 GrantMatchNavigator/1.0"})
    with urlopen(request, timeout=15) as response:
        root = ET.fromstring(response.read())

    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "media": "http://search.yahoo.com/mrss/",
    }
    news = []
    for entry in root.findall("atom:entry", ns):
        title = clean_text(entry.findtext("atom:title", default="", namespaces=ns))
        if not any(keyword.lower() in title.lower() for keyword in KEYWORDS):
            continue
        link_node = entry.find("atom:link", ns)
        source = link_node.attrib.get("href", "") if link_node is not None else ""
        published = entry.findtext("atom:published", default="", namespaces=ns)[:10]
        description = clean_text(entry.findtext("media:group/media:description", default="", namespaces=ns))
        news.append(news_item(title, source, published, description))
        if len(news) == 4:
            break
    return news


def fetch_news_from_channel_page():
    request = Request(CHANNEL_URL, headers={"User-Agent": "Mozilla/5.0 GrantMatchNavigator/1.0"})
    with urlopen(request, timeout=20) as response:
        body = response.read().decode("utf-8", errors="ignore")

    news = []
    seen = set()
    pattern = re.compile(
        r'\\"videoId\\":\\"([^\\"]+)\\"[\s\S]{0,2500}?\\"title\\":\{\\"runs\\":\[\{\\"text\\":\\"([^\\"]+)\\"',
        re.MULTILINE,
    )
    for video_id, raw_title in pattern.findall(body):
        title = clean_text(raw_title.encode("utf-8").decode("unicode_escape", errors="ignore"))
        if not title or title in seen:
            continue
        seen.add(title)
        if not any(keyword.lower() in title.lower() for keyword in KEYWORDS):
            continue
        news.append(news_item(title, f"https://www.youtube.com/watch?v={video_id}"))
        if len(news) == 4:
            break
    return news


def fetch_news():
    try:
        news = fetch_news_from_rss()
        if news:
            return news
    except Exception:
        pass
    return fetch_news_from_channel_page()


def fetch_jgrants_query(params):
    query = urlencode({**params, "sort": "created_date", "order": "DESC", "acceptance": 1})
    request = Request(
        f"{JGRANTS_API}?{query}",
        headers={"User-Agent": "GrantMatchNavigator/1.0", "Accept": "application/json"},
    )
    with urlopen(request, timeout=25) as response:
        return json.loads(response.read().decode("utf-8")).get("result", [])


def fetch_jgrants(force=False):
    now = datetime.now()
    if not force and JGRANTS_CACHE["payload"] and now < JGRANTS_CACHE["expires_at"]:
        return JGRANTS_CACHE["payload"]

    subsidies = {}
    errors = []
    searches = [(keyword, {"keyword": keyword}) for keyword in JGRANTS_KEYWORDS]
    searches.extend(
        (prefecture, {"keyword": prefecture, "target_area_search": prefecture})
        for prefecture in PREFECTURES
    )
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {
            executor.submit(fetch_jgrants_query, params): label
            for label, params in searches
        }
        for future in as_completed(futures):
            label = futures[future]
            try:
                for subsidy in future.result():
                    subsidy_id = subsidy.get("id")
                    if subsidy_id:
                        subsidies[subsidy_id] = subsidy
            except Exception as error:
                errors.append(f"{label}: {error}")

    if not subsidies:
        snapshot = load_snapshot(JGRANTS_SNAPSHOT)
        if snapshot:
            snapshot["fromSnapshot"] = True
            return snapshot
        raise RuntimeError("Jグランツから制度を取得できませんでした: " + " / ".join(errors))

    result = sorted(
        subsidies.values(),
        key=lambda item: item.get("acceptance_end_datetime") or "",
    )
    payload = {
        "checkedAt": now.strftime("%Y-%m-%d %H:%M"),
        "count": len(result),
        "subsidies": result,
        "source": "Jグランツ",
        "partialErrors": errors,
    }
    JGRANTS_CACHE["payload"] = payload
    JGRANTS_CACHE["expires_at"] = now + timedelta(hours=1)
    save_snapshot(JGRANTS_SNAPSHOT, payload)
    return payload


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/makinoya-feed":
            try:
                payload = {
                    "checkedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
                    "news": fetch_news(),
                }
                save_snapshot(NEWS_SNAPSHOT, payload)
                body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
            except Exception as error:
                snapshot = load_snapshot(NEWS_SNAPSHOT)
                if snapshot:
                    snapshot["fromSnapshot"] = True
                    body = json.dumps(snapshot, ensure_ascii=False).encode("utf-8")
                    self.send_response(200)
                else:
                    body = json.dumps({"error": str(error), "news": []}, ensure_ascii=False).encode("utf-8")
                    self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if path == "/api/jgrants":
            force = "refresh=1" in (urlparse(self.path).query or "")
            try:
                body = json.dumps(fetch_jgrants(force=force), ensure_ascii=False).encode("utf-8")
                self.send_response(200)
            except Exception as error:
                body = json.dumps({"error": str(error), "subsidies": []}, ensure_ascii=False).encode("utf-8")
                self.send_response(502)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "4177"))
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
