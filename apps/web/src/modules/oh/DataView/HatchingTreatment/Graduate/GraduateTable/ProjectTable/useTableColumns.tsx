import { getHubUrl } from '@common/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { getProjectId } from '@modules/oh/utils';
import { AiFillFilter } from 'react-icons/ai';
import TableDropdown from '@modules/oh/components/TableDropdown';
import useHasOhRole from '@modules/oh/hooks/useHasOhRole';

export const useTableColumns = (anction) => {
  const { hasOhRole } = useHasOhRole();
  const columns = [
    {
      title: '报告',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center text-[#3e8eff]">
            {/* {record?.targetSoftware && (
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
            )} */}
            <Popover content={'查看报告'}>
              <FileTextOutlined
                rev={undefined}
                onClick={() => {
                  window.location.hash = `graduationReportPage?taskId=${record.id}&projectId=${record?.tpcSoftwareGraduationReports[0]?.shortCode}`;
                }}
              />
            </Popover>
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
        return record?.tpcSoftwareGraduationReports?.[0].name;
      },
      // filterIcon: (filtered: boolean) => (
      //   <AiFillFilter
      //     className="text-sm"
      //     style={{ color: filtered ? '#1677ff' : undefined }}
      //   />
      // ),
      // filterDropdown: ({
      //   selectedKeys,
      //   setSelectedKeys,
      //   confirm,
      //   clearFilters,
      // }) => {
      //   return (
      //     <TableDropdown
      //       selectedKeys={selectedKeys}
      //       setSelectedKeys={setSelectedKeys}
      //       confirm={confirm}
      //       clearFilters={clearFilters}
      //       placeholder={''}
      //     />
      //   );
      // },
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
      filterIcon: (filtered: boolean) => (
        <AiFillFilter
          className="text-sm"
          style={{ color: filtered ? '#1677ff' : undefined }}
        />
      ),
      filterDropdown: ({
        selectedKeys,
        setSelectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <TableDropdown
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            placeholder={''}
          />
        );
      },
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
    // {
    //   title: '需求描述',
    //   dataIndex: 'reason',
    //   key: 'reason',
    //   ellipsis: true,
    // },
    // {
    //   title: '功能描述',
    //   dataIndex: 'functionalDescription',
    //   key: 'functionalDescription',
    //   ellipsis: true,
    // },
    {
      title: 'Committers',
      dataIndex: 'committers',
      key: 'committers',
      ellipsis: true,
      render: (_, record) => {
        return record?.committers?.join('; ');
      },
    },
    // {
    //   title: '适配仓路径',
    //   dataIndex: 'repoUrl',
    //   key: 'repoUrl',
    //   render: (_, record) => {
    //     return record?.repoUrl?.join('; ');
    //   },
    // },
  ];
  return { columns };
};
