import React from 'react';
import { SiGitee, SiGithub } from 'react-icons/si';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getHostLabel } from '@common/utils';
import ColorSwitcher from '@modules/analyze/Misc/CompareBar/ColorSwitcher';
import classnames from 'classnames';
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
  const { compareItems } = useCompareItems();
  return (
    <div className="flex flex-wrap items-center">
      {compareItems.map(({ name, label, level }, index) => {
        const host = getHostLabel(label);

        const Item = (
          <>
            <Icon provider={host} />
            <span
              className={classnames('ml-1 mr-1 font-semibold', {
                'hover:underline': level === Level.REPO,
              })}
            >
              {name}
            </span>
            {compareItems.length > 1 && <ColorSwitcher label={label} />}
            {index < compareItems.length - 1 ? (
              <span className="px-2 text-slate-300">vs</span>
            ) : null}
          </>
        );

        if (level === Level.REPO) {
          return (
            <a
              key={name}
              href={level === Level.REPO ? label : 'void 0'}
              target="_blank"
              rel={'noreferrer'}
              className="flex flex-wrap items-center"
            >
              {Item}
            </a>
          );
        }

        return (
          <div key={name} className="flex flex-wrap items-center">
            {Item}
          </div>
        );
      })}
    </div>
  );
};

export default LabelItems;
