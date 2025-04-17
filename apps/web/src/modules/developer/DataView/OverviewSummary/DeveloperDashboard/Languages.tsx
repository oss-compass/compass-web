import React from 'react';

const Languages = () => {
  const languages = [
    { name: 'JavaScript', percentage: 40 },
    { name: 'Python', percentage: 30 },
    { name: 'Java', percentage: 20 },
    { name: 'C#', percentage: 8 },
    { name: 'Others', percentage: 2 },
  ];
  const colorList = ['#409eff', '#76d275', '#fcb32c', '#5686a5', '#ededed'];
  return (
    <div className="relative min-w-0 scroll-mt-[200px] p-5">
      <div className="flex justify-between">
        <div className="text-lg font-bold">编程语言</div>
      </div>
      <div className="mt-4 mb-2 w-full">
        <div className="flex h-[50px] w-full flex-col items-center justify-center gap-4">
          <div className="flex h-2.5 w-[80%] max-w-[800px] gap-[1px] overflow-hidden rounded-full">
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
          <div className="flex">
            <div className="bar flex items-center gap-6">
              {languages.map((lang, index) => {
                return (
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-2 w-2 rounded-full"
                      key={lang.name}
                      style={{
                        background: colorList[index],
                      }}
                    ></div>
                    {lang.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
