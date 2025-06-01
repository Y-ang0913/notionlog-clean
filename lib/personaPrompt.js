// lib/personaPrompt.js

const fs = require('fs');
const path = require('path');

// 读取 personaPrompts.json 文件
const promptsPath = path.join(process.cwd(), 'data', 'personaPrompts.json');
let personaPrompts = {};

// 加载 JSON 数据（只加载一次）
try {
  const data = fs.readFileSync(promptsPath, 'utf-8');
  personaPrompts = JSON.parse(data);
} catch (error) {
  console.error("❌ 加载 personaPrompts.json 失败：", error.message);
}

// 根据人格名获取对应 Prompt 内容
function getPersonaPrompt(personaName) {
  return personaPrompts[personaName] || null;
}

module.exports = {
  getPersonaPrompt
};
