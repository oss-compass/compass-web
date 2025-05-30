import { useTranslation } from 'next-i18next';
import { GoRepoPush, GoPeople, GoRepo, GoCode } from 'react-icons/go';
import { MdOutlineTopic, MdImportExport } from 'react-icons/md';
import SVGLicense from 'public/images/os-situation/license.svg';

const useMetrics = () => {
  const { t } = useTranslation();
  const merticsList = [
    {
      name: 'push',
      title: '开源贡献量发展态势',
      url: '/push',
      desc: '统计全球不同地区代码贡献（Push）次数，分析各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="mt-[1px] text-xl" />,
    },
    {
      name: 'import_export',
      title: '开源进出口贡献量发展态势',
      url: '/import_export',
      desc: '统计全球不同地区开源进出口贡献量，分析国家之间开源协作程度；',
      icon: <MdImportExport className="text-xl" />,
    },
    {
      name: 'repositories',
      title: '活跃及新增开源项目发展态势',
      url: '/repositories',
      desc: '统计全球不同地区年度活跃（当前年度有代码提交）项目和年度新增（前年度创建）项目数量，分析各国开源项目变化趋势；',
      icon: <GoRepo className="text-xl" />,
    },
    {
      name: 'topics',
      title: '技术领域代码贡献量发展态势',
      url: '/topics',
      desc: '统计全球不同地区各技术领域活跃开源仓库数量，分析各国和区域开源投入技术方向；',
      icon: <MdOutlineTopic className="text-xl" />,
    },
    {
      name: 'contributor',
      title: '活跃及新增开发者发展态势',
      url: '/contributor',
      desc: '统计全球不同地区开源活跃（当年有代码提交）开发者和新增（当年创建且有代码提交）开发者数量，分析各国开发者生态差异和趋势；',
      icon: <GoPeople className="text-xl" />,
    },
    {
      name: 'language',
      title: '编程语言活跃项目发展态势',
      url: '/language',
      desc: '统计全球不同地区各编程语言活跃开源仓库数量，分析地区编程语言使用差异和趋势；',
      icon: <GoCode className="text-xl" />,
    },
    {
      name: 'license',
      title: 'License的应用与发展态势',
      url: '/license',
      desc: '统计全球不同地区包含各主流License的活跃开源仓库数量，分析各国License使用差异和趋势；',
      icon: <SVGLicense className="text-xl" />,
    },
  ];
  return merticsList;
};
export default useMetrics;
