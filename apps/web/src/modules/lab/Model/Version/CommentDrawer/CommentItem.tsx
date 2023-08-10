import { useEffect, useState, useRef } from 'react';
import { CommentFragment } from '@oss-compass/graphql';
import Image from 'next/image';
import CommentItemMore from './CommentItemMore';
import CommentInput, { InputRefProps } from './CommentInput';

const CommentItem = ({
  comment,
  onDeleteSuccess,
}: {
  comment: CommentFragment;
  onDeleteSuccess: () => void;
}) => {
  const ref = useRef<InputRefProps>(null);
  const [edit, setEdit] = useState(false);

  return (
    <div className="px-3 pt-3">
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
              <div className="text-secondary cursor-pointer  p-1 text-xs">
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
            <>
              <CommentInput ref={ref} loading={false} onSubmit={() => {}} />
            </>
          ) : (
            <div className="text-sm">{comment?.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
