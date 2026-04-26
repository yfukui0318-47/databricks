import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_MODEL = 'gemini-2.5-flash'

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.')
  }

  return new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: GEMINI_MODEL,
  })
}

export function shouldUseMockGemini() {
  return process.env.MOCK_GEMINI === 'true'
}

type QuizSummaryInput = {
  mode: string
  totalQuestions: number
  answeredCount: number
  correctCount: number
  accuracy: number
  elapsedSeconds: number | null
  wrongQuestions: {
    id: number
    section: string
    question: string
    answer: string
    selectedAnswer?: string
    explanation: string
  }[]
}

export function createMockQuizSummary(input: QuizSummaryInput) {
  const weakSections = Array.from(new Set(input.wrongQuestions.map((question) => question.section))).slice(0, 3)
  const accuracyText = `${Math.round(input.accuracy * 100)}%`

  return `今回の正解率は${accuracyText}でした。まずは回答済みの問題を振り返り、間違えた問題では「なぜその選択肢を選んだのか」を確認すると改善しやすくなります。${
    weakSections.length > 0
      ? `特に ${weakSections.join('、')} の復習を優先しましょう。`
      : '不正解が少ないため、次は解答速度と安定感を意識するとよさそうです。'
  } 次回は不正解問題を中心に短く復習してから、同じ条件でもう一度演習するのがおすすめです。`
}

export function buildQuizSummaryPrompt(input: QuizSummaryInput) {
  const wrongQuestionText =
    input.wrongQuestions.length > 0
      ? input.wrongQuestions
          .slice(0, 12)
          .map(
            (question) =>
              `Q${question.id} / ${question.section}
問題: ${question.question}
ユーザー回答: ${question.selectedAnswer ?? '未回答'}
正解: ${question.answer}
解説: ${question.explanation}`,
          )
          .join('\n\n')
      : '不正解問題はありません。'

  return `あなたはDatabricks試験対策の学習コーチです。
以下の演習結果を見て、学習者に向けて日本語で総括してください。
内容は4〜6文で、良かった点、弱点、次にやるべき復習方針を具体的に述べてください。
責める表現は避け、実行しやすいアドバイスにしてください。

【演習結果】
モード: ${input.mode}
出題数: ${input.totalQuestions}
回答数: ${input.answeredCount}
正解数: ${input.correctCount}
正解率: ${Math.round(input.accuracy * 100)}%
所要時間: ${input.elapsedSeconds === null ? '不明' : `${Math.floor(input.elapsedSeconds / 60)}分${input.elapsedSeconds % 60}秒`}

【不正解問題】
${wrongQuestionText}`
}
