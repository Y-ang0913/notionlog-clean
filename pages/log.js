// pages/log.js

import { useState } from 'react';

export default function LogPage() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    setStatus('正在提交...');
    try {
      const res = await fetch('/api/log-to-notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input, source: 'Web表单测试' }),
      });

      const result = await res.json();
      if (result.success) {
        setStatus(`✅ 写入成功：${result.pageId}`);
      } else {
        setStatus(`❌ 写入失败：${result.error}`);
      }
    } catch (error) {
      setStatus(`❌ 异常：${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI命师日志提交</h1>
      <textarea
        rows={4}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="请输入你的问题"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>提交</button>
      <p>{status}</p>
    </div>
  );
}
