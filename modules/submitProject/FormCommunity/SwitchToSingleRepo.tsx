import { useRouter } from 'next/router';
import Button from '@modules/submitProject/Form/Button';
import React from 'react';

const SwitchToSingleRepo = () => {
  const router = useRouter();
  return (
    <div className="basis-80 md:mt-10">
      <div className="border-l border-gray-300 pl-10  md:border-none md:pl-0">
        <p className="mb-4 text-xl font-medium">Run for a single repository?</p>
        <Button
          className="mb-4 bg-primary"
          onClick={(e) => {
            router.replace(`/submit-your-project`);
          }}
        >
          Submit a single repository
        </Button>
        <p className="text-sm text-gray-400">
          Please note that when submitted as single repository, all analysis
          dimensions will be derived from single repository standards, which
          differ from the standards for community.
        </p>
      </div>
    </div>
  );
};

export default SwitchToSingleRepo;
