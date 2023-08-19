import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCopyToClipboard } from 'react-use';
import {
  useLabModelCommentsQuery,
  useCreateLabModelCommentMutation,
  LabModelCommentsQuery,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useSnapshot } from 'valtio';
import classnames from 'classnames';
import { last } from 'lodash';
import { BsArrowDown, BsArrowUp, BsLink45Deg } from 'react-icons/bs';
import CommentInput, { InputRefProps } from './CommentInput';
import CommentItem from './CommentItem';
import { pageState, actions } from '../state';

const CommentSection = ({
  name,
  anchor,
  modelMetricId,
}: {
  name: string;
  anchor: string;
  // nextAnchor?: string;
  // preAnchor?: string;
  modelMetricId?: number;
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<InputRefProps>(null);
  const router = useRouter();
  const [_, copyToClipboard] = useCopyToClipboard();
  const snapshot = useSnapshot(pageState);
  const [direction, setDirection] = useState('desc');

  const modelId = Number(router.query.model);
  const versionId = snapshot.commentVersion?.id;
  const commentAnchor = `comment_${anchor}`;

  const params = {
    modelId,
    versionId,
    modelMetricId,
    direction,
    page: 1,
    per: 10,
  };

  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    useLabModelCommentsQuery.getKey(params),
    async (arg) => {
      const { pageParam } = arg;
      return await useLabModelCommentsQuery.fetcher(gqlClient, {
        ...params,
        ...pageParam,
      })();
    },
    {
      staleTime: 60 * 1000,
      getNextPageParam: (lastPage) => {
        const count = lastPage?.labModelComments?.count! || 0;

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

  const list = data?.pages?.reduce<
    LabModelCommentsQuery['labModelComments']['items']
  >((acc, cur) => {
    return acc.concat(cur.labModelComments.items);
  }, []);

  const lastPage = last(data?.pages);
  const totalCount = lastPage?.labModelComments?.count || 0;

  const meta = snapshot.commentMeta[anchor];
  useEffect(() => {
    actions.onSyncCommentCount(anchor, totalCount);
    if (totalCount > 0) {
      actions.toggleCommentDrawer(true);
    }
  }, [anchor, totalCount]);

  const isActive = snapshot.commentActiveId === anchor;
  useEffect(() => {
    if (isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div
      className={classnames('pt-12', [
        !isLoading && totalCount === 0 && !meta?.show ? 'hidden' : '',
      ])}
    >
      <div
        id={commentAnchor}
        className={classnames(
          'base-card',
          'group scroll-mt-[200px] rounded border pb-4',
          [isActive ? 'border-black' : '']
        )}
      >
        <div className="flex items-center justify-between py-3 px-4 ">
          <div className="group font-semibold">
            # {name}
            <a href={`#${commentAnchor}`}>
              <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
                #
              </span>
            </a>
          </div>
          <div className="flex shrink-0">
            {direction === 'asc' ? (
              <div
                className={classnames('cursor-pointer px-1 group-hover:block', [
                  isActive ? 'block' : 'hidden',
                ])}
                onClick={() => {
                  setDirection('desc');
                }}
              >
                <BsArrowDown />
              </div>
            ) : null}
            {direction === 'desc' ? (
              <div
                className={classnames('cursor-pointer px-1 group-hover:block', [
                  isActive ? 'block' : 'hidden',
                ])}
                onClick={() => {
                  setDirection('asc');
                }}
              >
                <BsArrowUp />
              </div>
            ) : null}
            <div
              onClick={() => {
                const origin = window.location.origin;
                const pathname = window.location.pathname;
                copyToClipboard(origin + pathname + '#' + commentAnchor);
              }}
              className={classnames('cursor-pointer px-1 group-hover:block', [
                isActive ? 'block' : 'hidden',
              ])}
            >
              <BsLink45Deg />
            </div>
          </div>
        </div>

        {list?.map?.((comment) => {
          return (
            <CommentItem
              className="px-3 pt-3"
              key={comment.id}
              parentId={comment.id}
              comment={comment}
              onDeleteSuccess={() => {
                refetch();
              }}
              onUpdateSuccess={() => {
                refetch();
              }}
            />
          );
        })}

        {hasNextPage ? (
          <div
            className="text-primary cursor-pointer py-2 text-center text-xs"
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetchingNextPage
              ? t('common:loading_more')
              : t('common:load_more')}
          </div>
        ) : null}

        <div className="px-3 pt-3">
          <CommentInput
            ref={inputRef}
            loading={commentMutation.isLoading}
            onSubmit={(content, images) => {
              const img = images.map((i) => ({
                id: i.id,
                base64: i.base64,
                filename: i.name,
              }));
              commentMutation.mutate(
                {
                  modelId,
                  versionId,
                  modelMetricId,
                  content,
                  images: img,
                },
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

export default CommentSection;
