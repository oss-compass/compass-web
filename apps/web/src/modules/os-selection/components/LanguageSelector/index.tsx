import React from 'react';

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguages,
  onLanguageChange,
}) => {
  const languages = [
    'Java',
    'Python',
    'C/C++',
    'JavaScript/TS',
    'Rust',
    'Go',
    'PHP',
    'Ruby',
    'Swift',
    'Kotlin',
  ];

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguageChange(selectedLanguages.filter((lang) => lang !== language));
    } else {
      onLanguageChange([...selectedLanguages, language]);
    }
  };

  return (
    <div className="my-4 flex flex-wrap gap-2">
      {languages.map((language) => (
        <button
          key={language}
          onClick={() => toggleLanguage(language)}
          className={`rounded-full border px-4 py-2 text-sm transition-all ${
            selectedLanguages.includes(language)
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
