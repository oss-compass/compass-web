import { getHubUrl } from '@common/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { taskState } from '@modules/oh/constant';
import { TableDropdown } from '@modules/oh/components/TableDropdown';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';
import EditApply from './EditApply';

export const useTableColumns = (anction) => {
  const { hasOhRole } = useHasOhRole();
  const columns = [
    {
      title: '操作',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center gap-2 text-[#3e8eff]">
            <Popover content={'查看申请详情'}>
              <FileTextOutlined
                onClick={() => {
                  window.location.hash = `graduationReportPage?taskId=${record.id}&projectId=${record?.tpcSoftwareGraduationReports[0]?.shortCode}`;
                }}
              />
            </Popover>
            <EditApply report={record} editSuccess={anction} />
          </div>
        );
      },
    },
    {
      title: '毕业软件',
      dataIndex: 'targetSoftware',
      key: 'targetSoftware',
      width: 140,
      render: (_, record) => {
        return record?.tpcSoftwareGraduationReports?.[0]?.name;
      },
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
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (text) => {
        return text?.slice(0, 10);
      },
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      width: 120,
      filters: taskState,
      render: (text) => {
        return taskState.find((i) => i.value === text)?.text || text;
      },
    },
    {
      title: '孵化周期',
      dataIndex: 'incubationTime',
      key: 'incubationTime',
    },
    ...(hasOhRole
      ? [
          {
            title: '需求来源',
            dataIndex: 'demandSource',
            key: 'demandSource',
          },
          {
            title: '功能描述',
            dataIndex: 'functionalDescription',
            key: 'functionalDescription',
          },
        ]
      : []),
    {
      title: '垂域 Committers',
      dataIndex: 'committers',
      key: 'committers',
      ellipsis: true,
      render: (_, record) => {
        return record?.committers?.join('; ');
      },
    },
    {
      title: 'Issue 链接',
      key: 'issueUrl',
      width: 100,
      dataIndex: 'issueUrl',
      render: (issueUrl) => {
        return (
          <a
            target="_blank"
            href={issueUrl}
            className="line-clamp-1 whitespace-nowrap text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {issueUrl?.slice(-6)}
          </a>
        );
      },
    },
  ];
  return { columns };
};
