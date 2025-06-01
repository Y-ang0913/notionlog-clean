// lib/loadPrompts.ts

import fs from 'fs';
import path from 'path';

/**
 * 加载人格提示词模板。
 * 默认读取路径为 /data/personaPrompts.json
 */
export function loadPersonaPrompts(): Record<string, string> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'personaPrompts.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ 读取 personaPrompts.json 失败：', error);
    return {};
  }
}
