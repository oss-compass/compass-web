import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { CommentFragment, ReplyFragment } from '@oss-compass/graphql';
import { formatToNow } from '@common/utils/time';
import useImagePreview from '@common/hooks/useImagePreview';
import CommentItemMore from './CommentItemMore';
import CommentEdit from './CommentEdit';
import CommentReply from './CommentReply';
import ImageItem from './ImageItem';

const CommentItem = ({
  parentId,
  comment,
  className,
  onDeleteSuccess,
  onUpdateSuccess,
}: {
  parentId: number;
  className?: string;
  comment: CommentFragment | ReplyFragment;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const { ref, open: openPreview, close } = useImagePreview();

  return (
    <div className={className}>
      <div className="border-smoke flex border-b pb-4">
        <div className="relative h-8 w-8  shrink-0 overflow-hidden rounded-full">
          <Image
            src={comment?.user?.avatarUrl || '/images/default-avatar.png'}
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
          <div className="mb-2 flex items-center justify-between">
            <div className=" flex items-center ">
              <div className="text-sm font-medium">{comment?.user?.name}</div>
              <div className="text-secondary ml-2 text-xs">
                {formatToNow(comment?.updatedAt)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div
                className="text-secondary cursor-pointer  p-1 text-xs"
                onClick={() => {
                  setReply(true);
                }}
              >
                {t('lab:reply')}
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
            <>
              <div className="whitespace-pre-wrap text-sm">
                {comment?.content}
              </div>
              {comment.images.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 pt-2" ref={ref}>
                  {comment.images.map((img) => {
                    return (
                      <ImageItem
                        key={img.url}
                        id={img.id}
                        src={img.url}
                        onClick={() => {
                          openPreview();
                        }}
                      />
                    );
                  })}
                </div>
              ) : null}
            </>
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

      {comment?.replies?.map?.((reply) => {
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
