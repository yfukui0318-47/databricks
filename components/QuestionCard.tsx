'use client'

import { useQuizStore } from '@/store/quizStore'
import ChoiceButton from './ChoiceButton'
import ExplanationCard from './ExplanationCard'
import type { Question } from '@/types'

type ChoiceState = 'default' | 'correct' | 'wrong' | 'missed' | 'disabled'

type Props = {
  question: Question
  questionNumber: number
}

export default function QuestionCard({ question, questionNumber }: Props) {
  const answerQuestion = useQuizStore((s) => s.answerQuestion)
  const nextQuestion = useQuizStore((s) => s.nextQuestion)
  const finishQuiz = useQuizStore((s) => s.finishQuiz)
  const toggleFavorite = useQuizStore((s) => s.toggleFavorite)
  const session = useQuizStore((s) => s.session)
  const favoriteIds = useQuizStore((s) => s.stats.favoriteQuestionIds)

  if (!session) return null

  const record = session.answers[question.id]
  const isAnswered = !!record
  const isFavorite = favoriteIds.includes(question.id)
  const isLastQuestion = session.currentIndex === session.questions.length - 1

  const getChoiceState = (key: string): ChoiceState => {
    if (!isAnswered) return 'default'
    if (key === question.answer) return 'correct'
    if (key === record.selectedAnswer && !record.isCorrect) return 'wrong'
    return 'disabled'
  }

  return (
    <div className="space-y-4">
      {/* Question header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-200">
            {question.section.replace(/Section \d+: /, '')}
          </span>
          <p className="mt-2.5 font-medium leading-relaxed text-slate-800">
            <span className="mr-2 font-bold text-slate-300">Q{questionNumber}.</span>
            {question.question}
          </p>
        </div>
        <button
          onClick={() => toggleFavorite(question.id)}
          className={`flex-shrink-0 text-lg transition-colors ${
            isFavorite ? 'text-amber-400 hover:text-amber-300' : 'text-slate-300 hover:text-amber-400'
          }`}
          title={isFavorite ? 'お気に入り解除' : 'お気に入りに追加'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {question.choices.map((choice) => (
          <ChoiceButton
            key={choice.key}
            choiceKey={choice.key}
            text={choice.text}
            state={getChoiceState(choice.key)}
            onClick={() => answerQuestion(choice.key)}
          />
        ))}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <>
          <ExplanationCard
            isCorrect={record.isCorrect}
            answer={question.answer}
            explanation={question.explanation}
          />
          <button
            onClick={isLastQuestion ? finishQuiz : nextQuestion}
            className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white transition-colors hover:bg-slate-800"
          >
            {isLastQuestion ? '結果を見る →' : '次の問題へ →'}
          </button>
        </>
      )}
    </div>
  )
}
