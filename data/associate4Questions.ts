import type { Question } from '@/types'

export const associate4Questions: Question[] = [
  {
    "id": 30001,
    "section": "Development & Ingestion",
    "question": "ある小売企業では、POSシステムから生成されたJSONファイルがクラウドオブジェクトストレージの同じディレクトリに数分おきに到着します。データエンジニアは、これらのファイルをBronze Deltaテーブルに継続的に取り込み、処理済みファイルが再処理されないようにしたいと考えています。過去データの一回限りのロードではなく、今後も新規ファイルが到着し続けます。この要件を満たす最も適切な実装はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`RESTORE TABLE bronze_pos TO VERSION AS OF 0`を実行してからロードする"
      },
      {
        "key": "B",
        "text": "`spark.readStream.format(\"cloudFiles\")`を使用し、スキーマ保存先とcheckpointを設定してDeltaテーブルへ書き込む"
      },
      {
        "key": "C",
        "text": "`DESCRIBE HISTORY bronze_pos`を定期実行して新規ファイルを検出する"
      },
      {
        "key": "D",
        "text": "`COPY INTO bronze_pos FROM 's3://...' FILEFORMAT = JSON`を毎日手動実行する"
      }
    ],
    "answer": "B",
    "explanation": "継続的に到着するファイルの取り込みにはAuto Loaderが適し、checkpointにより処理状態を管理できる。"
  },
  {
    "id": 30002,
    "section": "Development & Ingestion",
    "question": "データエンジニアはAuto LoaderでCSVファイルを取り込むストリーミングジョブを作成しました。コードには`.format(\"cloudFiles\")`と`.option(\"cloudFiles.format\", \"csv\")`が含まれていますが、実行時にスキーマをどこに保存するかに関するエラーが発生しました。最も可能性が高い原因はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`cloudFiles.schemaLocation`が指定されていない"
      },
      {
        "key": "B",
        "text": "`SELECT`権限がない"
      },
      {
        "key": "C",
        "text": "`OPTIMIZE`が実行されていない"
      },
      {
        "key": "D",
        "text": "`ZORDER BY`句が不足している"
      }
    ],
    "answer": "A",
    "explanation": "Auto Loaderのストリーミングでは推論スキーマの永続保存先が必要になる。"
  },
  {
    "id": 30003,
    "section": "Development & Ingestion",
    "question": "あるチームは、月末に外部ベンダーから受け取る過去1か月分のParquetファイルを一度だけDeltaテーブルへロードします。ファイルはロード後に増えず、継続的な監視も不要です。運用を最も簡潔にする選択肢はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`COPY INTO`を使用して対象パスからDeltaテーブルへロードする"
      },
      {
        "key": "B",
        "text": "`APPLY CHANGES INTO`を使用してSCD Type 2テーブルを作成する"
      },
      {
        "key": "C",
        "text": "Lakehouse Federationで外部DBとして参照する"
      },
      {
        "key": "D",
        "text": "Auto Loaderをcontinuous modeで常時実行する"
      }
    ],
    "answer": "A",
    "explanation": "一回限りまたはバッチ的なファイルロードではCOPY INTOがシンプル。"
  },
  {
    "id": 30004,
    "section": "Development & Ingestion",
    "question": "あるデータパイプラインでは、上流システムがJSONに新しい列を予告なく追加することがあります。データエンジニアは、パイプラインを失敗させず、かつターゲットテーブルのスキーマを自動的に拡張せず、予期しないデータを後から調査できる形で保持したいと考えています。最も適切なAuto Loaderの設定はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`cloudFiles.schemaEvolutionMode = \"rescue\"`"
      },
      {
        "key": "B",
        "text": "`checkpointLocation`を削除する"
      },
      {
        "key": "C",
        "text": "`cloudFiles.schemaEvolutionMode = \"failOnNewColumns\"`"
      },
      {
        "key": "D",
        "text": "`cloudFiles.inferColumnTypes = \"false\"`のみ"
      }
    ],
    "answer": "A",
    "explanation": "rescueモードは未知列を`_rescued_data`に保持し、既存スキーマを安定させる。"
  },
  {
    "id": 30005,
    "section": "Development & Ingestion",
    "question": "データエンジニアはAuto Loaderの読み取り側に`cloudFiles.schemaLocation`を設定し、書き込み側に`checkpointLocation`を設定しました。チームメンバーが「この2つは同じ目的なので片方だけでよい」と主張しています。正しい説明はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "どちらも`COPY INTO`専用でAuto Loaderでは使わない"
      },
      {
        "key": "B",
        "text": "どちらもDeltaテーブルのデータ保存先であり、片方だけでよい"
      },
      {
        "key": "C",
        "text": "`schemaLocation`は推論スキーマ管理、`checkpointLocation`はストリーム処理状態管理に使われる"
      },
      {
        "key": "D",
        "text": "`schemaLocation`はUnity Catalog権限、`checkpointLocation`はSQL Warehouse設定に使われる"
      }
    ],
    "answer": "C",
    "explanation": "2つは目的が異なり、スキーマ管理と処理状態管理を分けて考える。"
  },
  {
    "id": 30006,
    "section": "Development & Ingestion",
    "question": "ファイル数が非常に多く、クラウドストレージのディレクトリ一覧を毎回スキャンすると遅延が大きくなっています。チームはAuto Loaderの新規ファイル検出をよりスケーラブルにしたいと考えています。最も適切な選択肢はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "file notification modeを検討する"
      },
      {
        "key": "B",
        "text": "`RESTORE TABLE`を定期実行する"
      },
      {
        "key": "C",
        "text": "`VACUUM`の保持期間を短くする"
      },
      {
        "key": "D",
        "text": "Notebookのデフォルト言語をSQLにする"
      }
    ],
    "answer": "A",
    "explanation": "大量ファイルや低レイテンシ要件では通知ベースの検出が有効。"
  },
  {
    "id": 30007,
    "section": "Development & Ingestion",
    "question": "Lakeflow Spark Declarative PipelinesのSQLノートブックで、クラウドストレージ内の新規JSONファイルをBronze streaming tableとして取り込みたいとします。最も適切な構文の組み合わせはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`COPY INTO`を`LIVE TABLE`定義の中に必ず書く"
      },
      {
        "key": "B",
        "text": "`CREATE OR REFRESH STREAMING TABLE ... AS SELECT * FROM cloud_files(...)`"
      },
      {
        "key": "C",
        "text": "`GRANT SELECT ON STREAMING TABLE`を実行するだけ"
      },
      {
        "key": "D",
        "text": "`CREATE OR REPLACE MATERIALIZED VIEW ... AS SELECT * FROM global_temp...`"
      }
    ],
    "answer": "B",
    "explanation": "Lakeflow SQLでは`cloud_files()`を使ってAuto Loaderベースのstreaming tableを定義できる。"
  },
  {
    "id": 30008,
    "section": "Development & Ingestion",
    "question": "データエンジニアは、ファイルの取り込み元を後から監査できるようにしたいと考えています。Bronzeテーブルには、元データの列に加えて、入力ファイルパスとファイル更新時刻も保持したいです。最も適切な実装はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`SHOW GRANTS`の結果をBronzeへ保存する"
      },
      {
        "key": "B",
        "text": "すべての列を文字列に変換すれば自動的にファイルパスが保存される"
      },
      {
        "key": "C",
        "text": "`_metadata.file_path`や`_metadata.file_modification_time`を選択してBronzeへ保存する"
      },
      {
        "key": "D",
        "text": "`VACUUM`の結果をBronzeへ保存する"
      }
    ],
    "answer": "C",
    "explanation": "Auto Loader/Sparkのメタデータ列はファイル由来の追跡に役立つ。"
  },
  {
    "id": 30009,
    "section": "Development & Ingestion",
    "question": "あるNotebookはdev、staging、prodの3環境で同じロジックを使いますが、読み書きするcatalog名だけが異なります。ジョブ実行時に環境名を渡し、Notebook内で参照先を切り替えたい場合、最も適切な方法はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`DESCRIBE HISTORY`で環境を判定する"
      },
      {
        "key": "B",
        "text": "3環境ごとにNotebookのコードを手作業で書き換える"
      },
      {
        "key": "C",
        "text": "`VACUUM`でcatalogを切り替える"
      },
      {
        "key": "D",
        "text": "`dbutils.widgets`で環境パラメータを受け取り、テーブル名を組み立てる"
      }
    ],
    "answer": "D",
    "explanation": "widgetsはNotebookのパラメータ化に使える。"
  },
  {
    "id": 30010,
    "section": "Development & Ingestion",
    "question": "あるチームは複数Notebookで同じPython関数を利用したいと考えています。関数を定義したNotebookを読み込み、呼び出し元Notebookと同じ実行コンテキストで関数や変数を利用したい場合、どの方法が最も適切ですか",
    "choices": [
      {
        "key": "A",
        "text": "`%run ./shared_functions`"
      },
      {
        "key": "B",
        "text": "`COPY INTO shared_functions`"
      },
      {
        "key": "C",
        "text": "`dbutils.notebook.run(\"./shared_functions\", 60)`"
      },
      {
        "key": "D",
        "text": "`RESTORE NOTEBOOK`"
      }
    ],
    "answer": "A",
    "explanation": "`%run`は同一コンテキストにNotebookを読み込み、関数や変数を共有する。"
  },
  {
    "id": 30011,
    "section": "Development & Ingestion",
    "question": "データエンジニアは、別Notebookを独立した実行として呼び出し、引数を渡して、完了後に文字列の戻り値を受け取りたいと考えています。最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`dbutils.notebook.run()`"
      },
      {
        "key": "B",
        "text": "`CREATE TEMP VIEW`"
      },
      {
        "key": "C",
        "text": "`cloud_files()`"
      },
      {
        "key": "D",
        "text": "`%run`"
      }
    ],
    "answer": "A",
    "explanation": "`dbutils.notebook.run()`は別コンテキストで実行し、引数と戻り値を扱える。"
  },
  {
    "id": 30012,
    "section": "Development & Ingestion",
    "question": "Pythonがデフォルト言語のNotebookで、一部のセルだけSQLクエリを実行したいです。正しい方法はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Notebook全体をSQLに変換する必要がある"
      },
      {
        "key": "B",
        "text": "SQL WarehouseでなければNotebook内SQLは実行できない"
      },
      {
        "key": "C",
        "text": "セルの先頭に`%sql`を記述する"
      },
      {
        "key": "D",
        "text": "`dbutils.notebook.run(\"%sql\")`を実行する"
      }
    ],
    "answer": "C",
    "explanation": "Notebookではマジックコマンドでセル単位の言語切り替えができる。"
  },
  {
    "id": 30013,
    "section": "Development & Ingestion",
    "question": "SQLセルで作成した一時ビューを、後続のPythonセルからDataFrameとして参照したいとします。最も適切なコードはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM temp_view_name`"
      },
      {
        "key": "B",
        "text": "`spark.table(\"temp_view_name\")`"
      },
      {
        "key": "C",
        "text": "`dbutils.widgets.get(\"temp_view_name\")`"
      },
      {
        "key": "D",
        "text": "`RESTORE TABLE temp_view_name`"
      }
    ],
    "answer": "B",
    "explanation": "一時ビューはSparkセッション内で`spark.table`により参照できる。"
  },
  {
    "id": 30014,
    "section": "Development & Ingestion",
    "question": "データエンジニアはローカルのVS CodeでPySparkアプリケーションを開発し、実際のSpark処理はDatabricksのcomputeで実行したいと考えています。ローカルに完全なSparkクラスタを用意したくありません。この用途に最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Databricks Connect"
      },
      {
        "key": "B",
        "text": "Delta Sharing"
      },
      {
        "key": "C",
        "text": "Data Explorer"
      },
      {
        "key": "D",
        "text": "Query Profile"
      }
    ],
    "answer": "A",
    "explanation": "Databricks ConnectはローカルIDEからDatabricksのリモートcomputeへ接続する。"
  },
  {
    "id": 30015,
    "section": "Development & Ingestion",
    "question": "Databricks Connect v2を利用するPythonコードで、リモートDatabricks環境に接続するSparkセッションを作成するために使う入口として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE LIVE TABLE`"
      },
      {
        "key": "B",
        "text": "`DatabricksSession.builder`"
      },
      {
        "key": "C",
        "text": "`dbutils.widgets.text`"
      },
      {
        "key": "D",
        "text": "`SparkContext.parallelize`"
      }
    ],
    "answer": "B",
    "explanation": "Databricks Connect v2では`DatabricksSession`を使う。"
  },
  {
    "id": 30016,
    "section": "Development & Ingestion",
    "question": "ある開発者はDatabricks Connectを本番の定期実行基盤として使いたいと考えています。データエンジニアリングチームとして最も適切な助言はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Databricks Connectを使えば認証情報やcomputeは不要になる"
      },
      {
        "key": "B",
        "text": "Databricks ConnectはDeltaテーブルを読み取れない"
      },
      {
        "key": "C",
        "text": "Databricks Connectは開発・テスト用途に向き、本番の定期実行はLakeflow Jobsなどで管理する"
      },
      {
        "key": "D",
        "text": "Databricks Connectは常にLakeflow Jobsより本番向きである"
      }
    ],
    "answer": "C",
    "explanation": "Connectはローカル開発・CIテストに便利だが、スケジュール運用の置き換えではない。"
  },
  {
    "id": 30017,
    "section": "Development & Ingestion",
    "question": "チームはDatabricks Asset Bundlesを導入し、ジョブ、パイプライン、Notebook、環境別設定をコードとして管理したいと考えています。Bundleの中心となる設定ファイルはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`spark-ui.yml`"
      },
      {
        "key": "B",
        "text": "`DESCRIBE HISTORY`"
      },
      {
        "key": "C",
        "text": "`_delta_log.json`"
      },
      {
        "key": "D",
        "text": "`databricks.yml`"
      }
    ],
    "answer": "D",
    "explanation": "DABは`databricks.yml`を中心にリソースやtargetsを定義する。"
  },
  {
    "id": 30018,
    "section": "Development & Ingestion",
    "question": "あるDABではdev環境では小さなクラスタ、prod環境では大きなクラスタを使います。同じBundle定義を使いながら環境ごとに設定値を変える最も適切な方法はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`targets`で環境別に変数を上書きする"
      },
      {
        "key": "B",
        "text": "`VACUUM`実行時にworker数を指定する"
      },
      {
        "key": "C",
        "text": "prod用にまったく別のNotebookを手作業で作る"
      },
      {
        "key": "D",
        "text": "`DESCRIBE DETAIL`でworker数を変更する"
      }
    ],
    "answer": "A",
    "explanation": "DABのtargetsは環境別デプロイ設定に使う。"
  },
  {
    "id": 30019,
    "section": "Development & Ingestion",
    "question": "Bundleの`databricks.yml`が大きくなり、jobs、pipelines、variablesを別ファイルに分けて管理したいです。Databricks Asset Bundlesでこの目的に使う機能はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`MERGE INTO`"
      },
      {
        "key": "B",
        "text": "`global_temp`"
      },
      {
        "key": "C",
        "text": "`EXPECT`"
      },
      {
        "key": "D",
        "text": "`include`"
      }
    ],
    "answer": "D",
    "explanation": "includeによりBundle設定を複数YAMLへ分割できる。"
  },
  {
    "id": 30020,
    "section": "Development & Ingestion",
    "question": "本番環境へDABを配備する前に、どのリソースが作成・更新・削除される予定かを実際に変更せず確認したいです。最も適切なコマンドはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`databricks bundle run --target prod`"
      },
      {
        "key": "B",
        "text": "`RESTORE TABLE prod`"
      },
      {
        "key": "C",
        "text": "`databricks bundle deploy --target prod --dry-run`"
      },
      {
        "key": "D",
        "text": "`VACUUM prod`"
      }
    ],
    "answer": "C",
    "explanation": "dry-runは本番反映前の変更計画確認に使える。"
  },
  {
    "id": 30021,
    "section": "Development & Ingestion",
    "question": "CI/CDパイプラインでDABの設定ミスを早期に検出したいです。最初に実行するコマンドとして最も自然なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT ALL PRIVILEGES`"
      },
      {
        "key": "B",
        "text": "`databricks bundle validate`"
      },
      {
        "key": "C",
        "text": "`databricks bundle destroy`"
      },
      {
        "key": "D",
        "text": "`VACUUM`"
      }
    ],
    "answer": "B",
    "explanation": "validateはBundle設定の妥当性確認に使う。"
  },
  {
    "id": 30022,
    "section": "Development & Ingestion",
    "question": "DABの設定ファイルにワークスペースのトークンを直接書き込むことをレビューで指摘されました。最も適切な修正方針はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "環境変数やDatabricks Secrets、CI/CDのsecret管理を使う"
      },
      {
        "key": "B",
        "text": "tokenをbase64にすれば安全なのでそのままGit管理する"
      },
      {
        "key": "C",
        "text": "tokenをNotebookコメントに移す"
      },
      {
        "key": "D",
        "text": "tokenをDeltaテーブルに保存する"
      }
    ],
    "answer": "A",
    "explanation": "秘密情報は設定ファイルへ直書きせず、secret管理を使う。"
  },
  {
    "id": 30023,
    "section": "Development & Ingestion",
    "question": "データエンジニアは、開発環境から本番環境まで同じジョブ定義を昇格させたいと考えています。手動UIで環境ごとにジョブを作成していたため、タスク順序やクラスタ設定に差分が生じています。最も適切な改善策はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "prod環境だけ手動で作り直す"
      },
      {
        "key": "B",
        "text": "DABでジョブ定義をコード化し、targetsで環境差分を管理する"
      },
      {
        "key": "C",
        "text": "すべてのNotebookを削除してから再作成する"
      },
      {
        "key": "D",
        "text": "各環境のUI設定をスクリーンショットで保存する"
      }
    ],
    "answer": "B",
    "explanation": "DABは設定ドリフトを減らし、環境昇格を再現可能にする。"
  },
  {
    "id": 30024,
    "section": "Development & Ingestion",
    "question": "Auto LoaderでCSVファイルを読み込む際、列`amount`が文字列として推論されることがあり、後続の集計でエラーになります。取り込み時点で型を安定させる選択肢として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT MODIFY`を付与する"
      },
      {
        "key": "B",
        "text": "`dbutils.notebook.exit()`を使う"
      },
      {
        "key": "C",
        "text": "明示スキーマまたは`cloudFiles.schemaHints`を指定する"
      },
      {
        "key": "D",
        "text": "`VACUUM`を実行する"
      }
    ],
    "answer": "C",
    "explanation": "schema hintsや明示スキーマで型推論の不安定さを抑えられる。"
  },
  {
    "id": 30025,
    "section": "Development & Ingestion",
    "question": "あるパイプラインではBronzeにRawデータを保持し、Silverで重複排除と型変換を行い、Goldで部門別の集計を提供します。この設計パターンを何と呼ぶのが最も適切ですか",
    "choices": [
      {
        "key": "A",
        "text": "Query Profile"
      },
      {
        "key": "B",
        "text": "Lakehouse Federation"
      },
      {
        "key": "C",
        "text": "Delta Sharing"
      },
      {
        "key": "D",
        "text": "Medallion Architecture"
      }
    ],
    "answer": "D",
    "explanation": "Bronze/Silver/Goldの段階的な品質向上はMedallion Architecture。"
  },
  {
    "id": 30026,
    "section": "Development & Ingestion",
    "question": "Bronze層の設計について、最も適切な説明はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "元データに近い形で取り込み、再処理や監査に必要な情報を保持する"
      },
      {
        "key": "B",
        "text": "すべての列を集計済みにする"
      },
      {
        "key": "C",
        "text": "ビジネスKPIだけを保持し、Rawデータは破棄する"
      },
      {
        "key": "D",
        "text": "権限付与だけを管理する"
      }
    ],
    "answer": "A",
    "explanation": "BronzeはRaw ingestionの層。"
  },
  {
    "id": 30027,
    "section": "Development & Ingestion",
    "question": "Silver層の設計について、最も適切な説明はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "クラウドストレージのファイル通知を設定する"
      },
      {
        "key": "B",
        "text": "監査ログだけを保存する"
      },
      {
        "key": "C",
        "text": "SQL Warehouseのサイズを変更する"
      },
      {
        "key": "D",
        "text": "Bronzeデータをクレンジング、重複排除、型変換し、信頼できるデータセットにする"
      }
    ],
    "answer": "D",
    "explanation": "Silverは整形・品質改善されたデータを作る層。"
  },
  {
    "id": 30028,
    "section": "Development & Ingestion",
    "question": "Gold層の設計について、最も適切な説明はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "すべてのRaw JSONをそのまま保存する"
      },
      {
        "key": "B",
        "text": "Notebookの共通関数だけを保存する"
      },
      {
        "key": "C",
        "text": "BIや業務ユーザー向けに集計・整形されたデータを提供する"
      },
      {
        "key": "D",
        "text": "checkpointだけを保存する"
      }
    ],
    "answer": "C",
    "explanation": "Goldはビジネス利用に近い成果物を提供する。"
  },
  {
    "id": 30029,
    "section": "Data Processing & Transformations",
    "question": "顧客マスタDeltaテーブルに対して、日次で届く変更データを適用します。既存顧客は更新し、新規顧客は挿入し、削除フラグが立っている既存顧客は削除したいです。この一連の処理を単一の原子的な操作として実装する最も適切なSQLはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE TEMP VIEW`"
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
    "explanation": "DeltaのMERGEは更新・挿入・条件削除をまとめて扱える。"
  },
  {
    "id": 30030,
    "section": "Data Processing & Transformations",
    "question": "あるデータエンジニアが誤った変換ロジックを実行し、Goldテーブルの値が午前9時以降誤って更新されました。チームは午前9時より前の正しい状態に戻したいと考えています。最初に行うべき調査として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`DESCRIBE HISTORY`で誤更新前のversionを確認する"
      },
      {
        "key": "B",
        "text": "すぐに`VACUUM`を実行する"
      },
      {
        "key": "C",
        "text": "`DROP TABLE`して作り直す"
      },
      {
        "key": "D",
        "text": "`GRANT SELECT`を削除する"
      }
    ],
    "answer": "A",
    "explanation": "復元すべきDeltaバージョンを履歴から確認する。"
  },
  {
    "id": 30031,
    "section": "Data Processing & Transformations",
    "question": "Deltaテーブルを過去のversion 8の状態に戻すための構文として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM table_name RETAIN 8 VERSION`"
      },
      {
        "key": "B",
        "text": "`RESTORE TABLE table_name TO VERSION AS OF 8`"
      },
      {
        "key": "C",
        "text": "`MERGE table_name VERSION 8`"
      },
      {
        "key": "D",
        "text": "`SELECT * FROM table_name RESTORE 8`"
      }
    ],
    "answer": "B",
    "explanation": "DeltaのRESTOREは過去versionへの復元に使う。"
  },
  {
    "id": 30032,
    "section": "Data Processing & Transformations",
    "question": "データエンジニアは、過去のテーブル状態を調査するために`VERSION AS OF`を使っていました。その後、ストレージ削減のため短い保持期間で`VACUUM`を実行しました。発生し得る影響として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "テーブルが必ずexternal tableになる"
      },
      {
        "key": "B",
        "text": "Auto LoaderのschemaLocationが自動作成される"
      },
      {
        "key": "C",
        "text": "削除された古いファイルに依存するTime Travelができなくなる"
      },
      {
        "key": "D",
        "text": "SELECT権限が自動的に増える"
      }
    ],
    "answer": "C",
    "explanation": "VACUUMは古い不要ファイルを削除するため、古い履歴参照に影響する。"
  },
  {
    "id": 30033,
    "section": "Data Processing & Transformations",
    "question": "トランザクションテーブルには小さなファイルが大量に存在し、クエリが多くのファイルを読み込んで遅くなっています。ファイルをより大きくまとめ、読み取り効率を改善するために最も適切な操作はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`DESCRIBE HISTORY transactions`"
      },
      {
        "key": "B",
        "text": "`GRANT SELECT ON transactions`"
      },
      {
        "key": "C",
        "text": "`CREATE WIDGET transactions`"
      },
      {
        "key": "D",
        "text": "`OPTIMIZE transactions`"
      }
    ],
    "answer": "D",
    "explanation": "OPTIMIZEは小ファイルをコンパクト化する。"
  },
  {
    "id": 30034,
    "section": "Data Processing & Transformations",
    "question": "巨大な売上テーブルに対して、ほとんどのクエリが`WHERE region = ...`で絞り込みます。データスキップを効きやすくして読み取り量を減らしたい場合、最も適切な操作はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`OPTIMIZE sales ZORDER BY (region)`"
      },
      {
        "key": "B",
        "text": "`CREATE GLOBAL TEMP VIEW sales`"
      },
      {
        "key": "C",
        "text": "`VACUUM sales`だけ"
      },
      {
        "key": "D",
        "text": "`GRANT USAGE ON region`"
      }
    ],
    "answer": "A",
    "explanation": "ZORDERは関連列によるファイルスキップ効率を高める。"
  },
  {
    "id": 30035,
    "section": "Data Processing & Transformations",
    "question": "`INSERT INTO`と`INSERT OVERWRITE`の違いを説明するものとして最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "どちらも常にテーブルを削除する"
      },
      {
        "key": "B",
        "text": "`INSERT INTO`は権限付与、`INSERT OVERWRITE`は権限削除である"
      },
      {
        "key": "C",
        "text": "どちらもTime Travel専用構文である"
      },
      {
        "key": "D",
        "text": "`INSERT INTO`は既存データへ追記し、`INSERT OVERWRITE`は対象を置換する"
      }
    ],
    "answer": "D",
    "explanation": "追記と置換の違いは頻出。"
  },
  {
    "id": 30036,
    "section": "Data Processing & Transformations",
    "question": "毎日、Silverの注文テーブルからGoldの顧客別サマリを完全に再計算し、既存のGoldテーブルを安全に置き換えたいです。最も適切なSQLはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`INSERT INTO gold.customer_summary SELECT ...`のみ"
      },
      {
        "key": "B",
        "text": "`SHOW GRANTS ON gold.customer_summary`"
      },
      {
        "key": "C",
        "text": "`CREATE OR REPLACE TABLE gold.customer_summary AS SELECT ...`"
      },
      {
        "key": "D",
        "text": "`VACUUM gold.customer_summary`"
      }
    ],
    "answer": "C",
    "explanation": "完全再構築にはCREATE OR REPLACE TABLE AS SELECTが向く。"
  },
  {
    "id": 30037,
    "section": "Data Processing & Transformations",
    "question": "SQLセルで中間集計結果を作り、同じNotebookセッション内の後続セルだけで利用したいです。永続テーブルとして保存する必要はありません。最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE EXTERNAL LOCATION`"
      },
      {
        "key": "B",
        "text": "`CREATE OR REPLACE TEMP VIEW`"
      },
      {
        "key": "C",
        "text": "`CREATE TABLE LOCATION`"
      },
      {
        "key": "D",
        "text": "`RESTORE TABLE`"
      }
    ],
    "answer": "B",
    "explanation": "セッション内の中間結果にはtemp viewが適する。"
  },
  {
    "id": 30038,
    "section": "Data Processing & Transformations",
    "question": "ある一時ビューを、同じクラスタに接続している複数Notebookから参照したいです。ただしクラスタ終了後まで永続化する必要はありません。最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`CREATE OR REPLACE GLOBAL TEMP VIEW`"
      },
      {
        "key": "B",
        "text": "`CREATE OR REPLACE TEMP VIEW`"
      },
      {
        "key": "C",
        "text": "`CREATE MANAGED TABLE`"
      },
      {
        "key": "D",
        "text": "`CREATE EXTERNAL LOCATION`"
      }
    ],
    "answer": "A",
    "explanation": "global temp viewは同一クラスタ内で共有できるが永続ではない。"
  },
  {
    "id": 30039,
    "section": "Data Processing & Transformations",
    "question": "注文DataFrameに対して、商品カテゴリごとの注文数、売上合計、平均注文額を一度に計算したいです。最も適切なPySparkの操作はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`df.select(\"category\")`だけ"
      },
      {
        "key": "B",
        "text": "`df.groupBy(\"category\").agg(...)`"
      },
      {
        "key": "C",
        "text": "`df.writeStream.table(\"category\")`"
      },
      {
        "key": "D",
        "text": "`df.orderBy(\"category\")`だけ"
      }
    ],
    "answer": "B",
    "explanation": "groupByとaggで複数集計を表現する。"
  },
  {
    "id": 30040,
    "section": "Data Processing & Transformations",
    "question": "ある集計では、商品ごとの「注文数」ではなく「購入したユニーク顧客数」を求める必要があります。最も適切な関数はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`sum(\"customer_id\")`"
      },
      {
        "key": "B",
        "text": "`first(\"customer_id\")`"
      },
      {
        "key": "C",
        "text": "`countDistinct(\"customer_id\")`"
      },
      {
        "key": "D",
        "text": "`count(\"*\")`"
      }
    ],
    "answer": "C",
    "explanation": "重複を除いた件数にはcountDistinctを使う。"
  },
  {
    "id": 30041,
    "section": "Data Processing & Transformations",
    "question": "顧客ごとの購入履歴に対して、各購入行に「その顧客の購入累計額」を追加したいです。行数は減らしたくありません。最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`COPY INTO`を実行する"
      },
      {
        "key": "B",
        "text": "`groupBy(customer_id)`だけで置き換える"
      },
      {
        "key": "C",
        "text": "`VACUUM`を実行する"
      },
      {
        "key": "D",
        "text": "Window関数を使い、`partitionBy(customer_id)`と日付順の`orderBy`を指定する"
      }
    ],
    "answer": "D",
    "explanation": "Window関数は行を保持したまま累積値や順位を付与できる。"
  },
  {
    "id": 30042,
    "section": "Data Processing & Transformations",
    "question": "地域ごとに売上上位3商品を抽出したいです。商品別売上を合計した後、地域内で順位を付けて3件だけ残す必要があります。同点でも必ず3行に絞りたい場合、順位付けに最も適した関数はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`row_number()`"
      },
      {
        "key": "B",
        "text": "`dense_rank()`"
      },
      {
        "key": "C",
        "text": "`rank()`"
      },
      {
        "key": "D",
        "text": "`countDistinct()`"
      }
    ],
    "answer": "A",
    "explanation": "row_numberは同点でも一意番号を付けるため、件数を固定しやすい。"
  },
  {
    "id": 30043,
    "section": "Data Processing & Transformations",
    "question": "同点1位が2件あるときに順位を`1, 1, 3`のようにしたいです。使用すべきWindow関数はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`dense_rank()`"
      },
      {
        "key": "B",
        "text": "`row_number()`"
      },
      {
        "key": "C",
        "text": "`lag()`"
      },
      {
        "key": "D",
        "text": "`rank()`"
      }
    ],
    "answer": "D",
    "explanation": "rankは同点後に順位の欠番が出る。"
  },
  {
    "id": 30044,
    "section": "Data Processing & Transformations",
    "question": "同点1位が2件あるときに順位を`1, 1, 2`のようにしたいです。使用すべきWindow関数はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`rank()`"
      },
      {
        "key": "B",
        "text": "`lead()`"
      },
      {
        "key": "C",
        "text": "`dense_rank()`"
      },
      {
        "key": "D",
        "text": "`row_number()`"
      }
    ],
    "answer": "C",
    "explanation": "dense_rankは順位の欠番が出ない。"
  },
  {
    "id": 30045,
    "section": "Data Processing & Transformations",
    "question": "月別売上データが、`salesperson`, `month`, `amount`という縦持ち形式で保存されています。営業担当ごとに1行とし、月を列にした横持ちの表を作成したいです。最も適切な操作はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`"
      },
      {
        "key": "B",
        "text": "`groupBy(\"salesperson\").pivot(\"month\").sum(\"amount\")`"
      },
      {
        "key": "C",
        "text": "`groupBy(\"month\").countDistinct(\"salesperson\")`"
      },
      {
        "key": "D",
        "text": "`lag(\"month\")`"
      }
    ],
    "answer": "B",
    "explanation": "pivotは縦持ちを横持ちに変換する。"
  },
  {
    "id": 30046,
    "section": "Data Processing & Transformations",
    "question": "Sparkジョブが予想より遅く、特定stageでshuffle read/writeとspillが大きいことが疑われます。ボトルネックを調査するために最も適切なツールはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Spark UI"
      },
      {
        "key": "B",
        "text": "Data Explorerの権限画面"
      },
      {
        "key": "C",
        "text": "Databricks Connectのprofile設定"
      },
      {
        "key": "D",
        "text": "Delta Sharing recipient画面"
      }
    ],
    "answer": "A",
    "explanation": "Spark UIではstage、task、shuffle、spillなどを確認できる。"
  },
  {
    "id": 30047,
    "section": "Productionizing Data Pipelines",
    "question": "データエンジニアは、複数のNotebookタスクを依存関係に従って実行し、スケジュール、通知、失敗時の再実行を管理したいです。Databricksでこの目的に最も適した機能はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Unity Catalog lineage"
      },
      {
        "key": "B",
        "text": "Lakeflow Jobs"
      },
      {
        "key": "C",
        "text": "Data Explorer only"
      },
      {
        "key": "D",
        "text": "Delta Sharing"
      }
    ],
    "answer": "B",
    "explanation": "Lakeflow Jobsはジョブのオーケストレーションと運用管理に使う。"
  },
  {
    "id": 30048,
    "section": "Productionizing Data Pipelines",
    "question": "あるジョブはExtract、Transform、Loadの3タスクで構成されます。TransformはExtract完了後、LoadはTransform完了後に実行する必要があります。ジョブ定義で表現すべきものはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "各タスクの`USE CATALOG`"
      },
      {
        "key": "B",
        "text": "各タスクの`VACUUM`"
      },
      {
        "key": "C",
        "text": "各タスクの`depends_on`"
      },
      {
        "key": "D",
        "text": "各タスクの`ZORDER BY`"
      }
    ],
    "answer": "C",
    "explanation": "タスク依存関係はdepends_onで表す。"
  },
  {
    "id": 30049,
    "section": "Productionizing Data Pipelines",
    "question": "本番ジョブのTransformタスクだけが一時的な外部API障害で失敗しました。Extractは成功済みで、入力データも変わっていません。障害解消後、不要な再処理を避けるために最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "GoldテーブルをDROPする"
      },
      {
        "key": "B",
        "text": "常に全タスクを最初から再実行する"
      },
      {
        "key": "C",
        "text": "すぐにcheckpointを削除する"
      },
      {
        "key": "D",
        "text": "Repair runで失敗タスク以降を再実行する"
      }
    ],
    "answer": "D",
    "explanation": "Repair runは成功済みタスクを再利用し、失敗箇所から進められる。"
  },
  {
    "id": 30050,
    "section": "Productionizing Data Pipelines",
    "question": "あるデータ品質バグにより、上流のExtractロジックそのものを修正しました。下流のすべての結果を新しいロジックで作り直す必要があります。この場合の再実行方針として最も自然なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "全体を最初から再実行する"
      },
      {
        "key": "B",
        "text": "何も実行せず通知だけ送る"
      },
      {
        "key": "C",
        "text": "最後のLoadタスクだけrepairする"
      },
      {
        "key": "D",
        "text": "`SHOW GRANTS`だけ実行する"
      }
    ],
    "answer": "A",
    "explanation": "上流ロジック変更で下流結果がすべて影響を受けるなら全体再実行が妥当。"
  },
  {
    "id": 30051,
    "section": "Productionizing Data Pipelines",
    "question": "毎時実行のジョブで、前回実行が長引くと次の実行が重なり、同じデータを二重処理するリスクがあります。最も適切な設定はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "すべてのタスクに`GRANT ALL`を付ける"
      },
      {
        "key": "B",
        "text": "`VACUUM`を毎分実行する"
      },
      {
        "key": "C",
        "text": "NotebookをReposから削除する"
      },
      {
        "key": "D",
        "text": "最大同時実行数を制限する"
      }
    ],
    "answer": "D",
    "explanation": "max concurrent runsなどで重複実行を防ぐ。"
  },
  {
    "id": 30052,
    "section": "Productionizing Data Pipelines",
    "question": "Lakeflow Pipelineで、`STREAMING LIVE TABLE`として定義されたテーブルと、`LIVE TABLE`として定義されたテーブルが混在しています。パイプラインはtriggered実行として構成されています。未処理データがある状態で開始した場合、基本的な動作として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "パイプラインを停止するまで設定間隔で継続更新する"
      },
      {
        "key": "B",
        "text": "streaming tableだけ実行され、live tableは無視される"
      },
      {
        "key": "C",
        "text": "利用可能なデータを処理する更新を1回実行し、その後停止する"
      },
      {
        "key": "D",
        "text": "`LIVE TABLE`だけ実行され、streaming tableは無視される"
      }
    ],
    "answer": "C",
    "explanation": "triggered pipelineは利用可能データに対する更新を実行して停止する。"
  },
  {
    "id": 30053,
    "section": "Productionizing Data Pipelines",
    "question": "同じLakeflow Pipelineがcontinuous実行として構成されています。未処理データがある状態で開始した場合、基本的な動作として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "computeを使わずローカルで実行する"
      },
      {
        "key": "B",
        "text": "パイプラインを停止するまで継続的に更新する"
      },
      {
        "key": "C",
        "text": "1回だけ更新して必ず停止する"
      },
      {
        "key": "D",
        "text": "`LIVE TABLE`定義を削除する"
      }
    ],
    "answer": "B",
    "explanation": "continuous pipelineは停止されるまで継続的に処理する。"
  },
  {
    "id": 30054,
    "section": "Productionizing Data Pipelines",
    "question": "開発モードのLakeflow Pipelineでテストを繰り返す場合、本番モードと比べて期待される性質として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "開発中の反復をしやすくするため、computeが保持される場合がある"
      },
      {
        "key": "B",
        "text": "常にすべての履歴が削除される"
      },
      {
        "key": "C",
        "text": "Unity Catalogが使えなくなる"
      },
      {
        "key": "D",
        "text": "すべてのテーブルがexternalになる"
      }
    ],
    "answer": "A",
    "explanation": "開発モードは反復開発を支援する挙動を持つ。"
  },
  {
    "id": 30055,
    "section": "Productionizing Data Pipelines",
    "question": "Production modeのPipelineを選ぶ理由として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "全タスクをUIでしか実行できないため"
      },
      {
        "key": "B",
        "text": "本番運用での安定したスケジュール実行やリソース管理を重視するため"
      },
      {
        "key": "C",
        "text": "Delta Lakeを無効化したいため"
      },
      {
        "key": "D",
        "text": "Notebook変数を手動で共有したいため"
      }
    ],
    "answer": "B",
    "explanation": "Production modeは本番運用向け。"
  },
  {
    "id": 30056,
    "section": "Productionizing Data Pipelines",
    "question": "DLT/Lakeflowのexpectationとして`CONSTRAINT valid_timestamp EXPECT (timestamp > '2020-01-01')`のみが定義されています。`DROP ROW`や`FAIL UPDATE`は指定されていません。この条件に違反するレコードが含まれるバッチを処理した場合、最も適切な説明はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "1件でも違反があると必ず更新が失敗する"
      },
      {
        "key": "B",
        "text": "違反レコードには自動的に`invalid=true`列が追加される"
      },
      {
        "key": "C",
        "text": "違反レコードもターゲットに追加され、メトリクスとして記録される"
      },
      {
        "key": "D",
        "text": "違反レコードは常に自動削除される"
      }
    ],
    "answer": "C",
    "explanation": "通常のEXPECTはレコードを保持し、品質メトリクスを記録する。削除や失敗には追加指定が必要。"
  },
  {
    "id": 30057,
    "section": "Productionizing Data Pipelines",
    "question": "expectationで違反レコードをターゲットから除外したい場合に必要な考え方として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`ZORDER BY`を付ける"
      },
      {
        "key": "B",
        "text": "`DESCRIBE HISTORY`を実行する"
      },
      {
        "key": "C",
        "text": "`GRANT SELECT`を付ける"
      },
      {
        "key": "D",
        "text": "expectationに違反時のdrop動作を指定する"
      }
    ],
    "answer": "D",
    "explanation": "違反時にdropするには単なるEXPECTではなくdrop動作を指定する。"
  },
  {
    "id": 30058,
    "section": "Productionizing Data Pipelines",
    "question": "expectation違反が1件でもあれば更新を失敗させ、問題データを下流に流したくない場合に必要な考え方として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "expectationにfail update相当の動作を指定する"
      },
      {
        "key": "B",
        "text": "`COPY INTO`へ置き換える"
      },
      {
        "key": "C",
        "text": "`VACUUM`を実行する"
      },
      {
        "key": "D",
        "text": "`global_temp`ビューに保存する"
      }
    ],
    "answer": "A",
    "explanation": "失敗させたい場合はfail動作を明示する。"
  },
  {
    "id": 30059,
    "section": "Productionizing Data Pipelines",
    "question": "PipelineでSilverテーブルの定義がBronzeテーブルを参照し、Goldテーブルの定義がSilverテーブルを参照しています。Silverの更新がスキーマ不一致で失敗した場合、Goldの動作として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Goldは古いSilverを無視して必ず成功する"
      },
      {
        "key": "B",
        "text": "Goldは自動的に空テーブルとして作成される"
      },
      {
        "key": "C",
        "text": "GoldはBronzeを直接参照するよう自動変更される"
      },
      {
        "key": "D",
        "text": "Goldは実行されない"
      }
    ],
    "answer": "D",
    "explanation": "依存元が失敗すると下流は実行されず、破損データの伝播を防ぐ。"
  },
  {
    "id": 30060,
    "section": "Productionizing Data Pipelines",
    "question": "CDCデータをLakeflowで適用する際、同じキーに対して複数の更新が到着します。更新順序を正しく反映するため、APPLY CHANGESで特に重要な指定はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM`を先に実行する"
      },
      {
        "key": "B",
        "text": "`global_temp`に保存する"
      },
      {
        "key": "C",
        "text": "`SEQUENCE BY`に信頼できるタイムスタンプまたはバージョン列を指定する"
      },
      {
        "key": "D",
        "text": "`GRANT ALL PRIVILEGES`を指定する"
      }
    ],
    "answer": "C",
    "explanation": "CDCでは変更順序が重要で、SEQUENCE BYが順序を決める。"
  },
  {
    "id": 30061,
    "section": "Productionizing Data Pipelines",
    "question": "顧客マスタの現在状態だけを保持すればよく、過去の住所変更履歴は不要です。LakeflowでCDCを適用する場合、最も適切なSCDタイプはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Lakehouse Federation"
      },
      {
        "key": "B",
        "text": "SCD Type 1"
      },
      {
        "key": "C",
        "text": "SCD Type 2"
      },
      {
        "key": "D",
        "text": "Delta Sharing"
      }
    ],
    "answer": "B",
    "explanation": "Type 1は最新状態で上書きする。"
  },
  {
    "id": 30062,
    "section": "Governance & Quality",
    "question": "データアナリストにDeltaテーブル`main.sales.orders`を読み取らせたいです。テーブルに対する`SELECT`は付与しましたが、アナリストはアクセス拒否になります。Unity Catalogで追加確認すべき権限として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`USE CATALOG` on `main` と `USE SCHEMA` on `main.sales`"
      },
      {
        "key": "B",
        "text": "`OPTIMIZE` on table"
      },
      {
        "key": "C",
        "text": "`VACUUM` on table"
      },
      {
        "key": "D",
        "text": "`CREATE WIDGET` on schema"
      }
    ],
    "answer": "A",
    "explanation": "UCでは上位階層の利用権限も必要。"
  },
  {
    "id": 30063,
    "section": "Governance & Quality",
    "question": "データエンジニアリングチーム`team`にテーブル`sales`を完全に管理させたいです。テーブルに対する完全な権限を付与するSQLとして最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`GRANT USAGE ON TABLE sales TO team`"
      },
      {
        "key": "B",
        "text": "`GRANT ALL PRIVILEGES ON TABLE sales TO team`"
      },
      {
        "key": "C",
        "text": "`GRANT ALL PRIVILEGES ON TABLE team TO sales`"
      },
      {
        "key": "D",
        "text": "`GRANT SELECT ON TABLE sales TO team`"
      }
    ],
    "answer": "B",
    "explanation": "対象オブジェクトとprincipalの順序に注意する。"
  },
  {
    "id": 30064,
    "section": "Governance & Quality",
    "question": "新しい分析チームに、スキーマ`analytics.reporting`内の現在および今後作成されるテーブルをすべて読み取らせたいです。テーブルを個別に付与し続ける運用は避けたいです。最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM analytics.reporting`を実行する"
      },
      {
        "key": "B",
        "text": "`CREATE TEMP VIEW`を作る"
      },
      {
        "key": "C",
        "text": "`GRANT SELECT ON SCHEMA analytics.reporting TO analysts`"
      },
      {
        "key": "D",
        "text": "既存テーブルにだけ`SELECT`を付与する"
      }
    ],
    "answer": "C",
    "explanation": "スキーマへのSELECT付与は下位テーブルへ継承される。"
  },
  {
    "id": 30065,
    "section": "Governance & Quality",
    "question": "ETL用サービスプリンシパルはBronzeスキーマから読み取り、Silverスキーマへテーブルを作成・更新します。最小権限の原則に最も沿った方針はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "個人ユーザーのtokenを共有する"
      },
      {
        "key": "B",
        "text": "metastore adminにする"
      },
      {
        "key": "C",
        "text": "全catalogにALL PRIVILEGESを付与する"
      },
      {
        "key": "D",
        "text": "必要なcatalog/schemaのUSE、BronzeのSELECT、SilverのCREATE TABLE/MODIFYを付与する"
      }
    ],
    "answer": "D",
    "explanation": "必要な読み書き権限だけをサービスプリンシパルへ付与する。"
  },
  {
    "id": 30066,
    "section": "Governance & Quality",
    "question": "Unity Catalog managed tableをDROPした場合の基本的な挙動として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "メタデータと管理対象のデータファイルが削除される"
      },
      {
        "key": "B",
        "text": "データファイルだけ削除され、メタデータは残る"
      },
      {
        "key": "C",
        "text": "メタデータだけ削除され、データファイルは必ず残る"
      },
      {
        "key": "D",
        "text": "DROPは実行できない"
      }
    ],
    "answer": "A",
    "explanation": "managed tableはDatabricks/UCがデータライフサイクルも管理する。"
  },
  {
    "id": 30067,
    "section": "Governance & Quality",
    "question": "Unity Catalog external tableをDROPした場合の基本的な挙動として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "データファイルも必ず削除される"
      },
      {
        "key": "B",
        "text": "catalog全体が削除される"
      },
      {
        "key": "C",
        "text": "SELECT権限だけ削除される"
      },
      {
        "key": "D",
        "text": "UCのメタデータは削除されるが、外部ストレージ上のデータファイルは残る"
      }
    ],
    "answer": "D",
    "explanation": "external tableではデータ本体のライフサイクルは外部ストレージ側に残る。"
  },
  {
    "id": 30068,
    "section": "Governance & Quality",
    "question": "あるデータセットはDatabricks以外のシステムからも読み取られており、Databricks上のテーブル定義を削除しても基になるファイルは残す必要があります。適切なテーブルタイプはどれですか",
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
        "text": "External table"
      },
      {
        "key": "D",
        "text": "Temp view"
      }
    ],
    "answer": "C",
    "explanation": "外部依存のあるデータにはexternal tableが向く。"
  },
  {
    "id": 30069,
    "section": "Governance & Quality",
    "question": "データセットがmanaged tableかexternal tableかを確認し、DROP時の影響を判断したいです。最も適切なSQLはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`VACUUM table_name`のみ"
      },
      {
        "key": "B",
        "text": "`DESCRIBE DETAIL table_name`"
      },
      {
        "key": "C",
        "text": "`SELECT COUNT(*) FROM table_name`"
      },
      {
        "key": "D",
        "text": "`CREATE WIDGET table_name`"
      }
    ],
    "answer": "B",
    "explanation": "DESCRIBE DETAILでtable typeやlocationを確認できる。"
  },
  {
    "id": 30070,
    "section": "Governance & Quality",
    "question": "データガバナンス担当者は、重要なダッシュボードで使われているGoldテーブルがどのSilver/Bronzeテーブルから作成されたかを確認したいです。最も関連するUnity Catalogの機能はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Lineage"
      },
      {
        "key": "B",
        "text": "Databricks Connect"
      },
      {
        "key": "C",
        "text": "Pivot"
      },
      {
        "key": "D",
        "text": "Repair run"
      }
    ],
    "answer": "A",
    "explanation": "lineageはデータの上流・下流関係を追跡する。"
  },
  {
    "id": 30071,
    "section": "Governance & Quality",
    "question": "セキュリティ監査のため、誰がいつどのテーブルにアクセスしたか、どの操作を行ったかを確認したいです。最も関連するものはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "`%run`"
      },
      {
        "key": "B",
        "text": "Audit logs"
      },
      {
        "key": "C",
        "text": "`row_number()`"
      },
      {
        "key": "D",
        "text": "ZORDER"
      }
    ],
    "answer": "B",
    "explanation": "監査ログはアクセスや操作の追跡に使う。"
  },
  {
    "id": 30072,
    "section": "Platform & Compute",
    "question": "Databricksレイクハウス/Data Intelligence Platformの説明として最も適切なのはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "SQL Warehouseだけを提供し、SparkやPythonは使えないサービス"
      },
      {
        "key": "B",
        "text": "Unity Catalogを使わない前提の一時データ処理サービス"
      },
      {
        "key": "C",
        "text": "データレイクの柔軟性、Delta Lakeの信頼性、統合ガバナンス、データ/AIワークロードを組み合わせるプラットフォーム"
      },
      {
        "key": "D",
        "text": "Notebookだけを保存するファイル共有サービス"
      }
    ],
    "answer": "C",
    "explanation": "Databricksはデータ/AI、Delta、UC、computeを統合する。"
  },
  {
    "id": 30073,
    "section": "Platform & Compute",
    "question": "BIツールやアナリストが日中に不定期なSQLクエリを実行します。利用がない時間も多く、アイドルコストを抑えたいです。最も適切なcomputeはどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Job clusterのみ"
      },
      {
        "key": "B",
        "text": "常時起動のAll-purpose clusterのみ"
      },
      {
        "key": "C",
        "text": "Databricks Connectのみ"
      },
      {
        "key": "D",
        "text": "Serverless SQL Warehouse"
      }
    ],
    "answer": "D",
    "explanation": "Serverless SQL WarehouseはSQL/BIの変動負荷に向く。"
  },
  {
    "id": 30074,
    "section": "Platform & Compute",
    "question": "Serverless computeを利用したいが、ワークスペースがまだHive Metastore中心でUnity Catalogに移行していません。正しい判断はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Serverless computeにはUnity Catalogが必要なため、UC移行またはClassic compute利用を検討する"
      },
      {
        "key": "B",
        "text": "`VACUUM`すればServerlessが有効になる"
      },
      {
        "key": "C",
        "text": "Hive Metastoreのままで必ずServerlessを使える"
      },
      {
        "key": "D",
        "text": "NotebookをPythonにすればServerless要件は消える"
      }
    ],
    "answer": "A",
    "explanation": "Serverless利用にはUCが前提となる。"
  },
  {
    "id": 30075,
    "section": "Platform & Compute",
    "question": "開発者がNotebookで対話的にコードを書き、途中結果を確認しながら探索したいです。最も自然なcompute選択はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Delta Sharing recipient"
      },
      {
        "key": "B",
        "text": "Storage Credential"
      },
      {
        "key": "C",
        "text": "External Location"
      },
      {
        "key": "D",
        "text": "All-purpose clusterまたはNotebook対応のserverless compute"
      }
    ],
    "answer": "D",
    "explanation": "対話的開発にはNotebook実行向けcomputeが必要。"
  },
  {
    "id": 30076,
    "section": "Platform & Compute",
    "question": "本番ジョブの各実行で専用computeを起動し、処理完了後に終了させてコストと分離性を管理したいです。最も近いcomputeの考え方はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "Global temp view"
      },
      {
        "key": "B",
        "text": "Delta Sharing"
      },
      {
        "key": "C",
        "text": "Job cluster"
      },
      {
        "key": "D",
        "text": "Data Explorer"
      }
    ],
    "answer": "C",
    "explanation": "Job clusterはジョブ実行単位のcomputeに向く。"
  },
  {
    "id": 30077,
    "section": "Platform & Compute",
    "question": "Databricks Associate試験で、問題文が長い場合に最も重要な読み方はどれですか",
    "choices": [
      {
        "key": "A",
        "text": "コード部分を読まずに最後の文だけで判断する"
      },
      {
        "key": "B",
        "text": "「継続/一回限り」「現在状態/履歴」「開発/本番」「managed/external」「権限不足の階層」などの判定語を先に拾う"
      },
      {
        "key": "C",
        "text": "すべての固有名詞を暗記順に並べる"
      },
      {
        "key": "D",
        "text": "選択肢Aを優先する"
      }
    ],
    "answer": "B",
    "explanation": "本番では長文から要件の判定語を拾う力が重要。"
  }
]
