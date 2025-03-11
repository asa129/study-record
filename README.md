## サービス名:学習記録アプリ
日々の学習内容と時間を記録できるアプリです。  
学習記録を一覧化することで、学習の進捗状況を確認することができます。  
合計時間も確認することができます。
## 使い方
1. [学習記録アプリ](https://study-record-7da4e.web.app/)にアクセスする
2. 学習内容と学習時間を入力フォームに記入する
3. 「登録」ボタンを押して記録を保存する
4. 一覧に記録が表示される、合計時間も確認できる
5. 削除したい場合は、「削除」ボタンを押す
## 使用技術
React + Vite  
javascript  
supabase  
jest  
react-testing-library  
## 環境変数の設定方法(.env)
1. Supabaseのアカウントを作成する
2. 新規プロジェクトを作成する(プロジェクト名はstudy-record、データベースパスワードは適当でOK)
3. Table Editorで以下のテーブルを作成する

 テーブル名 : study-record
 
 | column | type | option |
 |:------|:-----|:-------|
 |id|uuid| |
 |title|varchar |non null|
 |time|int4 |non null|
 |created_at|timestamptz ||

4. プロジェクトのルートに`.env`ファイルを作成し、以下内容を追加する
```
VITE_NEXT_PUBLIC_SUPABASE_URL=あなたのProject URL
VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのシークレットキー
```
APIURLとシークレットキーの取得は[Dashboard](https://supabase.com/dashboard/project/_/settings/api)から可能
## 起動の仕方
```
npm run dev
```
