import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FiImage } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

interface Props {
  placeholder?: string;
  loading: boolean;
  onSubmit: (content: string) => void;
}

export interface InputRefProps {
  reset: () => void;
}

const CommentInput = forwardRef<InputRefProps, Props>(
  ({ placeholder, loading, onSubmit }, ref) => {
    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValue('');
      },
    }));

    return (
      <div className="border-silver min-h-8 relative rounded-sm border pr-6  text-sm">
        <TextareaAutosize
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          className="w-full resize-none  pt-1 pl-2 outline-0"
          placeholder={
            placeholder
              ? placeholder
              : '按 Enter 发送评论,  按 Ctrl + Enter 换行'
          }
          onKeyDown={(event) => {
            if (loading) return;
            if (event.key == 'Enter' || event.code == 'Enter') {
              if (event.shiftKey || event.ctrlKey) {
                setValue((p) => p + '\n');
              } else {
                if (value) onSubmit(value);
              }
              event.preventDefault();
            }
          }}
        />
        <div className="absolute bottom-1 right-2">
          {loading ? (
            <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />
          ) : (
            <FiImage className="text-silver cursor-pointer text-xl" />
          )}
        </div>
      </div>
    );
  }
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
