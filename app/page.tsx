'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  RANDOM_QUIZ_MAX_COUNT,
  RANDOM_QUIZ_MIN_COUNT,
  useQuizStore,
} from '@/store/quizStore'
import { sections } from '@/data/questions'
import type { QuizMode } from '@/types'
import { questions } from '@/data/questions'
import { activeCertification, certifications } from '@/data/certifications'
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
  const [scope, setScope] = useState<'all' | 'section' | 'wrong'>('all')
  const [selectedSection, setSelectedSection] = useState(sections[0] ?? '')
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)

  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : null

  const handleStart = (mode: QuizMode, sectionFilter?: string, count?: number) => {
    startQuiz(mode, sectionFilter, count)
    router.push('/quiz')
  }

  const startConfiguredSession = () => {
    const mode =
      scope === 'wrong'
        ? 'wrong'
        : sessionType === 'mock'
        ? 'mock'
        : scope === 'section'
        ? 'section'
        : 'random'
    handleStart(mode, scope === 'section' ? selectedSection : undefined, questionCount)
  }

  const sectionCounts = sections.map((sec) => ({
    name: sec,
    count: questions.filter((q) => q.section === sec).length,
  }))
  const selectedSectionCount =
    sectionCounts.find((section) => section.name === selectedSection)?.count ?? RANDOM_QUIZ_MAX_COUNT
  const maxQuestionCount =
    scope === 'section'
      ? selectedSectionCount
      : scope === 'wrong'
      ? stats.wrongQuestionIds.length
      : RANDOM_QUIZ_MAX_COUNT
  const minQuestionCount = Math.min(RANDOM_QUIZ_MIN_COUNT, maxQuestionCount)

  useEffect(() => {
    setUsageStats(recordUsageVisit())
  }, [])

  useEffect(() => {
    if (scope === 'section' || scope === 'wrong') {
      setQuestionCount(maxQuestionCount)
      return
    }

    setQuestionCount((currentCount) =>
      Math.min(Math.max(currentCount, minQuestionCount), maxQuestionCount),
    )
  }, [maxQuestionCount, minQuestionCount, scope, selectedSection])

  useEffect(() => {
    if (scope === 'wrong') setSessionType('practice')
  }, [scope])

  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-cyan-300">{activeCertification.vendor}</p>
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
                  disabled={scope === 'wrong'}
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

            <div className="mb-5 grid gap-3 md:grid-cols-[260px_1fr]">
              <div className="grid grid-cols-3 rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setScope('all')}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    scope === 'all'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  全範囲
                </button>
                <button
                  onClick={() => setScope('section')}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    scope === 'section'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  セクション
                </button>
                <button
                  onClick={() => setScope('wrong')}
                  disabled={stats.wrongQuestionIds.length === 0}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:text-slate-300 ${
                    scope === 'wrong'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  苦手
                </button>
              </div>
              <select
                value={selectedSection}
                onChange={(event) => setSelectedSection(event.target.value)}
                disabled={scope !== 'section'}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
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
                    これまで間違えた {stats.wrongQuestionIds.length} 問から、通常復習として出題します。
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
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              資格トラック
            </h2>
            <div className="mt-3 space-y-3">
              {certifications.map((certification) => (
                <div key={certification.id} className="rounded-lg border border-slate-100 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-cyan-600">{certification.vendor}</div>
                      <div className="mt-1 font-bold text-slate-900">{certification.name}</div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{certification.description}</p>
                </div>
              ))}
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
