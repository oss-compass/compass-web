import { setUrlHost } from '@modules/oh/utils/utils';
import { getHubUrl } from '@common/utils';
import PreviewImage from '@modules/oh/components/PreviewImage';
import EditReport from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/EvaluationBaseInfo/EditReport';
import RefreshReport from '@modules/oh/DataView/HatchingTreatment/Graduate/EvaluationInfo/EvaluationBaseInfo/RefreshReport';
import { FileTextOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { TableDropdown } from '@modules/oh/components/TableDropdown';

export const useTableColumns = (anction) => {
  const columns = [
    {
      title: '操作',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer justify-center gap-2 text-[#3e8eff]">
            {record?.graduationReportMetric?.status === 'success' ? (
              <Popover content={'查看报告'}>
                <FileTextOutlined
                  onClick={() => {
                    window.location.hash =
                      'graduationReportPage?projectId=' + record.shortCode;
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
      title: '所属领域',
      key: 'tpcSoftwareSig',
      dataIndex: 'tpcSoftwareSig',
      render: (text) => {
        return text?.name;
      },
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
      title: '上游源码地址',
      dataIndex: 'upstreamCodeUrl',
      key: 'upstreamCodeUrl',
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
      ...TableDropdown.createFilterConfig('输入上游源码地址'),
    },
    {
      title: '适配方式',
      key: 'adaptationMethod',
      dataIndex: 'adaptationMethod',
    },
    {
      title: '生命周期策略说明',
      key: 'lifecyclePolicy',
      dataIndex: 'lifecyclePolicy',
    },
    {
      title: 'Commit SHA',
      key: 'ohCommitSha',
      dataIndex: 'ohCommitSha',
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
      render: (text, record) => {
        const status = record?.graduationReportMetric?.status;
        if (status === 'success') {
          return (
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
          );
        }

        return status === 'again_progress' ? '重跑中' : '生成中';
      },
    },
    {
      title: '报告更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (_, record) => {
        return record?.graduationReportMetric?.updatedAt?.slice(0, 10);
      },
    },
  ];
  return { columns };
};
