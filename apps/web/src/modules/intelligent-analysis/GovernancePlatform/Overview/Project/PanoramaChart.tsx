// autocorrect: false
import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { useRouter } from 'next/router';
import {
  PlayCircleOutlined,
  CodeOutlined,
  BuildOutlined,
  CloudServerOutlined,
  AppstoreOutlined,
  RocketOutlined,
  HddOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

interface PanoramaChartProps {
  className?: string;
  activeSlug?: string;
  loading?: boolean;
}

const PanoramaChart: React.FC<PanoramaChartProps> = ({
  className,
  activeSlug,
  loading = false,
}) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [activeSlug]);

  const handleNavigate = (slug: string) => {
    setIsNavigating(true);
    // If clicking the currently active slug, navigate back to 'CUDA' (unless it's already CUDA)
    if (slug === activeSlug && slug !== 'CUDA') {
      router.push(`/intelligent-analysis/governance-platform/CUDA`);
    } else {
      router.push(`/intelligent-analysis/governance-platform/${slug}`);
    }
  };

  const getCardClass = (baseClass: string, slug?: string) => {
    const isActive = slug && activeSlug === slug;
    if (isActive) {
      // Add a distinctive active style, e.g., blue border and shadow
      return `${baseClass} !border-blue-500 ring-1 ring-blue-500 shadow-md`;
    }
    return baseClass;
  };

  const cardBaseClass =
    'flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-2 text-center cursor-pointer hover:shadow-md transition-shadow duration-200';
  const topBottomCardClass =
    'mb-2 rounded border border-gray-200 bg-white p-3 text-center shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200';

  return (
    <Card title="技术全景图" className={`h-full ${className}`}>
      <Spin spinning={loading || isNavigating}>
        <div className="flex h-full select-none flex-col rounded-lg text-sm text-gray-700">
          {/* Top: AI Framework */}
          <div className={topBottomCardClass}>AI框架</div>

          {/* Adapter */}
          <div
            className={`mb-4 flex items-center justify-center ${topBottomCardClass}`}
          >
            AI框架适配 Framework Adapter{' '}
            <span className="ml-2 text-gray-400">&gt;</span>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 gap-3">
            {/* Left: CANN Logo Area (CUDA) - Removed */}
            {/* <div className="flex w-32 flex-col items-center justify-center rounded border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-2 text-center hover:shadow-md transition-shadow duration-200">
            <div className="mb-1 text-xl font-bold text-red-600">CUDA</div>
            <div className="mb-4 font-bold">异构计算架构</div>
          </div> */}

            {/* Center Stack */}
            <div className="flex flex-1 flex-col gap-2">
              {/* Top Row of 4 */}
              <div className="grid grid-cols-4 gap-2">
                {/* Operator Library (算子库) */}
                <div
                  className={getCardClass(
                    cardBaseClass,
                    'CUDA_operator_library'
                  )}
                  onClick={() => handleNavigate('CUDA_operator_library')}
                >
                  <div className="mb-1 flex items-center font-bold">
                    <AppstoreOutlined className="mr-1" /> 算子库{' '}
                    <span className="ml-1 text-gray-400">&gt;</span>
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    大模型融合算子
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    NN/CV/Math基础算子
                  </div>
                </div>

                <div className={cardBaseClass}>
                  <div className="mb-1 flex items-center font-bold">
                    <CloudServerOutlined className="mr-1" /> 通信库{' '}
                    <span className="ml-1 text-gray-400">&gt;</span>
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    集合通信算法
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    分布式通信
                  </div>
                </div>
                <div className={cardBaseClass}>
                  <div className="mb-1 flex items-center font-bold">
                    <BuildOutlined className="mr-1" /> 图引擎{' '}
                    <span className="ml-1 text-gray-400">&gt;</span>
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    图编译优化
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    图执行加速
                  </div>
                </div>
                <div className={cardBaseClass}>
                  <div className="mb-1 flex items-center font-bold">
                    <RocketOutlined className="mr-1" /> 领域加速库{' '}
                    <span className="ml-1 text-gray-400">&gt;</span>
                  </div>
                  <div className="scale-90 text-xs text-gray-500">
                    ATB、SiP等加速套件
                  </div>
                </div>
              </div>

              {/* Programming Language */}
              <div className={`flex-1 ${cardBaseClass}`}>
                <div className="mb-1 flex items-center font-bold">
                  <CodeOutlined className="mr-1" /> 编程语言{' '}
                  <span className="ml-1 text-gray-400">&gt;</span>
                </div>
                <div className="text-xs text-gray-500">CUDA C++</div>
              </div>
              {/* Runtime */}
              <div className={`flex-1 ${cardBaseClass}`}>
                <div className="mb-1 flex items-center font-bold">
                  <HddOutlined className="mr-1" /> 编译器{' '}
                  <span className="ml-1 text-gray-400">&gt;</span>
                </div>
                <div className="text-xs text-gray-500">
                  异构编译优化 | 指令亲和
                </div>
              </div>
              {/* Runtime */}
              <div className={`flex-1 ${cardBaseClass}`}>
                <div className="mb-1 flex items-center font-bold">
                  <HddOutlined className="mr-1" /> 运行时{' '}
                  <span className="ml-1 text-gray-400">&gt;</span>
                </div>
                <div className="text-xs text-gray-500">
                  控制流 | 内存管理 | 任务调度
                </div>
              </div>

              {/* Driver */}
              <div className={`flex-1 ${cardBaseClass}`}>
                <div className="mb-1 flex items-center font-bold">
                  <DatabaseOutlined className="mr-1" /> 驱动{' '}
                  <span className="ml-1 text-gray-400">&gt;</span>
                </div>
                <div className="text-xs text-gray-500">
                  板级驱动 | 加速器驱动 | 设备管理
                </div>
              </div>
            </div>

            {/* Right: Toolchain */}
            <div className="flex w-32 cursor-pointer flex-col items-center rounded border border-gray-200 bg-white p-2 text-center transition-shadow duration-200 hover:shadow-md">
              <div className="mb-2 mt-4 font-bold">Nsight</div>
              <div className="mb-2 text-xs font-bold">
                全流程工具链 <span className="text-gray-400">&gt;</span>
              </div>
              <div className="mt-2 w-full px-1 text-left text-xs leading-relaxed text-gray-500">
                支持调试、性能分析、优化，提供可视化能力
              </div>
            </div>
          </div>

          {/* Bottom: Processor */}
          <div className={`mt-4 ${topBottomCardClass}`}>AI处理器</div>
        </div>
      </Spin>
    </Card>
  );
};

export default PanoramaChart;
