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
  return null;
};

export default ProviderIcon;
