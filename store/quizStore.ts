'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Question, QuizMode, AnswerRecord, QuizSession, QuizStats } from '@/types'
import { questions as allQuestions } from '@/data/questions'

const SECONDS_PER_MOCK_QUESTION = 120
export const RANDOM_QUIZ_MIN_COUNT = 10
export const RANDOM_QUIZ_MAX_COUNT = 300

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type QuizStoreState = {
  session: QuizSession | null
  stats: QuizStats
  timerSeconds: number

  // Actions
  startQuiz: (mode: QuizMode, sectionFilter?: string, questionCount?: number) => void
  answerQuestion: (selectedAnswer: string) => void
  nextQuestion: () => void
  finishQuiz: () => void
  pauseQuiz: () => void
  resumeQuiz: () => void
  resetSession: () => void
  toggleFavorite: (questionId: number) => void
  clearStats: () => void
  tick: () => void
}

const defaultStats: QuizStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  wrongQuestionIds: [],
  favoriteQuestionIds: [],
  answerHistory: [],
}

export const useQuizStore = create<QuizStoreState>()(
  persist(
    (set, get) => ({
      session: null,
      stats: defaultStats,
      timerSeconds: 0,

      startQuiz: (mode, sectionFilter, questionCount) => {
        const { stats } = get()
        let pool: Question[] = []
        const normalizedQuestionCount = Math.min(
          RANDOM_QUIZ_MAX_COUNT,
          Math.max(RANDOM_QUIZ_MIN_COUNT, questionCount ?? RANDOM_QUIZ_MAX_COUNT),
        )

        if (mode === 'random') {
          pool = shuffle(allQuestions).slice(0, normalizedQuestionCount)
        } else if (mode === 'all') {
          pool = shuffle(allQuestions)
        } else if (mode === 'section' && sectionFilter) {
          pool = shuffle(allQuestions.filter((q) => q.section === sectionFilter)).slice(
            0,
            normalizedQuestionCount,
          )
        } else if (mode === 'wrong') {
          const wrongIds = new Set(stats.wrongQuestionIds)
          pool = shuffle(allQuestions.filter((q) => wrongIds.has(q.id))).slice(
            0,
            normalizedQuestionCount,
          )
        } else if (mode === 'mock') {
          const source = sectionFilter
            ? allQuestions.filter((q) => q.section === sectionFilter)
            : allQuestions
          pool = shuffle(source).slice(0, normalizedQuestionCount)
        }

        if (pool.length === 0) return

        set({
          session: {
            mode,
            sectionFilter,
            questionCount: mode === 'random' || mode === 'mock' ? pool.length : undefined,
            questions: pool,
            currentIndex: 0,
            answers: {},
            startTime: Date.now(),
            isFinished: false,
            isPaused: false,
          },
          timerSeconds: mode === 'mock' ? pool.length * SECONDS_PER_MOCK_QUESTION : 0,
        })
      },

      answerQuestion: (selectedAnswer) => {
        const { session, stats } = get()
        if (!session) return
        const currentQ = session.questions[session.currentIndex]
        if (!currentQ) return
        if (session.answers[currentQ.id]) return // already answered

        const isCorrect = selectedAnswer === currentQ.answer

        const record: AnswerRecord = {
          questionId: currentQ.id,
          selectedAnswer,
          isCorrect,
          timestamp: Date.now(),
        }

        // Update wrong question list
        let wrongIds = [...stats.wrongQuestionIds]
        if (!isCorrect) {
          if (!wrongIds.includes(currentQ.id)) wrongIds.push(currentQ.id)
        } else {
          wrongIds = wrongIds.filter((id) => id !== currentQ.id)
        }

        set({
          session: {
            ...session,
            answers: { ...session.answers, [currentQ.id]: record },
          },
          stats: {
            ...stats,
            totalAnswered: stats.totalAnswered + 1,
            totalCorrect: stats.totalCorrect + (isCorrect ? 1 : 0),
            wrongQuestionIds: wrongIds,
            answerHistory: [record, ...stats.answerHistory].slice(0, 1000),
          },
        })
      },

      nextQuestion: () => {
        const { session } = get()
        if (!session) return
        const nextIndex = session.currentIndex + 1
        if (nextIndex >= session.questions.length) {
          set({ session: { ...session, isFinished: true, endTime: Date.now() } })
        } else {
          set({ session: { ...session, currentIndex: nextIndex } })
        }
      },

      finishQuiz: () => {
        const { session } = get()
        if (!session) return
        set({ session: { ...session, isFinished: true, isPaused: false, endTime: Date.now() } })
      },

      pauseQuiz: () => {
        const { session } = get()
        if (!session || session.isFinished) return
        set({ session: { ...session, isPaused: true } })
      },

      resumeQuiz: () => {
        const { session } = get()
        if (!session || session.isFinished) return
        set({ session: { ...session, isPaused: false } })
      },

      resetSession: () => {
        set({ session: null, timerSeconds: 0 })
      },

      toggleFavorite: (questionId) => {
        const { stats } = get()
        const favs = stats.favoriteQuestionIds
        const updated = favs.includes(questionId)
          ? favs.filter((id) => id !== questionId)
          : [...favs, questionId]
        set({ stats: { ...stats, favoriteQuestionIds: updated } })
      },

      clearStats: () => {
        set({ stats: defaultStats })
      },

      tick: () => {
        const { session, timerSeconds } = get()
        if (!session || session.mode !== 'mock' || session.isFinished || session.isPaused) return
        if (timerSeconds <= 1) {
          set({ timerSeconds: 0 })
          get().finishQuiz()
        } else {
          set({ timerSeconds: timerSeconds - 1 })
        }
      },
    }),
    {
      name: 'databricks-quiz-store',
      partialize: (state) => ({
        session: state.session,
        stats: state.stats,
        timerSeconds: state.timerSeconds,
      }),
    }
  )
)
