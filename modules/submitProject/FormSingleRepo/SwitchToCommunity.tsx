import { useRouter } from 'next/router';
import Button from '@modules/submitProject/Form/Button';
import React from 'react';

const SwitchToCommunity = () => {
  const router = useRouter();
  return (
    <div className="basis-80 md:mt-10">
      <div className="border-l border-gray-300 pl-10 md:border-none md:pl-0">
        <p className="mb-4 text-xl font-medium">
          Run for a community with multiple repositories?
        </p>
        <Button
          className="mb-4 !bg-[#F89E34]"
          onClick={(e) => {
            router.replace(`/submit-your-project/community`);
          }}
        >
          Submit as community
        </Button>
        <p className="text-sm text-gray-400">
          Please note that when submitted as a community, all analysis
          dimensions will be derived from community standards, which differ from
          the standards for single repository.
        </p>
      </div>
    </div>
  );
};

export default SwitchToCommunity;
