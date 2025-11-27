import react from 'react';
import { setUrlHost } from '@modules/oh/utils/utils';
import { getHubUrl } from '@common/utils';
import PreviewImage from '@modules/oh/components/PreviewImage';
import EditReport from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/EvaluationBaseInfo/EditReport';
import RefreshReport from '@modules/oh/DataView/HatchingTreatment/Sandbox/EvaluationInfo/EvaluationBaseInfo/RefreshReport';
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { TableDropdown } from '@modules/oh/components/TableDropdown';
import Link from 'next/link';
import { STATUS_MAP } from '@modules/oh/constant';

const StatusIndicator: React.FC<{ status: string; record: any }> = react.memo(
  ({ status, record }) => {
    if (status === 'success') {
      return (
        <Link href={`#reportDetailPage?projectId=${record.shortCode}`}>
          {STATUS_MAP[status]}
        </Link>
      );
    }
    return STATUS_MAP[status] || STATUS_MAP.default;
  }
);
StatusIndicator.displayName = 'StatusIndicator';
export const useTableColumns = (anction) => {
  const columns = [
    {
      title: '操作',
      key: 'createdAt',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center gap-2 text-[#3e8eff]">
            {record?.tpcSoftwareSandboxReportMetric?.status === 'success' ? (
              <Popover content={'查看报告'}>
                <FileTextOutlined
                  onClick={() => {
                    window.location.hash =
                      'sandboxDetailPage?projectId=' + record.shortCode;
                  }}
                />
              </Popover>
            ) : (
              <Popover content={'报告生成中'}>
                <FileTextOutlined className="cursor-not-allowed text-[#ABABAB]" />
              </Popover>
            )}
            <EditReport report={record} editSuccess={anction} />
            <RefreshReport report={record} editSuccess={anction} />
            <PreviewImage report={record} />
          </div>
        );
      },
    },
    {
      title: '软件名称',
      dataIndex: 'name',
      key: 'name',
      ...TableDropdown.createFilterConfig('输入软件名称'),
    },
    {
      title: '源码地址',
      dataIndex: 'codeUrl',
      key: 'codeUrl',
      render: (text) => {
        return (
          <a
            target="_blank"
            href={setUrlHost(text)}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {text}
          </a>
        );
      },
      ...TableDropdown.createFilterConfig('输入源码地址'),
    },
    {
      title: '编程语言',
      dataIndex: 'programmingLanguage',
      key: 'programmingLanguage',
    },
    {
      title: '适配方式',
      key: 'adaptationMethod',
      dataIndex: 'adaptationMethod',
    },
    {
      title: '申请人',
      key: 'user',
      dataIndex: 'user',
      render: (_, record) => {
        const { provider, nickname } = record?.user?.loginBinds[0];
        return (
          <a
            target="_blank"
            href={getHubUrl(provider, nickname)}
            className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {record?.user?.name}
          </a>
        );
      },
      ...TableDropdown.createFilterConfig('输入申请人'),
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      width: 140,
      render: (text, record) => (
        <StatusIndicator
          status={record?.tpcSoftwareSandboxReportMetric?.status}
          record={record}
        />
      ),
    },
    {
      title: '报告更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (_, record) => {
        return record?.tpcSoftwareSandboxReportMetric?.updatedAt?.slice(0, 10);
      },
    },
  ];
  return { columns };
};
