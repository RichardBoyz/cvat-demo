# CVAT demo

- 啟動方法

## CVAT 專案

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build cvat_ui # 因為預設沒有 cvat_ui 所以這邊要另外建立以修改後的 cvat_ui
```

成功執行後再執行

```sh
docker exec -it cvat_server bash -ic 'python3 ~/manage.py createsuperuser'
# 如果有遇到沒有 migrate 的狀況只要把上方 createsuperuser 改成 migrate 再執行一次即可
```

建立完成 superuser 後可以先進入到 localhost:8080 去建立專案(Project) > 建立任務(Task) ，可以在 Task 頁面另外按 ＋ 產生 jobs

## cvat_workbench

進入該目錄底下開啟開發模式

```sh
yarn # 安裝依賴項目
yarn dev # 執行前端
```

預設開啟 localhost:5173 可以使用剛才的 superuser 登入操作 jobs

## 更改項目

- cvat 專案

  1. 更改 cvat_server 的 base.py 使用 volums 對應到 cvat/dev_base.py 更新 csrf 相關設定
  2. 更改 dev_base.py, cvat/cvat/nginx.conf, cvat/cvat-ui/react_nginx.conf 將 x-frame-Options 設定為 allowall 為開發使用
  3. 更改 cvat/cvat_ui 內部 left-group.tsx 加上 review 按鈕，且按過 review 後的 job 在下一次開啟該 job 會把 redo 改為不顯示(為了題目條件渲染)

- cvat_workbench
  1. 實作登入和登出，呼叫 cvat_server 的 login 和 logout api，使用 state 處理登入狀態
  2. header 顯示目前登入信箱和右側如果登入後會顯示 logout 按鈕可以登出
  3. 左側為顯示所有 jobs 可以點擊切換 job 編輯
