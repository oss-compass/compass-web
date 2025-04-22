import type { MenuProps } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  ProjectOutlined,
  FundOutlined,
} from '@ant-design/icons';

import ContributeOverview from '@modules/oh/DataView/Contribute/ContributeOverview';
import CodeStatistics from '@modules/oh/DataView/Contribute/CodeStatistics';
import CommitterStatistics from '@modules/oh/DataView/Contribute/CommitterStatistics';
import CommunityContributions from '@modules/oh/DataView/Contribute/CommunityContributions';
import CommunityOverview from '@modules/oh/DataView/Community/CommunityOverview';
import CommunityManagement from '@modules/oh/DataView/Community/CommunityManagement';
import SigCenter from '@modules/oh/DataView/Community/SigCenter';
import HatchReport from '@modules/oh/DataView/HatchingTreatment/Hatch/HatchReport';
import HatchProject from '@modules/oh/DataView/HatchingTreatment/Hatch/HatchProject';
import HatchTable from '@modules/oh/DataView/HatchingTreatment/Hatch/HatchTable';
import UserWorkbench from '@modules/oh/DataView/HatchingTreatment/UserWorkbench';
import ReportPage from '@modules/oh/DataView/HatchingTreatment/Hatch/Report/ReportPage';
import GraduateReport from '@modules/oh/DataView/HatchingTreatment/Graduate/GraduateReport';
import GraduateProject from '@modules/oh/DataView/HatchingTreatment/Graduate/GraduateProject';
import GraduateTable from '@modules/oh/DataView/HatchingTreatment/Graduate/GraduateTable';
import GraduationReport from '@modules/oh/DataView/HatchingTreatment/Graduate/Report/ReportPage';
// import SelectionReport from '@modules/oh/DataView/HatchingTreatment/Selection/SelectionReport';
// import SelectionProject from '@modules/oh/DataView/HatchingTreatment/Selection/SelectionProject';
// import SelectionTable from '@modules/oh/DataView/HatchingTreatment/Selection/SelectionTable';
// import SelectionReportPage from '@modules/oh/DataView/HatchingTreatment/Selection/Report/ReportPage';

type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    key: 'sub1',
    label: '社区总览',
    icon: <TeamOutlined />,
    children: [
      {
        key: 'communityOverview',
        label: '总览',
      },
      {
        key: 'sigCenter',
        label: 'SIG 管理',
      },
      {
        key: 'communityManagement',
        label: '社区管理',
      },
    ],
  },
  {
    key: 'sub2',
    label: '贡献价值',
    icon: <PieChartOutlined />,
    children: [
      {
        key: 'contributeOverview',
        label: '总览',
      },
      {
        key: 'code',
        label: '代码量统计',
      },
      {
        key: 'committer',
        label: 'Committer 贡献统计',
      },
      {
        key: 'communityContributions',
        label: '社区贡献统计',
      },
    ],
  },
  {
    key: 'sub3',
    label: 'TPC 治理',
    icon: <ProjectOutlined />,
    children: [
      // {
      //   key: 'selection',
      //   label: '选型项目',
      //   children: [
      //     {
      //       key: 'selectionReport',
      //       label: '报告申请',
      //     },
      //     {
      //       key: 'selectionProject',
      //       label: '孵化申请',
      //     },
      //     {
      //       key: 'selectionTable',
      //       label: '申请列表',
      //     },
      //   ],
      // },
      {
        key: 'hatch',
        label: '孵化项目',
        children: [
          {
            key: 'hatchReport',
            label: '报告申请',
          },
          {
            key: 'hatchProject',
            label: '孵化申请',
          },
          {
            key: 'hatchTable',
            label: '申请列表',
          },
        ],
      },
      {
        key: 'graduate',
        label: '毕业项目',
        children: [
          {
            key: 'graduateReport',
            label: '报告申请',
          },
          {
            key: 'graduateProject',
            label: '毕业申请',
          },
          {
            key: 'graduateTable',
            label: '申请列表',
          },
        ],
      },
    ],
  },
  {
    key: 'userWorkbench',
    label: '工作台',
    icon: <FundOutlined />,
  },
];
export const componentMap = {
  communityOverview: <CommunityOverview />,
  sigCenter: <SigCenter />,
  communityManagement: <CommunityManagement />,
  contributeOverview: <ContributeOverview />,
  code: <CodeStatistics />,
  committer: <CommitterStatistics />,
  communityContributions: <CommunityContributions />,

  hatchReport: <HatchReport />,
  hatchProject: <HatchProject />,
  hatchTable: <HatchTable />,
  graduateReport: <GraduateReport />,
  graduateProject: <GraduateProject />,
  graduateTable: <GraduateTable />,

  reportDetailPage: <ReportPage />,
  graduationReportPage: <GraduationReport />,
  // selectionReport: <SelectionReport />,
  // selectionProject: <SelectionProject />,
  // selectionTable: <SelectionTable />,
  // selectionReportPage: <SelectionReportPage />,
  userWorkbench: <UserWorkbench />,
};
