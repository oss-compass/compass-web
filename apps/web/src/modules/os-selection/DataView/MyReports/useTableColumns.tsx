import react from 'react';
import { getHubUrl, setUrlHost } from '@common/utils';
import RefreshReport from './RefreshReport';
import DeleteReport from './DeleteReport'; // 导入 DeleteReport 组件
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { TableDropdown } from '@modules/os-selection/components/TableDropdown';
import Link from 'next/link';
import { useStatusMap } from '@modules/os-selection/constant';
import { useTranslation } from 'next-i18next';

const StatusIndicator: React.FC<{ status: string; record: any }> = react.memo(
  ({ status, record }) => {
    const STATUS_MAP = useStatusMap();
    if (status === 'success') {
      return (
        <Link href={'/os-selection/report?projectId=' + record.shortCode}>
          {STATUS_MAP[status]}
        </Link>
      );
    }
    return STATUS_MAP[status] || STATUS_MAP.default;
  }
);
StatusIndicator.displayName = 'StatusIndicator';
export const useTableColumns = (anction) => {
  const { t } = useTranslation('os-selection');
  const columns = [
    {
      title: t('my_reports.table.operation'),
      key: 'createdAt',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center gap-2 text-[#3e8eff]">
            {record?.tpcSoftwareReportMetric?.status === 'success' ? (
              <Popover content={t('my_reports.table.view_report')}>
                <Link
                  href={'/os-selection/report?projectId=' + record.shortCode}
                >
                  <FileTextOutlined />
                </Link>
              </Popover>
            ) : (
              <Popover content={t('my_reports.table.report_generating')}>
                <FileTextOutlined className="cursor-not-allowed text-[#ABABAB]" />
              </Popover>
            )}
            <RefreshReport report={record} editSuccess={anction} />
            <DeleteReport report={record} deleteSuccess={anction} />{' '}
            {/* 添加 DeleteReport 组件 */}
          </div>
        );
      },
    },
    {
      title: t('my_reports.table.software_name'),
      dataIndex: 'name',
      key: 'name',
      ...TableDropdown.createFilterConfig(
        t('my_reports.table.enter_software_name')
      ),
    },
    {
      title: t('my_reports.table.source_code_address'),
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
      ...TableDropdown.createFilterConfig(
        t('my_reports.table.enter_source_code_address')
      ),
    },
    {
      title: t('my_reports.table.applicant'),
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
      ...TableDropdown.createFilterConfig(
        t('my_reports.table.enter_applicant')
      ),
    },
    {
      title: t('my_reports.table.current_status'),
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => (
        <StatusIndicator
          status={record?.tpcSoftwareReportMetric?.status}
          record={record}
        />
      ),
    },
    {
      title: t('my_reports.table.report_update_time'),
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (_, record) => {
        return record?.tpcSoftwareReportMetric?.updatedAt?.slice(0, 10);
      },
    },
  ];
  return { columns };
};
