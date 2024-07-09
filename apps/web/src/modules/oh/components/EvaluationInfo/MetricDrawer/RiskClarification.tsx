import React, { useState, useRef } from 'react';
import { Avatar, List, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CommentInput, { InputRefProps } from './CommentInput';
import {
  useLabModelCommentsQuery,
  useCreateLabModelCommentMutation,
  LabModelCommentsQuery,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';

const RiskClarification = ({ metric }) => {
  const inputRef = useRef<InputRefProps>(null);
  console.log(metric);
  const data = Array.from({ length: 3 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: '2024/07/01',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));
  const commentMutation = useCreateLabModelCommentMutation(gqlClient);

  return (
    <>
      <List
        className="oh !rounded-none"
        size="large"
        header={
          <div className="flex justify-between">
            <div className="text-base font-bold">风险澄清</div>
            {/* <Button
              title="新增风险澄清"
              className="flex items-center !rounded-none"
              size="small"
              type="primary"
              //   onClick={onClose}
            >
              <PlusOutlined rev={undefined} />
            </Button> */}
          </div>
        }
        footer={
          <div>
            <CommentInput
              ref={inputRef}
              loading={commentMutation.isLoading}
              placeholder={'按Enter发送风险澄清'}
              onSubmit={(content) => {
                console.log(content);
                // const img = images.map((i) => ({
                //   id: i.id,
                //   base64: i.base64,
                //   filename: i.name,
                // }));
                // commentMutation.mutate(
                //   {
                //     modelId,
                //     versionId,
                //     modelMetricId,
                //     content,
                //     images: img,
                //   },
                //   {
                //     onSuccess: () => {
                //       refetch();
                //       inputRef.current?.reset();
                //     },
                //   }
                // );
              }}
            />
          </div>
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
};
export default RiskClarification;
