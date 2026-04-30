import type { Question } from '@/types'

export const associate3Questions: Question[] = [
  {
    "id": 20001,
    "section": "Development & Ingestion",
    "question": "取引先からJSONファイルが不定期にS3へ到着する。到着したファイルをほぼリアルタイムにBronze Deltaテーブルへ追加したい。最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`COPY INTO` を1日1回実行"
      },
      {
        "key": "B",
        "text": "`RESTORE TABLE`を使う"
      },
      {
        "key": "C",
        "text": "Auto Loaderで`cloudFiles`を使う"
      },
      {
        "key": "D",
        "text": "`DESCRIBE HISTORY`を使う"
      }
    ],
    "answer": "C",
    "explanation": "継続的な新規ファイル検出と取り込みにはAuto Loaderが適する。"
  },
  {
    "id": 20002,
    "section": "Development & Ingestion",
    "question": "次のコードで不足している可能性が最も高い設定はどれか。`spark.readStream.format(\"cloudFiles\").option(\"cloudFiles.format\",\"json\").load(path)`",
    "choices": [
      {
        "key": "A",
        "text": "`RESTORE VERSION`"
      },
      {
        "key": "B",
        "text": "`ZORDER BY`"
      },
      {
        "key": "C",
        "text": "`GRANT SELECT`"
      },
      {
        "key": "D",
        "text": "`cloudFiles.schemaLocation`"
      }
    ],
    "answer": "D",
    "explanation": "Auto Loaderのストリーミングではスキーマ保存先が重要。"
  },
  {
    "id": 20003,
    "section": "Development & Ingestion",
    "question": "`cloudFiles.schemaLocation` と `checkpointLocation` の説明として最も正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "前者は権限、後者は監査ログ"
      },
      {
        "key": "B",
        "text": "どちらもCOPY INTO専用"
      },
      {
        "key": "C",
        "text": "どちらも出力テーブルの保存先"
      },
      {
        "key": "D",
        "text": "前者はスキーマ管理、後者はストリーム状態管理"
      }
    ],
    "answer": "D",
    "explanation": "schemaLocationは推論スキーマ、checkpointLocationは処理状態を保持する。"
  },
  {
    "id": 20004,
    "section": "Development & Ingestion",
    "question": "過去データを一度だけロードし、以後そのパスに新規ファイルは来ない。最も簡潔な方法はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`APPLY CHANGES`"
      },
      {
        "key": "B",
        "text": "Auto Loaderを常時起動"
      },
      {
        "key": "C",
        "text": "Delta Sharing"
      },
      {
        "key": "D",
        "text": "`COPY INTO`"
      }
    ],
    "answer": "D",
    "explanation": "一回限りのバッチロードならCOPY INTOがシンプル。"
  },
  {
    "id": 20005,
    "section": "Development & Ingestion",
    "question": "Auto Loaderで未知の新規列を失わずに取り込み、下流で確認したい。適切な設定はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`cloudFiles.schemaEvolutionMode = \"rescue\"`"
      },
      {
        "key": "B",
        "text": "`VACUUM RETAIN 0 HOURS`"
      },
      {
        "key": "C",
        "text": "`USE CATALOG`"
      },
      {
        "key": "D",
        "text": "`row_number()`"
      }
    ],
    "answer": "A",
    "explanation": "rescueは未知列を`_rescued_data`に保持する。"
  },
  {
    "id": 20006,
    "section": "Development & Ingestion",
    "question": "上流CSVに不要な列が突然追加された。パイプラインは止めたくないが、勝手にテーブルスキーマを広げたくもない。最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`DROP TABLE`"
      },
      {
        "key": "B",
        "text": "`addNewColumns`"
      },
      {
        "key": "C",
        "text": "`rescue`"
      },
      {
        "key": "D",
        "text": "`failOnNewColumns`"
      }
    ],
    "answer": "C",
    "explanation": "rescueなら既存スキーマを保ちつつ未知データを保存できる。"
  },
  {
    "id": 20007,
    "section": "Development & Ingestion",
    "question": "Auto Loaderのfile notification modeがdirectory listingより有利になりやすい状況はどれか",
    "choices": [
      {
        "key": "A",
        "text": "大量ファイルが頻繁に到着"
      },
      {
        "key": "B",
        "text": "テーブル権限の付与"
      },
      {
        "key": "C",
        "text": "数ファイルを手動で一回ロード"
      },
      {
        "key": "D",
        "text": "SQLの集計だけ"
      }
    ],
    "answer": "A",
    "explanation": "通知ベースは大量・低レイテンシの検出に向く。"
  },
  {
    "id": 20008,
    "section": "Development & Ingestion",
    "question": "`cloud_files('/mnt/raw','json',map(...))` はどの文脈でよく使われるか",
    "choices": [
      {
        "key": "A",
        "text": "Unity CatalogのGRANT"
      },
      {
        "key": "B",
        "text": "Spark UIの設定"
      },
      {
        "key": "C",
        "text": "DABのtargets"
      },
      {
        "key": "D",
        "text": "Lakeflow Spark Declarative PipelinesのSQL"
      }
    ],
    "answer": "D",
    "explanation": "SQLでAuto Loaderを使う関数。"
  },
  {
    "id": 20009,
    "section": "Development & Ingestion",
    "question": "Bronzeテーブルに`_metadata.file_path`を保存する主な理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ファイル由来の追跡や再処理調査"
      },
      {
        "key": "B",
        "text": "権限継承"
      },
      {
        "key": "C",
        "text": "クエリ結果を必ず高速化"
      },
      {
        "key": "D",
        "text": "クラスタの自動起動"
      }
    ],
    "answer": "A",
    "explanation": "入力ファイルのトレーサビリティに役立つ。"
  },
  {
    "id": 20010,
    "section": "Development & Ingestion",
    "question": "Auto Loaderでファイル形式をParquetにする指定はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT PARQUET`"
      },
      {
        "key": "B",
        "text": "`.option(\"format.cloudFiles\",\"parquet\")`"
      },
      {
        "key": "C",
        "text": "`ZORDER BY parquet`"
      },
      {
        "key": "D",
        "text": "`.option(\"cloudFiles.format\",\"parquet\")`"
      }
    ],
    "answer": "D",
    "explanation": "cloudFiles.formatに形式を指定する。"
  },
  {
    "id": 20011,
    "section": "Development & Ingestion",
    "question": "本番取り込みでCSV列型の誤推論を避けたい。最も良い対策はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`を短くする"
      },
      {
        "key": "B",
        "text": "`%sql`に変える"
      },
      {
        "key": "C",
        "text": "明示スキーマやschema hintsを使う"
      },
      {
        "key": "D",
        "text": "`SELECT *`だけ使う"
      }
    ],
    "answer": "C",
    "explanation": "型を明示すると安定性が上がる。"
  },
  {
    "id": 20012,
    "section": "Development & Ingestion",
    "question": "`trigger(availableNow=True)` の説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "テーブルを復元する"
      },
      {
        "key": "B",
        "text": "利用可能なデータを処理して停止する"
      },
      {
        "key": "C",
        "text": "権限を付与する"
      },
      {
        "key": "D",
        "text": "常に無限実行する"
      }
    ],
    "answer": "B",
    "explanation": "バッチ的なストリーミング処理に使える。"
  },
  {
    "id": 20013,
    "section": "Development & Ingestion",
    "question": "`trigger(processingTime=\"10 minutes\")` の説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "10分ごとのマイクロバッチ"
      },
      {
        "key": "B",
        "text": "10分後にVACUUM"
      },
      {
        "key": "C",
        "text": "10分間だけSELECT権限"
      },
      {
        "key": "D",
        "text": "10分前のバージョンを読む"
      }
    ],
    "answer": "A",
    "explanation": "定期的なストリーム実行間隔を指定する。"
  },
  {
    "id": 20014,
    "section": "Development & Ingestion",
    "question": "`%run ./utils` を使うべき場面はどれか",
    "choices": [
      {
        "key": "A",
        "text": "UC権限を確認したい"
      },
      {
        "key": "B",
        "text": "共通関数を同じNotebookコンテキストに読み込みたい"
      },
      {
        "key": "C",
        "text": "別Notebookを完全に独立実行し戻り値を受けたい"
      },
      {
        "key": "D",
        "text": "Deltaテーブルを復元したい"
      }
    ],
    "answer": "B",
    "explanation": "`%run`は同一コンテキストで変数や関数を共有する。"
  },
  {
    "id": 20015,
    "section": "Development & Ingestion",
    "question": "`dbutils.notebook.run()` が`%run`より適する場面はどれか",
    "choices": [
      {
        "key": "A",
        "text": "変数を完全共有したい"
      },
      {
        "key": "B",
        "text": "Auto Loaderのスキーマを保存したい"
      },
      {
        "key": "C",
        "text": "パラメータを渡して別コンテキストで実行し結果文字列を受けたい"
      },
      {
        "key": "D",
        "text": "同じセル内でSQLを実行したい"
      }
    ],
    "answer": "C",
    "explanation": "notebook.runは引数と戻り値を扱える。"
  },
  {
    "id": 20016,
    "section": "Development & Ingestion",
    "question": "`%run`の試験上のひっかけとして正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "必ず戻り値を返す"
      },
      {
        "key": "B",
        "text": "別クラスタで実行する"
      },
      {
        "key": "C",
        "text": "SQL Warehouse専用"
      },
      {
        "key": "D",
        "text": "セル内で単独使用が必要"
      }
    ],
    "answer": "D",
    "explanation": "`%run`は同じセルに他コードを混ぜられない。"
  },
  {
    "id": 20017,
    "section": "Development & Ingestion",
    "question": "開発・本番で参照catalogを切り替えるNotebookを作りたい。最も自然な方法はどれか",
    "choices": [
      {
        "key": "A",
        "text": "widgetでenvを受け取りテーブル名を組み立てる"
      },
      {
        "key": "B",
        "text": "VACUUMで切り替える"
      },
      {
        "key": "C",
        "text": "毎回手でコードを書き換える"
      },
      {
        "key": "D",
        "text": "Spark UIで変更する"
      }
    ],
    "answer": "A",
    "explanation": "widgetsはジョブパラメータ化に向く。"
  },
  {
    "id": 20018,
    "section": "Development & Ingestion",
    "question": "Python Notebookでwidget値を取得するコードはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`DESCRIBE WIDGET env`"
      },
      {
        "key": "B",
        "text": "`GET WIDGET env`"
      },
      {
        "key": "C",
        "text": "`spark.widget(\"env\")`"
      },
      {
        "key": "D",
        "text": "`dbutils.widgets.get(\"env\")`"
      }
    ],
    "answer": "D",
    "explanation": "Pythonではdbutils.widgets.getを使う。"
  },
  {
    "id": 20019,
    "section": "Development & Ingestion",
    "question": "SQLセルでwidget値を参照する代表的な方法はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`spark.get('env')`"
      },
      {
        "key": "B",
        "text": "`cloud_files('env')`"
      },
      {
        "key": "C",
        "text": "`getArgument('env')`"
      },
      {
        "key": "D",
        "text": "`dbutils.widgets.get('env')`"
      }
    ],
    "answer": "C",
    "explanation": "SQLではgetArgumentが使われる。"
  },
  {
    "id": 20020,
    "section": "Development & Ingestion",
    "question": "SQLセルで作った一時ビューをPythonから読むにはどれが適切か",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT view_name`"
      },
      {
        "key": "B",
        "text": "`spark.table(\"view_name\")`"
      },
      {
        "key": "C",
        "text": "`RESTORE view_name`"
      },
      {
        "key": "D",
        "text": "`VACUUM view_name`"
      }
    ],
    "answer": "B",
    "explanation": "一時ビューはspark.tableで参照できる。"
  },
  {
    "id": 20021,
    "section": "Development & Ingestion",
    "question": "Databricks Git Foldersの目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ノートブックやコードをGit管理する"
      },
      {
        "key": "B",
        "text": "Deltaファイルを削除する"
      },
      {
        "key": "C",
        "text": "クラスタを自動最適化する"
      },
      {
        "key": "D",
        "text": "外部DBにpushdownする"
      }
    ],
    "answer": "A",
    "explanation": "バージョン管理と共同開発に使う。"
  },
  {
    "id": 20022,
    "section": "Development & Ingestion",
    "question": "Databricks Connectを使う主な理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Delta履歴を消す"
      },
      {
        "key": "B",
        "text": "ローカルIDEで開発し、実行はDatabricks計算資源で行う"
      },
      {
        "key": "C",
        "text": "本番ジョブスケジューラを置き換える"
      },
      {
        "key": "D",
        "text": "UC権限を不要にする"
      }
    ],
    "answer": "B",
    "explanation": "ローカル開発とリモートSpark実行をつなぐ。"
  },
  {
    "id": 20023,
    "section": "Development & Ingestion",
    "question": "Databricks Connect v2で使うセッション作成の入口はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`SparkContext()`"
      },
      {
        "key": "B",
        "text": "`CREATE WIDGET SESSION`"
      },
      {
        "key": "C",
        "text": "`DatabricksSession.builder`"
      },
      {
        "key": "D",
        "text": "`COPY INTO SESSION`"
      }
    ],
    "answer": "C",
    "explanation": "v2ではDatabricksSessionを使う。"
  },
  {
    "id": 20024,
    "section": "Development & Ingestion",
    "question": "Databricks Connect利用に必要なものとして最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "ローカルに完全なSparkクラスタ"
      },
      {
        "key": "B",
        "text": "Delta Sharing recipient"
      },
      {
        "key": "C",
        "text": "DAB targetだけ"
      },
      {
        "key": "D",
        "text": "ワークスペースURL、認証情報、実行先compute"
      }
    ],
    "answer": "D",
    "explanation": "リモートDatabricksに接続するための情報が必要。"
  },
  {
    "id": 20025,
    "section": "Development & Ingestion",
    "question": "Databricks Connectでクラスタが停止している場合に起こりやすいことはどれか",
    "choices": [
      {
        "key": "A",
        "text": "実行に失敗する"
      },
      {
        "key": "B",
        "text": "テーブルがmanagedになる"
      },
      {
        "key": "C",
        "text": "自動的にローカルSparkへ切り替わる"
      },
      {
        "key": "D",
        "text": "widgetが作られる"
      }
    ],
    "answer": "A",
    "explanation": "実行先computeが必要。"
  },
  {
    "id": 20026,
    "section": "Development & Ingestion",
    "question": "DABで環境別にcatalog名やworker数を変えたい。使うべき仕組みはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`rank` と `dense_rank`"
      },
      {
        "key": "B",
        "text": "`VACUUM` と `OPTIMIZE`"
      },
      {
        "key": "C",
        "text": "`%run` と `display`"
      },
      {
        "key": "D",
        "text": "`targets` と `variables`"
      }
    ],
    "answer": "D",
    "explanation": "targetごとに変数を上書きできる。"
  },
  {
    "id": 20027,
    "section": "Development & Ingestion",
    "question": "DABの設定ファイルが大きくなり、jobsとpipelinesを分けたい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`RESTORE`"
      },
      {
        "key": "B",
        "text": "`USE SCHEMA`"
      },
      {
        "key": "C",
        "text": "`include`"
      },
      {
        "key": "D",
        "text": "`MERGE INTO`"
      }
    ],
    "answer": "C",
    "explanation": "includeでYAMLを分割できる。"
  },
  {
    "id": 20028,
    "section": "Development & Ingestion",
    "question": "`databricks bundle validate` の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "テーブル履歴表示"
      },
      {
        "key": "B",
        "text": "設定の妥当性確認"
      },
      {
        "key": "C",
        "text": "SQL集計"
      },
      {
        "key": "D",
        "text": "Deltaファイル削除"
      }
    ],
    "answer": "B",
    "explanation": "配備前に設定ミスを検出する。"
  },
  {
    "id": 20029,
    "section": "Development & Ingestion",
    "question": "`databricks bundle deploy --target prod --dry-run` の目的はどれか",
    "choices": [
      {
        "key": "A",
        "text": "prodに対する変更計画を実適用せず確認する"
      },
      {
        "key": "B",
        "text": "prodを必ず削除する"
      },
      {
        "key": "C",
        "text": "prodジョブを即実行する"
      },
      {
        "key": "D",
        "text": "prodの権限を全付与する"
      }
    ],
    "answer": "A",
    "explanation": "本番配備前の確認に向く。"
  },
  {
    "id": 20030,
    "section": "Development & Ingestion",
    "question": "DABに秘密情報を直接書くべきでない理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQLが読めなくなる"
      },
      {
        "key": "B",
        "text": "Gitなどから漏洩するリスクがある"
      },
      {
        "key": "C",
        "text": "YAMLが使えなくなる"
      },
      {
        "key": "D",
        "text": "Sparkが停止する"
      }
    ],
    "answer": "B",
    "explanation": "環境変数やSecretsを使うべき。"
  },
  {
    "id": 20031,
    "section": "Development & Ingestion",
    "question": "DABでNotebookパスを指定する際の基本はどれか",
    "choices": [
      {
        "key": "A",
        "text": "常にクラウドURLのみ"
      },
      {
        "key": "B",
        "text": "常に絶対workspace pathのみ"
      },
      {
        "key": "C",
        "text": "bundle rootからの相対パス"
      },
      {
        "key": "D",
        "text": "常に`global_temp`"
      }
    ],
    "answer": "C",
    "explanation": "ローカルBundle内のパスをCLIが同期する。"
  },
  {
    "id": 20032,
    "section": "Development & Ingestion",
    "question": "DABが手動UI作成より優れる点として最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "全テーブルが自動で外部テーブルになる"
      },
      {
        "key": "B",
        "text": "権限が不要になる"
      },
      {
        "key": "C",
        "text": "SQLが不要になる"
      },
      {
        "key": "D",
        "text": "Gitレビューと再現性を得やすい"
      }
    ],
    "answer": "D",
    "explanation": "IaCとして変更管理できる。"
  },
  {
    "id": 20033,
    "section": "Development & Ingestion",
    "question": "DABの`resources.jobs`で複数タスクの依存関係を表すキーはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`depends_on`"
      },
      {
        "key": "B",
        "text": "`sequence_by`"
      },
      {
        "key": "C",
        "text": "`schemaLocation`"
      },
      {
        "key": "D",
        "text": "`zorder_by`"
      }
    ],
    "answer": "A",
    "explanation": "タスクDAGを定義する。"
  },
  {
    "id": 20034,
    "section": "Development & Ingestion",
    "question": "Extract完了後にTransformを実行し、Transform後にLoadとQuality Checkを並列にしたい。正しい考え方はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Quality Checkを最初に実行する"
      },
      {
        "key": "B",
        "text": "すべてExtractだけに依存させる"
      },
      {
        "key": "C",
        "text": "依存関係を定義しない"
      },
      {
        "key": "D",
        "text": "LoadとQuality CheckをTransformに依存させる"
      }
    ],
    "answer": "D",
    "explanation": "共通の上流依存を持つ下流タスクは並列実行できる。"
  },
  {
    "id": 20035,
    "section": "Development & Ingestion",
    "question": "Lakeflow Declarative PipelinesのSQLでBronzeを定義する場合に自然なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT BRONZE`"
      },
      {
        "key": "B",
        "text": "`RESTORE STREAMING`"
      },
      {
        "key": "C",
        "text": "`CREATE OR REFRESH STREAMING TABLE bronze AS SELECT * FROM cloud_files(...)`"
      },
      {
        "key": "D",
        "text": "`VACUUM bronze`"
      }
    ],
    "answer": "C",
    "explanation": "cloud_filesでAuto Loader取り込みを宣言できる。"
  },
  {
    "id": 20036,
    "section": "Development & Ingestion",
    "question": "Lakeflowでパイプライン内テーブルの依存関係は主に何から判断されるか",
    "choices": [
      {
        "key": "A",
        "text": "ユーザーのメールアドレス"
      },
      {
        "key": "B",
        "text": "テーブル定義間の参照関係"
      },
      {
        "key": "C",
        "text": "クラスタサイズ"
      },
      {
        "key": "D",
        "text": "ファイル名のアルファベット順だけ"
      }
    ],
    "answer": "B",
    "explanation": "参照関係からDAGが作られる。"
  },
  {
    "id": 20037,
    "section": "Development & Ingestion",
    "question": "Silverテーブル定義がBronzeを参照し、GoldがSilverを参照する。Silverが失敗した場合はどうなるか",
    "choices": [
      {
        "key": "A",
        "text": "Goldは実行されない"
      },
      {
        "key": "B",
        "text": "Goldだけ成功する"
      },
      {
        "key": "C",
        "text": "Bronzeが削除される"
      },
      {
        "key": "D",
        "text": "権限が全付与される"
      }
    ],
    "answer": "A",
    "explanation": "下流の破損を防ぐ。"
  },
  {
    "id": 20038,
    "section": "Development & Ingestion",
    "question": "CDCレコードの適用順序を安定させるためにAPPLY CHANGESで必要なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`SHOW GRANTS`"
      },
      {
        "key": "B",
        "text": "信頼できる`SEQUENCE BY`列"
      },
      {
        "key": "C",
        "text": "`VACUUM`"
      },
      {
        "key": "D",
        "text": "`ZORDER`"
      }
    ],
    "answer": "B",
    "explanation": "変更順序が不正だと結果が壊れる。"
  },
  {
    "id": 20039,
    "section": "Development & Ingestion",
    "question": "顧客の現在状態だけが必要で、過去住所は不要。Lakeflow CDCで選ぶSCDはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Type 2"
      },
      {
        "key": "B",
        "text": "Delta Sharing"
      },
      {
        "key": "C",
        "text": "Type 1"
      },
      {
        "key": "D",
        "text": "Time Travelのみ"
      }
    ],
    "answer": "C",
    "explanation": "Type 1は最新値に上書きする。"
  },
  {
    "id": 20040,
    "section": "Development & Ingestion",
    "question": "顧客住所の変更履歴を監査したい。選ぶSCDはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Type 1"
      },
      {
        "key": "B",
        "text": "INSERT INTOだけ"
      },
      {
        "key": "C",
        "text": "COPY INTOだけ"
      },
      {
        "key": "D",
        "text": "Type 2"
      }
    ],
    "answer": "D",
    "explanation": "Type 2は履歴を保持する。"
  },
  {
    "id": 20041,
    "section": "Development & Ingestion",
    "question": "Lakeflowのイベントログを見る目的として最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "実行状態、エラー、行数、品質結果の確認"
      },
      {
        "key": "B",
        "text": "クラスタの色変更"
      },
      {
        "key": "C",
        "text": "Gitブランチ作成"
      },
      {
        "key": "D",
        "text": "PowerPoint作成"
      }
    ],
    "answer": "A",
    "explanation": "パイプライン監視に使う。"
  },
  {
    "id": 20042,
    "section": "Development & Ingestion",
    "question": "Incremental refreshの説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "履歴を削除"
      },
      {
        "key": "B",
        "text": "毎回全件を必ず処理"
      },
      {
        "key": "C",
        "text": "権限だけを更新"
      },
      {
        "key": "D",
        "text": "前回以降の新規・変更分を中心に処理"
      }
    ],
    "answer": "D",
    "explanation": "差分処理で効率化する。"
  },
  {
    "id": 20043,
    "section": "Development & Ingestion",
    "question": "Full refreshを選ぶ理由として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限を付けたい"
      },
      {
        "key": "B",
        "text": "Notebookのセルを隠したい"
      },
      {
        "key": "C",
        "text": "変換ロジック修正後に全体を再計算したい"
      },
      {
        "key": "D",
        "text": "新規ファイルだけを最小処理したい"
      }
    ],
    "answer": "C",
    "explanation": "再構築にはFull refreshが向く。"
  },
  {
    "id": 20044,
    "section": "Development & Ingestion",
    "question": "Checkpointを不用意に削除・リセットするリスクはどれか",
    "choices": [
      {
        "key": "A",
        "text": "自動高速化"
      },
      {
        "key": "B",
        "text": "再処理や重複発生"
      },
      {
        "key": "C",
        "text": "schemaが常に固定"
      },
      {
        "key": "D",
        "text": "権限継承の改善"
      }
    ],
    "answer": "B",
    "explanation": "処理済み状態を失う。"
  },
  {
    "id": 20045,
    "section": "Development & Ingestion",
    "question": "Bronze/Silver/Goldの正しい役割対応はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Bronze=Raw、Silver=Cleaned、Gold=Business-ready"
      },
      {
        "key": "B",
        "text": "Bronze=BI、Silver=Raw、Gold=Checkpoint"
      },
      {
        "key": "C",
        "text": "Bronze=Permission、Silver=Compute、Gold=Git"
      },
      {
        "key": "D",
        "text": "Bronze=Temp、Silver=External、Gold=Widget"
      }
    ],
    "answer": "A",
    "explanation": "Medallionの基本。"
  },
  {
    "id": 20046,
    "section": "Data Processing & Transformations",
    "question": "新規顧客は挿入、既存顧客は更新、削除フラグがあれば削除したい。最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE WIDGET`"
      },
      {
        "key": "B",
        "text": "`MERGE INTO`"
      },
      {
        "key": "C",
        "text": "`INSERT INTO`のみ"
      },
      {
        "key": "D",
        "text": "`OPTIMIZE`"
      }
    ],
    "answer": "B",
    "explanation": "MERGEはupsertと条件削除を扱える。"
  },
  {
    "id": 20047,
    "section": "Data Processing & Transformations",
    "question": "`MERGE INTO target t USING source s ON t.id=s.id WHEN MATCHED THEN UPDATE SET * WHEN NOT MATCHED THEN INSERT *` の説明はどれか",
    "choices": [
      {
        "key": "A",
        "text": "全行削除"
      },
      {
        "key": "B",
        "text": "権限付与"
      },
      {
        "key": "C",
        "text": "一致行更新、不一致行挿入"
      },
      {
        "key": "D",
        "text": "ファイル圧縮"
      }
    ],
    "answer": "C",
    "explanation": "典型的なupsert。"
  },
  {
    "id": 20048,
    "section": "Data Processing & Transformations",
    "question": "誤ったジョブが9時にGoldテーブルを壊した。復旧の最初の確認として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`で履歴削除"
      },
      {
        "key": "B",
        "text": "`DROP TABLE`"
      },
      {
        "key": "C",
        "text": "`%run`"
      },
      {
        "key": "D",
        "text": "`DESCRIBE HISTORY`で9時前のversionを探す"
      }
    ],
    "answer": "D",
    "explanation": "復元すべきバージョンを確認する。"
  },
  {
    "id": 20049,
    "section": "Data Processing & Transformations",
    "question": "Deltaテーブルをversion 12へ復元する構文として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`RESTORE TABLE table TO VERSION AS OF 12`"
      },
      {
        "key": "B",
        "text": "`VACUUM VERSION 12`"
      },
      {
        "key": "C",
        "text": "`SELECT RESTORE 12`"
      },
      {
        "key": "D",
        "text": "`GRANT VERSION 12`"
      }
    ],
    "answer": "A",
    "explanation": "RESTOREで過去版に戻せる。"
  },
  {
    "id": 20050,
    "section": "Data Processing & Transformations",
    "question": "`VACUUM`を短い保持期間で実行する主なリスクはどれか",
    "choices": [
      {
        "key": "A",
        "text": "データが必ず速くなる"
      },
      {
        "key": "B",
        "text": "SELECT権限が増える"
      },
      {
        "key": "C",
        "text": "Notebookが消える"
      },
      {
        "key": "D",
        "text": "古いTime Travelができなくなる"
      }
    ],
    "answer": "D",
    "explanation": "古いファイルが削除される。"
  },
  {
    "id": 20051,
    "section": "Data Processing & Transformations",
    "question": "小ファイルが多く、スキャンが遅いDeltaテーブルへの代表対策はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`%run`"
      },
      {
        "key": "B",
        "text": "`SHOW WIDGETS`"
      },
      {
        "key": "C",
        "text": "`OPTIMIZE`"
      },
      {
        "key": "D",
        "text": "`GRANT SELECT`"
      }
    ],
    "answer": "C",
    "explanation": "小ファイルをまとめる。"
  },
  {
    "id": 20052,
    "section": "Data Processing & Transformations",
    "question": "よく`region`で絞る巨大テーブルを最適化したい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE WIDGET region`"
      },
      {
        "key": "B",
        "text": "`OPTIMIZE table ZORDER BY (region)`"
      },
      {
        "key": "C",
        "text": "`GRANT region`"
      },
      {
        "key": "D",
        "text": "`VACUUM region`"
      }
    ],
    "answer": "B",
    "explanation": "regionによるファイルスキップを効かせる。"
  },
  {
    "id": 20053,
    "section": "Data Processing & Transformations",
    "question": "Data skippingの説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "統計情報を使い不要なファイル読み取りを避ける"
      },
      {
        "key": "B",
        "text": "権限チェックを省略する"
      },
      {
        "key": "C",
        "text": "すべての列を削除する"
      },
      {
        "key": "D",
        "text": "ジョブをスキップする"
      }
    ],
    "answer": "A",
    "explanation": "Deltaの統計情報を活用する。"
  },
  {
    "id": 20054,
    "section": "Data Processing & Transformations",
    "question": "`INSERT INTO`と`INSERT OVERWRITE`の違いはどれか",
    "choices": [
      {
        "key": "A",
        "text": "前者は履歴表示、後者は圧縮"
      },
      {
        "key": "B",
        "text": "前者は追記、後者は置換"
      },
      {
        "key": "C",
        "text": "前者は削除、後者は権限付与"
      },
      {
        "key": "D",
        "text": "どちらも同じ"
      }
    ],
    "answer": "B",
    "explanation": "試験でよく混同される。"
  },
  {
    "id": 20055,
    "section": "Data Processing & Transformations",
    "question": "毎日Gold集計を完全再計算して置き換えたい。適切な構文はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT SELECT`"
      },
      {
        "key": "B",
        "text": "`dbutils.widgets.get`"
      },
      {
        "key": "C",
        "text": "`CREATE OR REPLACE TABLE gold AS SELECT ...`"
      },
      {
        "key": "D",
        "text": "`DESCRIBE DETAIL`"
      }
    ],
    "answer": "C",
    "explanation": "原子的な再作成に向く。"
  },
  {
    "id": 20056,
    "section": "Data Processing & Transformations",
    "question": "Notebook内だけで使う中間結果をSQLで作りたい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE EXTERNAL LOCATION`"
      },
      {
        "key": "B",
        "text": "`RESTORE TABLE`"
      },
      {
        "key": "C",
        "text": "`VACUUM`"
      },
      {
        "key": "D",
        "text": "`CREATE OR REPLACE TEMP VIEW`"
      }
    ],
    "answer": "D",
    "explanation": "セッションスコープの一時ビュー。"
  },
  {
    "id": 20057,
    "section": "Data Processing & Transformations",
    "question": "同じクラスタ上の他Notebookからも一時的に参照したい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`GLOBAL TEMP VIEW`"
      },
      {
        "key": "B",
        "text": "`MANAGED TABLE`のみ"
      },
      {
        "key": "C",
        "text": "`TEMP VIEW`"
      },
      {
        "key": "D",
        "text": "`EXTERNAL LOCATION`"
      }
    ],
    "answer": "A",
    "explanation": "global_tempスキーマから参照する。"
  },
  {
    "id": 20058,
    "section": "Data Processing & Transformations",
    "question": "`global_temp.recent_orders`が使える期間として最も正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "UC metastore全体で永続"
      },
      {
        "key": "B",
        "text": "永久"
      },
      {
        "key": "C",
        "text": "1つのセルだけ"
      },
      {
        "key": "D",
        "text": "クラスタが生きている間"
      }
    ],
    "answer": "D",
    "explanation": "グローバル一時ビューはクラスタライフタイム。"
  },
  {
    "id": 20059,
    "section": "Data Processing & Transformations",
    "question": "商品別の売上合計と注文数をPySparkで求める典型はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM product`"
      },
      {
        "key": "B",
        "text": "`GRANT product`"
      },
      {
        "key": "C",
        "text": "`df.groupBy(\"product\").agg(...)`"
      },
      {
        "key": "D",
        "text": "`df.orderBy(\"product\")`だけ"
      }
    ],
    "answer": "C",
    "explanation": "groupBy後にaggで集計する。"
  },
  {
    "id": 20060,
    "section": "Data Processing & Transformations",
    "question": "`df.groupBy(\"category\")`だけを書いた場合の問題はどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限が足りない"
      },
      {
        "key": "B",
        "text": "集計関数を呼ばないと結果計算にならない"
      },
      {
        "key": "C",
        "text": "自動で平均が出る"
      },
      {
        "key": "D",
        "text": "テーブルが削除される"
      }
    ],
    "answer": "B",
    "explanation": "countやagg等が必要。"
  },
  {
    "id": 20061,
    "section": "Data Processing & Transformations",
    "question": "顧客数を重複なしで数える関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`countDistinct(\"customer_id\")`"
      },
      {
        "key": "B",
        "text": "`count(\"*\")`"
      },
      {
        "key": "C",
        "text": "`sum(\"customer_id\")`"
      },
      {
        "key": "D",
        "text": "`first(\"*\")`"
      }
    ],
    "answer": "A",
    "explanation": "countは重複行を含む。"
  },
  {
    "id": 20062,
    "section": "Data Processing & Transformations",
    "question": "顧客ごとの購入累計を各購入行に追加したい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "COPY INTO"
      },
      {
        "key": "B",
        "text": "Window function"
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
    "explanation": "行数を落とさず分析列を付ける。"
  },
  {
    "id": 20063,
    "section": "Data Processing & Transformations",
    "question": "地域ごとの売上Top 3商品を出す正しい流れはどれか",
    "choices": [
      {
        "key": "A",
        "text": "先に全行を削除"
      },
      {
        "key": "B",
        "text": "VACUUM後にGRANT"
      },
      {
        "key": "C",
        "text": "地域・商品で集計後、地域partitionのwindowで順位付け"
      },
      {
        "key": "D",
        "text": "pivotだけ"
      }
    ],
    "answer": "C",
    "explanation": "集計してからグループ内ランキングを行う。"
  },
  {
    "id": 20064,
    "section": "Data Processing & Transformations",
    "question": "Top Nで同点を区別し、必ず3行だけ取りたい場合に近い関数はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`rank()`"
      },
      {
        "key": "B",
        "text": "`dense_rank()`"
      },
      {
        "key": "C",
        "text": "`countDistinct()`"
      },
      {
        "key": "D",
        "text": "`row_number()`"
      }
    ],
    "answer": "D",
    "explanation": "row_numberは一意番号を振る。"
  },
  {
    "id": 20065,
    "section": "Data Processing & Transformations",
    "question": "同点1位が2件ある場合に順位を1,1,3としたい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`rank()`"
      },
      {
        "key": "B",
        "text": "`row_number()`"
      },
      {
        "key": "C",
        "text": "`dense_rank()`"
      },
      {
        "key": "D",
        "text": "`lag()`"
      }
    ],
    "answer": "A",
    "explanation": "rankは欠番が出る。"
  },
  {
    "id": 20066,
    "section": "Data Processing & Transformations",
    "question": "同点1位が2件ある場合に順位を1,1,2としたい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`lead()`"
      },
      {
        "key": "B",
        "text": "`rank()`"
      },
      {
        "key": "C",
        "text": "`row_number()`"
      },
      {
        "key": "D",
        "text": "`dense_rank()`"
      }
    ],
    "answer": "D",
    "explanation": "dense_rankは欠番が出ない。"
  },
  {
    "id": 20067,
    "section": "Data Processing & Transformations",
    "question": "前回購入額との差分を出すために前行の値を参照したい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`pivot()`"
      },
      {
        "key": "B",
        "text": "`cube()`"
      },
      {
        "key": "C",
        "text": "`lag()`"
      },
      {
        "key": "D",
        "text": "`lead()`"
      }
    ],
    "answer": "C",
    "explanation": "lagは前行参照。"
  },
  {
    "id": 20068,
    "section": "Data Processing & Transformations",
    "question": "次回購入額を現在行に表示したい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`sum()`"
      },
      {
        "key": "B",
        "text": "`lead()`"
      },
      {
        "key": "C",
        "text": "`rollup()`"
      },
      {
        "key": "D",
        "text": "`lag()`"
      }
    ],
    "answer": "B",
    "explanation": "leadは次行参照。"
  },
  {
    "id": 20069,
    "section": "Data Processing & Transformations",
    "question": "四半期を列にして営業担当別売上表を作りたい。使うのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`pivot(\"quarter\")`"
      },
      {
        "key": "B",
        "text": "`lag(\"quarter\")`"
      },
      {
        "key": "C",
        "text": "`VACUUM quarter`"
      },
      {
        "key": "D",
        "text": "`USE quarter`"
      }
    ],
    "answer": "A",
    "explanation": "pivotは縦持ちを横持ちにする。"
  },
  {
    "id": 20070,
    "section": "Data Processing & Transformations",
    "question": "pivot列に非常に多くの値がある場合の注意はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQLが実行不能になる"
      },
      {
        "key": "B",
        "text": "出力列が膨らみ高負荷になる"
      },
      {
        "key": "C",
        "text": "権限が自動付与される"
      },
      {
        "key": "D",
        "text": "Delta履歴が消える"
      }
    ],
    "answer": "B",
    "explanation": "値リストを明示するとリスクを抑えやすい。"
  },
  {
    "id": 20071,
    "section": "Data Processing & Transformations",
    "question": "地域、商品、全体の小計を含む多次元集計に向くのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`"
      },
      {
        "key": "B",
        "text": "`GRANT`"
      },
      {
        "key": "C",
        "text": "`rollup`や`cube`"
      },
      {
        "key": "D",
        "text": "`%run`"
      }
    ],
    "answer": "C",
    "explanation": "OLAP集計に使う。"
  },
  {
    "id": 20072,
    "section": "Data Processing & Transformations",
    "question": "Sparkジョブが遅く、特定stageでshuffle spillが大きい。見るべきツールはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Widget一覧"
      },
      {
        "key": "B",
        "text": "DAB targets"
      },
      {
        "key": "C",
        "text": "Delta Sharing recipient"
      },
      {
        "key": "D",
        "text": "Spark UI"
      }
    ],
    "answer": "D",
    "explanation": "stage/task/shuffle/spillを確認できる。"
  },
  {
    "id": 20073,
    "section": "Data Processing & Transformations",
    "question": "SQL Warehouseで実行したクエリのボトルネック分析に向くのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Query Profile"
      },
      {
        "key": "B",
        "text": "Storage Credential"
      },
      {
        "key": "C",
        "text": "`%run`"
      },
      {
        "key": "D",
        "text": "CREATE WIDGET"
      }
    ],
    "answer": "A",
    "explanation": "SQLの実行詳細を確認する。"
  },
  {
    "id": 20074,
    "section": "Data Processing & Transformations",
    "question": "driver logsだけでは分散タスクの詳細分析に不十分な理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "driver logsはDAB専用"
      },
      {
        "key": "B",
        "text": "driver logsは権限専用"
      },
      {
        "key": "C",
        "text": "driver logsはSQLしか見ない"
      },
      {
        "key": "D",
        "text": "executor側のstage/task分布はSpark UIが適する"
      }
    ],
    "answer": "D",
    "explanation": "分散実行の可視化はSpark UIが中心。"
  },
  {
    "id": 20075,
    "section": "Data Processing & Transformations",
    "question": "Predictive Optimizationが自動化する代表的な保守はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Git commit"
      },
      {
        "key": "B",
        "text": "ユーザー追加"
      },
      {
        "key": "C",
        "text": "managed tableのOPTIMIZE/VACUUM"
      },
      {
        "key": "D",
        "text": "Notebook widget作成"
      }
    ],
    "answer": "C",
    "explanation": "UC managed tablesの保守を自動化できる。"
  },
  {
    "id": 20076,
    "section": "Data Processing & Transformations",
    "question": "Predictive Optimizationが最も当てはまりやすい対象はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ローカルCSV"
      },
      {
        "key": "B",
        "text": "Unity Catalog managed table"
      },
      {
        "key": "C",
        "text": "PowerPoint"
      },
      {
        "key": "D",
        "text": "外部システム管理の任意ファイル"
      }
    ],
    "answer": "B",
    "explanation": "管理テーブルが対象。"
  },
  {
    "id": 20077,
    "section": "Data Processing & Transformations",
    "question": "Liquid Clusteringの目的に近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "クエリパターンに合わせたデータ配置最適化"
      },
      {
        "key": "B",
        "text": "権限削除"
      },
      {
        "key": "C",
        "text": "Notebook共有"
      },
      {
        "key": "D",
        "text": "CDC削除"
      }
    ],
    "answer": "A",
    "explanation": "データレイアウト最適化に関わる。"
  },
  {
    "id": 20078,
    "section": "Data Processing & Transformations",
    "question": "`DESCRIBE DETAIL table`で確認できるものとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Git commit messageのみ"
      },
      {
        "key": "B",
        "text": "table typeやlocation"
      },
      {
        "key": "C",
        "text": "notebook変数"
      },
      {
        "key": "D",
        "text": "user password"
      }
    ],
    "answer": "B",
    "explanation": "テーブルの種類や場所を確認できる。"
  },
  {
    "id": 20079,
    "section": "Data Processing & Transformations",
    "question": "Delta LakeのTime Travelを使う場面として最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限を付与する"
      },
      {
        "key": "B",
        "text": "Notebookをスケジュールする"
      },
      {
        "key": "C",
        "text": "過去時点のデータを調査する"
      },
      {
        "key": "D",
        "text": "ファイルを検出する"
      }
    ],
    "answer": "C",
    "explanation": "バージョンや時刻指定で過去を参照できる。"
  },
  {
    "id": 20080,
    "section": "Data Processing & Transformations",
    "question": "`OPTIMIZE`と`VACUUM`の違いとして正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "どちらも権限付与"
      },
      {
        "key": "B",
        "text": "どちらもNotebook実行"
      },
      {
        "key": "C",
        "text": "OPTIMIZEは履歴表示、VACUUMは集計"
      },
      {
        "key": "D",
        "text": "OPTIMIZEはファイル圧縮、VACUUMは古い不要ファイル削除"
      }
    ],
    "answer": "D",
    "explanation": "目的が異なる。"
  },
  {
    "id": 20081,
    "section": "Productionizing Data Pipelines",
    "question": "複数Notebookを順番に実行し、失敗通知も設定したい。使うべき主要機能はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Lakeflow Jobs"
      },
      {
        "key": "B",
        "text": "Delta Sharing"
      },
      {
        "key": "C",
        "text": "Time Travel"
      },
      {
        "key": "D",
        "text": "External Location"
      }
    ],
    "answer": "A",
    "explanation": "ジョブのオーケストレーションと監視に使う。"
  },
  {
    "id": 20082,
    "section": "Productionizing Data Pipelines",
    "question": "ジョブで上流タスク成功後に下流タスクを実行する設定はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`USE CATALOG`"
      },
      {
        "key": "B",
        "text": "`schemaHints`"
      },
      {
        "key": "C",
        "text": "`ZORDER`"
      },
      {
        "key": "D",
        "text": "`depends_on`"
      }
    ],
    "answer": "D",
    "explanation": "タスク依存関係を表す。"
  },
  {
    "id": 20083,
    "section": "Productionizing Data Pipelines",
    "question": "ジョブの一部タスクだけ失敗した。修正後に成功済みタスクをなるべく再実行せず進めたい。選ぶのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "VACUUM"
      },
      {
        "key": "B",
        "text": "DROP TABLE"
      },
      {
        "key": "C",
        "text": "Repair run"
      },
      {
        "key": "D",
        "text": "Full rerun only"
      }
    ],
    "answer": "C",
    "explanation": "失敗箇所から再開できる。"
  },
  {
    "id": 20084,
    "section": "Productionizing Data Pipelines",
    "question": "すべてのタスクを最初から実行し直す判断が適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "権限確認だけ"
      },
      {
        "key": "B",
        "text": "上流データやロジック全体を変え、全結果を作り直したい"
      },
      {
        "key": "C",
        "text": "Dashboard閲覧だけ"
      },
      {
        "key": "D",
        "text": "末端タスクだけ一時失敗"
      }
    ],
    "answer": "B",
    "explanation": "全体再計算が必要な場合はfull rerunが自然。"
  },
  {
    "id": 20085,
    "section": "Productionizing Data Pipelines",
    "question": "本番ジョブで同時実行数を制限する理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "重複処理やリソース競合を避ける"
      },
      {
        "key": "B",
        "text": "スキーマを推論する"
      },
      {
        "key": "C",
        "text": "権限を付与する"
      },
      {
        "key": "D",
        "text": "Time Travelを無効化する"
      }
    ],
    "answer": "A",
    "explanation": "スケジュール重複などを制御する。"
  },
  {
    "id": 20086,
    "section": "Productionizing Data Pipelines",
    "question": "Notebookタスクに日付パラメータを渡し、Notebook側で使いたい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DESCRIBE HISTORY"
      },
      {
        "key": "B",
        "text": "Job task parameterとwidget"
      },
      {
        "key": "C",
        "text": "VACUUM"
      },
      {
        "key": "D",
        "text": "OPTIMIZE"
      }
    ],
    "answer": "B",
    "explanation": "ジョブからwidget値を渡せる。"
  },
  {
    "id": 20087,
    "section": "Productionizing Data Pipelines",
    "question": "`dbutils.notebook.exit(\"OK\")` の用途として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Delta履歴を削除する"
      },
      {
        "key": "B",
        "text": "clusterを必ず終了する"
      },
      {
        "key": "C",
        "text": "Notebookの終了結果を呼び出し側に返す"
      },
      {
        "key": "D",
        "text": "UC権限を付与する"
      }
    ],
    "answer": "C",
    "explanation": "ワークフロー連携で結果文字列を返せる。"
  },
  {
    "id": 20088,
    "section": "Productionizing Data Pipelines",
    "question": "Serverless JobsがClassic clusterより有利になりやすい点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "UCが不要"
      },
      {
        "key": "B",
        "text": "すべてのAPIが無制限"
      },
      {
        "key": "C",
        "text": "常に固定worker数"
      },
      {
        "key": "D",
        "text": "compute管理負荷と起動待ちを減らしやすい"
      }
    ],
    "answer": "D",
    "explanation": "Databricks管理computeを利用する。"
  },
  {
    "id": 20089,
    "section": "Productionizing Data Pipelines",
    "question": "Serverless computeの前提として重要なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Unity Catalog"
      },
      {
        "key": "B",
        "text": "ローカルSpark"
      },
      {
        "key": "C",
        "text": "Hive Metastoreのみ"
      },
      {
        "key": "D",
        "text": "Power BI"
      }
    ],
    "answer": "A",
    "explanation": "ServerlessはUCを必要とする。"
  },
  {
    "id": 20090,
    "section": "Productionizing Data Pipelines",
    "question": "Hive Metastoreのみを使う環境でServerlessを使えない場合の正しい対応はどれか",
    "choices": [
      {
        "key": "A",
        "text": "rank関数を使う"
      },
      {
        "key": "B",
        "text": "VACUUMで有効化する"
      },
      {
        "key": "C",
        "text": "Widgetで回避する"
      },
      {
        "key": "D",
        "text": "UC移行を検討するかClassic computeを使う"
      }
    ],
    "answer": "D",
    "explanation": "UC要件を満たす必要がある。"
  },
  {
    "id": 20091,
    "section": "Productionizing Data Pipelines",
    "question": "予測不能なBI利用で、未使用時のアイドルコストを抑えたい。候補はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Databricks Connectだけ"
      },
      {
        "key": "B",
        "text": "Global temp view"
      },
      {
        "key": "C",
        "text": "Serverless SQL Warehouse"
      },
      {
        "key": "D",
        "text": "常時起動All-purpose clusterのみ"
      }
    ],
    "answer": "C",
    "explanation": "自動スケールと停止に向く。"
  },
  {
    "id": 20092,
    "section": "Productionizing Data Pipelines",
    "question": "Classic clusterを選ぶ理由としてあり得るものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "起動待ちが常にゼロ"
      },
      {
        "key": "B",
        "text": "細かいクラスタ設定を自分で制御したい"
      },
      {
        "key": "C",
        "text": "設定項目がない"
      },
      {
        "key": "D",
        "text": "UCが常に不要"
      }
    ],
    "answer": "B",
    "explanation": "制御性が高い反面、運用負荷もある。"
  },
  {
    "id": 20093,
    "section": "Productionizing Data Pipelines",
    "question": "Lakeflow Pipelineの本番監視で見るべきものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Pipeline event log"
      },
      {
        "key": "B",
        "text": "`%run`だけ"
      },
      {
        "key": "C",
        "text": "local file finder"
      },
      {
        "key": "D",
        "text": "widget color"
      }
    ],
    "answer": "A",
    "explanation": "実行状態やエラーを追う。"
  },
  {
    "id": 20094,
    "section": "Productionizing Data Pipelines",
    "question": "パイプラインでSilverが失敗したのにGoldを無理に作ると何が問題か",
    "choices": [
      {
        "key": "A",
        "text": "全クエリが速くなる"
      },
      {
        "key": "B",
        "text": "不正・欠損データが下流へ伝播する"
      },
      {
        "key": "C",
        "text": "権限が改善する"
      },
      {
        "key": "D",
        "text": "storageが必ず減る"
      }
    ],
    "answer": "B",
    "explanation": "依存失敗時に下流停止する理由。"
  },
  {
    "id": 20095,
    "section": "Productionizing Data Pipelines",
    "question": "本番配備でDABを使う主な利点はどれか",
    "choices": [
      {
        "key": "A",
        "text": "受験問題が減る"
      },
      {
        "key": "B",
        "text": "managed tableが外部化される"
      },
      {
        "key": "C",
        "text": "ジョブやPipeline定義をGit管理し再現性を高める"
      },
      {
        "key": "D",
        "text": "SQLが禁止される"
      }
    ],
    "answer": "C",
    "explanation": "CI/CDに向く。"
  },
  {
    "id": 20096,
    "section": "Productionizing Data Pipelines",
    "question": "CIでまず実行すべきDABコマンドとして自然なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`"
      },
      {
        "key": "B",
        "text": "`DROP CATALOG`"
      },
      {
        "key": "C",
        "text": "`RESTORE`"
      },
      {
        "key": "D",
        "text": "`databricks bundle validate`"
      }
    ],
    "answer": "D",
    "explanation": "配備前に設定検証する。"
  },
  {
    "id": 20097,
    "section": "Productionizing Data Pipelines",
    "question": "本番配備前に作成・更新予定を確認するにはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`deploy --dry-run`"
      },
      {
        "key": "B",
        "text": "`CREATE TEMP VIEW`"
      },
      {
        "key": "C",
        "text": "`MERGE INTO`"
      },
      {
        "key": "D",
        "text": "`countDistinct`"
      }
    ],
    "answer": "A",
    "explanation": "実変更前に計画確認できる。"
  },
  {
    "id": 20098,
    "section": "Productionizing Data Pipelines",
    "question": "DABでdevは小さいクラスタ、prodは大きいクラスタにしたい。設定場所として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Delta Sharing recipient"
      },
      {
        "key": "B",
        "text": "SQLのWHERE句"
      },
      {
        "key": "C",
        "text": "Spark UI"
      },
      {
        "key": "D",
        "text": "`targets.dev`と`targets.prod`の変数上書き"
      }
    ],
    "answer": "D",
    "explanation": "環境別設定にtargetsを使う。"
  },
  {
    "id": 20099,
    "section": "Productionizing Data Pipelines",
    "question": "本番ジョブの通知設定で最も重要な通知先はどれか",
    "choices": [
      {
        "key": "A",
        "text": "外部顧客全員"
      },
      {
        "key": "B",
        "text": "誰にも通知しない"
      },
      {
        "key": "C",
        "text": "運用チームや担当者"
      },
      {
        "key": "D",
        "text": "未使用の個人メールだけ"
      }
    ],
    "answer": "C",
    "explanation": "異常検知と対応のため。"
  },
  {
    "id": 20100,
    "section": "Productionizing Data Pipelines",
    "question": "スケジュール実行で「前回実行がまだ終わっていないのに次が始まる」問題への対策はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SELECTを増やす"
      },
      {
        "key": "B",
        "text": "最大同時実行数を制限する"
      },
      {
        "key": "C",
        "text": "`%sql`にする"
      },
      {
        "key": "D",
        "text": "VACUUMする"
      }
    ],
    "answer": "B",
    "explanation": "重複実行を抑制する。"
  },
  {
    "id": 20101,
    "section": "Productionizing Data Pipelines",
    "question": "Production modeのPipelineに期待するものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "安定した本番運用"
      },
      {
        "key": "B",
        "text": "開発中の高速試行錯誤だけ"
      },
      {
        "key": "C",
        "text": "権限の削除"
      },
      {
        "key": "D",
        "text": "Git commit作成"
      }
    ],
    "answer": "A",
    "explanation": "Production modeは本番実行向け。"
  },
  {
    "id": 20102,
    "section": "Productionizing Data Pipelines",
    "question": "Development modeのPipelineに期待するものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQL Warehouse専用"
      },
      {
        "key": "B",
        "text": "開発中の反復と検証"
      },
      {
        "key": "C",
        "text": "監査ログ専用"
      },
      {
        "key": "D",
        "text": "外部共有専用"
      }
    ],
    "answer": "B",
    "explanation": "開発サイクルに向く。"
  },
  {
    "id": 20103,
    "section": "Productionizing Data Pipelines",
    "question": "本番でcheckpointをリセットする判断として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "毎回必ず行う"
      },
      {
        "key": "B",
        "text": "権限不足の対策"
      },
      {
        "key": "C",
        "text": "意図的な再構築など明確な理由がある場合だけ"
      },
      {
        "key": "D",
        "text": "クエリが遅い時の最初の対策"
      }
    ],
    "answer": "C",
    "explanation": "重複や全件再処理のリスクがある。"
  },
  {
    "id": 20104,
    "section": "Productionizing Data Pipelines",
    "question": "Pipelineのデータ品質期待値が失敗したときに確認すべきものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "DAB tokenだけ"
      },
      {
        "key": "B",
        "text": "local IDE theme"
      },
      {
        "key": "C",
        "text": "Time Travelだけ"
      },
      {
        "key": "D",
        "text": "Pipeline event logや品質結果"
      }
    ],
    "answer": "D",
    "explanation": "品質ルールの結果やエラーを確認する。"
  },
  {
    "id": 20105,
    "section": "Productionizing Data Pipelines",
    "question": "ジョブ定義やPipeline定義を手動UIだけで管理するリスクはどれか",
    "choices": [
      {
        "key": "A",
        "text": "環境差分や変更履歴が追いにくい"
      },
      {
        "key": "B",
        "text": "Deltaが消える"
      },
      {
        "key": "C",
        "text": "Auto Loaderが使えない"
      },
      {
        "key": "D",
        "text": "SQLが速くなりすぎる"
      }
    ],
    "answer": "A",
    "explanation": "DABでコード管理すると改善できる。"
  },
  {
    "id": 20106,
    "section": "Governance & Quality",
    "question": "UCで`SELECT`を付与したのにテーブルが読めない。最も疑うべき不足権限はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`rank()`"
      },
      {
        "key": "B",
        "text": "`OPTIMIZE`"
      },
      {
        "key": "C",
        "text": "`VACUUM`"
      },
      {
        "key": "D",
        "text": "`USE CATALOG`または`USE SCHEMA`"
      }
    ],
    "answer": "D",
    "explanation": "上位オブジェクト利用権限も必要。"
  },
  {
    "id": 20107,
    "section": "Governance & Quality",
    "question": "スキーマ内の既存・将来の全テーブルを分析者が読めるようにしたい。適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`"
      },
      {
        "key": "B",
        "text": "`%run`"
      },
      {
        "key": "C",
        "text": "`GRANT SELECT ON SCHEMA ...`"
      },
      {
        "key": "D",
        "text": "各テーブルだけ個別付与"
      }
    ],
    "answer": "C",
    "explanation": "スキーマ権限は下位へ継承される。"
  },
  {
    "id": 20108,
    "section": "Governance & Quality",
    "question": "Least privilegeの考え方として最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "個人アカウントに本番管理者権限"
      },
      {
        "key": "B",
        "text": "必要最小限の権限をグループへ付与"
      },
      {
        "key": "C",
        "text": "トークンを共有"
      },
      {
        "key": "D",
        "text": "全員にALL PRIVILEGES"
      }
    ],
    "answer": "B",
    "explanation": "グループ管理と最小権限が基本。"
  },
  {
    "id": 20109,
    "section": "Governance & Quality",
    "question": "ETLサービスプリンシパルがSilverへ書き込むために必要になり得る権限はどれか",
    "choices": [
      {
        "key": "A",
        "text": "`MODIFY`や`CREATE TABLE`、USE権限"
      },
      {
        "key": "B",
        "text": "`SELECT`だけ"
      },
      {
        "key": "C",
        "text": "`VACUUM`だけ"
      },
      {
        "key": "D",
        "text": "`rank()`"
      }
    ],
    "answer": "A",
    "explanation": "書込や作成には変更系権限が必要。"
  },
  {
    "id": 20110,
    "section": "Governance & Quality",
    "question": "Managed tableをDROPした場合の基本動作はどれか",
    "choices": [
      {
        "key": "A",
        "text": "何も起きない"
      },
      {
        "key": "B",
        "text": "メタデータとデータファイルを削除"
      },
      {
        "key": "C",
        "text": "メタデータだけ削除しファイルは残る"
      },
      {
        "key": "D",
        "text": "ファイルだけ削除しメタデータは残る"
      }
    ],
    "answer": "B",
    "explanation": "UCがデータライフサイクルも管理する。"
  },
  {
    "id": 20111,
    "section": "Governance & Quality",
    "question": "External tableをDROPした場合の基本動作はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ファイルも必ず削除"
      },
      {
        "key": "B",
        "text": "権限だけ増える"
      },
      {
        "key": "C",
        "text": "メタデータのみ削除しデータファイルは残る"
      },
      {
        "key": "D",
        "text": "UC全体を削除"
      }
    ],
    "answer": "C",
    "explanation": "外部保存場所のデータは残る。"
  },
  {
    "id": 20112,
    "section": "Governance & Quality",
    "question": "他システムも同じクラウドストレージのデータを利用している。DatabricksでDROPしてもデータ本体を残したい。選ぶのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Managed table"
      },
      {
        "key": "B",
        "text": "Temp view"
      },
      {
        "key": "C",
        "text": "Widget"
      },
      {
        "key": "D",
        "text": "External table"
      }
    ],
    "answer": "D",
    "explanation": "外部テーブルはメタデータだけ削除される。"
  },
  {
    "id": 20113,
    "section": "Governance & Quality",
    "question": "Databricksがデータライフサイクルを管理し、最適化も任せたいMedallionテーブルに向くのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Managed table"
      },
      {
        "key": "B",
        "text": "Global temp view"
      },
      {
        "key": "C",
        "text": "External tableのみ"
      },
      {
        "key": "D",
        "text": "Local CSVだけ"
      }
    ],
    "answer": "A",
    "explanation": "UC managed tableが推奨されやすい。"
  },
  {
    "id": 20114,
    "section": "Governance & Quality",
    "question": "External Locationの役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "集計関数を作る"
      },
      {
        "key": "B",
        "text": "Notebookを実行する"
      },
      {
        "key": "C",
        "text": "Spark stageを表示する"
      },
      {
        "key": "D",
        "text": "クラウドストレージパスをUC上で管理対象にする"
      }
    ],
    "answer": "D",
    "explanation": "Storage Credentialと組み合わせて外部データアクセスを統制する。"
  },
  {
    "id": 20115,
    "section": "Governance & Quality",
    "question": "Storage Credentialの説明として正しいものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Notebookの戻り値"
      },
      {
        "key": "B",
        "text": "Deltaのversion番号"
      },
      {
        "key": "C",
        "text": "クラウドストレージアクセスの認証をUCで抽象化する"
      },
      {
        "key": "D",
        "text": "SQL順位関数"
      }
    ],
    "answer": "C",
    "explanation": "外部場所への安全なアクセスに使う。"
  },
  {
    "id": 20116,
    "section": "Governance & Quality",
    "question": "UC lineageで分かることとして適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "クラスタの物理CPU温度"
      },
      {
        "key": "B",
        "text": "データの上流・下流関係"
      },
      {
        "key": "C",
        "text": "ローカルIDEの設定"
      },
      {
        "key": "D",
        "text": "ユーザーのパスワード"
      }
    ],
    "answer": "B",
    "explanation": "影響分析や監査に有効。"
  },
  {
    "id": 20117,
    "section": "Governance & Quality",
    "question": "Audit logsで確認したい典型情報はどれか",
    "choices": [
      {
        "key": "A",
        "text": "誰がいつ何を操作したか"
      },
      {
        "key": "B",
        "text": "集計関数の戻り値だけ"
      },
      {
        "key": "C",
        "text": "pivotの列順だけ"
      },
      {
        "key": "D",
        "text": "Notebookの文字色"
      }
    ],
    "answer": "A",
    "explanation": "セキュリティとコンプライアンスに使う。"
  },
  {
    "id": 20118,
    "section": "Governance & Quality",
    "question": "Delta Sharingの目的として最も適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "Time Travelを削除する"
      },
      {
        "key": "B",
        "text": "データを安全に共有する"
      },
      {
        "key": "C",
        "text": "Spark UIを高速化する"
      },
      {
        "key": "D",
        "text": "Notebook変数を共有する"
      }
    ],
    "answer": "B",
    "explanation": "外部組織等との共有に使える。"
  },
  {
    "id": 20119,
    "section": "Governance & Quality",
    "question": "Lakehouse Federationでパフォーマンス上意識すべきことはどれか",
    "choices": [
      {
        "key": "A",
        "text": "すべてのUDFが必ずpushdownされる"
      },
      {
        "key": "B",
        "text": "SQLは使えない"
      },
      {
        "key": "C",
        "text": "単純なWHEREやJOINはpushdownされやすい"
      },
      {
        "key": "D",
        "text": "外部DBは常に全件取得"
      }
    ],
    "answer": "C",
    "explanation": "複雑処理はDatabricks側になることがある。"
  },
  {
    "id": 20120,
    "section": "Governance & Quality",
    "question": "`DESCRIBE DETAIL`でManaged/Externalを確認する理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "rank関数が変わるから"
      },
      {
        "key": "B",
        "text": "Notebookの言語が変わるから"
      },
      {
        "key": "C",
        "text": "widgetが消えるから"
      },
      {
        "key": "D",
        "text": "DROP時のデータ削除挙動が違うから"
      }
    ],
    "answer": "D",
    "explanation": "テーブル種別はライフサイクルに直結する。"
  },
  {
    "id": 20121,
    "section": "Platform & Compute",
    "question": "試験配点上、重点的に学ぶべき領域はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Development & IngestionとData Processing"
      },
      {
        "key": "B",
        "text": "Governanceだけ"
      },
      {
        "key": "C",
        "text": "Platformだけ"
      },
      {
        "key": "D",
        "text": "UI操作だけ"
      }
    ],
    "answer": "A",
    "explanation": "この2領域の比重が大きい。"
  },
  {
    "id": 20122,
    "section": "Platform & Compute",
    "question": "Lakehouseの基本価値はどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQLを使えなくする"
      },
      {
        "key": "B",
        "text": "CSVだけを扱う"
      },
      {
        "key": "C",
        "text": "権限管理をなくす"
      },
      {
        "key": "D",
        "text": "Data lakeの柔軟性とwarehouseの信頼性を組み合わせる"
      }
    ],
    "answer": "D",
    "explanation": "Delta LakeとDatabricksの中核思想。"
  },
  {
    "id": 20123,
    "section": "Platform & Compute",
    "question": "Unity CatalogのPlatform上の役割はどれか",
    "choices": [
      {
        "key": "A",
        "text": "Notebookのテーマ変更"
      },
      {
        "key": "B",
        "text": "ローカルファイル削除"
      },
      {
        "key": "C",
        "text": "データ・AI資産の中央ガバナンス"
      },
      {
        "key": "D",
        "text": "クラスタのCPUだけ表示"
      }
    ],
    "answer": "C",
    "explanation": "権限、lineage、監査を担う。"
  },
  {
    "id": 20124,
    "section": "Platform & Compute",
    "question": "SQL Warehouseが最も向く用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "ファイル到着検出"
      },
      {
        "key": "B",
        "text": "BIやSQLクエリ"
      },
      {
        "key": "C",
        "text": "Git管理"
      },
      {
        "key": "D",
        "text": "ローカルIDEデバッグ"
      }
    ],
    "answer": "B",
    "explanation": "SQL/BI向けのcompute。"
  },
  {
    "id": 20125,
    "section": "Platform & Compute",
    "question": "All-purpose clusterが向く用途はどれか",
    "choices": [
      {
        "key": "A",
        "text": "対話的なNotebook開発"
      },
      {
        "key": "B",
        "text": "失敗タスクのrepairだけ"
      },
      {
        "key": "C",
        "text": "Delta Sharing受信のみ"
      },
      {
        "key": "D",
        "text": "UC権限設定のみ"
      }
    ],
    "answer": "A",
    "explanation": "探索・開発用途に向く。"
  },
  {
    "id": 20126,
    "section": "Platform & Compute",
    "question": "Job clusterの特徴として近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "External Locationの一種"
      },
      {
        "key": "B",
        "text": "ジョブ実行用に作成され、完了後終了しやすい"
      },
      {
        "key": "C",
        "text": "常に全ユーザーで共有"
      },
      {
        "key": "D",
        "text": "SQL Warehouse専用"
      }
    ],
    "answer": "B",
    "explanation": "本番ジョブの分離・コスト管理に向く。"
  },
  {
    "id": 20127,
    "section": "Platform & Compute",
    "question": "Serverless computeの価値はどれか",
    "choices": [
      {
        "key": "A",
        "text": "UCが不要になる"
      },
      {
        "key": "B",
        "text": "Delta Lakeを無効にする"
      },
      {
        "key": "C",
        "text": "Databricksがcompute管理を担い運用負荷を下げる"
      },
      {
        "key": "D",
        "text": "すべてローカル実行する"
      }
    ],
    "answer": "C",
    "explanation": "管理負荷を減らせる。"
  },
  {
    "id": 20128,
    "section": "Platform & Compute",
    "question": "Photonの説明として最も近いものはどれか",
    "choices": [
      {
        "key": "A",
        "text": "外部共有プロトコル"
      },
      {
        "key": "B",
        "text": "Notebookパラメータ"
      },
      {
        "key": "C",
        "text": "UC権限名"
      },
      {
        "key": "D",
        "text": "SQL/Delta処理向けの高速実行エンジン"
      }
    ],
    "answer": "D",
    "explanation": "クエリ性能に関わる。"
  },
  {
    "id": 20129,
    "section": "Platform & Compute",
    "question": "Bronze/Silver/GoldのMedallion設計がPlatform理解で重要な理由はどれか",
    "choices": [
      {
        "key": "A",
        "text": "データ品質を段階的に高める標準的な設計だから"
      },
      {
        "key": "B",
        "text": "Gitブランチ名だから"
      },
      {
        "key": "C",
        "text": "クラスタ設定だけの話だから"
      },
      {
        "key": "D",
        "text": "SQL Warehouseのサイズだから"
      }
    ],
    "answer": "A",
    "explanation": "Databricksの実務的パイプライン設計に頻出。"
  },
  {
    "id": 20130,
    "section": "Platform & Compute",
    "question": "45問90分の試験での基本戦略として適切なのはどれか",
    "choices": [
      {
        "key": "A",
        "text": "SQL問題をすべて飛ばす"
      },
      {
        "key": "B",
        "text": "最初の1問に20分使う"
      },
      {
        "key": "C",
        "text": "わからない問題は空欄にする"
      },
      {
        "key": "D",
        "text": "迷う問題はマークして進み、時間内に見直す"
      }
    ],
    "answer": "D",
    "explanation": "1問約2分なので時間管理が重要。"
  }
]
