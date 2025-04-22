import { taskState } from '@modules/oh/constant';
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { TableDropdown } from '@modules/oh/components/TableDropdown';

export const useTableColumns = (anction) => {
  const columns = [
    {
      title: '操作',
      width: 80,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center gap-2 text-[#3e8eff]">
            <Popover content={'查看申请详情'}>
              <FileTextOutlined
                onClick={() => {
                  if (record.applicationType === 1) {
                    window.location.hash = `graduationReportPage?taskId=${record.id}&projectId=${record?.softwareReportShortCodes[0]}`;
                  } else {
                    window.location.hash = `reportDetailPage?taskId=${
                      record.id
                    }&projectId=${record?.softwareReportShortCodes.join('..')}`;
                  }
                }}
              />
            </Popover>
          </div>
        );
      },
    },
    {
      title: 'Issue 链接',
      key: 'issueUrl',
      dataIndex: 'issueUrl',
      width: 100,
      render: (issueUrl) => {
        return (
          <a
            target="_blank"
            href={issueUrl}
            className="block w-28 overflow-hidden truncate  whitespace-nowrap text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
          >
            {issueUrl?.slice(-6)}
          </a>
        );
      },
    },
    {
      title: '软件名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ...TableDropdown.createFilterConfig('输入申请人'),
    },
    {
      title: '申请人',
      dataIndex: 'user',
      key: 'user',
      width: 100,
      render: (_, record) => {
        return record?.user?.name;
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 110,
      sorter: true,
      render: (_, record) => {
        return record.createdAt?.slice(0, 10);
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
      title: '风险总数',
      width: 100,
      dataIndex: 'riskCount',
      key: 'riskCount',
    },
    {
      title: '待澄清/已澄清',
      key: 'awaitingClarificationCount',
      dataIndex: 'awaitingClarificationCount',
      width: 130,
      render: (_, record) => {
        return (
          <div>
            {record.awaitingClarificationCount + '/' + record.clarifiedCount}
          </div>
        );
      },
    },
    {
      title: '待确认/已确认',
      key: 'awaitingConfirmationCount',
      dataIndex: 'awaitingConfirmationCount',
      width: 130,
      render: (_, record) => {
        return (
          <div>
            {record.awaitingConfirmationCount + '/' + record.confirmedCount}
          </div>
        );
      },
    },
    {
      title: '垂域 Committer 审批人数',
      width: 200,
      key: 'committerCount',
      dataIndex: 'committerCount',
    },
    {
      title: 'TPC Leader 审批人数',
      width: 170,
      key: 'sigLeadCount',
      dataIndex: 'sigLeadCount',
    },

    {
      title: '合规专家审批人数',
      width: 150,
      key: 'complianceCount',
      dataIndex: 'complianceCount',
    },
    {
      title: '法务专家审批人数',
      width: 150,
      key: 'legalCount',
      dataIndex: 'legalCount',
    },
  ];
  return { columns };
};
