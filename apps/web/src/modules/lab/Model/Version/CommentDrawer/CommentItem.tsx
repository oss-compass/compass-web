import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { CommentFragment } from '@oss-compass/graphql';
import CommentItemMore from './CommentItemMore';
import CommentEdit from './CommentEdit';
import CommentReply from './CommentReply';

const CommentItem = ({
  parentId,
  comment,
  className,
  onDeleteSuccess,
  onUpdateSuccess,
}: {
  parentId: number;
  className?: string;
  comment: CommentFragment;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}) => {
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);

  return (
    <div className={className}>
      <div className="border-smoke flex border-b pb-4">
        <div className="relative h-8 w-8  shrink-0 overflow-hidden rounded-full">
          <Image
            src={comment?.user?.avatarUrl}
            unoptimized
            fill
            sizes="64px"
            style={{
              objectFit: 'cover',
            }}
            alt={''}
          />
        </div>
        <div className="flex-1 pl-2">
          <div className="mb-2 flex items-center justify-between">
            <div className=" flex items-center ">
              <div className="text-sm font-medium">{comment?.user?.name}</div>
              <div className="text-secondary ml-2 text-xs">04.09.2018</div>
            </div>
            <div className="flex items-center justify-between">
              <div
                className="text-secondary cursor-pointer  p-1 text-xs"
                onClick={() => {
                  setReply(true);
                }}
              >
                reply
              </div>
              <CommentItemMore
                comment={comment}
                onDeleteEdit={() => {
                  setEdit(true);
                }}
                onDeleteSuccess={onDeleteSuccess}
              />
            </div>
          </div>

          {edit ? (
            <CommentEdit
              comment={comment}
              onUpdateSuccess={() => {
                setEdit(false);
                onUpdateSuccess();
              }}
              onCancel={() => {
                setEdit(false);
              }}
            />
          ) : (
            <div className="text-sm">{comment?.content}</div>
          )}

          {reply ? (
            <CommentReply
              parentId={parentId}
              comment={comment}
              onReplySuccess={() => {
                setReply(false);
                onUpdateSuccess();
              }}
              onCancel={() => {
                setReply(false);
              }}
            />
          ) : null}
        </div>
      </div>

      {comment.replies?.map?.((reply) => {
        return (
          <CommentItem
            parentId={parentId}
            className="pl-6 pt-3"
            key={reply.id}
            comment={reply}
            onDeleteSuccess={() => {
              onDeleteSuccess();
            }}
            onUpdateSuccess={() => {
              onUpdateSuccess();
            }}
          />
        );
      })}
    </div>
  );
};

export default CommentItem;
