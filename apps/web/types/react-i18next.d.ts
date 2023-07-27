import 'react-i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      [key: string]: {
        [key: string]: string;
      };
    };
  }
}
