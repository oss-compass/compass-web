import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message, Skeleton, Tooltip } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

// 类型定义
interface ChangeData {
  value: number;
  trend: 'up' | 'down' | 'flat';
}

interface UserOverviewData {
  monthly_visit_count: number;
  total_visit_count: number;
  sign_user: number;
  total_sign_user: number;
  new_users_count: number;
  total_users_count: number;
  average_monthly_user_duration: string;
  total_average_user_duration: string;
  monthly_visit_count_change: ChangeData;
  sign_user_change: ChangeData;
  new_users_count_change: ChangeData;
  average_monthly_user_duration_change: ChangeData;
}

interface ApiResponse {
  success: boolean;
  data: UserOverviewData;
  message?: string;
}

const StatsCards: React.FC = () => {
  const [data, setData] = useState<UserOverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取用户概览数据
  const fetchUserOverview = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/v2/admin/user_overview');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: UserOverviewData = await response.json();
      if (result) {
        setData(result);
      } else {
        throw new Error('获取数据失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取数据失败';
      setError(errorMessage);
      console.error('获取用户概览数据失败：', err);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchUserOverview();
  }, []);

  // 根据趋势返回对应的图标
  const getTrendIcon = (trend: 'up' | 'down' | 'flat') => {
    switch (trend) {
      case 'up':
        return <ArrowUpOutlined className="text-2xl text-green-500" />;
      case 'down':
        return <ArrowDownOutlined className="text-2xl text-red-500" />;
      case 'flat':
      default:
        return <MinusOutlined className="text-2xl text-gray-500" />;
    }
  };

  // 如果正在加载，显示骨架屏
  if (loading) {
    return (
      <Row gutter={[16, 16]} className="mb-6">
        {[1, 2, 3, 4].map((item) => (
          <Col xs={24} sm={12} lg={6} key={item}>
            <Card className="h-36 border-0 shadow-sm">
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  // 如果有错误，显示错误信息
  if (error || !data) {
    return (
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Card className="border-0 shadow-sm">
            <div className="flex h-20 items-center justify-center text-red-500">
              <div className="text-center">
                <div className="mb-2">数据加载失败</div>
                <div className="text-sm text-gray-500">{error}</div>
                <button
                  className="mt-2 rounded bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={fetchUserOverview}
                >
                  重新加载
                </button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} sm={12} lg={6}>
        <Card className="h-36 border-0 shadow-sm">
          <div className="flex h-full flex-col">
            {/* 上部分 */}
            <div className="mb-4 flex flex-1 items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-1 text-sm font-semibold">
                  月访问量
                  <Tooltip
                    title="统计上月所有用户对网站的访问次数，包括注册用户和访客的页面浏览量"
                    placement="top"
                  >
                    <InfoCircleOutlined className="cursor-pointer text-sm" />
                  </Tooltip>
                </div>
                <div className="text-3xl font-bold">
                  {data.monthly_visit_count.toLocaleString()}
                </div>
              </div>
              <div className="flex h-12 w-16 items-center justify-center">
                {getTrendIcon(data.monthly_visit_count_change.trend)}
              </div>
            </div>
            {/* 横线分隔 */}
            <div className="border-t border-gray-200"></div>
            {/* 下部分 - 固定 30px 高度 */}
            <div className="flex h-7 items-center justify-between pt-2">
              <div className="text-sm text-gray-500">总访问量</div>
              <div className="text-sm font-medium">
                {data.total_visit_count.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="h-36 border-0 shadow-sm">
          <div className="flex h-full flex-col">
            {/* 上部分 */}
            <div className="mb-4 flex flex-1 items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-1 text-sm font-semibold">
                  月新增用户
                  <Tooltip
                    title="统计上月首次访问网站的新用户数量"
                    placement="top"
                  >
                    <InfoCircleOutlined className="cursor-pointer text-sm" />
                  </Tooltip>
                </div>
                <div className="text-3xl font-bold">
                  {data.new_users_count.toLocaleString()}
                </div>
              </div>
              <div className="flex h-12 w-16 items-center justify-center">
                {getTrendIcon(data.new_users_count_change.trend)}
              </div>
            </div>
            {/* 横线分隔 */}
            <div className="border-t border-gray-200"></div>
            {/* 下部分 - 固定 30px 高度 */}
            <div className="flex h-7 items-center justify-between pt-2">
              <div className="text-sm text-gray-500">总用户数</div>
              <div className="text-sm font-medium">
                {data.total_users_count.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="h-36 border-0 shadow-sm">
          <div className="flex h-full flex-col">
            {/* 上部分 */}
            <div className="mb-4 flex flex-1 items-center justify-between">
              <div>
                <div className="mb-1 text-sm font-semibold">月新增注册用户</div>
                <div className="text-3xl font-bold">
                  {data.sign_user.toLocaleString()}
                </div>
              </div>
              <div className="flex h-12 w-16 items-center justify-center">
                {getTrendIcon(data.sign_user_change.trend)}
              </div>
            </div>
            {/* 横线分隔 */}
            <div className="border-t border-gray-200"></div>
            {/* 下部分 - 固定 30px 高度 */}
            <div className="flex h-7 items-center justify-between pt-2">
              <div className="text-sm text-gray-500">总注册用户</div>
              <div className="text-sm font-medium">
                {data.total_sign_user.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="h-36 border-0 shadow-sm">
          <div className="flex h-full flex-col">
            {/* 上部分 */}
            <div className="mb-4 flex flex-1 items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-1 text-sm font-semibold">
                  月用户平均活动时长
                  <Tooltip
                    title="统计上月所有用户在网站上的平均停留时间，包括登录用户和访客"
                    placement="top"
                  >
                    <InfoCircleOutlined className="cursor-pointer text-sm" />
                  </Tooltip>
                </div>
                <div className="text-3xl font-bold">
                  {data.average_monthly_user_duration}
                </div>
              </div>
              <div className="flex h-12 w-16 items-center justify-center">
                {getTrendIcon(data.average_monthly_user_duration_change.trend)}
              </div>
            </div>
            {/* 横线分隔 */}
            <div className="border-t border-gray-200"></div>
            {/* 下部分 - 固定 30px 高度 */}
            <div className="flex h-7 items-center justify-between pt-2">
              <div className="text-sm text-gray-500">总用户平均活动时长</div>
              <div className="text-sm font-medium">
                {data.total_average_user_duration}
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;
