// lib/loadPersonaPrompt.ts
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'personaPrompts.json')

export function loadPersonaPrompt(persona: string): string {
  try {
    const file = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(file)

    if (data[persona]) {
      return data[persona]
    } else {
      throw new Error(`找不到人格：${persona}`)
    }
  } catch (error) {
    console.error('❌ 载入人格提示失败：', error)
    return '你是一个智慧的中文命理 AI，帮助用户回答问题。'
  }
}
