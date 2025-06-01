const replyWithGPT = async (userInput: string): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) return 'API Key 未配置';

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }],
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || '无有效回复';
  } catch (error) {
    console.error('GPT API 调用失败:', error);
    return '发生错误，无法获得回复。';
  }
};

export default replyWithGPT;
