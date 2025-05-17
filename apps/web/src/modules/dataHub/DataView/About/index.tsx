import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

const About = () => (
  <div className="space-y-6 rounded-lg bg-white">
    {/* 标题区块 */}
    <Breadcrumb items={[{ label: 'About' }]} />
    <div className="px-6">
      <h2 className="pb-4 text-xl font-bold text-gray-800">数据下载</h2>
      <div className="text-lg">
        OSS-Compass
        社区致力于为开源数据和模型研究提供全面的服务，我们为开发者、研究人员和企业提供丰富的开源数据和模型资源。
      </div>
      <div className="my-4 text-lg">
        我们提供两种下载方式，方便用户获取所需的开源数据和模型：
      </div>
      <div className="flex items-center gap-6 pt-4">
        <div
          onClick={() => {
            window.location.hash = 'introduction';
          }}
          className="hover:border-primary max-w-[460px] flex-1 cursor-pointer rounded-xl border border-[#ebedf0] bg-white p-6 shadow hover:shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">REST API</h3>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
            对于需要大规模数据访问的用户，我们提供API接口下载方式。用户可以通过编程方式调用我们的API，灵活获取数据。
          </p>
        </div>
        <div
          onClick={() => {
            window.location.hash = 'archive-insight';
          }}
          className="hover:border-primary max-w-[460px] flex-1 cursor-pointer rounded-xl border border-[#ebedf0] bg-white p-6 shadow hover:shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              归档数据下载
            </h3>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
            用户可以通过我们的平台提供的下载链接直接下载所需的归档开源数据和模型。
          </p>
        </div>
      </div>
    </div>
    <div className="px-6">
      {/* <h2 className="pt-4 text-xl font-bold text-gray-800">镜像站</h2> */}
    </div>
  </div>
);

export default About;
