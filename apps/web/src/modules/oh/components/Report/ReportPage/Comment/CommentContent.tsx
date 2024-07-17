import React, { useState } from 'react';
import CommentEdit from '@modules/oh/components/Report/ReportPage/Comment/CommentEdit';
import CommentItemMore from '@modules/oh/components/Report/ReportPage/Comment/CommentItemMore';
import Image from 'next/image';
import { formatToNow } from '@common/utils/time';
import {
  ReportStore,
  ReportEvent,
} from '@modules/oh/components/Report/ReportPage/store/useReportStore';

const CommentContent = ({
  item,
  selectionId,
  refetch,
}: {
  item: any;
  selectionId: number;
  refetch: () => void;
}) => {
  const { content, userId, id } = item;
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="flex pb-4">
        <div className="relative h-8 w-8  shrink-0 overflow-hidden rounded-full">
          <Image
            src={
              item?.user?.loginBinds[0]?.avatarUrl ||
              '/images/default-avatar.png'
            }
            unoptimized
            fill
            sizes="64px"
            style={{
              objectFit: 'cover',
            }}
            alt={'avatar'}
          />
        </div>
        <div className="flex-1 pl-2">
          <div className="mt-1 flex items-center justify-between">
            <div className=" flex items-center ">
              <div className="text-sm font-medium">{item?.user?.name}</div>
              <div className="text-secondary ml-2 text-xs">
                {formatToNow(item?.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        {edit ? (
          <CommentEdit
            content={content}
            commentId={id}
            onUpdateSuccess={() => {
              refetch();
              setTimeout(() => {
                setEdit(false);
              }, 1000);
            }}
            onCancel={() => {
              setEdit(false);
            }}
          />
        ) : (
          content
        )}
      </div>
      <div className="absolute top-4 right-4">
        <CommentItemMore
          userId={userId}
          commentId={item.id}
          onDeleteEdit={() => {
            setEdit(true);
          }}
          onDeleteSuccess={() => {
            refetch();
            ReportStore.event$?.emit(ReportEvent.REFRESH);
          }}
        />
      </div>
    </>
  );
};

export default CommentContent;
