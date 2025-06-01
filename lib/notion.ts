// lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export async function writeToNotionLog({
  userInput,
  personaChain,
  replyContent,
  source,
  timestamp,
}: {
  userInput: string;
  personaChain: string[]; // 已确保为数组
  replyContent: string;
  source: string;
  timestamp: string;
}) {
  if (!databaseId) throw new Error('❌ 缺少 NOTION_DATABASE_ID');

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        用户输入: {
          title: [
            {
              text: {
                content: userInput || '（未填写）',
              },
            },
          ],
        },
        人格链: {
          multi_select: personaChain.map((name) => ({ name: name.trim() })),
        },
        回复内容: {
          rich_text: [
            {
              text: {
                content: replyContent || '（无内容）',
              },
            },
          ],
        },
        来源渠道: {
          rich_text: [
            {
              text: {
                content: source || '（未指定）',
              },
            },
          ],
        },
        提问时间: {
          date: {
            start: timestamp,
          },
        },
      },
    });

    return { result: '✅ 成功写入 Notion', pageId: response.id };
  } catch (error: any) {
    console.error('❌ Notion 写入失败:', error.message || error);
    throw new Error('Failed to write to Notion');
  }
}
