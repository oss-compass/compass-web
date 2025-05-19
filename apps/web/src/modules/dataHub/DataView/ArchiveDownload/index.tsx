import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Select } from 'antd';

const ArchiveDownload = ({ category }: { category: string }) => {
  const apiBaseUrl = `${window.location.origin}`;
  const [baseUrl, setBaseUrl] = useState(window.location.origin);
  const [defaultValue, setDefaultValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const isDefaultUrl =
      apiBaseUrl === 'https://oss-compass.org' ||
      apiBaseUrl === 'https://compass.gitee.com';
    const defaultOptions = [
      { value: 'https://oss-compass.org', label: 'OSS Compass' },
      { value: 'https://oss-compass.isrc.ac.cn', label: '中科院镜像站' },
    ];

    const newOptions = isDefaultUrl
      ? [{ value: baseUrl, label: 'OSS Compass' }, ...defaultOptions.slice(1)]
      : defaultOptions;
    setDefaultValue(newOptions[0].value);
    setOptions(newOptions);
  }, [apiBaseUrl]); // 依赖于 baseUrl 的变化
  // 模拟不同分类的描述和下载数据
  const categoryData: Record<
    string,
    {
      name: string;
      description: string;
      downloads: { name: string; link: string; description: string }[];
    }
  > = {
    insight: {
      name: '开源态势洞察',
      description: '提供开源态势洞察的开源数据和模型资源。',
      downloads: [
        {
          name: '开源态势洞察数据集',
          link: baseUrl + '/download/os_situation_archive.tar.gz',
          description:
            '开源态势洞察数据集包括开源项目的基本信息、活跃度、社区规模等数据。',
        },
      ],
    },
  };
  // 获取当前分类数据
  const currentCategory = categoryData[category] || categoryData.insight;

  return (
    <div className="space-y-6 bg-white">
      {/* 标题区块 */}
      <Breadcrumb
        items={[{ label: '归档数据下载' }, { label: currentCategory?.name }]}
      />

      {/* 分类描述 */}
      <div className="text-lg text-gray-700">{currentCategory.description}</div>
      <div>
        <span className="mr-4 text-lg font-semibold">数据源</span>
        <Select
          className="ml-2"
          defaultValue={defaultValue}
          style={{ width: 140 }}
          onChange={(value) => {
            setBaseUrl(value);
          }}
          options={options}
        />
      </div>
      {/* 下载内容表格 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                名称
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                描述
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">
                下载链接
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCategory.downloads.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={item.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    下载
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchiveDownload;
