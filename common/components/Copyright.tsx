import React from 'react';
import Link from 'next/link';
import { Center } from '@common/components/Layout';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';

const Copyright = () => {
  return (
    <div className="h-[78px] w-full bg-gray-100 md:px-4">
      <Center className="flex h-full items-center justify-between">
        <div className="flex flex-col justify-center text-gray-500">
          <p className="mb-2 text-xs ">
            Copyright © 2022 Compass. All Rights Reserved. 1st Floor, Sovereign
            House, Church Street, Brighton, BN1 1UJ
          </p>
          <p className="text-xs ">
            Company number: 03898053 | VAT number: 754 750 710
          </p>
        </div>
        <div className="flex">
          <Link href="https://gitee.com/oss-compass">
            <a target="_blank">
              <SiGitee className="mr-4 h-6 w-6 cursor-pointer" />
            </a>
          </Link>
          <Link href="https://github.com/oss-compass" passHref>
            <a target="_blank">
              <AiFillGithub className="h-6 w-6 cursor-pointer" />
            </a>
          </Link>
        </div>
      </Center>
    </div>
  );
};

export default Copyright;
