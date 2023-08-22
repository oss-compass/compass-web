import React from 'react';
import classnames from 'classnames';
import {
  getProvider,
  getLastPathSegment,
  getShortAnalyzeLink,
} from '@common/utils';
import Link from 'next/link';
import ProviderIcon from '@common/components/ProviderIcon';

const ProjectItem = ({ shortCode, url }) => {
  const name = getLastPathSegment(url);
  const origin = getProvider(url);
  return (
    <Link
      key={name}
      href={getShortAnalyzeLink(shortCode)}
      className="flex cursor-pointer justify-between py-1"
    >
      <div className="text-sm text-black">
        <div className="flex items-center">
          <ProviderIcon className="text-2xl" provider={origin || ''} />
          <div className="line-clamp-1 ml-2 max-w-[200px] font-bold">
            {name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;
