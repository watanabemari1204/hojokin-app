# 補助金アプリ（Grant Match Navigator）

jGrants公式APIから最新の補助金情報を取得して一覧・検索できるアプリ。
マキノヤ先生のYouTube最新情報も合わせて表示する。

## Web版（URLを知っている人が使える）

**https://watanabemari1204.github.io/hojokin-app/**

- サーバー不要。GitHub Actionsが毎朝9:00(JST)にjGrants＋動画情報を取得して
  `data/` のスナップショットを更新し、Webページはそれを表示する
- 手動更新はGitHubの Actions タブ →「補助金データ自動更新」→ Run workflow

## 構成

| ファイル | 役割 |
|---|---|
| `server.py` | Pythonサーバー（port 4178）。jGrants API・YouTube取得＋スナップショット保存 |
| `index.html` / `app.js` / `styles.css` | フロントエンド。起動時に自動フル更新 |
| `daily_update.sh` | 毎朝9:00の自動更新スクリプト（launchd `com.mariwatanabe.subsidy-daily-update` から実行） |
| `data/` | 取得データのスナップショット（git管理外）。API障害時はここから返す |

## 起動方法

```bash
python3 server.py
# → http://localhost:4178 をブラウザで開く
```

Macでは デスクトップの「補助金アプリ.app」をダブルクリックでも起動できる。

## 運用メモ

- 毎朝9:00に launchd がフル更新を実行（ログ: `/tmp/subsidy-daily-update.log`）
- サーバープロセスは ps 上 `Python server.py` と表示される。停止はポート4178で特定して kill
- port 4177（旧コピー）・port 4180（補助楽）は別アプリ
