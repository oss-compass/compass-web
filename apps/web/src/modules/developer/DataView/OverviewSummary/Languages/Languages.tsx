import React from 'react';

const Languages = () => {
  const languages = [
    { name: 'JavaScript', percentage: 40 },
    { name: 'Python', percentage: 30 },
    { name: 'Java', percentage: 16 },
    { name: 'C#', percentage: 8 },
    { name: 'C++', percentage: 4 },
    { name: 'Others', percentage: 2 },
  ];
  const colorList = [
    '#4791ff',
    '#02bc77',
    '#ffd950',
    '#ff2366',
    // '#ef6667',
    // '#fcb32c',
    // '#409eff',
    // '#76d275',
    '#505d96',
    '#ededed',
    '#5686a5',
  ];
  return (
    <div className="relative flex h-full max-w-[870px] scroll-mt-[200px] flex-col items-center justify-center gap-8 p-5">
      <div className="flex h-2.5 w-[90%] max-w-[800px] gap-[1px] overflow-hidden rounded-full">
        {languages.map((lang, index) => {
          return (
            <div
              key={lang.name}
              className="h-full"
              style={{
                width: lang.percentage + '%',
                background: colorList[index],
              }}
            ></div>
          );
        })}
      </div>
      <div className="flex w-[90%] max-w-[800px] flex-wrap items-center gap-4">
        {languages.map((lang, index) => {
          return (
            <div key={lang.name} className="flex items-center">
              <div
                className="mr-2 h-2 w-2 rounded-full"
                key={lang.name}
                style={{
                  background: colorList[index],
                }}
              ></div>
              {lang.name} {'  ' + lang.percentage + '%'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Languages;
