// 独立体验页使用自身的 REST 登录，不依赖 Compass GraphQL 账号。
// 旧 /intelligent-analysis/user-journey 仍由 AuthRequire 校验，不能排除。
export const isStandaloneExperiencePath = (path: string): boolean => {
  const pathname = path.split(/[?#]/, 1)[0].replace(/^\/(en|zh)(?=\/)/, '');
  return /^\/intelligent-analysis\/(?:[^/]+\/)?(?:community-experience|experience)(?:\/|$)/.test(
    pathname
  );
};
