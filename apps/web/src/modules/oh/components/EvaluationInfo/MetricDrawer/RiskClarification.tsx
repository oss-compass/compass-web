import React, { useState, useRef } from 'react';
import { Avatar, List, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CommentInput, { InputRefProps } from './CommentInput';
import {
  useTpcSoftwareReportMetricClarificationPageQuery,
  useCreateTpcSoftwareReportMetricClarificationMutation,
  LabModelCommentsQuery,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const RiskClarification = ({ metric, shortCode }) => {
  const inputRef = useRef<InputRefProps>(null);
  const metricName = metric.key;
  //   const [listData, setListData] = useState([]);
  const params = {
    shortCode,
    metricName,
    page: 1,
    per: 20,
  };
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    useTpcSoftwareReportMetricClarificationPageQuery.getKey(params),
    async (arg) => {
      const { pageParam } = arg;
      return await useTpcSoftwareReportMetricClarificationPageQuery.fetcher(
        gqlClient,
        {
          ...params,
          ...pageParam,
        }
      )();
    },
    {
      onSuccess(data) {
        console.log(data.pages[0]);
        // setListData(data.)
      },
      staleTime: 60 * 1000,
      getNextPageParam: (lastPage) => {
        // const count = lastPage?.labModelComments?.count! || 0;
        // const page = lastPage?.labModelComments?.page! || 0;
        // const totalPage = lastPage?.labModelComments?.totalPage! || 0;
        // if (totalPage > page) {
        //   return { page: page + 1 };
        // }
        // return null;
      },
    }
  );
  const listData = data?.pages?.reduce((acc, cur) => {
    return acc.concat(cur.tpcSoftwareReportMetricClarificationPage.items);
  }, []);
  const commentMutation =
    useCreateTpcSoftwareReportMetricClarificationMutation(gqlClient);

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
                commentMutation.mutate(
                  {
                    shortCode,
                    metricName,
                    content,
                  },
                  {
                    onSuccess: () => {
                      refetch();
                      console.log(123);
                      inputRef.current?.reset();
                    },
                  }
                );
              }}
            />
          </div>
        }
        bordered
        loading={isLoading || isFetchingNextPage}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item?.user?.loginBinds[0]?.avatarUrl} />}
              title={<a>{item?.user?.name}</a>}
              description={item.updatedAt.slice(0, 10)}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
};
export default RiskClarification;
