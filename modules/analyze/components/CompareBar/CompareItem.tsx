import React from 'react';
import { Level } from '@modules/analyze/constant';
import classnames from 'classnames';
import { getLastPathSegment } from '@common/utils';
import ColorSwitcher from '@modules/analyze/components/CompareBar/ColorSwitcher';
import { useRouter } from 'next/router';
import { removeSearchValue } from '@modules/analyze/components/urlTool';
import { AiOutlineClose } from 'react-icons/ai';

const CloseIcons: React.FC<{ label: string; level: Level }> = ({
  label,
  level,
}) => {
  const router = useRouter();
  return (
    <div
      className="absolute top-2 right-2 hidden cursor-pointer p-2 text-white group-hover:block"
      onClick={() => {
        const p = removeSearchValue(label);
        router.push(p);
      }}
    >
      <AiOutlineClose className="text-base" />
    </div>
  );
};

const CompareItem: React.FC<{
  item: { label: string; name: string; level: Level };
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
