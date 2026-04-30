export type Question = {
  id: number
  section: string
  question: string
  choices: { key: string; text: string }[]
  answer: string
  explanation: string
}

export type QuizMode =
  | 'random'
  | 'section'
  | 'wrong'
  | 'historyWrong'
  | 'mock'
  | 'all'

export type AnswerRecord = {
  questionId: number
  selectedAnswer: string
  isCorrect: boolean
  timestamp: number
}

export type QuizSession = {
  mode: QuizMode
  certificationId: string
  sectionFilter?: string
  questionCount?: number
  questions: Question[]
  currentIndex: number
  answers: Record<number, AnswerRecord>
  startTime: number
  endTime?: number
  isFinished: boolean
  isPaused: boolean
  historySaved?: boolean
}

export type WrongAnswerSession = {
  id: string
  date: number
  certificationId?: string
  sectionFilter?: string
  mode: QuizMode
  totalQuestions: number
  correctCount: number
  elapsedSeconds?: number
  wrongAnswers: Pick<AnswerRecord, 'questionId' | 'selectedAnswer'>[]
}

export type QuizStats = {
  totalAnswered: number
  totalCorrect: number
  wrongQuestionIds: number[]
  favoriteQuestionIds: number[]
  answerHistory: AnswerRecord[]
  wrongSessionHistory: WrongAnswerSession[]
}
