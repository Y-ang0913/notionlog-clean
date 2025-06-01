// pages/api/log-to-notion.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { writeToNotionLog } from '@/lib/notion';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { userInput, personaChain, source, timestamp } = req.body;

  try {
    // 用 GPT 生成回答内容
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '你是一个智慧的命理师傅，简洁地回答用户的问题。' },
        { role: 'user', content: userInput },
      ],
    });

    const replyContent = completion.choices[0].message.content || '无回答';

    // 写入 Notion
    const notionResponse = await writeToNotionLog({
      userInput,
      personaChain,
      replyContent,
      source,
      timestamp,
    });

    return res.status(200).json({ result: '已记录', reply: replyContent });
  } catch (err: any) {
    console.error('Error writing to Notion:', err);
    return res.status(500).json({ error: err.message || 'Unknown Error' });
  }
}
