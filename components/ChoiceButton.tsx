'use client'

type Props = {
  choiceKey: string
  text: string
  state: 'default' | 'correct' | 'wrong' | 'missed' | 'disabled'
  onClick: () => void
}

const buttonStyles: Record<string, string> = {
  default:
    'border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:bg-cyan-50 cursor-pointer',
  correct:
    'border-emerald-500 bg-emerald-50 text-emerald-900 cursor-default',
  wrong:
    'border-rose-500 bg-rose-50 text-rose-900 cursor-default',
  missed:
    'border-emerald-400 bg-emerald-50 text-emerald-800 cursor-default opacity-80',
  disabled:
    'border-slate-100 bg-slate-50 text-slate-400 cursor-default',
}

const badgeStyles: Record<string, string> = {
  default: 'bg-slate-100 text-slate-500',
  correct: 'bg-emerald-500 text-white',
  wrong: 'bg-rose-500 text-white',
  missed: 'bg-emerald-400 text-white',
  disabled: 'bg-slate-100 text-slate-300',
}

export default function ChoiceButton({ choiceKey, text, state, onClick }: Props) {
  return (
    <button
      onClick={state === 'default' ? onClick : undefined}
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150 ${buttonStyles[state]}`}
    >
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${badgeStyles[state]}`}
      >
        {choiceKey}
      </span>
      <span className="flex-1 text-sm leading-relaxed">{text}</span>
    </button>
  )
}
