import { setUrlHost } from '@modules/oh/utils';
import { getHubUrl } from '@common/utils';
import { EditOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useUserInfo } from '@modules/auth/useUserInfo';

export const useTableColumns = (anction) => {
  const { currentUser } = useUserInfo();
  const columns = [
    // {
    //   title: '软件名称',
    //   dataIndex: 'name',
    //   key: 'name',
    //   render: (_, record) => {
    //     return record?.tpcSoftwareSelectionReports
    //       ?.map((item) => item.name)
    //       .join(', ');
    //   },
    // },
    {
      title: '目标选型软件',
      dataIndex: 'targetSoftware',
      key: 'targetSoftware',
    },
    {
      title: '引入方式',
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
    },
    {
      title: '功能描述',
      dataIndex: 'functionalDescription',
      key: 'functionalDescription',
    },
    {
      title: 'Committers',
      dataIndex: 'committers',
      key: 'committers',
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
