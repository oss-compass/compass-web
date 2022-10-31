import React from 'react';
import { SiGitee, SiGithub } from 'react-icons/si';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { getHostLabel } from '@common/utils';
import ColorSwitcher from '@modules/analyze/Misc/CompareBar/ColorSwitcher';

const Icon: React.FC<{ provider: string }> = ({ provider, ...restProps }) => {
  if (provider === 'gitee') {
    return <SiGitee />;
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
      {compareItems.map(({ name, label }, index) => {
        const host = getHostLabel(label);
        return (
          <React.Fragment key={name}>
            <Icon provider={host} />
            <div className="ml-1 mr-1 font-semibold">{name}</div>
            {compareItems.length > 1 && <ColorSwitcher label={label} />}
            {index < compareItems.length - 1 ? (
              <div className="px-2 text-slate-300">vs</div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default LabelItems;
