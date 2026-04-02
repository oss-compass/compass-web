import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ApplyToken from '../../components/ApplyToken';
import { useTranslation } from 'react-i18next';

type TabType = 'python' | 'javascript';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 rounded px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
      title="Copy code"
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-500">Copied!</span>
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </span>
      )}
    </button>
  );
};

const ApiIntroduction = () => {
  const { t } = useTranslation();
  const apiBaseUrl = `${window.location.origin}/api/v2/metadata/pullRequests`;
  const [activeTab, setActiveTab] = useState<TabType>('python');

  const pythonCode = [
    'import requests',
    '',
    `url = '${apiBaseUrl}'`,
    'payload = {',
    "    'access_token': YOUR_API_TOKEN,",
    "    'label': 'https://github.com/oss-compass/compass-web'",
    '}',
    '',
    'response = requests.post(url, json=payload)',
    'data = response.json()',
    'print(data)',
  ].join('\n');

  const jsCode = [
    `fetch('${apiBaseUrl}', {`,
    "  method: 'POST',",
    '  headers: {',
    "    'Content-Type': 'application/json'",
    '  },',
    '  body: JSON.stringify({',
    '    access_token: YOUR_API_TOKEN,',
    "    label: 'https://github.com/oss-compass/compass-web'",
    '  })',
    '})',
    '  .then(response => response.json())',
    '  .then(data => console.log(data))',
    "  .catch(error => console.error('Error:', error));",
  ].join('\n');

  return (
    <div className="relative space-y-6 rounded-lg bg-white">
      <ApplyToken />
      {/* 面包屑导航 */}
      <Breadcrumb
        items={[
          { label: t('open_api:rest_api') },
          { label: t('open_api:introduction') },
        ]}
      />

      {/* API 简介 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">
          {t('open_api:api_introduction_title')}
        </h2>
        <div className="text-lg leading-relaxed text-gray-700">
          {t('open_api:api_introduction_description')}
        </div>
      </div>

      {/* 使用说明 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">
          {t('open_api:usage_instructions_title')}
        </h2>
        <div className="text-lg leading-relaxed text-gray-700">
          {t('open_api:usage_instructions_description')}
          <ol className="list-decimal pl-6 pt-2">
            <li>{t('open_api:step_one')}</li>
            <li>{t('open_api:step_two')}</li>
            <li>{t('open_api:step_three')}</li>
          </ol>
        </div>
      </div>

      {/* Token 认证 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">
          {t('open_api:token_authentication_title')}
        </h2>
        <div className="text-lg leading-relaxed text-gray-700">
          {t('open_api:token_authentication_description')}
          <ul className="list-disc pl-6 pt-2">
            <li>
              {t('open_api:token_step')}
              <code className="rounded bg-gray-100 px-1 py-0.5">
                access_token
              </code>
              {t('open_api:token_example')}
            </li>
          </ul>
          {t('open_api:token_example_code')}
          <pre className="mt-4 rounded bg-gray-100 p-4 text-sm text-gray-800">
            {`curl -X POST "${apiBaseUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{"access_token":YOUR_API_TOKEN, "label": "https://github.com/oss-compass/compass-web"}'`}
          </pre>
        </div>
      </div>

      {/* 示例代码 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">
          {t('open_api:example_code_title')}
        </h2>
        <div className="text-lg leading-relaxed text-gray-700">
          {/* Tabs */}
          <div>
            <div className="flex border-b border-gray-200">
              {(['python', 'javascript'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'python' ? 'Python' : 'JavaScript'}
                </button>
              ))}
            </div>
            {activeTab === 'python' ? (
              <div className="relative">
                <CopyButton text={pythonCode} />
                <pre className="mt-0 rounded-b rounded-tr bg-gray-100 p-4 text-sm text-gray-800">
                  {pythonCode}
                </pre>
              </div>
            ) : (
              <div className="relative">
                <CopyButton text={jsCode} />
                <pre className="mt-0 rounded-b rounded-tr bg-gray-100 p-4 text-sm text-gray-800">
                  {jsCode}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiIntroduction;
