import React from 'react';
import { SiGitee, SiGithub } from 'react-icons/si';
import Center from '@common/components/Layout/Center';
import Button from '@common/components/Button';

const Subscribe = () => {
  return (
    <Center widthClassName="w-[1000px] pb-20 lg:px-6">
      <div className="flex justify-between pb-3 pt-10">
        <div className="text-xl font-bold">My subscriptions</div>
        <div>
          <Button size="sm" intent="secondary" className="">
            Submit a project
          </Button>
        </div>
      </div>

      <div className="flex border-b py-3">
        <div>
          <div>
            <SiGithub />
          </div>
          <div></div>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="w-[200px] text-sm text-[#868690]">
            Updated on 2023-04-28
          </div>
        </div>
        <div>Unsubscribe</div>
      </div>
    </Center>
  );
};

export default Subscribe;
