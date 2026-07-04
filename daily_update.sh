#!/bin/zsh
# 毎朝9:00にlaunchdから実行。サーバーを起こして最新データを取得させ、
# data/ 配下のスナップショットJSONを今日の内容で上書きする。

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=4178

if ! /usr/sbin/lsof -nP -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  cd "$PROJECT_DIR" || exit 1
  PORT=${PORT} /usr/bin/python3 server.py >/tmp/grant-match-navigator.log 2>&1 &
  sleep 2
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 定時更新開始"
/usr/bin/curl -s --max-time 180 "http://127.0.0.1:${PORT}/api/jgrants?refresh=1" -o /dev/null \
  && echo "  jGrants更新OK" || echo "  jGrants更新失敗"
/usr/bin/curl -s --max-time 60 "http://127.0.0.1:${PORT}/api/makinoya-feed" -o /dev/null \
  && echo "  動画速報更新OK" || echo "  動画速報更新失敗"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] 定時更新終了"
