import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

const ImageItem = ({
  className,
  id,
  src,
  onDelete,
}: {
  className?: string;
  id: number;
  src: string;
  onDelete?: (id: number) => void;
}) => {
  return (
    <div
      className={classnames(
        'bg-silver border-silver relative h-14 w-14 cursor-pointer overflow-hidden rounded shadow-2xl',
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
        <div
          className="z-1 absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded bg-black/10"
          onClick={() => {
            onDelete?.(id);
          }}
        >
          <AiOutlineClose className="text-white" />
        </div>
      ) : null}
    </div>
  );
};

export default ImageItem;
