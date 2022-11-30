import React from 'react';
import { useTranslation } from 'next-i18next';
import { SiGitee, SiGithub } from 'react-icons/si';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getProvider } from '@common/utils';
import ColorSwitcher from '@modules/analyze/components/CompareBar/ColorSwitcher';
import { Level } from '@modules/analyze/constant';

const Icon: React.FC<{ provider: string }> = ({ provider, ...restProps }) => {
  if (provider === 'gitee') {
    return <SiGitee className="text-[#c71c27]" />;
  }
  if (provider === 'github') {
    return <SiGithub />;
  }
  return null;
};

const LabelItems = () => {
  const { t } = useTranslation();
  const { compareItems } = useCompareItems();
  return (
    <>
      <div className="flex flex-wrap items-center md:hidden">
        {compareItems.map(({ name, label, level }, index) => {
          const host = getProvider(label);

          let labelNode = (
            <span className={'ml-1 mr-1 font-semibold'}>{name}</span>
          );

          if (level === Level.REPO) {
            labelNode = (
              <a
                className="ml-1 mr-1 font-semibold hover:underline"
                href={label}
                target="_blank"
                rel={'noreferrer'}
              >
                {name}
              </a>
            );
          }

          return (
            <div key={label} className="flex flex-wrap items-center">
              <Icon provider={host} />
              {labelNode}
              {compareItems.length > 1 && <ColorSwitcher label={label} />}
              {level === Level.COMMUNITY && (
                <div className="ml-2 rounded-[10px] bg-[#FFF9F2] px-2 py-0.5 text-xs text-[#D98523]">
                  {t('home:community')}
                </div>
              )}
              {index < compareItems.length - 1 ? (
                <span className="px-2 text-slate-300">vs</span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="hidden md:block">
        {/* todo show compare items in mobile */}
      </div>
    </>
  );
};

export default LabelItems;
