import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

const ApiIntroduction = () => {
  const apiBaseUrl = `${window.location.origin}/api/v2/metadata/pullRequests`;

  return (
    <div className="space-y-6 rounded-lg bg-white">
      {/* 面包屑导航 */}
      <Breadcrumb items={[{ label: 'REST API' }, { label: 'Introduction' }]} />

      {/* API 简介 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">API 简介</h2>
        <div className="text-lg leading-relaxed text-gray-700">
          OSS-Compass 提供了一套强大的 REST
          API，帮助开发者、研究人员和企业快速访问开源数据和模型资源。 通过我们的
          API，您可以灵活地获取所需的数据，支持大规模数据访问和自动化处理。
        </div>
      </div>

      {/* 使用说明 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">使用说明</h2>
        <div className="text-lg leading-relaxed text-gray-700">
          使用我们的 API 非常简单，您只需按照以下步骤操作：
          <ol className="list-decimal pl-6 pt-2">
            <li>注册并登录 OSS-Compass 平台。</li>
            <li>在个人中心生成您的 API Token。</li>
            <li>使用 API 文档中的接口说明，构建您的请求。</li>
          </ol>
        </div>
      </div>

      {/* Token 认证 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">Token 认证</h2>
        <div className="text-lg leading-relaxed text-gray-700">
          所有 API 请求都需要通过 Token 进行认证。以下是使用 Token 的步骤：
          <ul className="list-disc pl-6 pt-2">
            <li>
              在请求头中添加{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5">
                Authorization
              </code>{' '}
              字段。
            </li>
            <li>
              格式为：
              <code className="rounded bg-gray-100 px-1 py-0.5">
                Bearer &lt;Your-Token&gt;
              </code>
              。
            </li>
          </ul>
          示例：
          <pre className="mt-4 rounded bg-gray-100 p-4 text-sm text-gray-800">
            {`curl -X POST "${apiBaseUrl}" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"label": "https://github.com/oss-compass/compass-web"}'`}
          </pre>
        </div>
      </div>

      {/* 示例代码 */}
      <div className="px-6">
        <h2 className="pb-4 text-xl font-bold text-gray-800">示例代码</h2>
        <div className="text-lg leading-relaxed text-gray-700">
          以下是使用 JavaScript 调用 API 的示例代码：
          <pre className="mt-4 rounded bg-gray-100 p-4 text-sm text-gray-800">
            {`fetch('${apiBaseUrl}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
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
