import React from 'react';
import Link from 'next/link';
import { Center } from '@common/components/Layout';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';

interface CopyrightProps {
  dark?: boolean;
}
const Copyright = ({ dark = false }: CopyrightProps) => {
  return (
    <div className="h-[78px] w-full bg-gray-100 md:px-4">
      <Center className="flex h-full items-center justify-between">
        <div className="flex flex-col justify-center text-gray-500">
          <p className="text-xs ">
            Copyright © {new Date().getFullYear()} Compass. All Rights Reserved.
          </p>
        </div>
        <div className="flex">
          <Link href="https://gitee.com/oss-compass">
            <a target="_blank" rel="noopener noreferrer">
              <SiGitee className="mr-4 h-6 w-6 cursor-pointer text-[#c71c27]" />
            </a>
          </Link>
          <Link href="https://github.com/oss-compass" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <AiFillGithub className="h-6 w-6 cursor-pointer" />
            </a>
          </Link>
        </div>
      </Center>
    </div>
  );
};

export default Copyright;
