import type { PersonaKey } from './judgePersona';

export function formatReply(persona: PersonaKey, gptReply: string): string {
  let prefix = '';

  switch (persona) {
    case '问灵童':
      prefix = '【问灵童】';
      break;
    case '水镜':
      prefix = '【水镜】';
      break;
    case '无':
    default:
      prefix = '【无】';
      break;
  }

  return `${prefix} ${gptReply.trim()}`;
}
