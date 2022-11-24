import React from 'react';
import classnames from 'classnames';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import { PopContent } from './plantConfig';
import styles from './index.module.scss';

const PopCard: React.FC<{
  className?: string;
  popContent: PopContent;
  onNext: () => void;
}> = ({ className, popContent, onNext }) => {
  return (
    <div
      className={classnames(
        styles.popCardBg,
        'absolute h-[141px] w-[304px] rounded p-4 transition-all',
        className
      )}
    >
      <h2 className="text-white">{popContent.title}</h2>
      <p className="mb-4 max-h-[60px] break-words text-xs text-gray-400 line-clamp-4">
        {popContent.content}
      </p>
      <div className="flex justify-between">
        <Link href={popContent.hash}>
          <a className="cursor-pointer text-xs text-[#3A5BEF]">Know more</a>
        </Link>
        <div
          className="flex cursor-pointer items-center text-xs text-gray-400"
          onClick={() => {
            onNext();
          }}
        >
          Next <AiOutlineArrowRight className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default PopCard;
