import React from 'react';
import classnames from 'classnames';
import {
  getProvider,
  getLastPathSegment,
  getShortAnalyzeLink,
  getNameSpacePng,
} from '@common/utils';
import Link from 'next/link';
import { SiGitee } from 'react-icons/si';
import Image from 'next/image';

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
        <div className="flex items-center ">
          {origin === 'github' ? (
            <div className="h-6 w-6 overflow-hidden rounded-full border">
              <Image
                src={getNameSpacePng(url) || ''}
                unoptimized
                width={24}
                height={24}
                style={{
                  objectFit: 'cover',
                }}
                alt="icon"
              />
            </div>
          ) : (
            <SiGitee className="text-2xl text-[#c71c27]" />
          )}
          <div className="line-clamp-1 ml-2 max-w-[200px] font-bold">
            {name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;
