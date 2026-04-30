'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/store/quizStore'
import QuestionCard from '@/components/QuestionCard'
import ProgressBar from '@/components/ProgressBar'
import Timer from '@/components/Timer'

export default function QuizPage() {
  const router = useRouter()
  const session = useQuizStore((s) => s.session)
  const resetSession = useQuizStore((s) => s.resetSession)
  const pauseQuiz = useQuizStore((s) => s.pauseQuiz)
  const resumeQuiz = useQuizStore((s) => s.resumeQuiz)
  const finishQuiz = useQuizStore((s) => s.finishQuiz)

  useEffect(() => {
    if (session?.isFinished) {
      router.replace('/results')
    }
  }, [session?.isFinished, router])

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [session, router])

  if (!session || session.isFinished) return null

  const currentQ = session.questions[session.currentIndex]
  const answeredCount = Object.keys(session.answers).length

  const modeLabel =
    session.mode === 'mock'
      ? session.sectionFilter
        ? `模擬 / ${session.sectionFilter.replace(/Section \d+: /, '')}`
        : '模擬試験'
      : session.mode === 'section'
      ? (session.sectionFilter?.replace(/Section \d+: /, '') ?? 'セクション')
      : session.mode === 'wrong'
      ? '苦手問題'
      : session.mode === 'historyWrong'
      ? '履歴ミス'
      : 'ランダム演習'

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Sticky dark top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          {/* Left: back */}
          <button
            onClick={() => {
              if (confirm('演習を破棄してホームへ戻りますか？')) {
                resetSession()
                router.push('/')
              }
            }}
            className="flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ホーム
          </button>

          {/* Center: mode badge + timer */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">
              {modeLabel}
            </span>
            {session.mode === 'mock' && <Timer />}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                pauseQuiz()
                router.push('/')
              }}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              一時停止
            </button>
            <button
              onClick={() => {
                if (confirm('ここまでの回答で結果を表示しますか？')) finishQuiz()
              }}
              className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              途中終了
            </button>
          </div>
        </div>
      </header>

      {/* Progress strip */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-2xl">
          <ProgressBar current={answeredCount} total={session.questions.length} />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-2xl">
          {session.isPaused ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mb-2 text-3xl">⏸</div>
              <p className="mb-6 text-slate-500">演習は一時停止中です。</p>
              <button
                onClick={resumeQuiz}
                className="rounded-xl bg-cyan-500 px-10 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                再開する
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <QuestionCard
                question={currentQ}
                questionNumber={session.currentIndex + 1}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
