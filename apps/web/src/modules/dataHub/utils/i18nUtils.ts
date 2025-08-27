/**
 * 国际化工具函数
 */

/**
 * 处理包含中英文的文本，根据当前语言返回对应部分
 * @param text 包含中英文的文本，格式为 "English / 中文"
 * @param language 当前语言代码
 * @returns 根据语言返回对应的文本
 */
export const getLocalizedText = (text: string, language: string): string => {
  if (!text || !text.includes(' / ')) {
    return text;
  }

  const [englishText, chineseText] = text.split(' / ');

  // 根据当前语言返回对应文本
  if (language === 'zh' || language === 'zh-CN') {
    return chineseText?.trim() || englishText?.trim() || text;
  } else {
    return englishText?.trim() || text;
  }
};

/**
 * 批量处理国际化文本
 * @param texts 文本数组
 * @param language 当前语言代码
 * @returns 处理后的文本数组
 */
export const getLocalizedTexts = (
  texts: string[],
  language: string
): string[] => {
  return texts.map((text) => getLocalizedText(text, language));
};

/**
 * 检查文本是否包含国际化格式
 * @param text 要检查的文本
 * @returns 是否包含 " / " 分隔符
 */
export const isInternationalizedText = (text: string): boolean => {
  return text && text.includes(' / ');
};

/**
 * 从国际化文本中提取英文部分
 * @param text 包含中英文的文本
 * @returns 英文部分
 */
export const getEnglishText = (text: string): string => {
  if (!isInternationalizedText(text)) {
    return text;
  }

  const [englishText] = text.split(' / ');
  return englishText?.trim() || text;
};

/**
 * 从国际化文本中提取中文部分
 * @param text 包含中英文的文本
 * @returns 中文部分
 */
export const getChineseText = (text: string): string => {
  if (!isInternationalizedText(text)) {
    return text;
  }

  const [, chineseText] = text.split(' / ');
  return chineseText?.trim() || text;
};
