import { useEffect, useState } from 'react';
import { FiGlobe, FiGithub, FiMessageSquare, FiStar } from 'react-icons/fi';
import { TfiWorld } from 'react-icons/tfi';
import { GoOrganization } from 'react-icons/go';
import { IoLocationOutline, IoCodeSlash } from 'react-icons/io5';
import { MdOutlineTopic } from 'react-icons/md';
import ImageFallback from '@common/components/ImageFallback';
import { Tooltip } from 'antd';

const LeftPan = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // GitHub API 示例（需替换实际用户名）
    const fetchData = async () => {
      const userRes = await fetch('https://api.github.com/users/coder-sett');
      setUserData(await userRes.json());
    };

    fetchData();
  }, []);

  const userInfo = [
    {
      icon: <TfiWorld className="h-4 w-4" />,
      label: userData?.location || 'China',
      tooltipContent: '国家: China',
    },
    {
      icon: <IoLocationOutline className="h-4 w-4" />,
      label: userData?.location || 'Shenzhen',
      tooltipContent: '地址: Shenzhen',
    },
    {
      icon: <GoOrganization className="h-4 w-4" />,
      label: userData?.company || 'Huawei',
      tooltipContent: '组织: Huawei',
    },
  ];
  const userInfo2 = [
    {
      icon: <IoCodeSlash className="h-4 w-4" />,
      label: 'Java',
      tooltipContent: 'Top编程语言: Java',
    },
    {
      icon: <MdOutlineTopic className="h-4 w-4" />,
      label: 'metrics-model',
      tooltipContent: '技术领域: metrics-model',
    },
    {
      icon: <MdOutlineTopic className="h-4 w-4" />,
      label: 'Docs',
      tooltipContent: '技术领域: Docs',
    },
  ];
  return (
    <div className="relative w-full min-w-0 rounded-lg border-2 border-transparent bg-white p-8 drop-shadow-sm">
      {/* 头像区 - 修改图标引用 */}
      <div className="mb-12 flex items-center gap-6 overflow-hidden ">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
          <ImageFallback
            src={'https://avatars.githubusercontent.com/u/53640896?v=4'}
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
            {'lishengbao'}
          </h1>
          <div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 py-[5px] px-3 transition hover:bg-indigo-100">
            <FiGithub className=" h-5 w-5 text-gray-600" />
            <div>https://github.com/lishengbao</div>
          </div>
        </div>
      </div>
      {/* 社交链接 - 修改图标引用 */}
      <div className="flex flex-col overflow-hidden ">
        <div className="mb-4 flex flex-wrap gap-2.5">
          {userInfo.map((item, index) => (
            <Tooltip
              key={item.label}
              placement="top"
              title={item.tooltipContent}
            >
              <div
                key={index}
                className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
              >
                {item.icon}
                {item.label}
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="mb-4 flex flex-wrap gap-2.5">
          {userInfo2.map((item, index) => (
            <Tooltip
              key={item.label}
              placement="top"
              title={item.tooltipContent}
            >
              <div
                key={index}
                className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
              >
                {item.icon}
                {item.label}
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="mb flex flex-wrap gap-2.5 text-sm">
          <div className="flex cursor-pointer items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-indigo-800">
            oss-compass -- 核心开发者
          </div>
          <div className="flex cursor-pointer items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-indigo-800">
            apache/echarts -- 组织管理者
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPan;
