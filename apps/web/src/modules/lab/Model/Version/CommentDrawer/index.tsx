import React, { useRef } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { GrClose } from 'react-icons/gr';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  useLabModelCommentsQuery,
  useCreateLabModelCommentMutation,
} from '@oss-compass/graphql';
import last from 'lodash/last';
import gqlClient from '@common/gqlClient';
import { BsArrowDown, BsArrowUp, BsLink45Deg } from 'react-icons/bs';
import CommentInput, { InputRefProps } from './CommentInput';
import CommentItem from './CommentItem';

const CommentDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const inputRef = useRef<InputRefProps>(null);
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  const params = { modelId, versionId, page: 1, per: 10 };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery(
      useLabModelCommentsQuery.getKey(params),
      async (arg) => {
        const { pageParam } = arg;
        return await useLabModelCommentsQuery.fetcher(gqlClient, {
          ...params,
          ...pageParam,
        })();
      },
      {
        getNextPageParam: (lastPage) => {
          const page = lastPage?.labModelComments?.page! || 0;
          const totalPage = lastPage?.labModelComments?.totalPage! || 0;
          if (totalPage > page) {
            return { page: page + 1 };
          }
          return null;
        },
      }
    );

  const commentMutation = useCreateLabModelCommentMutation(gqlClient);

  return (
    <div
      className={classnames(
        'border-silver shrink-0 overflow-hidden  border-l transition-all',
        [open ? 'w-[400px] opacity-100' : 'w-0 opacity-0']
      )}
    >
      <div className="flex h-10 items-center justify-between border-b border-[#EAEAEA] bg-[#FAFAFA] pl-4 pr-2">
        <div className="text-sm">讨论（10）</div>
        <div className="flex items-center">
          <div className="text-xs">基于版本：V20230711.13.19</div>
          <div
            className="hover:bg-smoke ml-2 cursor-pointer p-2"
            onClick={() => {
              onClose();
            }}
          >
            <GrClose className="" />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-10">
        <div className="rounded border border-black pb-4">
          <div className="flex items-center justify-between py-3 px-4 ">
            <div className="font-semibold"># Code Quality Guarantee</div>
            <div className="flex">
              <div className="cursor-pointer px-1">
                <BsArrowDown />
              </div>
              <div className="cursor-pointer px-1">
                <BsArrowUp />
              </div>
              <div className="cursor-pointer px-1">
                <BsLink45Deg />
              </div>
            </div>
          </div>

          {data?.pages?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.labModelComments.items?.map((comment) => {
                  return (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      onDeleteSuccess={() => {
                        refetch();
                      }}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}

          {hasNextPage ? (
            <div
              className="text-primary cursor-pointer py-2 text-center text-xs"
              onClick={() => {
                fetchNextPage();
              }}
            >
              {isFetchingNextPage ? '加载中...' : '加载更多'}
            </div>
          ) : null}

          <CommentInput
            ref={inputRef}
            loading={commentMutation.isLoading}
            onSubmit={(content) => {
              commentMutation.mutate(
                { modelId, versionId, content },
                {
                  onSuccess: () => {
                    refetch();
                    inputRef.current?.reset();
                  },
                }
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentDrawer;
