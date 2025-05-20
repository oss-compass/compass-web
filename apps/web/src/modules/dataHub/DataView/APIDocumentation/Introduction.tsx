import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ApplyToken from '../../components/ApplyToken';
import { useTranslation } from 'react-i18next';

const ApiIntroduction = () => {
  const { t } = useTranslation();
  const apiBaseUrl = `${window.location.origin}/api/v2/metadata/pullRequests`;

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
          {t('open_api:example_code_description')}
          <pre className="mt-4 rounded bg-gray-100 p-4 text-sm text-gray-800">
            {`fetch('${apiBaseUrl}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    access_token: YOUR_API_TOKEN,
    label: 'https://github.com/oss-compass/compass-web'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiIntroduction;
