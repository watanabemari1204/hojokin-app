"""GitHub Actions用データ更新スクリプト。

server.pyの取得ロジックをそのまま使い、jGrants＋マキノヤ先生の
スナップショットを data/ に保存する。Web公開版（github.io）は
このスナップショットを読んで表示する。
"""
from datetime import datetime

from server import NEWS_SNAPSHOT, fetch_jgrants, fetch_news, save_snapshot

payload = fetch_jgrants(force=True)  # 成功時にjgrants_snapshot.jsonへ自動保存される
news_payload = {
    "checkedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "news": fetch_news(),
}
save_snapshot(NEWS_SNAPSHOT, news_payload)
print(f"jGrants {payload.get('count')}件 / 動画ニュース {len(news_payload['news'])}件 を保存")
