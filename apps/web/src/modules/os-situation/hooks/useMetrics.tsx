import { useTranslation } from 'next-i18next';
import { GoRepoPush, GoPeople, GoRepo, GoCode } from 'react-icons/go';
import { MdOutlineTopic, MdImportExport } from 'react-icons/md';
import SVGLicense from 'public/images/os-situation/license.svg';

const useMetrics = () => {
  const { t } = useTranslation();
  const merticsList = [
    {
      name: 'push',
      title: t('os-situation:metrics.push.title'),
      url: '/push',
      desc: t('os-situation:metrics.push.desc'),
      icon: <GoRepoPush className="mt-[1px] text-xl" />,
    },
    {
      name: 'import_export',
      title: t('os-situation:metrics.import_export.title'),
      url: '/import_export',
      desc: t('os-situation:metrics.import_export.desc'),
      icon: <MdImportExport className="text-xl" />,
    },
    {
      name: 'repositories',
      title: t('os-situation:metrics.repositories.title'),
      url: '/repositories',
      desc: t('os-situation:metrics.repositories.desc'),
      icon: <GoRepo className="text-xl" />,
    },
    {
      name: 'topics',
      title: t('os-situation:metrics.topics.title'),
      url: '/topics',
      desc: t('os-situation:metrics.topics.desc'),
      icon: <MdOutlineTopic className="text-xl" />,
    },
    {
      name: 'contributor',
      title: t('os-situation:metrics.contributor.title'),
      url: '/contributor',
      desc: t('os-situation:metrics.contributor.desc'),
      icon: <GoPeople className="text-xl" />,
    },
    {
      name: 'language',
      title: t('os-situation:metrics.language.title'),
      url: '/language',
      desc: t('os-situation:metrics.language.desc'),
      icon: <GoCode className="text-xl" />,
    },
    {
      name: 'license',
      title: t('os-situation:metrics.license.title'),
      url: '/license',
      desc: t('os-situation:metrics.license.desc'),
      icon: <SVGLicense className="text-xl" />,
    },
  ];
  return merticsList;
};
export default useMetrics;
