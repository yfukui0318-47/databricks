import type { Question } from '@/types'
import { questions } from '@/data/questions'
import { associate2Questions } from '@/data/associate2Questions'
import { associate3Questions } from '@/data/associate3Questions'
import { associate4Questions } from '@/data/associate4Questions'
import { activeCertification } from '@/data/certifications'

export const questionBanks: Record<string, Question[]> = {
  'databricks-data-engineer-associate': questions,
  'databricks-data-engineer-associate-2': associate2Questions,
  'databricks-data-engineer-associate-3': associate3Questions,
  'databricks-data-engineer-associate-4': associate4Questions,
}

export function getQuestionsForCertification(certificationId: string): Question[] {
  return questionBanks[certificationId] ?? questionBanks[activeCertification.id] ?? []
}

export function getSectionsForCertification(certificationId: string): string[] {
  return Array.from(new Set(getQuestionsForCertification(certificationId).map((q) => q.section)))
}
