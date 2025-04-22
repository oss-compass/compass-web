import React from 'react';
import { Level } from '@modules/developer/constant';
import classnames from 'classnames';
import { getLastPathSegment } from '@common/utils';
import { compareIdsRemove } from '@common/utils/links';
import { getRouteAsPath } from '@common/utils/url';
import ColorSwitcher from '@modules/developer/components/CompareBar/ColorSwitcher';
import useCompareItems from '@modules/developer/hooks/useCompareItems';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';
import qs from 'query-string';

type CompareItemProps = {
  label: string;
  name: string;
  level: Level;
  shortCode: string;
};

const CloseIcons: React.FC<CompareItemProps> = ({ shortCode }) => {
  const router = useRouter();
  const { compareSlugs } = useCompareItems();
  return (
    <div
      className="absolute top-2 right-2 hidden cursor-pointer p-2 text-white group-hover:block"
      onClick={async () => {
        const p = compareIdsRemove(compareSlugs, shortCode);
        const searchResult = qs.parse(window.location.search) || {};
        if (p.indexOf('..') > -1) {
          await router.push(
            getRouteAsPath(router.route, { slugs: p, ...searchResult })
          );
          return;
        }
        await router.push(
          getRouteAsPath(router.route, { slugs: p, ...searchResult })
        );
      }}
    >
      <AiOutlineClose className="text-base" />
    </div>
  );
};

const CompareItem: React.FC<{
  item: CompareItemProps;
  showCloseIcon: boolean;
  showColorSwitch: boolean;
  showGuideTips?: boolean;
  className?: string;
}> = (props) => {
  const {
    item,
    showColorSwitch,
    showCloseIcon,
    className,
    showGuideTips = false,
  } = props;
  return (
    <div
      className={classnames(
        className,
        'group relative min-w-[150px] flex-1 border-l-2 border-r-white bg-[#3A5BEF] p-3 '
      )}
    >
      {showCloseIcon && <CloseIcons {...item} />}
      <div className="mb-2 truncate text-2xl font-bold text-white">
        {getLastPathSegment(item.label)}
      </div>
      {showColorSwitch && (
        <ColorSwitcher
          showPickGuideIcon={true}
          showGuideTips={showGuideTips}
          label={item.label}
        />
      )}
    </div>
  );
};

export default CompareItem;
