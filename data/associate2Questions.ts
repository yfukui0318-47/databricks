import type { Question } from '@/types'

export const associate2Questions: Question[] = [
  {
    "id": 10001,
    "section": "Development & Ingestion",
    "question": "Auto Loaderでクラウドストレージに継続的に到着するJSONファイルを取り込むPySparkの基本入口はどれか",
    "choices": [
      {
        "key": "A",
        "text": "spark.readStream.format(\"cloudFiles\")"
      },
      {
        "key": "B",
        "text": "COPY INTO"
      },
      {
        "key": "C",
        "text": "CREATE TABLE LOCATION"
      },
      {
        "key": "D",
        "text": "spark.read.format(\"json\")"
      }
    ],
    "answer": "A",
    "explanation": "Auto Loaderのストリーミング読込はcloudFiles形式を使う。"
  },
  {
    "id": 10002,
    "section": "Development & Ingestion",
    "question": "Auto Loaderの `cloudFiles.schemaLocation` の主目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQL Warehouseのパス"
      },
      {
        "key": "B",
        "text": "Gitリポジトリのパス"
      },
      {
        "key": "C",
        "text": "出力Deltaテーブルの保存先"
      },
      {
        "key": "D",
        "text": "推論スキーマの永続保存先"
      }
    ],
    "answer": "D",
    "explanation": "スキーマ推論と進化を追跡するための永続場所。"
  },
  {
    "id": 10003,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで新規ファイルを二重処理しないために使われる仕組みはどれか",
    "choices": [
      {
        "key": "A",
        "text": "GRANT"
      },
      {
        "key": "B",
        "text": "checkpoint"
      },
      {
        "key": "C",
        "text": "VACUUM"
      },
      {
        "key": "D",
        "text": "ZORDER"
      }
    ],
    "answer": "B",
    "explanation": "checkpointが処理済みファイルやストリーム状態を管理する。"
  },
  {
    "id": 10004,
    "section": "Development & Ingestion",
    "question": "5年分の過去Parquetを1回だけロードし、継続到着はない。最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Auto Loader"
      },
      {
        "key": "B",
        "text": "APPLY CHANGES"
      },
      {
        "key": "C",
        "text": "COPY INTO"
      },
      {
        "key": "D",
        "text": "Delta Sharing"
      }
    ],
    "answer": "C",
    "explanation": "COPY INTOは一回限りやバッチロードに向く。"
  },
  {
    "id": 10005,
    "section": "Development & Ingestion",
    "question": "毎時到着するファイルを継続的にBronzeへ取り込みたい。最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "RESTORE TABLE"
      },
      {
        "key": "B",
        "text": "COPY INTO"
      },
      {
        "key": "C",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "D",
        "text": "Auto Loader"
      }
    ],
    "answer": "D",
    "explanation": "継続的ファイル到着にはAuto Loaderが適する。"
  },
  {
    "id": 10006,
    "section": "Development & Ingestion",
    "question": "Auto Loaderのファイル検出で、大量ファイルや低レイテンシに向くモードはどれか",
    "choices": [
      {
        "key": "A",
        "text": "manual upload"
      },
      {
        "key": "B",
        "text": "time travel"
      },
      {
        "key": "C",
        "text": "file notification"
      },
      {
        "key": "D",
        "text": "global temp view"
      }
    ],
    "answer": "C",
    "explanation": "クラウドイベント通知でスケールしやすい。"
  },
  {
    "id": 10007,
    "section": "Development & Ingestion",
    "question": "Auto Loaderのデフォルトのファイル検出に近い考え方はどれか",
    "choices": [
      {
        "key": "A",
        "text": "GRANT SELECT"
      },
      {
        "key": "B",
        "text": "ZORDER"
      },
      {
        "key": "C",
        "text": "MERGE"
      },
      {
        "key": "D",
        "text": "directory listing"
      }
    ],
    "answer": "D",
    "explanation": "ディレクトリをスキャンして新規ファイルを検出する。"
  },
  {
    "id": 10008,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで対応形式に含まれないものとして最も疑わしいのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "JSON"
      },
      {
        "key": "B",
        "text": "CSV"
      },
      {
        "key": "C",
        "text": "Parquet"
      },
      {
        "key": "D",
        "text": "PowerPoint"
      }
    ],
    "answer": "D",
    "explanation": "Auto Loaderはデータファイル形式を扱う。"
  },
  {
    "id": 10009,
    "section": "Development & Ingestion",
    "question": "上流が予期しない列を追加してもパイプラインを止めずに保持したい。適切なschemaEvolutionModeはどれか",
    "choices": [
      {
        "key": "A",
        "text": "failOnNewColumns"
      },
      {
        "key": "B",
        "text": "none"
      },
      {
        "key": "C",
        "text": "drop"
      },
      {
        "key": "D",
        "text": "rescue"
      }
    ],
    "answer": "D",
    "explanation": "rescueは未知列を `_rescued_data` に退避する。"
  },
  {
    "id": 10010,
    "section": "Development & Ingestion",
    "question": "rescueモードで未知列が格納される列はどれか",
    "choices": [
      {
        "key": "A",
        "text": "_checkpoint"
      },
      {
        "key": "B",
        "text": "_schema_log"
      },
      {
        "key": "C",
        "text": "_metadata"
      },
      {
        "key": "D",
        "text": "_rescued_data"
      }
    ],
    "answer": "D",
    "explanation": "予期しないデータはJSON文字列として退避される。"
  },
  {
    "id": 10011,
    "section": "Development & Ingestion",
    "question": "Auto Loaderでファイル形式を指定するオプションはどれか",
    "choices": [
      {
        "key": "A",
        "text": "fileType"
      },
      {
        "key": "B",
        "text": "cloudFiles.format"
      },
      {
        "key": "C",
        "text": "spark.format"
      },
      {
        "key": "D",
        "text": "delta.format"
      }
    ],
    "answer": "B",
    "explanation": "`.option(\"cloudFiles.format\", \"json\")` のように使う。"
  },
  {
    "id": 10012,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで型推論を有効にする代表的なオプションはどれか",
    "choices": [
      {
        "key": "A",
        "text": "cloudFiles.inferColumnTypes"
      },
      {
        "key": "B",
        "text": "sql.inferTypes"
      },
      {
        "key": "C",
        "text": "delta.autoVacuum"
      },
      {
        "key": "D",
        "text": "catalog.infer"
      }
    ],
    "answer": "A",
    "explanation": "文字列以外の型推論を補助する。"
  },
  {
    "id": 10013,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで特定列の型を明示的に補助したい場合に使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "USE CATALOG"
      },
      {
        "key": "B",
        "text": "schemaHints"
      },
      {
        "key": "C",
        "text": "RESTORE"
      },
      {
        "key": "D",
        "text": "ZORDER BY"
      }
    ],
    "answer": "B",
    "explanation": "`cloudFiles.schemaHints` で列型のヒントを渡せる。"
  },
  {
    "id": 10014,
    "section": "Development & Ingestion",
    "question": "`availableNow=True` トリガーの説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "毎秒永続実行"
      },
      {
        "key": "B",
        "text": "テーブルを削除"
      },
      {
        "key": "C",
        "text": "利用可能なデータを処理して停止"
      },
      {
        "key": "D",
        "text": "権限を付与"
      }
    ],
    "answer": "C",
    "explanation": "バッチライクに現在あるファイルを処理する。"
  },
  {
    "id": 10015,
    "section": "Development & Ingestion",
    "question": "`processingTime=\"5 minutes\"` の意味はどれか",
    "choices": [
      {
        "key": "A",
        "text": "5分前に復元"
      },
      {
        "key": "B",
        "text": "5分後にテーブル削除"
      },
      {
        "key": "C",
        "text": "5分間だけ権限付与"
      },
      {
        "key": "D",
        "text": "5分ごとにマイクロバッチ"
      }
    ],
    "answer": "D",
    "explanation": "指定間隔でストリーミング処理する。"
  },
  {
    "id": 10016,
    "section": "Development & Ingestion",
    "question": "Lakeflow Declarative PipelinesのSQLでAuto Loaderを使う関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "cloud_files()"
      },
      {
        "key": "B",
        "text": "auto_load()"
      },
      {
        "key": "C",
        "text": "copy_into()"
      },
      {
        "key": "D",
        "text": "ingest_stream()"
      }
    ],
    "answer": "A",
    "explanation": "SQLでは `cloud_files(path, format, map(...))` を使う。"
  },
  {
    "id": 10017,
    "section": "Development & Ingestion",
    "question": "`COPY INTO` が通常不要とするものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "対象テーブル"
      },
      {
        "key": "B",
        "text": "入力パス"
      },
      {
        "key": "C",
        "text": "FILEFORMAT"
      },
      {
        "key": "D",
        "text": "checkpointLocation"
      }
    ],
    "answer": "D",
    "explanation": "COPY INTOはストリーミングではないため通常checkpointを使わない。"
  },
  {
    "id": 10018,
    "section": "Development & Ingestion",
    "question": "Bronze層でAuto Loaderがよく使われる理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQL Warehouseを停止するから"
      },
      {
        "key": "B",
        "text": "ダッシュボードを描画するから"
      },
      {
        "key": "C",
        "text": "生データを継続的に取り込む入口だから"
      },
      {
        "key": "D",
        "text": "権限継承を定義するから"
      }
    ],
    "answer": "C",
    "explanation": "BronzeはRaw Ingestionの層。"
  },
  {
    "id": 10019,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで出力側に指定するストリーミング状態保存先はどれか",
    "choices": [
      {
        "key": "A",
        "text": "metastoreId"
      },
      {
        "key": "B",
        "text": "checkpointLocation"
      },
      {
        "key": "C",
        "text": "catalogName"
      },
      {
        "key": "D",
        "text": "warehousePath"
      }
    ],
    "answer": "B",
    "explanation": "書き込みストリームの状態を保持する。"
  },
  {
    "id": 10020,
    "section": "Development & Ingestion",
    "question": "明示スキーマを本番で使う利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "予測可能性が上がる"
      },
      {
        "key": "B",
        "text": "VACUUMが不要になる"
      },
      {
        "key": "C",
        "text": "すべての権限が不要になる"
      },
      {
        "key": "D",
        "text": "Spark UIが消える"
      }
    ],
    "answer": "A",
    "explanation": "型の揺れや実行時の不意の変化を抑えられる。"
  },
  {
    "id": 10021,
    "section": "Development & Ingestion",
    "question": "Databricks NotebookでPythonセル内からSQLセルへ切り替えるマジックコマンドはどれか",
    "choices": [
      {
        "key": "A",
        "text": "%scala_only"
      },
      {
        "key": "B",
        "text": "%sql"
      },
      {
        "key": "C",
        "text": "%catalog"
      },
      {
        "key": "D",
        "text": "%run"
      }
    ],
    "answer": "B",
    "explanation": "`%sql` でSQLを実行できる。"
  },
  {
    "id": 10022,
    "section": "Development & Ingestion",
    "question": "`%run` の特徴として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "別コンテキストで文字列を返す"
      },
      {
        "key": "B",
        "text": "クラスタを作成する"
      },
      {
        "key": "C",
        "text": "同一コンテキストで実行し変数を共有"
      },
      {
        "key": "D",
        "text": "ジョブをスケジュールする"
      }
    ],
    "answer": "C",
    "explanation": "共通関数の読み込みなどに使う。"
  },
  {
    "id": 10023,
    "section": "Development & Ingestion",
    "question": "`dbutils.notebook.run()` の特徴として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "テーブルを最適化する"
      },
      {
        "key": "B",
        "text": "必ず同一変数空間を共有する"
      },
      {
        "key": "C",
        "text": "SQL Warehouse専用"
      },
      {
        "key": "D",
        "text": "別コンテキストで実行し文字列を返す"
      }
    ],
    "answer": "D",
    "explanation": "パラメータを渡し、戻り値を受ける用途に向く。"
  },
  {
    "id": 10024,
    "section": "Development & Ingestion",
    "question": "`%run` についての制約はどれか",
    "choices": [
      {
        "key": "A",
        "text": "セル内で単独で使う必要がある"
      },
      {
        "key": "B",
        "text": "必ずScalaで実行する"
      },
      {
        "key": "C",
        "text": "SQL Warehouseでしか使えない"
      },
      {
        "key": "D",
        "text": "Gitが必要"
      }
    ],
    "answer": "A",
    "explanation": "他のコードと同じセルに混在できない。"
  },
  {
    "id": 10025,
    "section": "Development & Ingestion",
    "question": "Notebookをdev/prodで切り替えるパラメータ化に使う代表機能はどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM"
      },
      {
        "key": "B",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "C",
        "text": "Delta Sharing"
      },
      {
        "key": "D",
        "text": "widgets"
      }
    ],
    "answer": "D",
    "explanation": "`dbutils.widgets` でジョブ実行時パラメータも受け取れる。"
  },
  {
    "id": 10026,
    "section": "Development & Ingestion",
    "question": "PythonでWidget値を取得する関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "sql.widget"
      },
      {
        "key": "B",
        "text": "getArgumentのみ"
      },
      {
        "key": "C",
        "text": "dbutils.widgets.get"
      },
      {
        "key": "D",
        "text": "spark.getWidget"
      }
    ],
    "answer": "C",
    "explanation": "Pythonでは `dbutils.widgets.get(\"name\")` を使う。"
  },
  {
    "id": 10027,
    "section": "Development & Ingestion",
    "question": "SQLでWidget値を参照する代表関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "widgetValue()"
      },
      {
        "key": "B",
        "text": "getArgument()"
      },
      {
        "key": "C",
        "text": "dbutils.widgets.get()"
      },
      {
        "key": "D",
        "text": "selectWidget()"
      }
    ],
    "answer": "B",
    "explanation": "SQLでは `getArgument` が使われる。"
  },
  {
    "id": 10028,
    "section": "Development & Ingestion",
    "question": "SQLセルで作った結果をPythonセルから読む標準的な橋渡しはどれか",
    "choices": [
      {
        "key": "A",
        "text": "一時ビューを作りspark.tableで読む"
      },
      {
        "key": "B",
        "text": "クラスタを再起動する"
      },
      {
        "key": "C",
        "text": "VACUUMする"
      },
      {
        "key": "D",
        "text": "GRANT ALLする"
      }
    ],
    "answer": "A",
    "explanation": "temp viewは言語間共有に便利。"
  },
  {
    "id": 10029,
    "section": "Development & Ingestion",
    "question": "Databricks Git Foldersの主目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "クラウド通知"
      },
      {
        "key": "B",
        "text": "Git連携によるバージョン管理"
      },
      {
        "key": "C",
        "text": "権限継承"
      },
      {
        "key": "D",
        "text": "ファイル圧縮"
      }
    ],
    "answer": "B",
    "explanation": "ノートブックやコードをリポジトリ管理する。"
  },
  {
    "id": 10030,
    "section": "Development & Ingestion",
    "question": "Notebookの変数が失われる状況として最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SELECTする"
      },
      {
        "key": "B",
        "text": "commentを書く"
      },
      {
        "key": "C",
        "text": "クラスタからデタッチされる"
      },
      {
        "key": "D",
        "text": "DISPLAYする"
      }
    ],
    "answer": "C",
    "explanation": "実行コンテキストが失われる。"
  },
  {
    "id": 10031,
    "section": "Development & Ingestion",
    "question": "Databricks Connectの主用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ダッシュボードを公開"
      },
      {
        "key": "B",
        "text": "テーブル権限を継承"
      },
      {
        "key": "C",
        "text": "Delta履歴を削除"
      },
      {
        "key": "D",
        "text": "ローカルIDEからリモートDatabricks計算に接続"
      }
    ],
    "answer": "D",
    "explanation": "VS Code等からSparkコードを実行できる。"
  },
  {
    "id": 10032,
    "section": "Development & Ingestion",
    "question": "Databricks Connect v2の基盤はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Spark Connect"
      },
      {
        "key": "B",
        "text": "Hive Metastore"
      },
      {
        "key": "C",
        "text": "Delta Sharing"
      },
      {
        "key": "D",
        "text": "RESTORE"
      }
    ],
    "answer": "A",
    "explanation": "thin clientとしてクラスタへクエリを送る。"
  },
  {
    "id": 10033,
    "section": "Development & Ingestion",
    "question": "Databricks Connectでローカルに不要なものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "認証情報"
      },
      {
        "key": "B",
        "text": "ワークスペースURL"
      },
      {
        "key": "C",
        "text": "クラスタまたはserverless"
      },
      {
        "key": "D",
        "text": "Sparkの完全インストール"
      }
    ],
    "answer": "D",
    "explanation": "v2はthin clientでローカルSpark不要。"
  },
  {
    "id": 10034,
    "section": "Development & Ingestion",
    "question": "Databricks Connect v2でセッション作成に使うクラスはどれか",
    "choices": [
      {
        "key": "A",
        "text": "UnitySession"
      },
      {
        "key": "B",
        "text": "PipelineSession"
      },
      {
        "key": "C",
        "text": "DatabricksSession"
      },
      {
        "key": "D",
        "text": "LocalSparkOnly"
      }
    ],
    "answer": "C",
    "explanation": "`DatabricksSession.builder` を使う。"
  },
  {
    "id": 10035,
    "section": "Development & Ingestion",
    "question": "Databricks Connectが最も適さない用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "IDEでの開発"
      },
      {
        "key": "B",
        "text": "本番スケジュール実行の置き換え"
      },
      {
        "key": "C",
        "text": "ローカルデバッグ"
      },
      {
        "key": "D",
        "text": "CI統合テスト"
      }
    ],
    "answer": "B",
    "explanation": "本番スケジュールはLakeflow Jobs等を使う。"
  },
  {
    "id": 10036,
    "section": "Development & Ingestion",
    "question": "Databricks Connect利用時に計算が行われる場所はどこか",
    "choices": [
      {
        "key": "A",
        "text": "Databricksクラスタ/サーバレス"
      },
      {
        "key": "B",
        "text": "GitHub"
      },
      {
        "key": "C",
        "text": "常にローカルPC"
      },
      {
        "key": "D",
        "text": "ブラウザのメモリ"
      }
    ],
    "answer": "A",
    "explanation": "Spark処理はリモートで実行される。"
  },
  {
    "id": 10037,
    "section": "Development & Ingestion",
    "question": "Databricks Connectでクラスタが停止している場合の説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUMされる"
      },
      {
        "key": "B",
        "text": "セッションは失敗する"
      },
      {
        "key": "C",
        "text": "権限が昇格する"
      },
      {
        "key": "D",
        "text": "自動でローカル実行に切り替わる"
      }
    ],
    "answer": "B",
    "explanation": "利用可能なリモート計算が必要。"
  },
  {
    "id": 10038,
    "section": "Development & Ingestion",
    "question": "DABの中心設定ファイルはどれか",
    "choices": [
      {
        "key": "A",
        "text": "package.json"
      },
      {
        "key": "B",
        "text": "terraform.tfstateのみ"
      },
      {
        "key": "C",
        "text": "databricks.yml"
      },
      {
        "key": "D",
        "text": "spark.sql"
      }
    ],
    "answer": "C",
    "explanation": "Bundleのメタデータやリソースを定義する。"
  },
  {
    "id": 10039,
    "section": "Development & Ingestion",
    "question": "DABの主な価値はどれか",
    "choices": [
      {
        "key": "A",
        "text": "S3権限を無視"
      },
      {
        "key": "B",
        "text": "Deltaログを手動削除"
      },
      {
        "key": "C",
        "text": "SQL結果をグラフ化のみ"
      },
      {
        "key": "D",
        "text": "Databricksリソースをコードとして宣言・配備"
      }
    ],
    "answer": "D",
    "explanation": "IaCとCI/CDに向く。"
  },
  {
    "id": 10040,
    "section": "Development & Ingestion",
    "question": "DABでdev/staging/prodの差分設定を扱う主機能はどれか",
    "choices": [
      {
        "key": "A",
        "text": "targets"
      },
      {
        "key": "B",
        "text": "VACUUM"
      },
      {
        "key": "C",
        "text": "pivot"
      },
      {
        "key": "D",
        "text": "SHOW GRANTS"
      }
    ],
    "answer": "A",
    "explanation": "targetごとに変数やworkspaceを上書きできる。"
  },
  {
    "id": 10041,
    "section": "Development & Ingestion",
    "question": "DABで同じ設定値を複数箇所から参照する仕組みはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DESCRIBE DETAIL"
      },
      {
        "key": "B",
        "text": "RDD"
      },
      {
        "key": "C",
        "text": "_rescued_data"
      },
      {
        "key": "D",
        "text": "variables"
      }
    ],
    "answer": "D",
    "explanation": "`${var.name}` のように展開する。"
  },
  {
    "id": 10042,
    "section": "Development & Ingestion",
    "question": "DABで大きな設定を複数ファイルに分割するディレクティブはどれか",
    "choices": [
      {
        "key": "A",
        "text": "clone"
      },
      {
        "key": "B",
        "text": "run_as_sql"
      },
      {
        "key": "C",
        "text": "include"
      },
      {
        "key": "D",
        "text": "import table"
      }
    ],
    "answer": "C",
    "explanation": "`include` でjobs.yml等に分割できる。"
  },
  {
    "id": 10043,
    "section": "Development & Ingestion",
    "question": "DABの `resources` に定義できるものとして最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "CPU温度"
      },
      {
        "key": "B",
        "text": "jobsやpipelines"
      },
      {
        "key": "C",
        "text": "ブラウザ履歴"
      },
      {
        "key": "D",
        "text": "個人メール"
      }
    ],
    "answer": "B",
    "explanation": "Databricks上のリソースを宣言する。"
  },
  {
    "id": 10044,
    "section": "Development & Ingestion",
    "question": "DABで本番配備前に変更内容を確認するコマンドとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "databricks bundle deploy --target prod --dry-run"
      },
      {
        "key": "B",
        "text": "DROP TABLE"
      },
      {
        "key": "C",
        "text": "VACUUM"
      },
      {
        "key": "D",
        "text": "GRANT ALL"
      }
    ],
    "answer": "A",
    "explanation": "dry-runで作成/更新/削除予定を確認できる。"
  },
  {
    "id": 10045,
    "section": "Development & Ingestion",
    "question": "DABの設定検証に使う代表コマンドはどれか",
    "choices": [
      {
        "key": "A",
        "text": "spark checkpoint reset"
      },
      {
        "key": "B",
        "text": "databricks bundle validate"
      },
      {
        "key": "C",
        "text": "uc grant all"
      },
      {
        "key": "D",
        "text": "databricks table restore"
      }
    ],
    "answer": "B",
    "explanation": "設定の妥当性確認を行う。"
  },
  {
    "id": 10046,
    "section": "Development & Ingestion",
    "question": "DABでリソースを実際に作成・更新する代表コマンドはどれか",
    "choices": [
      {
        "key": "A",
        "text": "databricks bundle forget"
      },
      {
        "key": "B",
        "text": "OPTIMIZE"
      },
      {
        "key": "C",
        "text": "databricks bundle deploy"
      },
      {
        "key": "D",
        "text": "DESCRIBE HISTORY"
      }
    ],
    "answer": "C",
    "explanation": "deployがワークスペースへ反映する。"
  },
  {
    "id": 10047,
    "section": "Development & Ingestion",
    "question": "DABで定義済みジョブを実行する代表コマンドはどれか",
    "choices": [
      {
        "key": "A",
        "text": "databricks schema grant"
      },
      {
        "key": "B",
        "text": "databricks bundle vacuum"
      },
      {
        "key": "C",
        "text": "databricks catalog select"
      },
      {
        "key": "D",
        "text": "databricks bundle run"
      }
    ],
    "answer": "D",
    "explanation": "bundle内のjob/pipelineを実行する。"
  },
  {
    "id": 10048,
    "section": "Development & Ingestion",
    "question": "DABでトークンやパスワードを直接YAMLに書くべきでない理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "秘密情報漏洩の危険がある"
      },
      {
        "key": "B",
        "text": "YAMLが読めなくなる"
      },
      {
        "key": "C",
        "text": "SQLが禁止される"
      },
      {
        "key": "D",
        "text": "クラスタが必ず停止する"
      }
    ],
    "answer": "A",
    "explanation": "環境変数やSecretsを使う。"
  },
  {
    "id": 10049,
    "section": "Development & Ingestion",
    "question": "DABのノートブックパス指定で基本となる考え方はどれか",
    "choices": [
      {
        "key": "A",
        "text": "必ずHTTP URL"
      },
      {
        "key": "B",
        "text": "必ずS3 URL"
      },
      {
        "key": "C",
        "text": "任意のローカル絶対パスだけ"
      },
      {
        "key": "D",
        "text": "Bundle rootからの相対パス"
      }
    ],
    "answer": "D",
    "explanation": "CLIが相対パスを解決して同期する。"
  },
  {
    "id": 10050,
    "section": "Development & Ingestion",
    "question": "DABが従来の手動UI作成より優れる点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "データ品質が自動で完璧になる"
      },
      {
        "key": "B",
        "text": "すべて無料になる"
      },
      {
        "key": "C",
        "text": "Gitでレビュー・履歴管理しやすい"
      },
      {
        "key": "D",
        "text": "権限が不要になる"
      }
    ],
    "answer": "C",
    "explanation": "設定変更をPRやコミットで追える。"
  },
  {
    "id": 10051,
    "section": "Development & Ingestion",
    "question": "DABのマルチタスクジョブで依存関係を表すキーはどれか",
    "choices": [
      {
        "key": "A",
        "text": "rank_by"
      },
      {
        "key": "B",
        "text": "depends_on"
      },
      {
        "key": "C",
        "text": "after_table"
      },
      {
        "key": "D",
        "text": "wait_for_vacuum"
      }
    ],
    "answer": "B",
    "explanation": "task_keyを参照してDAGを作る。"
  },
  {
    "id": 10052,
    "section": "Development & Ingestion",
    "question": "extract後にtransform、その後loadとquality_checkを並列にしたい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "loadとquality_checkがtransformにdepends_on"
      },
      {
        "key": "B",
        "text": "quality_checkだけextract依存"
      },
      {
        "key": "C",
        "text": "すべてdepends_onなし"
      },
      {
        "key": "D",
        "text": "loadを先に実行"
      }
    ],
    "answer": "A",
    "explanation": "transform完了後に2タスクが並列実行できる。"
  },
  {
    "id": 10053,
    "section": "Development & Ingestion",
    "question": "Lakeflow Spark Declarative Pipelinesの基本思想はどれか",
    "choices": [
      {
        "key": "A",
        "text": "UIでのみ作る"
      },
      {
        "key": "B",
        "text": "何を作るかを宣言し実行順序等はエンジンに任せる"
      },
      {
        "key": "C",
        "text": "Deltaを使わない"
      },
      {
        "key": "D",
        "text": "全ステップを手動でsleep制御する"
      }
    ],
    "answer": "B",
    "explanation": "宣言型パイプライン。"
  },
  {
    "id": 10054,
    "section": "Development & Ingestion",
    "question": "Lakeflow Declarative PipelinesでStreaming Tableを作るSQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "CREATE LOCAL ONLY TABLE"
      },
      {
        "key": "B",
        "text": "GRANT STREAMING"
      },
      {
        "key": "C",
        "text": "CREATE OR REFRESH STREAMING TABLE"
      },
      {
        "key": "D",
        "text": "COPY STREAM TO NOTEBOOK"
      }
    ],
    "answer": "C",
    "explanation": "ストリーミングテーブル定義に使う。"
  },
  {
    "id": 10055,
    "section": "Development & Ingestion",
    "question": "LakeflowでMaterialized Viewを定義する代表SQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "RESTORE VIEW"
      },
      {
        "key": "B",
        "text": "CREATE WIDGET VIEW"
      },
      {
        "key": "C",
        "text": "RUN MATERIALIZE"
      },
      {
        "key": "D",
        "text": "CREATE OR REPLACE MATERIALIZED VIEW"
      }
    ],
    "answer": "D",
    "explanation": "宣言型で更新されるビューを作る。"
  },
  {
    "id": 10056,
    "section": "Development & Ingestion",
    "question": "Lakeflowパイプラインが自動的に解決するものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "テーブル間依存関係"
      },
      {
        "key": "B",
        "text": "個人パスワード"
      },
      {
        "key": "C",
        "text": "受験費用"
      },
      {
        "key": "D",
        "text": "外部S3請求"
      }
    ],
    "answer": "A",
    "explanation": "DAGに基づき順序を決める。"
  },
  {
    "id": 10057,
    "section": "Development & Ingestion",
    "question": "LakeflowでSilverが失敗した場合、Silverに依存するGoldはどうなるか",
    "choices": [
      {
        "key": "A",
        "text": "常に空で作成"
      },
      {
        "key": "B",
        "text": "強制成功"
      },
      {
        "key": "C",
        "text": "権限削除"
      },
      {
        "key": "D",
        "text": "実行されない"
      }
    ],
    "answer": "D",
    "explanation": "依存元失敗時に下流は止まる。"
  },
  {
    "id": 10058,
    "section": "Development & Ingestion",
    "question": "CDCをLakeflowで適用する代表構文はどれか",
    "choices": [
      {
        "key": "A",
        "text": "MERGE HISTORY OFF"
      },
      {
        "key": "B",
        "text": "AUTO GRANT"
      },
      {
        "key": "C",
        "text": "APPLY CHANGES"
      },
      {
        "key": "D",
        "text": "COPY CHANGES ONLY"
      }
    ],
    "answer": "C",
    "explanation": "INSERT/UPDATE/DELETEをターゲットへ反映する。"
  },
  {
    "id": 10059,
    "section": "Development & Ingestion",
    "question": "APPLY CHANGESで主キーを指定する句はどれか",
    "choices": [
      {
        "key": "A",
        "text": "CATALOG"
      },
      {
        "key": "B",
        "text": "KEYS"
      },
      {
        "key": "C",
        "text": "PRIMARY_ONLY"
      },
      {
        "key": "D",
        "text": "ORDER BY"
      }
    ],
    "answer": "B",
    "explanation": "レコード識別に使う。"
  },
  {
    "id": 10060,
    "section": "Development & Ingestion",
    "question": "APPLY CHANGESで変更順序を決める句はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SEQUENCE BY"
      },
      {
        "key": "B",
        "text": "GROUP KEYS"
      },
      {
        "key": "C",
        "text": "SORT FILES"
      },
      {
        "key": "D",
        "text": "ZORDER ONLY"
      }
    ],
    "answer": "A",
    "explanation": "タイムスタンプやバージョン列で順序を保証する。"
  },
  {
    "id": 10061,
    "section": "Development & Ingestion",
    "question": "現在状態だけ必要で履歴不要な顧客マスタに適するSCDはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Type 0のみ"
      },
      {
        "key": "B",
        "text": "Type 1"
      },
      {
        "key": "C",
        "text": "time travelだけ"
      },
      {
        "key": "D",
        "text": "Type 2"
      }
    ],
    "answer": "B",
    "explanation": "Type 1は上書きして最新状態を保持する。"
  },
  {
    "id": 10062,
    "section": "Development & Ingestion",
    "question": "住所変更履歴を監査したい場合に適するSCDはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Type 1"
      },
      {
        "key": "B",
        "text": "DROP/CREATE"
      },
      {
        "key": "C",
        "text": "Type 2"
      },
      {
        "key": "D",
        "text": "INSERT INTOだけ"
      }
    ],
    "answer": "C",
    "explanation": "Type 2は履歴バージョンを残す。"
  },
  {
    "id": 10063,
    "section": "Development & Ingestion",
    "question": "SCD Type 2の注意点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "主キー不要"
      },
      {
        "key": "B",
        "text": "常に最小容量"
      },
      {
        "key": "C",
        "text": "履歴を保持できない"
      },
      {
        "key": "D",
        "text": "履歴保持でストレージが増えやすい"
      }
    ],
    "answer": "D",
    "explanation": "更新頻度が高いとテーブルサイズが増える。"
  },
  {
    "id": 10064,
    "section": "Development & Ingestion",
    "question": "LakeflowのIncremental Refreshの説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "前回以降の新規データ中心に処理"
      },
      {
        "key": "B",
        "text": "常に全件再処理"
      },
      {
        "key": "C",
        "text": "テーブルを削除"
      },
      {
        "key": "D",
        "text": "権限をリセット"
      }
    ],
    "answer": "A",
    "explanation": "checkpoint等により効率化する。"
  },
  {
    "id": 10065,
    "section": "Development & Ingestion",
    "question": "Full Refreshが有用な場面はどれか",
    "choices": [
      {
        "key": "A",
        "text": "毎分小さい差分だけ"
      },
      {
        "key": "B",
        "text": "権限付与のみ"
      },
      {
        "key": "C",
        "text": "SQL Warehouse起動"
      },
      {
        "key": "D",
        "text": "ロジック修正後に全体を再構築"
      }
    ],
    "answer": "D",
    "explanation": "再処理や再構築が必要なときに使う。"
  },
  {
    "id": 10066,
    "section": "Development & Ingestion",
    "question": "checkpointを不用意にリセットするリスクはどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限が増える"
      },
      {
        "key": "B",
        "text": "Git履歴が消える"
      },
      {
        "key": "C",
        "text": "全件再処理や重複の可能性"
      },
      {
        "key": "D",
        "text": "クエリが必ず速くなる"
      }
    ],
    "answer": "C",
    "explanation": "状態を失うため慎重に行う。"
  },
  {
    "id": 10067,
    "section": "Development & Ingestion",
    "question": "Lakeflowのイベントログで確認できるものとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "クレジットカード番号"
      },
      {
        "key": "B",
        "text": "実行状態、行数、エラー"
      },
      {
        "key": "C",
        "text": "個人のブラウザ履歴"
      },
      {
        "key": "D",
        "text": "受験結果"
      }
    ],
    "answer": "B",
    "explanation": "監視・デバッグに使う。"
  },
  {
    "id": 10068,
    "section": "Development & Ingestion",
    "question": "PipelineでUnity Catalogを使う利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "catalog/schema配下に保存しガバナンスとリネージを得る"
      },
      {
        "key": "B",
        "text": "権限が不要"
      },
      {
        "key": "C",
        "text": "すべて匿名化される"
      },
      {
        "key": "D",
        "text": "Deltaが無効化される"
      }
    ],
    "answer": "A",
    "explanation": "UC統合で統制しやすい。"
  },
  {
    "id": 10069,
    "section": "Development & Ingestion",
    "question": "LakeflowのDevelopment modeに近い用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限監査のみ"
      },
      {
        "key": "B",
        "text": "開発中の反復"
      },
      {
        "key": "C",
        "text": "外部共有のみ"
      },
      {
        "key": "D",
        "text": "本番SLA重視の定期実行"
      }
    ],
    "answer": "B",
    "explanation": "反復開発に向く。"
  },
  {
    "id": 10070,
    "section": "Development & Ingestion",
    "question": "LakeflowのProduction modeに近い用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "一時的な手元実験のみ"
      },
      {
        "key": "B",
        "text": "画像編集"
      },
      {
        "key": "C",
        "text": "信頼性重視の本番実行"
      },
      {
        "key": "D",
        "text": "Notebook内の変数共有"
      }
    ],
    "answer": "C",
    "explanation": "本番運用向け。"
  },
  {
    "id": 10071,
    "section": "Development & Ingestion",
    "question": "`cloud_files()` の第2引数に入る代表値はどれか",
    "choices": [
      {
        "key": "A",
        "text": "クラスタID"
      },
      {
        "key": "B",
        "text": "権限名"
      },
      {
        "key": "C",
        "text": "ユーザー名"
      },
      {
        "key": "D",
        "text": "ファイル形式"
      }
    ],
    "answer": "D",
    "explanation": "`'json'` や `'parquet'` などを指定する。"
  },
  {
    "id": 10072,
    "section": "Development & Ingestion",
    "question": "Auto Loaderの `_metadata.file_path` をBronzeに保持する利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "入力ファイル追跡や監査に役立つ"
      },
      {
        "key": "B",
        "text": "テーブルを削除する"
      },
      {
        "key": "C",
        "text": "権限を付与する"
      },
      {
        "key": "D",
        "text": "クラスタを拡張する"
      }
    ],
    "answer": "A",
    "explanation": "データ由来の追跡に便利。"
  },
  {
    "id": 10073,
    "section": "Development & Ingestion",
    "question": "MedallionでBronze層の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "最終KPIのみ"
      },
      {
        "key": "B",
        "text": "ダッシュボード専用集計"
      },
      {
        "key": "C",
        "text": "権限だけ"
      },
      {
        "key": "D",
        "text": "生データの取り込み"
      }
    ],
    "answer": "D",
    "explanation": "Rawデータをなるべく保持する。"
  },
  {
    "id": 10074,
    "section": "Development & Ingestion",
    "question": "MedallionでSilver層の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "外部共有のみ"
      },
      {
        "key": "B",
        "text": "VACUUM専用"
      },
      {
        "key": "C",
        "text": "クレンジング・重複排除・整形"
      },
      {
        "key": "D",
        "text": "完全なRaw保持のみ"
      }
    ],
    "answer": "C",
    "explanation": "信頼できる整形済みデータを作る。"
  },
  {
    "id": 10075,
    "section": "Development & Ingestion",
    "question": "MedallionでGold層の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "リポジトリ同期"
      },
      {
        "key": "B",
        "text": "ビジネス向け集計・提供"
      },
      {
        "key": "C",
        "text": "ファイル検出"
      },
      {
        "key": "D",
        "text": "スキーマ推論"
      }
    ],
    "answer": "B",
    "explanation": "レポートやBIで使う成果物。"
  },
  {
    "id": 10076,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで「毎週1回の履歴アーカイブをまとめてロード」と出たら優先候補はどれか",
    "choices": [
      {
        "key": "A",
        "text": "COPY INTO"
      },
      {
        "key": "B",
        "text": "APPLY CHANGES Type 2"
      },
      {
        "key": "C",
        "text": "file notification streaming"
      },
      {
        "key": "D",
        "text": "GRANT USE SCHEMA"
      }
    ],
    "answer": "A",
    "explanation": "定期でも継続ストリーミングでなければCOPY INTOが簡潔。"
  },
  {
    "id": 10077,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで「ファイルが到着次第すぐ処理」と出たら優先候補はどれか",
    "choices": [
      {
        "key": "A",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "B",
        "text": "Auto Loader"
      },
      {
        "key": "C",
        "text": "Manual UI import"
      },
      {
        "key": "D",
        "text": "RESTORE"
      }
    ],
    "answer": "B",
    "explanation": "到着継続・自動検出がキーワード。"
  },
  {
    "id": 10078,
    "section": "Development & Ingestion",
    "question": "CSVの列型を安定させたい本番取り込みで有効な対策はどれか",
    "choices": [
      {
        "key": "A",
        "text": "GRANT ALL"
      },
      {
        "key": "B",
        "text": "DROP TABLE"
      },
      {
        "key": "C",
        "text": "明示スキーマまたはschema hints"
      },
      {
        "key": "D",
        "text": "VACUUM 0 HOURS"
      }
    ],
    "answer": "C",
    "explanation": "型推論任せの揺れを抑える。"
  },
  {
    "id": 10079,
    "section": "Development & Ingestion",
    "question": "Auto Loaderの exactly-once 処理に関係が深いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "row_number"
      },
      {
        "key": "B",
        "text": "Global temp schema"
      },
      {
        "key": "C",
        "text": "catalog owner"
      },
      {
        "key": "D",
        "text": "checkpoint"
      }
    ],
    "answer": "D",
    "explanation": "処理済み状態の追跡が重複防止に重要。"
  },
  {
    "id": 10080,
    "section": "Development & Ingestion",
    "question": "`cloudFiles.schemaLocation` と `checkpointLocation` の違いとして正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "前者はスキーマ、後者はストリーム状態"
      },
      {
        "key": "B",
        "text": "どちらも同じで不要"
      },
      {
        "key": "C",
        "text": "前者は権限、後者はGit"
      },
      {
        "key": "D",
        "text": "前者はBI、後者はSCD"
      }
    ],
    "answer": "A",
    "explanation": "役割を混同しないことが重要。"
  },
  {
    "id": 10081,
    "section": "Data Processing & Transformations",
    "question": "Delta Lakeのupsertに使う代表SQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SELECT ONLY"
      },
      {
        "key": "B",
        "text": "GRANT USE"
      },
      {
        "key": "C",
        "text": "OPTIMIZE ONLY"
      },
      {
        "key": "D",
        "text": "MERGE INTO"
      }
    ],
    "answer": "D",
    "explanation": "matched/not matchedで更新・挿入・削除を扱える。"
  },
  {
    "id": 10082,
    "section": "Data Processing & Transformations",
    "question": "既存行は更新、新規行は挿入したい。最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM"
      },
      {
        "key": "B",
        "text": "SHOW TABLES"
      },
      {
        "key": "C",
        "text": "MERGE INTO"
      },
      {
        "key": "D",
        "text": "INSERT INTOだけ"
      }
    ],
    "answer": "C",
    "explanation": "upsertパターン。"
  },
  {
    "id": 10083,
    "section": "Data Processing & Transformations",
    "question": "DeltaのTime Travelでバージョン5を読む構文はどれか",
    "choices": [
      {
        "key": "A",
        "text": "GRANT VERSION"
      },
      {
        "key": "B",
        "text": "VERSION AS OF 5"
      },
      {
        "key": "C",
        "text": "RESTORE 5 ONLY"
      },
      {
        "key": "D",
        "text": "VACUUM 5"
      }
    ],
    "answer": "B",
    "explanation": "過去バージョンの参照に使う。"
  },
  {
    "id": 10084,
    "section": "Data Processing & Transformations",
    "question": "特定時刻のDeltaテーブルを読む構文はどれか",
    "choices": [
      {
        "key": "A",
        "text": "TIMESTAMP AS OF"
      },
      {
        "key": "B",
        "text": "HISTORY AT"
      },
      {
        "key": "C",
        "text": "DATE TRAVEL BY"
      },
      {
        "key": "D",
        "text": "CLOCK SELECT"
      }
    ],
    "answer": "A",
    "explanation": "timestamp指定のTime Travel。"
  },
  {
    "id": 10085,
    "section": "Data Processing & Transformations",
    "question": "誤更新前の状態へテーブル全体を戻すSQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DROP VIEW"
      },
      {
        "key": "B",
        "text": "RESTORE TABLE ... TO VERSION AS OF"
      },
      {
        "key": "C",
        "text": "GRANT RESTORE"
      },
      {
        "key": "D",
        "text": "SELECT VERSION"
      }
    ],
    "answer": "B",
    "explanation": "Deltaの復元機能。"
  },
  {
    "id": 10086,
    "section": "Data Processing & Transformations",
    "question": "Deltaテーブルの操作履歴を見るSQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SHOW USERS"
      },
      {
        "key": "B",
        "text": "DESCRIBE CLUSTER"
      },
      {
        "key": "C",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "D",
        "text": "EXPLAIN RIGHTS"
      }
    ],
    "answer": "C",
    "explanation": "version, operation, timestamp等を確認できる。"
  },
  {
    "id": 10087,
    "section": "Data Processing & Transformations",
    "question": "小ファイルをまとめて読み取り効率を改善するコマンドはどれか",
    "choices": [
      {
        "key": "A",
        "text": "WIDGET"
      },
      {
        "key": "B",
        "text": "VACUUM"
      },
      {
        "key": "C",
        "text": "REVOKE"
      },
      {
        "key": "D",
        "text": "OPTIMIZE"
      }
    ],
    "answer": "D",
    "explanation": "ファイルコンパクション。"
  },
  {
    "id": 10088,
    "section": "Data Processing & Transformations",
    "question": "古い不要ファイルを削除してストレージを減らすコマンドはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM"
      },
      {
        "key": "B",
        "text": "OPTIMIZE"
      },
      {
        "key": "C",
        "text": "SELECT"
      },
      {
        "key": "D",
        "text": "pivot"
      }
    ],
    "answer": "A",
    "explanation": "retentionより古い不要ファイルを消す。"
  },
  {
    "id": 10089,
    "section": "Data Processing & Transformations",
    "question": "VACUUMの注意点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限が増える"
      },
      {
        "key": "B",
        "text": "すべて高速化する"
      },
      {
        "key": "C",
        "text": "スキーマが推論される"
      },
      {
        "key": "D",
        "text": "古いTime Travelや復元ができなくなる可能性"
      }
    ],
    "answer": "D",
    "explanation": "消したファイルのバージョンには戻れない。"
  },
  {
    "id": 10090,
    "section": "Data Processing & Transformations",
    "question": "`INSERT INTO` の基本動作はどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限付与"
      },
      {
        "key": "B",
        "text": "履歴削除"
      },
      {
        "key": "C",
        "text": "追記"
      },
      {
        "key": "D",
        "text": "全置換"
      }
    ],
    "answer": "C",
    "explanation": "既存データに行を追加する。"
  },
  {
    "id": 10091,
    "section": "Data Processing & Transformations",
    "question": "`INSERT OVERWRITE` の基本動作はどれか",
    "choices": [
      {
        "key": "A",
        "text": "checkpoint作成"
      },
      {
        "key": "B",
        "text": "対象を置換"
      },
      {
        "key": "C",
        "text": "常に追記"
      },
      {
        "key": "D",
        "text": "権限付与"
      }
    ],
    "answer": "B",
    "explanation": "リロードや置換に使う。"
  },
  {
    "id": 10092,
    "section": "Data Processing & Transformations",
    "question": "`CREATE OR REPLACE TABLE AS SELECT` の利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "テーブル再構築を原子的に行える"
      },
      {
        "key": "B",
        "text": "権限不要"
      },
      {
        "key": "C",
        "text": "必ず外部テーブルになる"
      },
      {
        "key": "D",
        "text": "ストリーミング専用"
      }
    ],
    "answer": "A",
    "explanation": "DROPして作り直すより安全な再構築。"
  },
  {
    "id": 10093,
    "section": "Data Processing & Transformations",
    "question": "セッション内だけ有効な中間ビューはどれか",
    "choices": [
      {
        "key": "A",
        "text": "MANAGED TABLE"
      },
      {
        "key": "B",
        "text": "TEMP VIEW"
      },
      {
        "key": "C",
        "text": "EXTERNAL LOCATION"
      },
      {
        "key": "D",
        "text": "GLOBAL TEMP VIEW"
      }
    ],
    "answer": "B",
    "explanation": "temp viewはセッションスコープ。"
  },
  {
    "id": 10094,
    "section": "Data Processing & Transformations",
    "question": "同じクラスタ上の複数Notebookから参照できる一時ビューはどれか",
    "choices": [
      {
        "key": "A",
        "text": "TEMP VIEW"
      },
      {
        "key": "B",
        "text": "Streaming Tableのみ"
      },
      {
        "key": "C",
        "text": "GLOBAL TEMP VIEW"
      },
      {
        "key": "D",
        "text": "MANAGED TABLEのみ"
      }
    ],
    "answer": "C",
    "explanation": "`global_temp` スキーマで参照する。"
  },
  {
    "id": 10095,
    "section": "Data Processing & Transformations",
    "question": "Global temp viewを参照するスキーマ名はどれか",
    "choices": [
      {
        "key": "A",
        "text": "bronze"
      },
      {
        "key": "B",
        "text": "system"
      },
      {
        "key": "C",
        "text": "information_schema"
      },
      {
        "key": "D",
        "text": "global_temp"
      }
    ],
    "answer": "D",
    "explanation": "`SELECT * FROM global_temp.view_name`。"
  },
  {
    "id": 10096,
    "section": "Data Processing & Transformations",
    "question": "`groupBy()` 後に必要なものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "agg/count/sum等の集計"
      },
      {
        "key": "B",
        "text": "必ずVACUUM"
      },
      {
        "key": "C",
        "text": "必ずGRANT"
      },
      {
        "key": "D",
        "text": "必ずRESTORE"
      }
    ],
    "answer": "A",
    "explanation": "groupByだけでは結果計算にならない。"
  },
  {
    "id": 10097,
    "section": "Data Processing & Transformations",
    "question": "商品別に売上合計、平均、件数を1回で計算するPySparkの典型はどれか",
    "choices": [
      {
        "key": "A",
        "text": "loopで1列ずつcollect"
      },
      {
        "key": "B",
        "text": "DROP TABLE"
      },
      {
        "key": "C",
        "text": "dbutils.notebook.run"
      },
      {
        "key": "D",
        "text": "groupBy().agg()"
      }
    ],
    "answer": "D",
    "explanation": "複数集計をaggでまとめる。"
  },
  {
    "id": 10098,
    "section": "Data Processing & Transformations",
    "question": "ユニーク顧客数を数える関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "sum"
      },
      {
        "key": "B",
        "text": "firstのみ"
      },
      {
        "key": "C",
        "text": "countDistinct"
      },
      {
        "key": "D",
        "text": "count"
      }
    ],
    "answer": "C",
    "explanation": "countは行数であり重複を含む。"
  },
  {
    "id": 10099,
    "section": "Data Processing & Transformations",
    "question": "行数を減らさず、顧客ごとの累積購入額を計算したい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "COPY INTO"
      },
      {
        "key": "B",
        "text": "window function"
      },
      {
        "key": "C",
        "text": "groupByだけ"
      },
      {
        "key": "D",
        "text": "VACUUM"
      }
    ],
    "answer": "B",
    "explanation": "Windowは各行に分析値を付与する。"
  },
  {
    "id": 10100,
    "section": "Data Processing & Transformations",
    "question": "Windowで顧客ごとに区切る指定はどれか",
    "choices": [
      {
        "key": "A",
        "text": "partitionBy(\"customer_id\")"
      },
      {
        "key": "B",
        "text": "catalogBy"
      },
      {
        "key": "C",
        "text": "groupAll"
      },
      {
        "key": "D",
        "text": "splitByTable"
      }
    ],
    "answer": "A",
    "explanation": "分析範囲を顧客単位にする。"
  },
  {
    "id": 10101,
    "section": "Data Processing & Transformations",
    "question": "Windowで日付順に累積計算したい場合に必要なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM"
      },
      {
        "key": "B",
        "text": "orderBy(\"purchase_date\")"
      },
      {
        "key": "C",
        "text": "USE CATALOG"
      },
      {
        "key": "D",
        "text": "GRANT SELECT"
      }
    ],
    "answer": "B",
    "explanation": "順序が累積結果を決める。"
  },
  {
    "id": 10102,
    "section": "Data Processing & Transformations",
    "question": "グループ内Top 3を厳密に1,2,3で取りたい関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "rank"
      },
      {
        "key": "B",
        "text": "count"
      },
      {
        "key": "C",
        "text": "row_number"
      },
      {
        "key": "D",
        "text": "dense_rank"
      }
    ],
    "answer": "C",
    "explanation": "row_numberは同点でも一意番号。"
  },
  {
    "id": 10103,
    "section": "Data Processing & Transformations",
    "question": "同点を1,1,3のように順位付けする関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "lag"
      },
      {
        "key": "B",
        "text": "row_number"
      },
      {
        "key": "C",
        "text": "dense_rank"
      },
      {
        "key": "D",
        "text": "rank"
      }
    ],
    "answer": "D",
    "explanation": "rankは順位の欠番が出る。"
  },
  {
    "id": 10104,
    "section": "Data Processing & Transformations",
    "question": "同点を1,1,2のように順位付けする関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "dense_rank"
      },
      {
        "key": "B",
        "text": "rank"
      },
      {
        "key": "C",
        "text": "row_number"
      },
      {
        "key": "D",
        "text": "lead"
      }
    ],
    "answer": "A",
    "explanation": "dense_rankは欠番が出ない。"
  },
  {
    "id": 10105,
    "section": "Data Processing & Transformations",
    "question": "前行の値を参照するWindow関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "lead"
      },
      {
        "key": "B",
        "text": "sum"
      },
      {
        "key": "C",
        "text": "pivot"
      },
      {
        "key": "D",
        "text": "lag"
      }
    ],
    "answer": "D",
    "explanation": "lagは前の行、leadは次の行。"
  },
  {
    "id": 10106,
    "section": "Data Processing & Transformations",
    "question": "次行の値を参照するWindow関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "countDistinct"
      },
      {
        "key": "B",
        "text": "cube"
      },
      {
        "key": "C",
        "text": "lead"
      },
      {
        "key": "D",
        "text": "lag"
      }
    ],
    "answer": "C",
    "explanation": "leadで次レコードの値を取得する。"
  },
  {
    "id": 10107,
    "section": "Data Processing & Transformations",
    "question": "縦持ちの月別売上を、月を列にした横持ちへ変換するのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "checkpoint"
      },
      {
        "key": "B",
        "text": "pivot"
      },
      {
        "key": "C",
        "text": "VACUUM"
      },
      {
        "key": "D",
        "text": "RESTORE"
      }
    ],
    "answer": "B",
    "explanation": "pivotはクロス集計に使う。"
  },
  {
    "id": 10108,
    "section": "Data Processing & Transformations",
    "question": "pivotで高カーディナリティ列を使うリスクはどれか",
    "choices": [
      {
        "key": "A",
        "text": "列が増えメモリ負荷が高い"
      },
      {
        "key": "B",
        "text": "スキーマが消える"
      },
      {
        "key": "C",
        "text": "権限が増える"
      },
      {
        "key": "D",
        "text": "必ず高速化"
      }
    ],
    "answer": "A",
    "explanation": "値リスト指定が推奨される。"
  },
  {
    "id": 10109,
    "section": "Data Processing & Transformations",
    "question": "地域・商品など複数階層の集計小計に向くAPIはどれか",
    "choices": [
      {
        "key": "A",
        "text": "RESTORE"
      },
      {
        "key": "B",
        "text": "rollup/cube"
      },
      {
        "key": "C",
        "text": "SHOW GRANTS"
      },
      {
        "key": "D",
        "text": "dbutils.widgets"
      }
    ],
    "answer": "B",
    "explanation": "OLAP的な多次元集計に使う。"
  },
  {
    "id": 10110,
    "section": "Data Processing & Transformations",
    "question": "Spark UIで遅いジョブを調べるとき見るものとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "GRANT一覧のみ"
      },
      {
        "key": "B",
        "text": "Gitコミットのみ"
      },
      {
        "key": "C",
        "text": "stages/tasks/shuffle/spill"
      },
      {
        "key": "D",
        "text": "Widget値のみ"
      }
    ],
    "answer": "C",
    "explanation": "実行のボトルネックを確認する。"
  },
  {
    "id": 10111,
    "section": "Data Processing & Transformations",
    "question": "SQLクエリの実行計画やボトルネック確認に使うものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "External Location"
      },
      {
        "key": "B",
        "text": "Delta Sharing"
      },
      {
        "key": "C",
        "text": "Widgets"
      },
      {
        "key": "D",
        "text": "Query Profile"
      }
    ],
    "answer": "D",
    "explanation": "SQL実行の詳細分析に使う。"
  },
  {
    "id": 10112,
    "section": "Data Processing & Transformations",
    "question": "driver logsが主に役立つのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "driver側のprintや初期化エラー"
      },
      {
        "key": "B",
        "text": "executor全体の詳細タスク分布"
      },
      {
        "key": "C",
        "text": "UC権限継承"
      },
      {
        "key": "D",
        "text": "Delta Sharing設定"
      }
    ],
    "answer": "A",
    "explanation": "分散実行詳細はSpark UIが適する。"
  },
  {
    "id": 10113,
    "section": "Data Processing & Transformations",
    "question": "クラスタ終了後のSpark UIについて正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "永久保存される"
      },
      {
        "key": "B",
        "text": "UC権限になる"
      },
      {
        "key": "C",
        "text": "RESTOREできる"
      },
      {
        "key": "D",
        "text": "そのクラスタのUIは失われる可能性がある"
      }
    ],
    "answer": "D",
    "explanation": "長期監視はイベントログ等を使う。"
  },
  {
    "id": 10114,
    "section": "Data Processing & Transformations",
    "question": "Data skippingの説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "全ファイルを必ず読む"
      },
      {
        "key": "B",
        "text": "Git履歴を消す"
      },
      {
        "key": "C",
        "text": "Deltaログの統計で不要ファイルを読まない"
      },
      {
        "key": "D",
        "text": "権限をスキップする"
      }
    ],
    "answer": "C",
    "explanation": "min/max統計などを活用する。"
  },
  {
    "id": 10115,
    "section": "Data Processing & Transformations",
    "question": "よく絞り込む列で大規模テーブルを高速化するデータ配置として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DROP HISTORY"
      },
      {
        "key": "B",
        "text": "Liquid ClusteringやZORDER"
      },
      {
        "key": "C",
        "text": "GRANT ALL"
      },
      {
        "key": "D",
        "text": "Global temp view"
      }
    ],
    "answer": "B",
    "explanation": "ファイルスキップを効きやすくする。"
  },
  {
    "id": 10116,
    "section": "Data Processing & Transformations",
    "question": "Predictive Optimizationの対象として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Unity Catalog managed tables"
      },
      {
        "key": "B",
        "text": "Notebook変数"
      },
      {
        "key": "C",
        "text": "すべての外部テーブルのみ"
      },
      {
        "key": "D",
        "text": "Gitブランチ"
      }
    ],
    "answer": "A",
    "explanation": "管理テーブルのOPTIMIZE/VACUUM等を自動化する。"
  },
  {
    "id": 10117,
    "section": "Data Processing & Transformations",
    "question": "外部テーブルのOPTIMIZE/VACUUM管理について正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DROPで必ずデータ削除"
      },
      {
        "key": "B",
        "text": "自分たちで運用が必要な場合がある"
      },
      {
        "key": "C",
        "text": "UC不可"
      },
      {
        "key": "D",
        "text": "Predictive Optimizationが常に完全対応"
      }
    ],
    "answer": "B",
    "explanation": "外部データはライフサイクルが独立しやすい。"
  },
  {
    "id": 10118,
    "section": "Data Processing & Transformations",
    "question": "大量小ファイルによりクエリが遅い場合の代表対策はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SHOW GRANTS"
      },
      {
        "key": "B",
        "text": "dbutils.notebook.exit"
      },
      {
        "key": "C",
        "text": "OPTIMIZE"
      },
      {
        "key": "D",
        "text": "CREATE WIDGET"
      }
    ],
    "answer": "C",
    "explanation": "小ファイルを圧縮する。"
  },
  {
    "id": 10119,
    "section": "Data Processing & Transformations",
    "question": "`OPTIMIZE sales ZORDER BY (region)` の狙いはどれか",
    "choices": [
      {
        "key": "A",
        "text": "schema推論"
      },
      {
        "key": "B",
        "text": "region列削除"
      },
      {
        "key": "C",
        "text": "権限付与"
      },
      {
        "key": "D",
        "text": "regionフィルタの読み取り削減"
      }
    ],
    "answer": "D",
    "explanation": "region近傍にデータ配置してスキップ効率を高める。"
  },
  {
    "id": 10120,
    "section": "Data Processing & Transformations",
    "question": "Delta Lakeのトランザクション面の強みはどれか",
    "choices": [
      {
        "key": "A",
        "text": "ACIDにより一貫した更新"
      },
      {
        "key": "B",
        "text": "履歴を持てない"
      },
      {
        "key": "C",
        "text": "SQL不可"
      },
      {
        "key": "D",
        "text": "ストレージ不要"
      }
    ],
    "answer": "A",
    "explanation": "信頼性のあるデータ処理を支える。"
  },
  {
    "id": 10121,
    "section": "Data Processing & Transformations",
    "question": "`MERGE INTO` の `WHEN MATCHED THEN UPDATE SET *` は何をするか",
    "choices": [
      {
        "key": "A",
        "text": "不一致行を削除"
      },
      {
        "key": "B",
        "text": "テーブルを最適化"
      },
      {
        "key": "C",
        "text": "権限を継承"
      },
      {
        "key": "D",
        "text": "一致行をソース値で更新"
      }
    ],
    "answer": "D",
    "explanation": "key一致時の更新処理。"
  },
  {
    "id": 10122,
    "section": "Data Processing & Transformations",
    "question": "`WHEN NOT MATCHED THEN INSERT *` は何をするか",
    "choices": [
      {
        "key": "A",
        "text": "ファイル圧縮"
      },
      {
        "key": "B",
        "text": "履歴表示"
      },
      {
        "key": "C",
        "text": "ターゲットにない行を挿入"
      },
      {
        "key": "D",
        "text": "すべて削除"
      }
    ],
    "answer": "C",
    "explanation": "新規レコードの追加。"
  },
  {
    "id": 10123,
    "section": "Data Processing & Transformations",
    "question": "削除フラグつきCDCで既存行を削除するにはどれが適切か",
    "choices": [
      {
        "key": "A",
        "text": "SELECT DISTINCTだけ"
      },
      {
        "key": "B",
        "text": "WHEN MATCHED AND is_deleted THEN DELETE"
      },
      {
        "key": "C",
        "text": "INSERT INTOだけ"
      },
      {
        "key": "D",
        "text": "VACUUMだけ"
      }
    ],
    "answer": "B",
    "explanation": "MERGEで条件付き削除を扱う。"
  },
  {
    "id": 10124,
    "section": "Data Processing & Transformations",
    "question": "Gold集計テーブルを定期的に丸ごと再生成するSQLとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "CREATE OR REPLACE TABLE AS SELECT"
      },
      {
        "key": "B",
        "text": "SHOW GRANTS"
      },
      {
        "key": "C",
        "text": "GRANT SELECT"
      },
      {
        "key": "D",
        "text": "USE SCHEMA"
      }
    ],
    "answer": "A",
    "explanation": "集計結果を原子的に再構築できる。"
  },
  {
    "id": 10125,
    "section": "Data Processing & Transformations",
    "question": "Deltaテーブルが多くのバージョンを持つことを確認する入口はどれか",
    "choices": [
      {
        "key": "A",
        "text": "CREATE WIDGET"
      },
      {
        "key": "B",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "C",
        "text": "cloud_files"
      },
      {
        "key": "D",
        "text": "USE CATALOG"
      }
    ],
    "answer": "B",
    "explanation": "バージョン履歴を確認する。"
  },
  {
    "id": 10126,
    "section": "Productionizing Data Pipelines",
    "question": "Lakeflow Jobsの主目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "テーブルのTime Travel"
      },
      {
        "key": "B",
        "text": "ファイル形式変換のみ"
      },
      {
        "key": "C",
        "text": "パイプラインやNotebookタスクのスケジュール・実行管理"
      },
      {
        "key": "D",
        "text": "UC権限のみ"
      }
    ],
    "answer": "C",
    "explanation": "旧Workflows相当のオーケストレーション。"
  },
  {
    "id": 10127,
    "section": "Productionizing Data Pipelines",
    "question": "Lakeflow Jobsでタスク間の順序制御に使う概念はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Delta Sharing"
      },
      {
        "key": "B",
        "text": "VACUUM"
      },
      {
        "key": "C",
        "text": "SELECT"
      },
      {
        "key": "D",
        "text": "dependency/DAG"
      }
    ],
    "answer": "D",
    "explanation": "依存関係に従いタスクを実行する。"
  },
  {
    "id": 10128,
    "section": "Productionizing Data Pipelines",
    "question": "失敗したマルチタスクジョブの一部だけを再実行する考え方はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Repair run"
      },
      {
        "key": "B",
        "text": "Full refresh"
      },
      {
        "key": "C",
        "text": "RESTORE TABLE"
      },
      {
        "key": "D",
        "text": "GRANT ALL"
      }
    ],
    "answer": "A",
    "explanation": "失敗箇所から修復実行できる。"
  },
  {
    "id": 10129,
    "section": "Productionizing Data Pipelines",
    "question": "すべてのタスクを最初から再実行したい場合に近いのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Repair from failed only"
      },
      {
        "key": "B",
        "text": "SHOW GRANTS"
      },
      {
        "key": "C",
        "text": "DESCRIBE DETAIL"
      },
      {
        "key": "D",
        "text": "Rerun all"
      }
    ],
    "answer": "D",
    "explanation": "全体再実行と部分修復を区別する。"
  },
  {
    "id": 10130,
    "section": "Productionizing Data Pipelines",
    "question": "ジョブのNotebookに実行日や環境を渡す方法として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "ZORDER"
      },
      {
        "key": "B",
        "text": "Delta Sharing"
      },
      {
        "key": "C",
        "text": "task parameters/widgets"
      },
      {
        "key": "D",
        "text": "VACUUM"
      }
    ],
    "answer": "C",
    "explanation": "Notebook側はwidgetで受け取れる。"
  },
  {
    "id": 10131,
    "section": "Productionizing Data Pipelines",
    "question": "本番ジョブで同時実行数を制御する目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Gitを無効化"
      },
      {
        "key": "B",
        "text": "重複実行やリソース競合を防ぐ"
      },
      {
        "key": "C",
        "text": "権限を増やす"
      },
      {
        "key": "D",
        "text": "Time Travelを消す"
      }
    ],
    "answer": "B",
    "explanation": "`max_concurrent_runs` などで管理する。"
  },
  {
    "id": 10132,
    "section": "Productionizing Data Pipelines",
    "question": "ジョブ失敗の通知先設定の目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "運用者が異常に気づく"
      },
      {
        "key": "B",
        "text": "スキーマを推論する"
      },
      {
        "key": "C",
        "text": "データを圧縮する"
      },
      {
        "key": "D",
        "text": "権限継承する"
      }
    ],
    "answer": "A",
    "explanation": "本番運用の監視に重要。"
  },
  {
    "id": 10133,
    "section": "Productionizing Data Pipelines",
    "question": "Serverless Jobsの利点として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "常に手動スケール"
      },
      {
        "key": "B",
        "text": "クラスタ管理不要で起動待ちを減らしやすい"
      },
      {
        "key": "C",
        "text": "RDD専用"
      },
      {
        "key": "D",
        "text": "UC不要"
      }
    ],
    "answer": "B",
    "explanation": "Databricks管理の計算資源を使う。"
  },
  {
    "id": 10134,
    "section": "Productionizing Data Pipelines",
    "question": "Serverless computeの重要要件はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Hive Metastoreのみ"
      },
      {
        "key": "B",
        "text": "手動EC2管理"
      },
      {
        "key": "C",
        "text": "Unity Catalog"
      },
      {
        "key": "D",
        "text": "ローカルSpark"
      }
    ],
    "answer": "C",
    "explanation": "ServerlessはUC前提。"
  },
  {
    "id": 10135,
    "section": "Productionizing Data Pipelines",
    "question": "Hive MetastoreのみのワークスペースでServerlessを使いたい。正しい判断はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Widgetsで回避"
      },
      {
        "key": "B",
        "text": "そのまま必ず使える"
      },
      {
        "key": "C",
        "text": "VACUUMすれば使える"
      },
      {
        "key": "D",
        "text": "UCへ移行が必要"
      }
    ],
    "answer": "D",
    "explanation": "UCが必須。"
  },
  {
    "id": 10136,
    "section": "Productionizing Data Pipelines",
    "question": "予測不能なBI SQLクエリに向く計算はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Serverless SQL Warehouse"
      },
      {
        "key": "B",
        "text": "常時起動クラスタのみ"
      },
      {
        "key": "C",
        "text": "Databricks Connectのみ"
      },
      {
        "key": "D",
        "text": "Delta Sharingのみ"
      }
    ],
    "answer": "A",
    "explanation": "自動スケール・アイドル削減に向く。"
  },
  {
    "id": 10137,
    "section": "Productionizing Data Pipelines",
    "question": "Serverless SQL Warehouseで一般に有効な高速化要素はどれか",
    "choices": [
      {
        "key": "A",
        "text": "RDD"
      },
      {
        "key": "B",
        "text": "Git"
      },
      {
        "key": "C",
        "text": "Widgets"
      },
      {
        "key": "D",
        "text": "Photon"
      }
    ],
    "answer": "D",
    "explanation": "SQL高速化がデフォルトで活用される。"
  },
  {
    "id": 10138,
    "section": "Productionizing Data Pipelines",
    "question": "Classic clusterの特徴はどれか",
    "choices": [
      {
        "key": "A",
        "text": "設定不要"
      },
      {
        "key": "B",
        "text": "起動待ちゼロ保証"
      },
      {
        "key": "C",
        "text": "インスタンスタイプやworker数を自分で管理"
      },
      {
        "key": "D",
        "text": "UCなしでもServerlessと同じ"
      }
    ],
    "answer": "C",
    "explanation": "制御は大きいが管理負荷もある。"
  },
  {
    "id": 10139,
    "section": "Productionizing Data Pipelines",
    "question": "Jobsで本番ETLを定期実行する場合、Notebookを手動実行し続けるより良い理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "履歴が消える"
      },
      {
        "key": "B",
        "text": "スケジュール・監視・リトライができる"
      },
      {
        "key": "C",
        "text": "権限が不要"
      },
      {
        "key": "D",
        "text": "データが自動で正しくなる"
      }
    ],
    "answer": "B",
    "explanation": "運用機能がまとまっている。"
  },
  {
    "id": 10140,
    "section": "Productionizing Data Pipelines",
    "question": "DABとLakeflow Jobsを組み合わせる利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ジョブ定義をコード化して配備できる"
      },
      {
        "key": "B",
        "text": "Deltaが不要"
      },
      {
        "key": "C",
        "text": "Notebook実行が禁止される"
      },
      {
        "key": "D",
        "text": "UCを無効化"
      }
    ],
    "answer": "A",
    "explanation": "CI/CDしやすい。"
  },
  {
    "id": 10141,
    "section": "Productionizing Data Pipelines",
    "question": "本番配備前にDAB設定の構文や参照ミスを見つけたい。実行するのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "RESTORE"
      },
      {
        "key": "B",
        "text": "bundle validate"
      },
      {
        "key": "C",
        "text": "SELECT COUNT"
      },
      {
        "key": "D",
        "text": "VACUUM"
      }
    ],
    "answer": "B",
    "explanation": "validateで設定検証。"
  },
  {
    "id": 10142,
    "section": "Productionizing Data Pipelines",
    "question": "prod配備で意図しない削除を避けるため事前確認するならどれか",
    "choices": [
      {
        "key": "A",
        "text": "DROP TABLE"
      },
      {
        "key": "B",
        "text": "GRANT ALL"
      },
      {
        "key": "C",
        "text": "dry-run"
      },
      {
        "key": "D",
        "text": "checkpoint reset"
      }
    ],
    "answer": "C",
    "explanation": "変更計画を確認する。"
  },
  {
    "id": 10143,
    "section": "Productionizing Data Pipelines",
    "question": "パイプライン実行で下流タスクが上流の成功を待つ設定はどれか",
    "choices": [
      {
        "key": "A",
        "text": "USE CATALOG"
      },
      {
        "key": "B",
        "text": "schemaHints"
      },
      {
        "key": "C",
        "text": "row_number"
      },
      {
        "key": "D",
        "text": "depends_on"
      }
    ],
    "answer": "D",
    "explanation": "タスク依存を明示する。"
  },
  {
    "id": 10144,
    "section": "Productionizing Data Pipelines",
    "question": "WorkflowでNotebookが成功・失敗の情報を呼び出し元へ返す方法として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "dbutils.notebook.exit()"
      },
      {
        "key": "B",
        "text": "VACUUM"
      },
      {
        "key": "C",
        "text": "ZORDER"
      },
      {
        "key": "D",
        "text": "SHOW GRANTS"
      }
    ],
    "answer": "A",
    "explanation": "文字列結果を返せる。"
  },
  {
    "id": 10145,
    "section": "Productionizing Data Pipelines",
    "question": "Sparkジョブが遅い本番障害の初期調査に向くのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Git blameだけ"
      },
      {
        "key": "B",
        "text": "Delta Sharingだけ"
      },
      {
        "key": "C",
        "text": "CREATE WIDGET"
      },
      {
        "key": "D",
        "text": "Spark UIやイベントログ"
      }
    ],
    "answer": "D",
    "explanation": "実行時間・shuffle・spillなどを確認する。"
  },
  {
    "id": 10146,
    "section": "Productionizing Data Pipelines",
    "question": "Lakeflow Pipelineのヘルス確認に使う情報として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "local IDE theme"
      },
      {
        "key": "B",
        "text": "browser bookmarks"
      },
      {
        "key": "C",
        "text": "pipeline event logs"
      },
      {
        "key": "D",
        "text": "global_tempのみ"
      }
    ],
    "answer": "C",
    "explanation": "行数やエラーなどを確認できる。"
  },
  {
    "id": 10147,
    "section": "Productionizing Data Pipelines",
    "question": "本番で手動UI作成したジョブ定義が環境ごとにズレる問題を防ぐにはどれが有効か",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM短縮"
      },
      {
        "key": "B",
        "text": "DABでコード管理"
      },
      {
        "key": "C",
        "text": "DROP/CREATE手動"
      },
      {
        "key": "D",
        "text": "個人メモ"
      }
    ],
    "answer": "B",
    "explanation": "設定ドリフトを減らす。"
  },
  {
    "id": 10148,
    "section": "Productionizing Data Pipelines",
    "question": "同じBundleをdevとprodで異なるcatalogに配備するにはどれを使うか",
    "choices": [
      {
        "key": "A",
        "text": "targetsのvariables上書き"
      },
      {
        "key": "B",
        "text": "countDistinct"
      },
      {
        "key": "C",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "D",
        "text": "RESTORE"
      }
    ],
    "answer": "A",
    "explanation": "環境別の値を切り替えられる。"
  },
  {
    "id": 10149,
    "section": "Productionizing Data Pipelines",
    "question": "CI/CDでBundleをstagingへ配備し承認後prodへ配備する流れの利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "UC権限不要"
      },
      {
        "key": "B",
        "text": "同じ定義を段階的に昇格できる"
      },
      {
        "key": "C",
        "text": "すべて手動"
      },
      {
        "key": "D",
        "text": "SQLが使えなくなる"
      }
    ],
    "answer": "B",
    "explanation": "再現性とレビュー性が上がる。"
  },
  {
    "id": 10150,
    "section": "Productionizing Data Pipelines",
    "question": "本番パイプラインの依存関係が複雑な場合、Lakeflowの強みはどれか",
    "choices": [
      {
        "key": "A",
        "text": "すべての列を文字列にする"
      },
      {
        "key": "B",
        "text": "外部データを削除"
      },
      {
        "key": "C",
        "text": "依存DAGを解決し順序制御する"
      },
      {
        "key": "D",
        "text": "権限を無視"
      }
    ],
    "answer": "C",
    "explanation": "宣言型パイプラインの中核。"
  },
  {
    "id": 10151,
    "section": "Productionizing Data Pipelines",
    "question": "本番ジョブの失敗後に原因を直して失敗タスク以降だけ走らせたい。選ぶのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DROP TABLE"
      },
      {
        "key": "B",
        "text": "Full rerunのみ"
      },
      {
        "key": "C",
        "text": "VACUUM"
      },
      {
        "key": "D",
        "text": "Repair run"
      }
    ],
    "answer": "D",
    "explanation": "時間とコストを節約できる。"
  },
  {
    "id": 10152,
    "section": "Productionizing Data Pipelines",
    "question": "毎日0時にETLを実行したい。使う機能はどれか",
    "choices": [
      {
        "key": "A",
        "text": "schedule/cron"
      },
      {
        "key": "B",
        "text": "ZORDER"
      },
      {
        "key": "C",
        "text": "GRANT"
      },
      {
        "key": "D",
        "text": "schemaHints"
      }
    ],
    "answer": "A",
    "explanation": "Lakeflow Jobsのスケジュール。"
  },
  {
    "id": 10153,
    "section": "Productionizing Data Pipelines",
    "question": "本番タスクで一時的なクラスタ設定を毎回手動作成する負担を減らすにはどれが有効か",
    "choices": [
      {
        "key": "A",
        "text": "Notebookコメントだけ"
      },
      {
        "key": "B",
        "text": "SELECT *"
      },
      {
        "key": "C",
        "text": "temp viewだけ"
      },
      {
        "key": "D",
        "text": "job/DAB定義にcomputeを含める"
      }
    ],
    "answer": "D",
    "explanation": "設定をコード化・再利用できる。"
  },
  {
    "id": 10154,
    "section": "Productionizing Data Pipelines",
    "question": "Serverlessが未対応リージョンの場合の判断として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUMで対応"
      },
      {
        "key": "B",
        "text": "Widgetsで有効化"
      },
      {
        "key": "C",
        "text": "対応状況を確認し、必要ならClassic等を使う"
      },
      {
        "key": "D",
        "text": "必ず使える"
      }
    ],
    "answer": "C",
    "explanation": "リージョン対応は前提確認が必要。"
  },
  {
    "id": 10155,
    "section": "Productionizing Data Pipelines",
    "question": "本番Pipelineでエラーを下流に広げないためのLakeflowの動作はどれか",
    "choices": [
      {
        "key": "A",
        "text": "履歴を消す"
      },
      {
        "key": "B",
        "text": "依存元失敗時に依存先を実行しない"
      },
      {
        "key": "C",
        "text": "下流を必ず成功扱い"
      },
      {
        "key": "D",
        "text": "全権限を削除"
      }
    ],
    "answer": "B",
    "explanation": "破損データの伝播を防ぐ。"
  },
  {
    "id": 10156,
    "section": "Data Governance & Quality",
    "question": "Unity Catalogの3階層名前空間はどれか",
    "choices": [
      {
        "key": "A",
        "text": "catalog.schema.table"
      },
      {
        "key": "B",
        "text": "workspace.cluster.user"
      },
      {
        "key": "C",
        "text": "database.folder.file"
      },
      {
        "key": "D",
        "text": "bucket.prefix.object"
      }
    ],
    "answer": "A",
    "explanation": "UCの基本名前空間。"
  },
  {
    "id": 10157,
    "section": "Data Governance & Quality",
    "question": "テーブルSELECTに必要な権限の組み合わせとして最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "MODIFYだけ"
      },
      {
        "key": "B",
        "text": "USE CATALOG + USE SCHEMA + SELECT"
      },
      {
        "key": "C",
        "text": "CREATE TABLEだけ"
      },
      {
        "key": "D",
        "text": "SELECTだけ"
      }
    ],
    "answer": "B",
    "explanation": "上位オブジェクト利用権限も必要。"
  },
  {
    "id": 10158,
    "section": "Data Governance & Quality",
    "question": "SELECTを付与済みなのにアクセス拒否される典型原因はどれか",
    "choices": [
      {
        "key": "A",
        "text": "OPTIMIZE不足"
      },
      {
        "key": "B",
        "text": "widget不足"
      },
      {
        "key": "C",
        "text": "USE CATALOG/USE SCHEMA不足"
      },
      {
        "key": "D",
        "text": "pivot不足"
      }
    ],
    "answer": "C",
    "explanation": "UCの頻出ひっかけ。"
  },
  {
    "id": 10159,
    "section": "Data Governance & Quality",
    "question": "スキーマ内の現在および将来のテーブルを読ませたい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "RESTORE"
      },
      {
        "key": "B",
        "text": "各テーブルだけ手動付与"
      },
      {
        "key": "C",
        "text": "VACUUM"
      },
      {
        "key": "D",
        "text": "GRANT SELECT ON SCHEMA"
      }
    ],
    "answer": "D",
    "explanation": "スキーマ権限は継承される。"
  },
  {
    "id": 10160,
    "section": "Data Governance & Quality",
    "question": "最小権限の原則に合うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "必要な権限だけグループへ付与"
      },
      {
        "key": "B",
        "text": "全員にALL PRIVILEGES"
      },
      {
        "key": "C",
        "text": "個人に管理者権限"
      },
      {
        "key": "D",
        "text": "Tokenを共有"
      }
    ],
    "answer": "A",
    "explanation": "グループとleast privilegeが基本。"
  },
  {
    "id": 10161,
    "section": "Data Governance & Quality",
    "question": "ETLサービスプリンシパルがBronze読取・Silver書込をする最小権限に含まれるものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Metastore admin"
      },
      {
        "key": "B",
        "text": "ALL PRIVILEGESのみ"
      },
      {
        "key": "C",
        "text": "Delta Sharing admin"
      },
      {
        "key": "D",
        "text": "Bronze SELECT、Silver MODIFY/CREATE TABLE、USE権限"
      }
    ],
    "answer": "D",
    "explanation": "読み書きに必要な具体権限を付与する。"
  },
  {
    "id": 10162,
    "section": "Data Governance & Quality",
    "question": "`MODIFY` 権限の用途として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "読み取りのみ"
      },
      {
        "key": "B",
        "text": "所有権移転のみ"
      },
      {
        "key": "C",
        "text": "テーブルへの書き込み・変更"
      },
      {
        "key": "D",
        "text": "catalog利用のみ"
      }
    ],
    "answer": "C",
    "explanation": "更新や挿入などの変更に関わる。"
  },
  {
    "id": 10163,
    "section": "Data Governance & Quality",
    "question": "`CREATE TABLE` 権限の対象として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Notebookを実行"
      },
      {
        "key": "B",
        "text": "スキーマ内にテーブルを作る"
      },
      {
        "key": "C",
        "text": "行を読む"
      },
      {
        "key": "D",
        "text": "クラスタを起動"
      }
    ],
    "answer": "B",
    "explanation": "オブジェクト作成権限。"
  },
  {
    "id": 10164,
    "section": "Data Governance & Quality",
    "question": "オブジェクト所有者について正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "所有オブジェクトの権限管理ができる"
      },
      {
        "key": "B",
        "text": "常にmetastore全体管理者"
      },
      {
        "key": "C",
        "text": "読み取りだけ可能"
      },
      {
        "key": "D",
        "text": "所有権変更不可"
      }
    ],
    "answer": "A",
    "explanation": "ownerは権限付与等を管理できる。"
  },
  {
    "id": 10165,
    "section": "Data Governance & Quality",
    "question": "所有権を移すSQLとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SELECT OWNER"
      },
      {
        "key": "B",
        "text": "ALTER ... OWNER TO"
      },
      {
        "key": "C",
        "text": "MERGE OWNER"
      },
      {
        "key": "D",
        "text": "VACUUM OWNER"
      }
    ],
    "answer": "B",
    "explanation": "owner変更に使う。"
  },
  {
    "id": 10166,
    "section": "Data Governance & Quality",
    "question": "Metastore adminとCatalog ownerの違いとして正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "まったく同じ"
      },
      {
        "key": "B",
        "text": "どちらもSELECTのみ"
      },
      {
        "key": "C",
        "text": "Metastore adminはメタストア全体、Catalog ownerはカタログ範囲"
      },
      {
        "key": "D",
        "text": "Catalog ownerの方が常に全体権限"
      }
    ],
    "answer": "C",
    "explanation": "権限範囲が異なる。"
  },
  {
    "id": 10167,
    "section": "Data Governance & Quality",
    "question": "Managed tableのDROP動作として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "UCから消えない"
      },
      {
        "key": "B",
        "text": "メタデータだけ削除"
      },
      {
        "key": "C",
        "text": "ファイルだけ残ることが常に保証"
      },
      {
        "key": "D",
        "text": "メタデータとデータファイルが削除される"
      }
    ],
    "answer": "D",
    "explanation": "Databricksがライフサイクルを管理する。"
  },
  {
    "id": 10168,
    "section": "Data Governance & Quality",
    "question": "External tableのDROP動作として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "UCメタデータのみ削除しデータファイルは残る"
      },
      {
        "key": "B",
        "text": "データファイルも必ず削除"
      },
      {
        "key": "C",
        "text": "権限だけ削除"
      },
      {
        "key": "D",
        "text": "checkpointだけ削除"
      }
    ],
    "answer": "A",
    "explanation": "外部ストレージのデータは独立。"
  },
  {
    "id": 10169,
    "section": "Data Governance & Quality",
    "question": "Managed tableを作る基本SQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "CREATE TABLE ... LOCATIONのみ"
      },
      {
        "key": "B",
        "text": "CREATE EXTERNAL LOCATION"
      },
      {
        "key": "C",
        "text": "GRANT TABLE"
      },
      {
        "key": "D",
        "text": "CREATE TABLE catalog.schema.table (...)"
      }
    ],
    "answer": "D",
    "explanation": "LOCATIONなしの通常CREATEはmanagedになる。"
  },
  {
    "id": 10170,
    "section": "Data Governance & Quality",
    "question": "External table作成で重要な指定はどれか",
    "choices": [
      {
        "key": "A",
        "text": "row_number"
      },
      {
        "key": "B",
        "text": "widget"
      },
      {
        "key": "C",
        "text": "LOCATION 'cloud path'"
      },
      {
        "key": "D",
        "text": "VERSION AS OF"
      }
    ],
    "answer": "C",
    "explanation": "データの外部保存場所を示す。"
  },
  {
    "id": 10171,
    "section": "Data Governance & Quality",
    "question": "テーブルがmanagedかexternalか確認するSQLはどれか",
    "choices": [
      {
        "key": "A",
        "text": "CREATE WIDGET"
      },
      {
        "key": "B",
        "text": "DESCRIBE DETAIL"
      },
      {
        "key": "C",
        "text": "SELECT COUNT"
      },
      {
        "key": "D",
        "text": "VACUUM"
      }
    ],
    "answer": "B",
    "explanation": "table_typeやlocationを確認できる。"
  },
  {
    "id": 10172,
    "section": "Data Governance & Quality",
    "question": "External Locationの目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "クラウドストレージパスをUCで統制する"
      },
      {
        "key": "B",
        "text": "Spark UI保存"
      },
      {
        "key": "C",
        "text": "Notebook変数保存"
      },
      {
        "key": "D",
        "text": "Git branch作成"
      }
    ],
    "answer": "A",
    "explanation": "Storage Credentialと組み合わせて外部データを管理する。"
  },
  {
    "id": 10173,
    "section": "Data Governance & Quality",
    "question": "Storage Credentialの役割として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Delta履歴表示"
      },
      {
        "key": "B",
        "text": "クラウドストレージへの認証情報を抽象化"
      },
      {
        "key": "C",
        "text": "Dashboard描画"
      },
      {
        "key": "D",
        "text": "SQL順位計算"
      }
    ],
    "answer": "B",
    "explanation": "UC経由で安全に外部場所を扱う。"
  },
  {
    "id": 10174,
    "section": "Data Governance & Quality",
    "question": "データが他システムからも利用され、Databricksに削除ライフサイクルを握らせたくない。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Managed table"
      },
      {
        "key": "B",
        "text": "Global temp viewのみ"
      },
      {
        "key": "C",
        "text": "External table"
      },
      {
        "key": "D",
        "text": "Temp viewのみ"
      }
    ],
    "answer": "C",
    "explanation": "外部テーブルはデータ本体を残せる。"
  },
  {
    "id": 10175,
    "section": "Data Governance & Quality",
    "question": "Databricksが主な所有者でMedallionを構築する場合の推奨はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Global temp viewだけ"
      },
      {
        "key": "B",
        "text": "External tablesのみ"
      },
      {
        "key": "C",
        "text": "CSVファイル直読みだけ"
      },
      {
        "key": "D",
        "text": "Managed tables"
      }
    ],
    "answer": "D",
    "explanation": "管理・最適化・ガバナンスを任せやすい。"
  },
  {
    "id": 10176,
    "section": "Data Governance & Quality",
    "question": "Unity Catalog lineageの価値はどれか",
    "choices": [
      {
        "key": "A",
        "text": "データの由来と下流影響を追跡できる"
      },
      {
        "key": "B",
        "text": "クラスタ数を増やす"
      },
      {
        "key": "C",
        "text": "SQLを禁止する"
      },
      {
        "key": "D",
        "text": "VACUUMを無効化"
      }
    ],
    "answer": "A",
    "explanation": "監査や影響分析に役立つ。"
  },
  {
    "id": 10177,
    "section": "Data Governance & Quality",
    "question": "Audit logsで確認したい代表情報はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Python変数の全値"
      },
      {
        "key": "B",
        "text": "ローカルIDEテーマ"
      },
      {
        "key": "C",
        "text": "受験者の得点"
      },
      {
        "key": "D",
        "text": "誰がいつ何にアクセス/操作したか"
      }
    ],
    "answer": "D",
    "explanation": "セキュリティ監査に使う。"
  },
  {
    "id": 10178,
    "section": "Data Governance & Quality",
    "question": "Delta Sharingの主目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Sparkタスク並列化"
      },
      {
        "key": "B",
        "text": "ファイル圧縮"
      },
      {
        "key": "C",
        "text": "データを安全に外部組織と共有"
      },
      {
        "key": "D",
        "text": "Notebook変数共有"
      }
    ],
    "answer": "C",
    "explanation": "オープンなデータ共有プロトコル。"
  },
  {
    "id": 10179,
    "section": "Data Governance & Quality",
    "question": "Lakehouse Federationの主目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Notebook実行"
      },
      {
        "key": "B",
        "text": "外部DBにクエリし必要に応じpushdownする"
      },
      {
        "key": "C",
        "text": "Delta履歴削除"
      },
      {
        "key": "D",
        "text": "Widget作成"
      }
    ],
    "answer": "B",
    "explanation": "外部システムをUCから参照できる。"
  },
  {
    "id": 10180,
    "section": "Data Governance & Quality",
    "question": "Lakehouse Federationでpushdownされにくい可能性があるものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "複雑なUDFや一部window関数"
      },
      {
        "key": "B",
        "text": "単純JOIN"
      },
      {
        "key": "C",
        "text": "単純なWHERE"
      },
      {
        "key": "D",
        "text": "列選択"
      }
    ],
    "answer": "A",
    "explanation": "複雑処理はDatabricks側で実行されることがある。"
  },
  {
    "id": 10181,
    "section": "Databricks Intelligence Platform",
    "question": "Databricks Certified Data Engineer Associateで最も比重が高い2領域に近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Governanceだけ"
      },
      {
        "key": "B",
        "text": "Development/IngestionとProcessing"
      },
      {
        "key": "C",
        "text": "UIデザインだけ"
      },
      {
        "key": "D",
        "text": "Platformだけ"
      }
    ],
    "answer": "B",
    "explanation": "試験概要ではSection 2と3が大きい。"
  },
  {
    "id": 10182,
    "section": "Databricks Intelligence Platform",
    "question": "Databricks Intelligence Platformの価値として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "ローカルCSVだけを扱う"
      },
      {
        "key": "B",
        "text": "権限管理を持たない"
      },
      {
        "key": "C",
        "text": "データ、AI、ガバナンスを統合する"
      },
      {
        "key": "D",
        "text": "SQLを使えない"
      }
    ],
    "answer": "C",
    "explanation": "Lakehouse/Data Intelligenceの中核。"
  },
  {
    "id": 10183,
    "section": "Databricks Intelligence Platform",
    "question": "Lakehouseの考え方として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Notebookを禁止する"
      },
      {
        "key": "B",
        "text": "ファイルを一切保存しない"
      },
      {
        "key": "C",
        "text": "RDBだけを使う"
      },
      {
        "key": "D",
        "text": "Data lakeの柔軟性とwarehouseの信頼性を組み合わせる"
      }
    ],
    "answer": "D",
    "explanation": "Delta Lake等で信頼性を補う。"
  },
  {
    "id": 10184,
    "section": "Databricks Intelligence Platform",
    "question": "Delta LakeがLakehouseで重要な理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ACID、スキーマ管理、Time Travel等を提供"
      },
      {
        "key": "B",
        "text": "権限を不要にする"
      },
      {
        "key": "C",
        "text": "クラウドを不要にする"
      },
      {
        "key": "D",
        "text": "SQLを無効化する"
      }
    ],
    "answer": "A",
    "explanation": "信頼できるデータレイクを支える。"
  },
  {
    "id": 10185,
    "section": "Databricks Intelligence Platform",
    "question": "Unity CatalogのPlatform上の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Python実行のみ"
      },
      {
        "key": "B",
        "text": "ファイル通知のみ"
      },
      {
        "key": "C",
        "text": "UIテーマ変更"
      },
      {
        "key": "D",
        "text": "中央集権的なデータガバナンス"
      }
    ],
    "answer": "D",
    "explanation": "権限、リネージ、監査などを統制。"
  },
  {
    "id": 10186,
    "section": "Databricks Intelligence Platform",
    "question": "Medallion Architectureが試験で重要な理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限だけの概念だから"
      },
      {
        "key": "B",
        "text": "Notebookマジックだから"
      },
      {
        "key": "C",
        "text": "実務的なLakehouseパイプライン設計の基本だから"
      },
      {
        "key": "D",
        "text": "BIツール名だから"
      }
    ],
    "answer": "C",
    "explanation": "Bronze/Silver/Goldで品質を段階化する。"
  },
  {
    "id": 10187,
    "section": "Databricks Intelligence Platform",
    "question": "Bronze/Silver/Goldの順序として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQL -> Python -> R"
      },
      {
        "key": "B",
        "text": "Raw -> Cleaned -> Business aggregates"
      },
      {
        "key": "C",
        "text": "Aggregates -> Raw -> Cleaned"
      },
      {
        "key": "D",
        "text": "Governance -> Compute -> Git"
      }
    ],
    "answer": "B",
    "explanation": "データ品質を段階的に高める。"
  },
  {
    "id": 10188,
    "section": "Databricks Intelligence Platform",
    "question": "DatabricksでSQLやBIの対話的クエリに使う代表計算はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQL Warehouse"
      },
      {
        "key": "B",
        "text": "DAB variable"
      },
      {
        "key": "C",
        "text": "Storage Credential"
      },
      {
        "key": "D",
        "text": "global_temp"
      }
    ],
    "answer": "A",
    "explanation": "ダッシュボードやアドホックSQLに使う。"
  },
  {
    "id": 10189,
    "section": "Databricks Intelligence Platform",
    "question": "JobsやPipelinesが担うPlatform上の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限の完全代替"
      },
      {
        "key": "B",
        "text": "データ処理の運用化・自動化"
      },
      {
        "key": "C",
        "text": "Time Travel削除"
      },
      {
        "key": "D",
        "text": "ファイル共有だけ"
      }
    ],
    "answer": "B",
    "explanation": "スケジュールと監視を含む。"
  },
  {
    "id": 10190,
    "section": "Databricks Intelligence Platform",
    "question": "Databricksで開発者が最初に試行錯誤しやすいUIはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM画面"
      },
      {
        "key": "B",
        "text": "External bucketのみ"
      },
      {
        "key": "C",
        "text": "Notebooks"
      },
      {
        "key": "D",
        "text": "Storage logsのみ"
      }
    ],
    "answer": "C",
    "explanation": "対話的開発の中心。"
  },
  {
    "id": 10191,
    "section": "Databricks Intelligence Platform",
    "question": "Compute Typesを選ぶ観点として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "問題数"
      },
      {
        "key": "B",
        "text": "好きな色"
      },
      {
        "key": "C",
        "text": "ファイル名"
      },
      {
        "key": "D",
        "text": "ワークロード、コスト、起動時間、制御性"
      }
    ],
    "answer": "D",
    "explanation": "serverless/classic等を用途で選ぶ。"
  },
  {
    "id": 10192,
    "section": "Databricks Intelligence Platform",
    "question": "All-purpose clusterに向く用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "対話的開発や探索"
      },
      {
        "key": "B",
        "text": "外部共有専用"
      },
      {
        "key": "C",
        "text": "監査ログ専用"
      },
      {
        "key": "D",
        "text": "受験登録"
      }
    ],
    "answer": "A",
    "explanation": "Notebookでの開発・探索に向く。"
  },
  {
    "id": 10193,
    "section": "Databricks Intelligence Platform",
    "question": "Job clusterに向く用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "常時手動分析だけ"
      },
      {
        "key": "B",
        "text": "UCメタストア"
      },
      {
        "key": "C",
        "text": "Delta Sharing受信"
      },
      {
        "key": "D",
        "text": "ジョブ実行ごとに作成・終了する本番タスク"
      }
    ],
    "answer": "D",
    "explanation": "ジョブ単位の分離とコスト管理に向く。"
  },
  {
    "id": 10194,
    "section": "Databricks Intelligence Platform",
    "question": "Serverless computeの価値として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Sparkを使えなくする"
      },
      {
        "key": "B",
        "text": "Storageを不要にする"
      },
      {
        "key": "C",
        "text": "Databricks管理で運用負荷を下げる"
      },
      {
        "key": "D",
        "text": "すべての権限を削除"
      }
    ],
    "answer": "C",
    "explanation": "計算資源管理をDatabricks側に任せる。"
  },
  {
    "id": 10195,
    "section": "Databricks Intelligence Platform",
    "question": "Photonの説明として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "外部共有プロトコル"
      },
      {
        "key": "B",
        "text": "SQL/Delta処理向けの高速実行エンジン"
      },
      {
        "key": "C",
        "text": "権限モデル"
      },
      {
        "key": "D",
        "text": "Git機能"
      }
    ],
    "answer": "B",
    "explanation": "クエリ性能向上に関係する。"
  },
  {
    "id": 10196,
    "section": "Databricks Intelligence Platform",
    "question": "Platformで「Data Intelligence」が意味する方向性として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "メタデータやAIを活用してデータ活用を支援"
      },
      {
        "key": "B",
        "text": "権限なし共有"
      },
      {
        "key": "C",
        "text": "手作業で全設定"
      },
      {
        "key": "D",
        "text": "ローカル限定処理"
      }
    ],
    "answer": "A",
    "explanation": "統合メタデータとAI支援が特徴。"
  },
  {
    "id": 10197,
    "section": "Databricks Intelligence Platform",
    "question": "ExamでPythonとSQLのどちらを読む力が必要か",
    "choices": [
      {
        "key": "A",
        "text": "SQLだけでPython不要"
      },
      {
        "key": "B",
        "text": "両方、特にSQL中心で一部Python"
      },
      {
        "key": "C",
        "text": "どちらも不要"
      },
      {
        "key": "D",
        "text": "Pythonだけ"
      }
    ],
    "answer": "B",
    "explanation": "AssociateはSQL中心だがPySparkも出る。"
  },
  {
    "id": 10198,
    "section": "Databricks Intelligence Platform",
    "question": "Platform領域で混同しやすい「workspace」と「catalog」の違いはどれか",
    "choices": [
      {
        "key": "A",
        "text": "完全に同じ"
      },
      {
        "key": "B",
        "text": "workspaceはテーブル"
      },
      {
        "key": "C",
        "text": "workspaceは作業環境、catalogはUCのデータ名前空間"
      },
      {
        "key": "D",
        "text": "catalogはクラスタ"
      }
    ],
    "answer": "C",
    "explanation": "作業場所とデータ統制の階層を分けて理解する。"
  },
  {
    "id": 10199,
    "section": "Databricks Intelligence Platform",
    "question": "Lakehouseでデータ品質を段階的に高める設計名はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Query Profile"
      },
      {
        "key": "B",
        "text": "DAB target"
      },
      {
        "key": "C",
        "text": "Databricks Connect"
      },
      {
        "key": "D",
        "text": "Medallion Architecture"
      }
    ],
    "answer": "D",
    "explanation": "Bronze/Silver/Goldのパターン。"
  },
  {
    "id": 10200,
    "section": "Databricks Intelligence Platform",
    "question": "45問90分の試験で時間配分として最も現実的なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "1問約2分を意識し、迷う問題はマークして戻る"
      },
      {
        "key": "B",
        "text": "1問10分使う"
      },
      {
        "key": "C",
        "text": "最初の5問だけ解く"
      },
      {
        "key": "D",
        "text": "解説を検索しながら解く"
      }
    ],
    "answer": "A",
    "explanation": "試験は時間制限があるため、詰まりすぎない戦略が重要。"
  }
]
