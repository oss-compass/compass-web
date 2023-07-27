import React from 'react';
import { SiGitee, SiGithub } from 'react-icons/si';
import classnames from 'classnames';

const ProviderIcon: React.FC<{ provider: string; className?: string }> = ({
  provider,
  className,
}) => {
  if (provider === 'gitee') {
    return <SiGitee className={classnames('text-[#c71c27]', className)} />;
  }
  if (provider === 'github') {
    return <SiGithub className={classnames(className)} />;
  }

  if (provider === 'combine') {
    return (
      <div className="flex">
        <SiGitee className={classnames('mr-2 text-[#c71c27]', className)} />
        <SiGithub className={classnames(className)} />
      </div>
    );
  }

  return null;
};

export default ProviderIcon;
