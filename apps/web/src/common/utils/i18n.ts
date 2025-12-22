/**
 * i18n 工具函数
 * 用于处理 next-i18next 的类型问题
 */

/**
 * 将 t() 函数的返回值强制转换为 string 类型
 * 解决 TypeScript 严格模式下的类型推断问题
 */
export function toTransString(value: any): string {
  return String(value);
}
