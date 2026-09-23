/** GitCode 报告使用字符串，GitHub 报告也可能保留完整用户对象。 */
export const getEvidenceActorName = (actor: unknown): string => {
  if (typeof actor === 'string') return actor.trim();
  if (!actor || typeof actor !== 'object') return '';
  const user = actor as { login?: unknown; name?: unknown };
  for (const value of [user.login, user.name]) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
};
