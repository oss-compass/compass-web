import { useEffect, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { TfiWorld } from 'react-icons/tfi';
import { GoOrganization } from 'react-icons/go';
import { IoLocationOutline, IoCodeSlash } from 'react-icons/io5';
import { MdOutlineTopic } from 'react-icons/md';
import ImageFallback from '@common/components/ImageFallback';
import { Tooltip } from 'antd';
import useContributorInfo from '@modules/developer/hooks/useContributorInfo';
import { getPathname } from '@common/utils';
import { useTranslation } from 'next-i18next';
// import Wordcloud from './Wordcloud'; // 导入 Cloud 组件

const LeftPan = () => {
  const { t } = useTranslation();
  const { contributorInfo } = useContributorInfo();

  const userInfo = [
    {
      icon: <TfiWorld className="h-4 w-4" />,
      label: contributorInfo?.country || 'N/A', // 使用 N/A 作为默认值
      tooltipContent: `国家: ${contributorInfo?.country || 'N/A'}`,
    },
    {
      icon: <IoLocationOutline className="h-4 w-4" />,
      label: contributorInfo?.city || 'N/A', // 使用 N/A 作为默认值
      tooltipContent: `地址: ${contributorInfo?.city || 'N/A'}`,
    },
    {
      icon: <GoOrganization className="h-4 w-4" />,
      label: contributorInfo?.company || 'N/A', // 使用 N/A 作为默认值
      tooltipContent: `组织: ${contributorInfo?.company || 'N/A'}`,
    },
    {
      icon: <IoCodeSlash className="h-4 w-4" />,
      label: contributorInfo?.main_language || 'N/A', // 使用 N/A 作为默认值
      tooltipContent: `Top编程语言: ${contributorInfo?.main_language || 'N/A'}`,
    },
    {
      icon: <MdOutlineTopic className="h-4 w-4" />,
      label: contributorInfo?.topics[0]?.name || 'N/A', // 使用 N/A 作为默认值
      tooltipContent: `Top技术领域: ${
        contributorInfo?.topics[0]?.name || 'N/A'
      }`,
    },
  ];

  // 从 repo_roles 动态获取仓库角色信息，并截取前两个
  const repoRolesInfo =
    contributorInfo?.repo_roles?.slice(0, 2).map((roleInfo) => ({
      repoName: getPathname(roleInfo.repo), // 提取仓库名
      roles: roleInfo.roles
        .map((role) => `${t('analyze:metric_detail:' + role)}`)
        .join(', '), // 将角色数组转换为字符串
    })) || [];

  return (
    <div className="relative w-full min-w-0 rounded-lg border-2 border-transparent bg-white p-8 drop-shadow-sm">
      {/* 头像区 */}
      <div>
        <div className="mb-12 flex items-center gap-6 overflow-hidden ">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
            <ImageFallback
              src={contributorInfo?.avatar_url?.trim()} // 清理可能存在的空格
              unoptimized
              width={80}
              height={80}
              style={{
                objectFit: 'cover',
              }}
              fallbackSrc={'/images/default.png'}
              alt="logo"
            />
          </div>

          <div>
            <h1 className="mb-2.5 text-2xl font-bold text-gray-800">
              {contributorInfo?.contributor || 'N/A'}
            </h1>
            {contributorInfo?.html_url && (
              <a
                href={contributorInfo.html_url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 py-[5px] px-3 transition hover:bg-indigo-100"
              >
                <FiGithub className=" h-5 w-5 text-gray-600" />
                <div>{contributorInfo.html_url.trim()}</div>
              </a>
            )}
          </div>
        </div>
        {/* 社交链接 */}
        <div className="flex flex-col overflow-hidden ">
          <div className="mb-4 flex flex-wrap gap-2.5">
            {userInfo.map(
              (item, index) =>
                item.label &&
                item.label !== 'N/A' && (
                  <Tooltip
                    key={`${item.label}-${index}`}
                    placement="top"
                    title={item.tooltipContent}
                  >
                    <div className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                      {item.icon}
                      {item.label}
                    </div>
                  </Tooltip>
                )
            )}
          </div>
          <div className="mb flex flex-wrap gap-2.5 text-sm">
            {repoRolesInfo.map((role, index) => (
              // <Tooltip
              //   key={`${role.repoName}-${index}`}
              //   placement="top"
              //   title={`在 ${role.repoName} 项目中担任: ${role.roles}`}
              // >
              <div
                key={role.repoName}
                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-indigo-800"
              >
                {role.repoName} -- {role.roles}
              </div>
              // </Tooltip>
            ))}
          </div>
        </div>
      </div>
      {/* 添加词云图组件 */}
      {/* {contributorInfo?.topics && contributorInfo.topics.length > 0 && (
        <Wordcloud topics={contributorInfo.topics} />
      )} */}
    </div>
  );
};

export default LeftPan;
