import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@oss-compass/ui';
import { Center } from '@common/components/Layout';
import ModelItem from './ModelItem';

const Index = () => {
  const router = useRouter();
  return (
    <div className="flex-1 bg-[#FAFAFA] pb-10">
      <Center>
        <div className="flex items-center justify-between pt-10 pb-4">
          <div className="font-semibold">我的模型</div>
          <div>
            <Button
              size="sm"
              onClick={() => {
                router.push('/lab/model/create');
              }}
            >
              新建模型
            </Button>
          </div>
        </div>
        <ModelItem />
        <ModelItem />
      </Center>
    </div>
  );
};

export default Index;
