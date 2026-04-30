export type CertificationConfig = {
  id: string
  name: string
  vendor: string
  description: string
  questionCount: number
  status: 'active' | 'planned'
}

export const certifications: CertificationConfig[] = [
  {
    id: 'databricks-data-engineer-associate',
    name: 'Data Engineer Associate',
    vendor: 'Databricks',
    description: 'Lakehouse、Spark、Delta Lake、ワークフローの基礎を演習します。',
    questionCount: 300,
    status: 'active',
  },
  {
    id: 'databricks-data-engineer-associate-2',
    name: 'Data Engineer Associate 2',
    vendor: 'Databricks',
    description: '弱点克服用の200問で、Development & Ingestionを厚めに復習します。',
    questionCount: 200,
    status: 'active',
  },
  {
    id: 'databricks-data-engineer-associate-3',
    name: 'Data Engineer Associate 3',
    vendor: 'Databricks',
    description: '本番形式に寄せた130問で、シナリオ判断とコード読解を強化します。',
    questionCount: 130,
    status: 'active',
  },
  {
    id: 'databricks-data-engineer-associate-4',
    name: 'Data Engineer Associate 4',
    vendor: 'Databricks',
    description: '本番想定の77問で、長めのシナリオから判定語を拾う練習をします。',
    questionCount: 77,
    status: 'active',
  },
]

export const activeCertification = certifications[0]
