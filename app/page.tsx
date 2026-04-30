'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  RANDOM_QUIZ_MAX_COUNT,
  RANDOM_QUIZ_MIN_COUNT,
  useQuizStore,
} from '@/store/quizStore'
import type { QuizMode } from '@/types'
import { activeCertification, certifications } from '@/data/certifications'
import { getQuestionsForCertification, getSectionsForCertification } from '@/data/questionBanks'
import { recordUsageVisit, type UsageStats } from '@/lib/usageStats'

const AI_LAB_URL = 'https://app-lucha-prototype-japanwest.azurewebsites.net/'

export default function HomePage() {
  const router = useRouter()
  const startQuiz = useQuizStore((s) => s.startQuiz)
  const resumeQuiz = useQuizStore((s) => s.resumeQuiz)
  const resetSession = useQuizStore((s) => s.resetSession)
  const session = useQuizStore((s) => s.session)
  const stats = useQuizStore((s) => s.stats)
  const clearStats = useQuizStore((s) => s.clearStats)
  const [questionCount, setQuestionCount] = useState(30)
  const [sessionType, setSessionType] = useState<'practice' | 'mock'>('practice')
  const [scope, setScope] = useState<'all' | 'section' | 'wrong' | 'historyWrong'>('all')
  const [selectedCertificationId, setSelectedCertificationId] = useState(activeCertification.id)
  const selectedQuestions = useMemo(
    () => getQuestionsForCertification(selectedCertificationId),
    [selectedCertificationId],
  )
  const sections = useMemo(
    () => getSectionsForCertification(selectedCertificationId),
    [selectedCertificationId],
  )
  const selectedCertification =
    certifications.find((certification) => certification.id === selectedCertificationId) ??
    activeCertification
  const selectedTrackLabel = `${selectedCertification.vendor} ${selectedCertification.name}`
  const selectedQuestionIdSet = useMemo(
    () => new Set(selectedQuestions.map((question) => question.id)),
    [selectedQuestions],
  )
  const [selectedSection, setSelectedSection] = useState(sections[0] ?? '')
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)

  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : null
  const wrongSessionHistory = stats.wrongSessionHistory ?? []
  const wrongAnswerHistoryIds = (stats.answerHistory ?? [])
    .filter((answer) => !answer.isCorrect)
    .map((answer) => answer.questionId)
  const selectedWrongQuestionIds = stats.wrongQuestionIds.filter((id) =>
    selectedQuestionIdSet.has(id),
  )
  const historyWrongQuestionIds = Array.from(
    new Set(
      [
        ...wrongAnswerHistoryIds,
        ...wrongSessionHistory.flatMap((item) =>
          item.wrongAnswers.map((answer) => answer.questionId),
        ),
      ].filter((id) => selectedQuestionIdSet.has(id)),
    ),
  )

  const handleStart = (mode: QuizMode, sectionFilter?: string, count?: number) => {
    startQuiz(mode, sectionFilter, count, selectedCertificationId)
    router.push('/quiz')
  }

  const selectCertification = (certificationId: string) => {
    setSelectedCertificationId(certificationId)
    setScope('all')
  }

  const startConfiguredSession = () => {
    const mode =
      scope === 'historyWrong'
        ? 'historyWrong'
        : scope === 'wrong'
        ? 'wrong'
        : sessionType === 'mock'
        ? 'mock'
        : scope === 'section'
        ? 'section'
        : 'random'
    handleStart(mode, scope === 'section' ? selectedSection : undefined, questionCount)
  }

  const getCertificationLabel = (certificationId?: string) => {
    const certification =
      certifications.find((item) => item.id === certificationId) ?? activeCertification
    return `${certification.vendor} ${certification.name}`
  }

  const inferHistoryCertificationId = (item: (typeof wrongSessionHistory)[number]) => {
    if (item.certificationId) return item.certificationId
    const firstQuestionId = item.wrongAnswers[0]?.questionId
    if (firstQuestionId && firstQuestionId >= 30000) {
      return 'databricks-data-engineer-associate-4'
    }
    if (firstQuestionId && firstQuestionId >= 20000) {
      return 'databricks-data-engineer-associate-3'
    }
    return firstQuestionId && firstQuestionId >= 10000
      ? 'databricks-data-engineer-associate-2'
      : activeCertification.id
  }

  const getModeLabel = (item: (typeof wrongSessionHistory)[number]) => {
    if (item.mode === 'mock') return item.sectionFilter ? 'セクション模擬' : '模擬試験'
    if (item.mode === 'section') return 'セクション演習'
    if (item.mode === 'wrong') return '苦手問題'
    if (item.mode === 'historyWrong') return '履歴ミス'
    return 'ランダム演習'
  }

  const sectionCounts = sections.map((sec) => ({
    name: sec,
    count: selectedQuestions.filter((q) => q.section === sec).length,
  }))
  const selectedSectionCount =
    sectionCounts.find((section) => section.name === selectedSection)?.count ?? RANDOM_QUIZ_MAX_COUNT
  const maxQuestionCount =
    scope === 'section'
      ? selectedSectionCount
      : scope === 'wrong'
      ? selectedWrongQuestionIds.length
      : scope === 'historyWrong'
      ? historyWrongQuestionIds.length
      : Math.min(RANDOM_QUIZ_MAX_COUNT, selectedQuestions.length)
  const minQuestionCount = Math.min(
    scope === 'wrong' || scope === 'historyWrong' ? 1 : RANDOM_QUIZ_MIN_COUNT,
    maxQuestionCount,
  )

  useEffect(() => {
    setSelectedSection(sections[0] ?? '')
  }, [selectedCertificationId, sections])

  useEffect(() => {
    setUsageStats(recordUsageVisit())
  }, [])

  useEffect(() => {
    if (scope === 'section' || scope === 'wrong' || scope === 'historyWrong') {
      setQuestionCount(maxQuestionCount)
      return
    }

    setQuestionCount((currentCount) =>
      Math.min(Math.max(currentCount, minQuestionCount), maxQuestionCount),
    )
  }, [maxQuestionCount, minQuestionCount, scope, selectedSection, selectedCertificationId])

  useEffect(() => {
    if (scope === 'wrong' || scope === 'historyWrong') setSessionType('practice')
  }, [scope])

  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-cyan-300">{selectedTrackLabel}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                資格対策ワークスペース
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                複数の資格学習を見据えて、演習、復習、AI総括までを一つの流れで進めます。
              </p>
            </div>
            <div className="grid min-w-64 grid-cols-3 gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div>
                <div className="text-2xl font-bold">{stats.totalAnswered}</div>
                <div className="text-xs text-slate-400">回答数</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{accuracy ?? '-'}%</div>
                <div className="text-xs text-slate-400">正解率</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.wrongQuestionIds.length}</div>
                <div className="text-xs text-slate-400">苦手</div>
              </div>
            </div>
          </div>
          {usageStats && (
            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-xs text-slate-500">利用回数</div>
                <div className="mt-1 font-semibold text-white">{usageStats.visitCount}回目</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-xs text-slate-500">前回利用</div>
                <div className="mt-1 font-semibold text-white">
                  {usageStats.previousVisitedAt
                    ? new Date(usageStats.previousVisitedAt).toLocaleString('ja-JP')
                    : '今回が初回'}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="text-xs text-slate-500">初回利用</div>
                <div className="mt-1 font-semibold text-white">
                  {new Date(usageStats.firstVisitedAt).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          {session && !session.isFinished && (
            <section className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">途中の演習</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {session.mode === 'mock'
                      ? '模擬演習'
                      : session.mode === 'section'
                      ? session.sectionFilter?.replace(/Section \d+: /, '') ?? 'セクション演習'
                      : session.mode === 'wrong'
                      ? '苦手問題'
                      : session.mode === 'historyWrong'
                      ? '履歴ミス'
                      : 'ランダム演習'} ・{' '}
                    {session.currentIndex + 1} / {session.questions.length} 問目
                    {session.isPaused ? ' ・ 一時停止中' : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      resumeQuiz()
                      router.push('/quiz')
                    }}
                    className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    再開
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('途中の演習を破棄しますか？')) resetSession()
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    破棄
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">演習セッション</h2>
                <p className="mt-1 text-sm text-slate-500">
                  全範囲またはセクションを選び、通常/模擬を切り替えて演習します。
                </p>
              </div>
              <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setSessionType('practice')}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:text-slate-300 ${
                    sessionType === 'practice'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  通常
                </button>
                <button
                  onClick={() => setSessionType('mock')}
                  disabled={scope === 'wrong' || scope === 'historyWrong'}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    sessionType === 'mock'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  模擬
                </button>
              </div>
            </div>

            <div className="mb-5 grid gap-3 lg:grid-cols-[minmax(320px,380px)_1fr]">
              <select
                value={selectedCertificationId}
                onChange={(event) => selectCertification(event.target.value)}
                className="min-w-0 truncate h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-cyan-500 lg:col-span-2"
              >
                {certifications
                  .filter((certification) => certification.status === 'active')
                  .map((certification) => (
                    <option key={certification.id} value={certification.id}>
                      {certification.vendor} {certification.name}（{certification.questionCount}問）
                    </option>
                  ))}
              </select>
              <div className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-sm text-slate-700 lg:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-slate-900">{selectedTrackLabel}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-200">
                    選択中
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {selectedCertification.description} 現在の問題数は {selectedQuestions.length} 問です。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 sm:grid-cols-4">
                <button
                  onClick={() => setScope('all')}
                  className={`min-w-0 rounded-md px-2 py-2 text-sm font-semibold transition-colors ${
                    scope === 'all'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  全範囲
                </button>
                <button
                  onClick={() => setScope('section')}
                  className={`min-w-0 rounded-md px-2 py-2 text-sm font-semibold transition-colors ${
                    scope === 'section'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  セクション
                </button>
                <button
                  onClick={() => setScope('wrong')}
                  disabled={selectedWrongQuestionIds.length === 0}
                  className={`min-w-0 rounded-md px-2 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:text-slate-300 ${
                    scope === 'wrong'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  苦手
                </button>
                <button
                  onClick={() => setScope('historyWrong')}
                  disabled={historyWrongQuestionIds.length === 0}
                  className={`min-w-0 rounded-md px-2 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:text-slate-300 ${
                    scope === 'historyWrong'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  履歴
                </button>
              </div>
              <select
                value={selectedSection}
                onChange={(event) => setSelectedSection(event.target.value)}
                disabled={scope !== 'section'}
                className="min-w-0 truncate h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                {sectionCounts.map(({ name, count }) => (
                  <option key={name} value={name}>
                    {name.replace(/Section \d+: /, '')}（{count}問）
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_180px] md:items-end">
              <div>
                <label htmlFor="questionCount" className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">出題数</span>
                  <span className="text-2xl font-bold text-slate-950">{questionCount}問</span>
                </label>
                <input
                  id="questionCount"
                  type="range"
                  min={minQuestionCount}
                  max={maxQuestionCount}
                  step={1}
                  value={questionCount}
                  onChange={(event) => setQuestionCount(Number(event.target.value))}
                  className="mt-3 w-full accent-cyan-500"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>{minQuestionCount}問</span>
                  <span>{maxQuestionCount}問</span>
                </div>
                {sessionType === 'mock' && (
                  <p className="mt-2 text-xs text-slate-500">
                    模擬演習は 1問あたり2分のカウントダウンで開始します。
                  </p>
                )}
                {scope === 'section' && (
                  <p className="mt-2 text-xs text-slate-500">
                    選択したセクション内の {selectedSectionCount} 問から出題します。
                  </p>
                )}
                {scope === 'wrong' && (
                  <p className="mt-2 text-xs text-slate-500">
                    これまで間違えた {selectedWrongQuestionIds.length} 問から、通常復習として出題します。
                  </p>
                )}
                {scope === 'historyWrong' && (
                  <p className="mt-2 text-xs text-slate-500">
                    過去{wrongSessionHistory.length}回の不正解履歴に残る{' '}
                    {historyWrongQuestionIds.length} 問から、指定数を出題します。
                  </p>
                )}
              </div>
              <button
                onClick={startConfiguredSession}
                disabled={maxQuestionCount === 0}
                className="h-12 rounded-lg bg-cyan-500 px-5 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                演習開始
              </button>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">セクション別</h2>
            <p className="text-xs text-slate-500">
              セクションを選ぶと、上の演習セッションにも反映できます。個別ボタンからは通常演習をすぐ開始します。
            </p>
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
              {sectionCounts.map(({ name, count }) => (
                <button
                  key={name}
                  onClick={() => handleStart('section', name)}
                  className="w-full px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-700">
                      {name.replace(/Section \d+: /, '')}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                      {count}問
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          {wrongSessionHistory.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    不正解履歴
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    履歴内の {historyWrongQuestionIds.length} 問を復習できます。
                  </p>
                </div>
                <button
                  onClick={() => {
                    setScope('historyWrong')
                    setSessionType('practice')
                    setQuestionCount(historyWrongQuestionIds.length)
                  }}
                  className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                >
                  選択
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {wrongSessionHistory.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-100 px-3 py-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-slate-700">
                        {new Date(item.date).toLocaleString('ja-JP', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-500">
                        {item.wrongAnswers.length}問
                      </span>
                    </div>
                    <div className="mt-2 rounded-md bg-slate-50 px-2 py-1.5">
                      <div className="text-xs font-semibold text-slate-700">
                        {getCertificationLabel(inferHistoryCertificationId(item))}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {getModeLabel(item)}
                        {item.sectionFilter
                          ? ` / ${item.sectionFilter.replace(/Section \d+: /, '')}`
                          : ''}
                      </div>
                    </div>
                    <div className="mt-1.5 text-xs text-slate-400">
                      {item.correctCount} / {item.totalQuestions} 正解
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              資格トラック
            </h2>
            <div className="mt-3 space-y-3">
              {certifications.map((certification) => {
                const isSelected = selectedCertificationId === certification.id
                return (
                <button
                  key={certification.id}
                  onClick={() => selectCertification(certification.id)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'border-cyan-300 bg-cyan-50 ring-1 ring-cyan-200'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-cyan-600">{certification.vendor}</div>
                      <div className="mt-1 truncate font-bold text-slate-900">{certification.name}</div>
                      <div className="mt-1 text-xs font-medium text-slate-400">
                        {certification.questionCount}問
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isSelected
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isSelected ? '選択中' : '利用可'}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                    {certification.description}
                  </p>
                </button>
                )
              })}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">拡張メニュー</h2>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => router.push('/resources')}
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="font-semibold text-slate-800">参考資料共有</div>
                <div className="mt-1 text-xs text-slate-500">
                  リサーチ資料をPDFで共有
                </div>
              </button>
              <a
                href={AI_LAB_URL}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-slate-200 px-3 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="font-semibold text-slate-800">AI実験ページ</div>
                <div className="mt-1 text-xs text-slate-500">外部プロトタイプを開く</div>
              </a>
              <button
                onClick={() => router.push('/tetris')}
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="font-semibold text-slate-800">ミニゲーム</div>
                <div className="mt-1 text-xs text-slate-500">休憩用テトリス</div>
              </button>
            </div>
          </section>

          {stats.totalAnswered > 0 && (
            <button
              onClick={() => {
                if (confirm('学習データをすべてリセットしますか？')) clearStats()
              }}
              className="w-full rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              学習データをリセット
            </button>
          )}
        </aside>
      </div>
    </main>
  )
}
