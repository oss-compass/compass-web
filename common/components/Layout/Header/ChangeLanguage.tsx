import React from 'react';

const language = [
  {
    id: 'zh',
    label: '简体中文',
    value: 'zh',
  },
  {
    id: 'en',
    label: 'English',
    value: 'EN',
  },
];

const ChangeLanguage = () => {
  return (
    <div className="flex border">
      {language.map((item) => (
        <div
          key={item.id}
          className="px-2 text-white"
          onClick={() => {
            console.log('--------------------------------');
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ChangeLanguage;
