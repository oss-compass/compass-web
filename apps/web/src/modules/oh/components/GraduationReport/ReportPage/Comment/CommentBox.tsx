import React, { useState, useRef } from 'react';
import { Avatar, List, Button } from 'antd';
import CommentInput, {
  InputRefProps,
} from '@modules/oh/components/EvaluationInfo/MetricDrawer/CommentInput';
import CommentContent from './CommentContent';
import {
  useTpcSoftwareSelectionCommentPageQuery,
  useCreateTpcSoftwareSelectionCommentMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  ReportStore,
  ReportEvent,
} from '@modules/oh/components/GraduationReport/ReportPage/store/useReportStore';

const CommentBox = ({ taskId: selectionId }) => {
  const inputRef = useRef<InputRefProps>(null);
  //   const [listData, setListData] = useState([]);
  const params = {
    selectionId,
    page: 1,
    per: 50,
    reportType: 1,
  };
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    useTpcSoftwareSelectionCommentPageQuery.getKey(params),
    async (arg) => {
      const { pageParam } = arg;
      return await useTpcSoftwareSelectionCommentPageQuery.fetcher(gqlClient, {
        ...params,
        ...pageParam,
      })();
    },
    {
      onSuccess(data) {
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
    return acc.concat(cur.tpcSoftwareSelectionCommentPage.items);
  }, []);
  const commentMutation =
    useCreateTpcSoftwareSelectionCommentMutation(gqlClient);

  return (
    <>
      <List
        className="oh !rounded-none"
        size="large"
        footer={
          <div>
            <CommentInput
              ref={inputRef}
              loading={commentMutation.isLoading}
              placeholder={'按Enter发送评论'}
              onSubmit={(content) => {
                commentMutation.mutate(
                  {
                    selectionId,
                    content,
                    reportType: 1,
                  },
                  {
                    onSuccess: () => {
                      toast.success('发送成功');
                      refetch();
                      inputRef.current?.reset();
                      ReportStore.event$?.emit(ReportEvent.REFRESH);
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
          <List.Item
            key={item.id}
            className="relative flex flex-col !items-start"
          >
            <CommentContent
              selectionId={selectionId}
              item={item}
              refetch={() => refetch()}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default CommentBox;
