// lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function writeToNotionLog({
  userInput,
  personaChain,
  replyContent,
  source,
  timestamp,
}: {
  userInput: string;
  personaChain: string[]; // 改为数组形式
  replyContent: string;
  source: string;
  timestamp: string;
}) {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID as string;

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        用户输入: {
          rich_text: [{ text: { content: userInput } }],
        },
        人格链: {
          multi_select: personaChain.map((name) => ({ name: name.trim() })),
        },
        回复内容: {
          rich_text: [{ text: { content: replyContent } }],
        },
        来源渠道: {
          rich_text: [{ text: { content: source } }],
        },
        提问时间: {
          date: { start: timestamp },
        },
      },
    });

    return response;
  } catch (error: any) {
    console.error('❌ Notion 写入失败:', error.message || error);
    throw new Error('Failed to write to Notion');
  }
}
