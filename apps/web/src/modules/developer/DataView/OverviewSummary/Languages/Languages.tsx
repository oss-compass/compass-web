import React from 'react';

interface LanguageData {
  language: string;
  contribution: number;
  ratio: number;
}

interface LanguagesProps {
  data?: LanguageData[];
}

const Languages: React.FC<LanguagesProps> = ({ data }) => {
  // 如果没有数据或数据为空，使用默认值
  const languages =
    data && data.length > 0
      ? data
          .filter((item) => item.ratio !== 0)
          .map((item) => ({
            name: item.language,
            percentage: item.ratio,
            contribution: item.contribution,
          }))
      : [];

  // 如果有超过10种语言，将剩余的合并为"Others"
  const processedLanguages =
    languages.length > 6
      ? [
          ...languages.slice(0, 6),
          {
            name: 'Others',
            percentage: languages
              .slice(9)
              .reduce((sum, lang) => sum + lang.percentage, 0),
            contribution: languages
              .slice(9)
              .reduce((sum, lang) => sum + (lang.contribution || 0), 0),
          },
        ]
      : languages;

  const colorList = [
    '#4791ff',
    '#02bc77',
    '#ffd950',
    '#ff2366',
    '#ef6667',
    '#fcb32c',
    '#409eff',
    '#76d275',
    '#505d96',
    '#ededed',
    '#5686a5',
  ];

  return (
    <div className="relative flex h-full max-w-[870px] scroll-mt-[200px] flex-col items-center justify-center gap-6 p-4">
      <div className="flex h-2.5 w-[90%] max-w-[800px] gap-[1px] overflow-hidden rounded-full">
        {processedLanguages.map((lang, index) => {
          return (
            <div
              key={lang.name}
              className="h-full"
              style={{
                width: lang.percentage + '%',
                background: colorList[index % colorList.length],
              }}
            ></div>
          );
        })}
      </div>
      <div className="flex w-[90%] max-w-[800px] flex-wrap items-center gap-4">
        {processedLanguages.map((lang, index) => {
          return (
            <div key={lang.name} className="flex items-center">
              <div
                className="mr-2 h-2 w-2 rounded-full"
                style={{
                  background: colorList[index % colorList.length],
                }}
              ></div>
              {lang.name} {'  ' + lang.percentage.toFixed(2) + '%'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Languages;
