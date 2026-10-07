# 公開研究資料庫

以可追溯的資料、明確的觀察與限制，公開研究報告。網站使用純靜態 HTML、CSS 和 JavaScript，可直接由 GitHub Pages 發佈。

## 第一份報告

《三款 AI 3D 生成工具的六類物件視覺比較》使用 42 張由專案持有人提供的圖片，涵蓋六類參考圖及 Meshy、Tripo、混元 3D 的白模與貼圖結果。報告只討論正面截圖中可見的差異，沒有模型檔、提示詞、耗時或面數資料，因此不對幾何品質與效率做量化排名。

- 網站首頁：`index.html`
- 報告：`reports/3d-generation-comparison.html`
- 原始圖片的網站副本：`assets/3d-comparison/`
- 圖片來源與檔名對照：`reports/3d-generation-comparison-sources.md`

## 本地預覽

在儲存庫根目錄執行 `python -m http.server 8000`，開啟 `http://localhost:8000/`。也可以直接開啟 `index.html`。

## 發佈

在 GitHub 儲存庫的 **Settings → Pages → Build and deployment** 選擇 **Deploy from a branch**，分支選 `main`，資料夾選 `/ (root)`。推送到 `main` 後 GitHub Pages 會重新發佈。

## 後續報告格式

每篇報告應包含研究問題、資料與方法、觀察、限制、來源、更新日期。不要把尚未驗證的 AI 產出當成事實。
