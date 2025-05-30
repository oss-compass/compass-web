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
      desc: '全球TOP30国家和地区、中国TOP30城市代码贡献量（Push次数）发展态势，反映各国和地区在开源领域的实际参与度和贡献规模。',
      icon: <GoRepoPush className="mt-[1px] text-xl" />,
    },
    {
      name: 'import_export',
      title: '开源进出口贡献量发展态势',
      url: '/import_export',
      desc: '全球TOP30国家和地区开源进出口贡献量发展态势，反映国家和地区之间开源协作程度。',
      icon: <MdImportExport className="text-xl" />,
    },
    {
      name: 'repositories',
      title: '活跃及新增开源项目发展态势',
      url: '/repositories',
      desc: '全球TOP30国家和地区活跃开源项目（当年有代码提交）数量和年度新增（当年创建）项目数量发展态势，反映各国和地区的开源创新活力与持续发展能力。',
      icon: <GoRepo className="text-xl" />,
    },
    {
      name: 'topics',
      title: '技术领域代码贡献量及开发者发展态势',
      url: '/topics',
      desc: '全球代码贡献量TOP17技术领域发展态势，分析各国家和地区在各技术领域代码贡献量、活跃开发者数量和新增开发者数量，反映各国和地区开源投入技术方向。',
      icon: <MdOutlineTopic className="text-xl" />,
    },
    {
      name: 'contributor',
      title: '活跃及新增开发者发展态势',
      url: '/contributor',
      desc: '全球TOP30国家和地区开源开发者活跃（当年有代码提交）和新增（当年注册且有代码提交）数量发展态势，反映各国开发者生态差异和趋势。',
      icon: <GoPeople className="text-xl" />,
    },
    {
      name: 'language',
      title: '编程语言活跃项目发展态势',
      url: '/language',
      desc: '全球不同地区编程语言活跃开源仓库数量发展态势，反映不同国家和地区的编程语言偏好和差异。',
      icon: <GoCode className="text-xl" />,
    },
    {
      name: 'license',
      title: 'License的应用与发展态势',
      url: '/license',
      desc: '全球不同地区License活跃开源仓库数量发展态势，反映不同国家和地区License使用差异和不同License 影响力。',
      icon: <SVGLicense className="text-xl" />,
    },
  ];
  return merticsList;
};
export default useMetrics;
