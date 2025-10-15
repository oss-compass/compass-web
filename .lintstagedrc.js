const path = require('path');

module.exports = {
  // 处理 TypeScript/JavaScript 文件
  '*.{ts,tsx,mjs,js,jsx}': (filenames) => {
    // 过滤掉 public 文件夹下的文件
    const filteredFiles = filenames.filter((file) => {
      const normalizedPath = path.normalize(file);
      return (
        !normalizedPath.includes('public' + path.sep) &&
        !normalizedPath.includes(path.sep + 'public' + path.sep)
      );
    });

    if (filteredFiles.length === 0) return [];

    return [
      `prettier --ignore-unknown --write --cache ${filteredFiles.join(' ')}`,
      `eslint --cache --fix ${filteredFiles.join(' ')}`,
    ];
  },

  // 处理其他格式文件
  '*.{json,md,mdx,css,html,yml,yaml,scss,graphql}': (filenames) => {
    // 过滤掉 public 文件夹下的文件
    const filteredFiles = filenames.filter((file) => {
      const normalizedPath = path.normalize(file);
      return (
        !normalizedPath.includes('public' + path.sep) &&
        !normalizedPath.includes(path.sep + 'public' + path.sep)
      );
    });

    if (filteredFiles.length === 0) return [];

    return `prettier --ignore-unknown --write --cache ${filteredFiles.join(
      ' '
    )}`;
  },

  // 特别处理 i18n 文件夹下的 JSON 文件
  'apps/web/i18n/**/*.json': 'prettier --ignore-unknown --write --cache',
};
