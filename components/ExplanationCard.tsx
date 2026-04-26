'use client'

type Props = {
  isCorrect: boolean
  answer: string
  explanation: string
}

export default function ExplanationCard({ isCorrect, answer, explanation }: Props) {
  return (
    <div
      className={`rounded-xl border-l-4 p-4 ${
        isCorrect
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-rose-500 bg-rose-50'
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
            isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        >
          {isCorrect ? '✓' : '✗'}
        </span>
        <span
          className={`text-sm font-bold ${
            isCorrect ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {isCorrect ? '正解！' : '不正解'}
        </span>
        {!isCorrect && (
          <span className="text-xs text-slate-600">
            正解:{' '}
            <strong className="font-bold text-slate-800">{answer}</strong>
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{explanation}</p>
    </div>
  )
}
