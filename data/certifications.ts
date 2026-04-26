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
]

export const activeCertification = certifications[0]
