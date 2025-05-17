import React from 'react';
import Link from 'next/link';
import LinkX from '@common/components/LinkX';
import { useTranslation } from 'react-i18next';
import { AiFillCaretDown } from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoPeopleSharp } from 'react-icons/io5';
import { RiLineChartLine } from 'react-icons/ri';
import { AiOutlineSelect } from 'react-icons/ai';
import { GoMirror } from 'react-icons/go';

const MoreDropdown = () => {
  const { t } = useTranslation();

  return (
    <div className="group relative flex h-full items-center transition">
      <div className="flex cursor-pointer items-center justify-center py-3 px-7 group-hover:bg-[#333333] xl:mx-1 2xl:px-4">
        <a className={'font-medium text-white'}>全部服务</a>
        <AiFillCaretDown color="#fff" className="ml-2" />
      </div>
      {/* invisible opacity-0 */}
      <div className="z-dropdown invisible fixed top-[82px] left-0 max-h-[calc(100%-80px)] w-[100vw] bg-black/95 opacity-0  transition-all  duration-300 ease-in-out group-hover:visible group-hover:opacity-100">
        <div className="mx-auto w-[1200px] pb-16 text-white md:w-full md:px-4 lg:w-full lg:px-10">
          <div className="my-6 text-[#c1c1c1]">五大服务</div>
          <div className="grid grid-cols-4 gap-8 md:grid-cols-1 md:gap-y-6 lg:grid-cols-3">
            <div className="flex gap-3">
              <div className="w-8">
                <HiOutlineDocumentReport
                  color="#ffd949"
                  className="mr-2 text-4xl"
                />
              </div>
              <Link href="/">
                <div className="cursor-pointer">
                  <div className="mb-3 text-base">开源生态评估服务</div>
                  <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                    构建三维空间评估体系评估开源社区的健康状态。
                  </div>
                  <div className="text-[#8ba5f9]">首页输入框体验产品</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-3">
              <div className="w-8">
                <IoPeopleSharp color="#ffd949" className="mr-2 text-4xl" />
              </div>
              <Link href="/">
                <div className="cursor-pointer">
                  <div className="mb-3 text-base">开发者画像服务</div>
                  <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                    从开发者的贡献行为中了解开发人员的生产力、活跃度和协作等。
                  </div>
                  <div className="text-[#8ba5f9]">首页输入框体验产品</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-3">
              <div className="w-8">
                <RiLineChartLine color="#ffd949" className="mr-2 text-4xl" />
              </div>
              <Link href="/os-situation">
                <div className="cursor-pointer" onClick={() => {}}>
                  <div className="mb-3 text-base hover:text-[#597ef7]">
                    开源生态态势洞察
                  </div>
                  <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                    从开发者的贡献行为中了解开发人员的生产力、活跃度和协作等。
                  </div>
                  <div className="text-[#8ba5f9]">产品首页</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-3">
              <div className="w-8">
                <AiOutlineSelect color="#ffd949" className="mr-2 text-4xl" />
              </div>
              <Link href="/os-situation">
                <div className="cursor-pointer" onClick={() => {}}>
                  <div className="mb-3 text-base hover:text-[#597ef7]">
                    开源软件选型评估服务
                  </div>
                  <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                    从开发者的贡献行为中了解开发人员的生产力、活跃度和协作等。
                  </div>
                  <div className="text-[#8ba5f9]">产品首页</div>
                </div>
              </Link>
            </div>
            <div className="flex gap-3">
              <div className="w-8">
                <GoMirror color="#ffd949" className="mr-2 text-4xl" />
              </div>
              <Link href="/dataHub">
                <div className="cursor-pointer" onClick={() => {}}>
                  <div className="mb-3 text-base hover:text-[#597ef7]">
                    开源数据&模型研究服务
                  </div>
                  <div className="line-clamp-3 mb-3 text-xs text-[#c1c1c1]">
                    从开发者的贡献行为中了解开发人员的生产力、活跃度和协作等。
                  </div>
                  <div className="text-[#8ba5f9]">产品首页</div>
                </div>
              </Link>
            </div>
          </div>
          {/* <div className=">3xl:hidden border-b border-white/20 py-4 pl-6 hover:bg-[#333333] ">
            <LinkX href="/blog" legacyBehavior>
              <a className={'mx-4 flex-shrink-0 px-2.5 font-medium text-white'}>
                {t('common:header.news')}
              </a>
            </LinkX>
          </div>
          <div className=">3xl:hidden border-b border-white/20 py-4 pl-6 hover:bg-[#333333] ">
            <Link
              href="/about"
              className={'mx-4 px-2.5 font-medium text-white'}
            >
              {t('common:header.about')}
            </Link>
          </div>
          <div className="border-b border-white/20 py-4 pl-6 hover:bg-[#333333]">
            <Link
              href="/openApi"
              className={'mx-4 px-2.5 font-medium text-white'}
            >
              API
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MoreDropdown;
