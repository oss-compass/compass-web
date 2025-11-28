import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface ApprovalGuideProps {
  /**
   * 指标数据数组，包含 维度、指标名称、是否必须澄清 等字段
   */
  allMetricData: Array<{
    key: string;
    维度: string;
    指标名称: string;
    是否必须澄清?: string;
    涉及阶段?: string; // 毕业模块使用此字段
    [key: string]: any;
  }>;
  /**
   * 模块类型，用于区分沙箱、孵化、毕业
   */
  moduleType?: 'sandbox' | 'hatch' | 'graduate';
}

/**
 * 审批说明组件
 * 用于沙箱、孵化、毕业模块展示各角色的审批职责
 */
const ApprovalGuide: React.FC<ApprovalGuideProps> = ({
  allMetricData,
  moduleType = 'sandbox',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // 判断是否需要澄清（兼容不同模块的数据结构）
  const needClarification = (item: any) => {
    // 沙箱和孵化模块使用"是否必须澄清"字段
    if (item.是否必须澄清 === '是') {
      return true;
    }
    // 毕业模块使用"涉及阶段"字段，包含"孵化毕业"或"毕业"的需要澄清
    if (
      item.涉及阶段 &&
      (item.涉及阶段.includes('孵化毕业') || item.涉及阶段.includes('毕业'))
    ) {
      return true;
    }
    return false;
  };

  // 获取技术生态、生命周期、网络安全中必须澄清的指标
  const getSigLeadMetrics = () => {
    return allMetricData.filter(
      (item) =>
        (item.维度 === '技术生态' ||
          item.维度 === '生命周期' ||
          item.维度 === '网络安全') &&
        needClarification(item) &&
        // 排除上游协同策略和回合上游
        item.key !== 'upstreamCollaborationStrategy' &&
        item.key !== 'ecologyCodeUpstream'
    );
  };

  // 获取合法合规中必须澄清的指标
  const getLegalMetrics = () => {
    return allMetricData.filter(
      (item) => item.维度 === '合法合规' && needClarification(item)
    );
  };

  // 获取所有必须澄清的指标
  const getAllClarificationMetrics = () => {
    return allMetricData.filter(
      (item) =>
        needClarification(item) &&
        // 排除上游协同策略和回合上游
        item.key !== 'upstreamCollaborationStrategy' &&
        item.key !== 'ecologyCodeUpstream'
    );
  };

  // 获取开源能力代表需要审批的指标（孵化和毕业模块特有）
  const getOpenSourceMetrics = () => {
    if (moduleType === 'hatch') {
      // 孵化模块：上游协同策略
      return allMetricData.filter(
        (item) => item.key === 'upstreamCollaborationStrategy'
      );
    } else if (moduleType === 'graduate') {
      // 毕业模块：回合上游
      return allMetricData.filter((item) => item.key === 'ecologyCodeUpstream');
    }
    return [];
  };

  const sigLeadMetrics = getSigLeadMetrics();
  const legalMetrics = getLegalMetrics();
  const allClarificationMetrics = getAllClarificationMetrics();
  const openSourceMetrics = getOpenSourceMetrics();
  const showOpenSourceRole =
    moduleType === 'hatch' || moduleType === 'graduate';

  return (
    <>
      <Button
        type="link"
        icon={<QuestionCircleOutlined />}
        className="ml-2 text-sm"
        onClick={() => setModalVisible(true)}
      >
        审批说明
      </Button>

      <Modal
        title="审批说明"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setModalVisible(false)}
          >
            关闭
          </Button>,
        ]}
        width={1000}
        destroyOnClose
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', padding: '24px' }}
      >
        {/* 说明文字 */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-700">
            申请人需要对所有必须澄清并且得分不为 10 分的指标项
            (开发中的指标除外) 进行澄清，澄清后需由以下代表审批：
          </p>
          {moduleType === 'hatch' && (
            <p className="mt-2 text-sm text-amber-700">
              注：SIG Lead 和合规代表无需审批&ldquo;上游协同策略&rdquo;指标。
            </p>
          )}
          {moduleType === 'graduate' && (
            <p className="mt-2 text-sm text-amber-700">
              注：SIG Lead 和合规代表无需审批&ldquo;回合上游&rdquo;指标。
            </p>
          )}
        </div>

        <div className="space-y-6">
          {/* SIG Lead */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              SIG Lead
            </h3>
            <div className="mb-2 text-sm text-gray-600">
              需审批技术生态、生命周期、网络安全中所有必须澄清的指标，共{' '}
              {sigLeadMetrics.length} 项：
            </div>
            <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
              {sigLeadMetrics.map((metric, index) => (
                <li key={index}>
                  【{metric.维度}】{metric.指标名称}
                </li>
              ))}
            </ul>
          </div>

          {/* 法务代表 */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              法务代表
            </h3>
            <div className="mb-2 text-sm text-gray-600">
              需审批合法合规中必须澄清的指标，共 {legalMetrics.length} 项：
            </div>
            <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
              {legalMetrics.map((metric, index) => (
                <li key={index}>
                  【{metric.维度}】{metric.指标名称}
                </li>
              ))}
            </ul>
          </div>

          {/* 合规代表 */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              合规代表
            </h3>
            <div className="mb-2 text-sm text-gray-600">
              需审批所有必须澄清的指标，共 {allClarificationMetrics.length} 项：
            </div>
            <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
              {allClarificationMetrics.map((metric, index) => (
                <li key={index}>
                  【{metric.维度}】{metric.指标名称}
                </li>
              ))}
            </ul>
          </div>

          {/* 开源能力代表（仅孵化和毕业模块） */}
          {showOpenSourceRole && openSourceMetrics.length > 0 && (
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-3 text-base font-semibold text-gray-800">
                开源能力代表
              </h3>
              <div className="mb-2 text-sm text-gray-600">
                需审批以下指标，共 {openSourceMetrics.length} 项：
              </div>
              <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                {openSourceMetrics.map((metric, index) => (
                  <li key={index}>
                    【{metric.维度}】{metric.指标名称}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 质量代表 */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-base font-semibold text-gray-800">
              质量代表
            </h3>
            <div className="text-sm text-gray-700">
              {showOpenSourceRole
                ? 'SIG Lead、法务代表、合规代表、开源能力代表全部审批通过后进行确认。'
                : 'SIG Lead、法务代表、合规代表全部审批通过后进行确认。'}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApprovalGuide;
