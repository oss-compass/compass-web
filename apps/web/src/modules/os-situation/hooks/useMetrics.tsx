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
      desc: '开源贡献量以代码贡献次数（Push次数）为统计口径，用以衡量各国在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="mt-[1px] text-xl" />,
    },
    {
      name: 'import_export',
      title: '开源进出口贡献量发展态势',
      url: '/import_export',
      desc: '开源进出口贡献量是衡量国家和地区之间开源协作程度的重要指标。它被定义为某个国家或地区的开发者向其他国家或地区的开源项目贡献的代码量，即“出口”，以及该国家或地区的开源项目接受来自其他国家或地区开发者贡献的代码量，即“进口”。',
      icon: <MdImportExport className="text-xl" />,
    },
    {
      name: 'repositories',
      title: '活跃及新增开源项目发展态势',
      url: '/repositories',
      desc: '开源项目统计包括年度活跃项目和年度新增项目，年度活跃项目是指项目在当前年度有代码提交的项目；年度新增项目是指当前年度创建的项目。',
      icon: <GoRepo className="text-xl" />,
    },
    {
      name: 'topics',
      title: '技术领域代码贡献量发展态势',
      url: '/topics',
      desc: '技术领域统计具有特定技术领域的活跃开源仓库的数量。',
      icon: <MdOutlineTopic className="text-xl" />,
    },
    {
      name: 'contributors',
      title: '活跃及新增开发者发展态势',
      url: '/contributor',
      desc: '开源开发者统计包括活跃开发者和新增开发者的数量。',
      icon: <GoPeople className="text-xl" />,
    },
    {
      name: 'language',
      title: '编程语言活跃项目发展态势',
      url: '/language',
      desc: '编程语言统计具有特定编程语言的活跃开源仓库的数量。',
      icon: <GoCode className="text-xl" />,
    },
    {
      name: 'license',
      title: 'License的应用与发展',
      url: '/license',
      desc: 'License 统计具有特定 License 的活跃开源仓库的数量。',
      icon: <SVGLicense className="text-xl" />,
    },
  ];
  return merticsList;
};
export default useMetrics;
