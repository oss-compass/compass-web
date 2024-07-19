import { getHubUrl } from '@common/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { getProjectId } from '@modules/oh/utils';

export const useTableColumns = (anction) => {
  const columns = [
    {
      title: '操作',
      width: 70,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center text-[#3e8eff]">
            {record?.targetSoftware && (
              <Popover content={'查看报告'}>
                <FileTextOutlined
                  rev={undefined}
                  onClick={() => {
                    window.location.hash = `reportDetailPage?taskId=${
                      record.id
                    }&projectId=${getProjectId(
                      record?.tpcSoftwareSelectionReports,
                      record?.targetSoftware
                    )}`;
                  }}
                />
              </Popover>
            )}
          </div>
        );
      },
    },
    {
      title: '目标孵化软件',
      dataIndex: 'targetSoftware',
      key: 'targetSoftware',
      width: 120,
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
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return text?.slice(0, 10);
      },
    },
    {
      title: '孵化周期',
      dataIndex: 'incubationTime',
      key: 'incubationTime',
    },
    {
      title: '需求来源',
      dataIndex: 'demandSource',
      key: 'demandSource',
    },
    {
      title: '需求描述',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: '功能描述',
      dataIndex: 'functionalDescription',
      key: 'functionalDescription',
      ellipsis: true,
    },
    {
      title: 'Committers',
      dataIndex: 'committers',
      key: 'committers',
      ellipsis: true,
      render: (_, record) => {
        return record?.committers?.join('; ');
      },
    },
    {
      title: '适配仓路径',
      dataIndex: 'repoUrl',
      key: 'repoUrl',
      render: (_, record) => {
        return record?.repoUrl?.join('; ');
      },
    },
  ];
  return { columns };
};
