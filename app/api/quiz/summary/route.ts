import { NextRequest, NextResponse } from 'next/server'
import {
  buildQuizSummaryPrompt,
  createMockQuizSummary,
  getGeminiModel,
  shouldUseMockGemini,
} from '@/lib/gemini'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const input = await request.json()

    if (shouldUseMockGemini()) {
      return NextResponse.json({ summary: createMockQuizSummary(input) })
    }

    const model = getGeminiModel()
    const result = await model.generateContent(buildQuizSummaryPrompt(input))

    return NextResponse.json({ summary: result.response.text() })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate quiz summary.' },
      { status: 500 },
    )
  }
}
