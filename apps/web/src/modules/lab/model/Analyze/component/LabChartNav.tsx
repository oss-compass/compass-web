import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import StickyNav from '@common/components/Header/StickyNav';
import LabelItems from './LabelItems';
import NavDatePicker from '@modules/analyze/components/NavBar/NavDatePicker';

const LabChartNav = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <StickyNav className="top-0">
      <nav
        className={classnames(
          'flex h-14 items-center justify-between border-b border-t bg-white px-6',
          'md:h-12 md:px-4'
        )}
      >
        <LabelItems />
        <div className="flex items-center text-[#585858]">
          <NavDatePicker disable />
        </div>
      </nav>
    </StickyNav>
  );
};

export default LabChartNav;
