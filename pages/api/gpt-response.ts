// 文件路径：pages/api/gpt-response.ts

import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Missing question input" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // 如无权限可改为 "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: `你是一个智慧命理解读者，请以以下格式回应：
[
  {
    "persona": "显相 · 某某",
    "subtitle": "灵语片段",
    "text": "xxxx"
  },
  ...
]
内容需具有东方哲思、灵性启发性，并结合命理语言风格，勿输出除 JSON 外的其他内容。`,
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.8,
    });

    const output = completion.choices[0].message?.content || "";
    console.log("🧠 GPT 原始输出 >>>", output);

    let parsed: any[] = [];
    try {
      parsed = JSON.parse(output);
    } catch (e) {
      parsed = [
        {
          persona: "显相 · 默认人格",
          subtitle: "灵语片段",
          text: output || "未能解析 GPT 返回内容。",
        },
      ];
    }

    return res.status(200).json({ responses: parsed });
  } catch (error: any) {
    console.error("GPT API 调用失败：", error.message);
    return res.status(500).json({ message: "调用失败", error: error.message });
  }
}
