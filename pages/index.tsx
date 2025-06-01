// pages/index.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setResponse('');
    setReply('');

    try {
      const res = await fetch('/api/log-to-notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: input,
          personaChain: ['无'],
          source: 'Web表单测试',
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse('✅ 已成功写入日志');
        setReply(data.reply || '（无回答）');
      } else {
        setResponse('❌ 写入失败：' + (data?.error || '未知错误'));
      }
    } catch (err) {
      console.error(err);
      setResponse('❌ 网络错误，请检查控制台');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🧠 AI命师系统 · 问答测试</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="请输入你的问题…"
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? '提交中…' : '提交'}
        </button>
      </form>

      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
        {response && <p>{response}</p>}
        {reply && (
          <>
            <h4>🧙‍ GPT 回答：</h4>
            <p>{reply}</p>
          </>
        )}
      </div>
    </div>
  );
}
