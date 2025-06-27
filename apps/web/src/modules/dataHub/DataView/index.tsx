import React from 'react';
import useMenuContent from '@modules/dataHub/components/SideBar/useMenuContent';
import Loading from './Loading';
import { useTranslation } from 'next-i18next';
import useHashchangeEvent from '@common/hooks/useHashchangeEvent';
import APIDocumentation from './APIDocumentation';
import ApiIntroduction from './APIDocumentation/Introduction';
import About from './About';
import ArchiveDownload from './ArchiveDownload';

const DataView = () => {
  const { t } = useTranslation();
  const { isLoading } = useMenuContent();
  const id = useHashchangeEvent();

  // 使用简单的字符串分割方法替代正则表达式
  const parts = id ? id.split(/[_-]/) : [];
  const mainKey = parts[0] || null;
  const subKey = parts[1] || null;
  console.log(mainKey, subKey);
  if (isLoading) {
    return <Loading />;
  }
  let content = null;
  console.log(mainKey);
  switch (mainKey) {
    case 'archive':
      content = <ArchiveDownload category={subKey || 'default'} />;
      break;
    case 'about':
      content = <About />;
      break;
    case 'introduction':
      content = <ApiIntroduction />;
      break;
    default:
      content = id ? <APIDocumentation id={id} /> : <About />;
  }
  return (
    <div className="relative flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-[#f2f2f2] p-4">
      <div className="w-full overflow-auto bg-white p-8 drop-shadow-sm md:p-2">
        {content}
      </div>
    </div>
  );
};

export default DataView;
