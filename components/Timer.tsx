'use client'

import { useEffect } from 'react'
import { useQuizStore } from '@/store/quizStore'

export default function Timer() {
  const timerSeconds = useQuizStore((s) => s.timerSeconds)
  const tick = useQuizStore((s) => s.tick)
  const session = useQuizStore((s) => s.session)

  useEffect(() => {
    if (session?.mode !== 'mock' || session.isFinished || session.isPaused) return
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [session?.mode, session?.isFinished, session?.isPaused, tick])

  const mins = Math.floor(timerSeconds / 60)
  const secs = timerSeconds % 60
  const isWarning = timerSeconds <= 300 && timerSeconds > 60
  const isDanger = timerSeconds <= 60

  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-sm font-bold tabular-nums ${
        isDanger
          ? 'animate-pulse bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
          : isWarning
          ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30'
          : 'bg-slate-800 text-slate-300'
      }`}
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  )
}
