import 'react-i18next';
import { TFunction } from 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      [key: string]: {
        [key: string]: string;
      };
    };
    // 强制 t() 函数返回 string 类型，避免复杂的联合类型推断
    returnNull: false;
    returnEmptyString: false;
    returnObjects: false;
  }

  // 扩展 TFunction 类型以更好地支持插值参数
  export interface TFunction {
    (key: string, options?: Record<string, any>): string;
    (key: string, defaultValue: string, options?: Record<string, any>): string;
  }
}
