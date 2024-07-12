import { setUrlHost } from '@modules/oh/utils';
import { getHubUrl } from '@common/utils';
import { EditOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useUserInfo } from '@modules/auth/useUserInfo';

export const useTableColumns = (anction) => {
  const { currentUser } = useUserInfo();
  const columns = [
    {
      title: '软件名称',
      dataIndex: 'name',
      key: 'name',
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
    },
    {
      title: '官网地址',
      dataIndex: 'websiteUrl',
      key: 'websiteUrl',
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
    },
    {
      title: '编程语言',
      dataIndex: 'programmingLanguage',
      key: 'programmingLanguage',
    },
    {
      title: '开发商',
      dataIndex: 'manufacturer',
      key: 'time',
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
      title: '当前状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        return record?.tpcSoftwareReportMetric?.status === 'success' ? (
          <>
            <a
              target="_blank"
              onClick={() => {
                window.location.hash =
                  'reportDetailPage?projectId=' + record.shortCode;
              }}
              className="text-[#3e8eff] hover:text-[#3e8eff] hover:underline"
            >
              生成成功
            </a>
          </>
        ) : (
          '生成中'
        );
      },
    },
    {
      title: '报告更新时间',
      key: 'createdAt',
      render: (_, record) => {
        return record?.tpcSoftwareReportMetric?.createdAt?.slice(0, 10);
      },
    },
    {
      title: '操作',
      key: 'createdAt',
      width: 70,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center text-[#3e8eff]">
            {currentUser.id === record.userId && (
              <Popover content={'编辑基础信息'}>
                <EditOutlined
                  rev={undefined}
                  onClick={() => {
                    anction(record);
                    // setOpenConfirm(true);
                  }}
                />
              </Popover>
            )}
          </div>
        );
      },
    },
  ];
  return { columns };
};
