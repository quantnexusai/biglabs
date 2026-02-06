import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  const { message, context } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.includes('placeholder')) {
    return NextResponse.json({
      response: getSampleResponse(context),
      preview: true,
    });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: 'You are an AI business intelligence assistant for a consulting firm called Biglabs. Provide concise, data-driven insights and recommendations. Be professional, precise, and actionable.',
      messages: [{ role: 'user', content: message }],
    });

    const textBlock = response.content.find(block => block.type === 'text');
    return NextResponse.json({ response: textBlock?.text || 'No response generated.' });
  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}

function getSampleResponse(context?: string): string {
  const responses: Record<string, string> = {
    analytics: 'Based on your current metrics, revenue has grown 78% over the past 6 months. Key drivers include Digital Transformation (+34%) and AI/ML services (+28%). Recommendation: Expand AI team capacity by 2 FTEs to capture growing demand in the healthcare vertical.',
    strategy: 'Market analysis indicates three high-potential sectors for expansion: renewable energy, fintech, and biotech. Each presents $5M+ addressable market opportunity within your current service capabilities.',
    default: 'I can help you analyze business data, generate reports, identify trends, and provide strategic recommendations. What would you like to explore?',
  };
  return responses[context || 'default'] || responses.default;
}
