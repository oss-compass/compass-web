import React from 'react';
import { SiGitee, SiGithub } from 'react-icons/si';
import Image from 'next/image';
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
  if (provider === 'gitcode') {
    return (
      <Image
        src="/images/logos/gitcode.png"
        alt="gitcode"
        width={16}
        height={16}
        className={classnames(className)}
      />
    );
  }

  if (provider === 'combine') {
    return (
      <>
        <div className="absolute -bottom-0.5 right-2 z-10 rounded-full bg-white p-0.5">
          <SiGitee className={classnames('text-[#c71c27]', className)} />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 z-10 rounded-full bg-white p-0.5">
          <SiGithub className={classnames('', className)} />
        </div>
      </>
    );
  }

  return null;
};

export default ProviderIcon;
