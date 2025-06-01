export type PersonaKey = '无' | '问灵童' | '水镜';

export function judgePersona(userInput: string): PersonaKey {
  const lower = userInput.toLowerCase();

  if (lower.includes('童') || lower.includes('灵') || lower.includes('小孩')) {
    return '问灵童';
  }

  if (lower.includes('镜') || lower.includes('回忆') || lower.includes('反思')) {
    return '水镜';
  }

  return '无'; // 默认人格
}
