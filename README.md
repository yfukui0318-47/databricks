# databricks
AI試行の場

## AWS Amplify Hosting にデプロイ

このアプリは Next.js の API Route を使うため、S3 の静的ホスティングだけではなく SSR/API に対応したホスティングが必要です。まずは AWS Amplify Hosting が最短です。

### 事前準備

1. Supabase で `supabase/resources.sql` を実行して `shared_resources` テーブルを作成します。
2. GitHub など、Amplify から参照できる Git リポジトリにこのプロジェクトを push します。
3. `.env.local` は push しません。秘密鍵は AWS Amplify の環境変数に登録します。

### Amplify の設定

AWS Console で Amplify Hosting を開き、`Deploy an app` から Git リポジトリを接続します。

このディレクトリをリポジトリルートとして push している場合は、ビルド設定としてこのリポジトリの `amplify.yml` がそのまま使えます。

`agenticwork` のような親ディレクトリをリポジトリルートにしている場合は、Amplify の monorepo 設定で app root に `databricks-quiz` を指定してください。

### 環境変数

Amplify の App settings > Environment variables に以下を登録します。

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
MOCK_GEMINI=false
```

`SUPABASE_SERVICE_ROLE_KEY` と `GEMINI_API_KEY` はクライアントに公開しない秘密値です。AWS の環境変数にだけ置いてください。

### ローカル確認

```bash
npm ci
npm run build
```

ビルドが通れば Amplify でも同じ `npm ci` と `npm run build` が実行されます。デプロイ後は `/api/quiz/summary` と `/resources` の動作を確認してください。
