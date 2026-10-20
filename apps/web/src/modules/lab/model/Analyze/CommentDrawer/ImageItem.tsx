import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';

const ImageItem = ({
  className,
  id,
  src,
  onDelete,
  onClick,
}: {
  className?: string;
  id: number;
  src: string;
  onDelete?: (id: number) => void;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => onClick()}
      className={classnames(
        'bg-silver border-smoke relative h-14 w-14 cursor-pointer overflow-hidden rounded border shadow-2xl',
        className
      )}
    >
      <Image
        src={src}
        unoptimized
        fill
        sizes="100px"
        style={{
          objectFit: 'cover',
        }}
        alt={''}
      />
      {onDelete ? (
        <button
          type="button"
          aria-label={t('common:btn.delete')}
          className="z-1 absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded bg-black/10"
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.(id);
          }}
        >
          <AiOutlineClose className="text-white" />
        </button>
      ) : null}
    </div>
  );
};

export default ImageItem;
