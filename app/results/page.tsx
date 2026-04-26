'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/store/quizStore'
import { questions as allQuestions } from '@/data/questions'

const PASS_THRESHOLD = 0.7

export default function ResultsPage() {
  const router = useRouter()
  const session = useQuizStore((s) => s.session)
  const resetSession = useQuizStore((s) => s.resetSession)
  const startQuiz = useQuizStore((s) => s.startQuiz)
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [session, router])

  const totalQ = session?.questions.length ?? 0
  const answered = useMemo(() => (session ? Object.values(session.answers) : []), [session])
  const correctCount = answered.filter((a) => a.isCorrect).length
  const accuracy = totalQ > 0 ? correctCount / totalQ : 0
  const passed = session?.mode === 'mock' ? accuracy >= PASS_THRESHOLD : null

  const elapsed = session?.endTime
    ? Math.floor((session.endTime - session.startTime) / 1000)
    : null
  const elapsedStr = elapsed
    ? `${Math.floor(elapsed / 60)}分${elapsed % 60}秒`
    : null

  const sessionWrongIds = useMemo(
    () => answered.filter((a) => !a.isCorrect).map((a) => a.questionId),
    [answered],
  )
  const sessionWrong = useMemo(
    () => allQuestions.filter((q) => sessionWrongIds.includes(q.id)),
    [sessionWrongIds],
  )
  const summaryPayload = useMemo(
    () => ({
      mode: session?.mode ?? '',
      totalQuestions: totalQ,
      answeredCount: answered.length,
      correctCount,
      accuracy,
      elapsedSeconds: elapsed,
      wrongQuestions: sessionWrong.map((question) => ({
        id: question.id,
        section: question.section,
        question: question.question,
        answer: question.answer,
        selectedAnswer: session?.answers[question.id]?.selectedAnswer,
        explanation: question.explanation,
      })),
    }),
    [accuracy, answered.length, correctCount, elapsed, session, sessionWrong, totalQ],
  )

  useEffect(() => {
    if (!session) return
    let cancelled = false

    async function loadAiSummary() {
      setIsLoadingSummary(true)
      setSummaryError(null)
      try {
        const response = await fetch('/api/quiz/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(summaryPayload),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error ?? 'AI総括を生成できませんでした。')
        if (!cancelled) setAiSummary(data.summary)
      } catch (error) {
        if (!cancelled)
          setSummaryError(error instanceof Error ? error.message : 'AI総括を生成できませんでした。')
      } finally {
        if (!cancelled) setIsLoadingSummary(false)
      }
    }

    loadAiSummary()
    return () => { cancelled = true }
  }, [session, summaryPayload])

  const handleRetry = () => {
    if (!session) return
    const { mode, sectionFilter, questionCount } = session
    resetSession()
    startQuiz(mode, sectionFilter, questionCount)
    router.push('/quiz')
  }

  const handleHome = () => {
    resetSession()
    router.push('/')
  }

  if (!session) return null

  const pctDisplay = Math.round(accuracy * 100)

  // Determine accent color based on result
  const accentColor =
    passed === true
      ? 'text-emerald-400'
      : passed === false
      ? 'text-rose-400'
      : 'text-cyan-400'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dark score header */}
      <header className="border-b border-slate-800 bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-2xl">
          {/* Result label */}
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              {session.mode === 'mock' ? '模擬試験' : session.mode === 'wrong' ? '苦手問題' : '演習'} 結果
            </p>
            <p className={`mt-1 text-lg font-bold ${accentColor}`}>
              {passed === true
                ? '合格ライン達成！'
                : passed === false
                ? 'もう少しです'
                : '演習完了'}
            </p>
          </div>

          {/* Big score */}
          <div className="mb-6 text-center">
            <span className={`text-8xl font-extrabold tabular-nums tracking-tight ${accentColor}`}>
              {pctDisplay}
            </span>
            <span className="ml-1 text-3xl font-bold text-slate-400">%</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="text-2xl font-bold text-white">
                {correctCount}
                <span className="text-base font-normal text-slate-400"> / {totalQ}</span>
              </div>
              <div className="mt-1 text-xs text-slate-400">正解数</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="text-2xl font-bold text-white">{sessionWrong.length}</div>
              <div className="mt-1 text-xs text-slate-400">不正解</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="text-2xl font-bold text-white">{elapsedStr ?? '—'}</div>
              <div className="mt-1 text-xs text-slate-400">所要時間</div>
            </div>
          </div>

          {/* Pass/fail badge for mock */}
          {session.mode === 'mock' && (
            <div className="mt-4 text-center">
              <span
                className={`inline-block rounded-full px-4 py-1 text-sm font-bold ${
                  passed
                    ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
                }`}
              >
                {passed ? '合格ライン達成 (70%以上)' : '合格ライン未達 (70%未満)'}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-2xl space-y-5 px-4 py-6">
        {/* AI summary */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-500" />
            AI総括
          </h2>
          {isLoadingSummary ? (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" />
              総括を生成しています...
            </div>
          ) : summaryError ? (
            <div className="space-y-3">
              <p className="text-sm leading-6 text-rose-500">{summaryError}</p>
              <button
                onClick={() => {
                  setAiSummary(null)
                  setSummaryError(null)
                  setIsLoadingSummary(true)
                  fetch('/api/quiz/summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(summaryPayload),
                  })
                    .then(async (res) => {
                      const data = await res.json()
                      if (!res.ok) throw new Error(data.error ?? 'AI総括を生成できませんでした。')
                      setAiSummary(data.summary)
                    })
                    .catch((err) =>
                      setSummaryError(err instanceof Error ? err.message : 'AI総括を生成できませんでした。'),
                    )
                    .finally(() => setIsLoadingSummary(false))
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                再生成
              </button>
            </div>
          ) : aiSummary ? (
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{aiSummary}</p>
          ) : (
            <p className="text-sm text-slate-400">総括はまだありません。</p>
          )}
        </section>

        {/* Wrong answers */}
        {sessionWrong.length > 0 && (
          <section className="space-y-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
              今回の不正解（{sessionWrong.length}問）
            </h2>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
              {sessionWrong.map((q) => {
                const rec = session.answers[q.id]
                return (
                  <div key={q.id} className="px-4 py-3.5 space-y-1.5">
                    <p className="text-sm font-medium text-slate-700">
                      <span className="mr-1.5 text-xs font-normal text-slate-400">Q{q.id}</span>
                      {q.question.length > 70 ? q.question.slice(0, 70) + '…' : q.question}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="flex items-center gap-1 text-rose-500">
                        <span className="font-medium">あなた:</span> {rec?.selectedAnswer}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <span className="font-medium">正解:</span> {q.answer}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {q.explanation.length > 120 ? q.explanation.slice(0, 120) + '…' : q.explanation}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleRetry}
            className="rounded-xl bg-slate-950 py-3 font-bold text-white transition-colors hover:bg-slate-800"
          >
            もう一度
          </button>
          <button
            onClick={handleHome}
            className="rounded-xl border border-slate-200 bg-white py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            ホームへ
          </button>
        </div>
      </div>
    </div>
  )
}
