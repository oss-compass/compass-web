import type { MenuProps } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  ProjectOutlined,
} from '@ant-design/icons';

import ContributeOverview from '@modules/oh/DataView/Contribute/ContributeOverview';
import CodeStatistics from '@modules/oh/DataView/Contribute/CodeStatistics';
import CommitterStatistics from '@modules/oh/DataView/Contribute/CommitterStatistics';
import CommunityContributions from '@modules/oh/DataView/Contribute/CommunityContributions';
import CommunityOverview from '@modules/oh/DataView/Community/CommunityOverview';
import CommunityManagement from '@modules/oh/DataView/Community/CommunityManagement';
import SigCenter from '@modules/oh/DataView/Community/SigCenter';
import SandboxReport from '@modules/oh/DataView/HatchingTreatment/Sandbox/SandboxReport';
import SandboxProject from '@modules/oh/DataView/HatchingTreatment/Sandbox/SandboxProject';
import SandboxTable from '@modules/oh/DataView/HatchingTreatment/Sandbox/SandboxTable';
import HatchReport from '@modules/oh/DataView/HatchingTreatment/Hatch/HatchReport';
import HatchProject from '@modules/oh/DataView/HatchingTreatment/Hatch/HatchProject';
import HatchTable from '@modules/oh/DataView/HatchingTreatment/Hatch/HatchTable';
import Graduate from '@modules/oh/DataView/HatchingTreatment/Graduate';
import BoardSandbox from '@modules/oh/DataView/HatchingTreatment/Workbench/BoardSandbox';
import BoardHatch from '@modules/oh/DataView/HatchingTreatment/Workbench/BoardHatch';
import BoardGraduateBoard from '@modules/oh/DataView/HatchingTreatment/Workbench/BoardGraduateBoard';
import DetailPage from '@modules/oh/DataView/HatchingTreatment/Workbench/DetailPage';

type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    key: 'sub1',
    label: '社区总览',
    icon: <TeamOutlined rev={undefined} />,
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
    icon: <PieChartOutlined rev={undefined} />,
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
    icon: <ProjectOutlined rev={undefined} />,
    children: [
      {
        key: 'sandbox',
        label: '沙箱项目 (孵化选型)',
        children: [
          {
            key: 'sandboxReport',
            label: '报告申请',
          },
          {
            key: 'sandboxProject',
            label: '选型申请',
          },
          {
            key: 'sandboxTable',
            label: '申请列表',
          },
        ],
      },
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
            label: '选型申请',
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
      },
      {
        key: 'board',
        label: '治理看板',
        children: [
          {
            key: 'boardSandbox',
            label: '沙箱项目',
          },
          {
            key: 'boardHatch',
            label: '孵化项目',
          },
          {
            key: 'boardGraduateBoard',
            label: '毕业项目',
          },
        ],
      },
    ],
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
  sandboxReport: <SandboxReport />,
  sandboxProject: <SandboxProject />,
  sandboxTable: <SandboxTable />,
  hatchReport: <HatchReport />,
  hatchProject: <HatchProject />,
  hatchTable: <HatchTable />,
  // hatchReport: <Graduate />,
  // hatchProject: <Graduate />,
  // hatchTable: <Graduate />,
  graduate: <Graduate />,
  boardSandbox: <BoardSandbox />,
  boardHatch: <BoardHatch />,
  boardGraduateBoard: <BoardGraduateBoard />,
  reportDetailPage: <DetailPage />,
};
