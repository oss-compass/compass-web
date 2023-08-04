import React from 'react';
import Center from '@common/components/Layout/Center';
import Form from '../Form';

const ModelCreate = () => {
  return (
    <div className="py-12 text-sm">
      <Center className="md:px-4">
        <div className="mb-6 text-xl font-semibold">我的模型 / 创建</div>
        <Form />
      </Center>
    </div>
  );
};

export default ModelCreate;
