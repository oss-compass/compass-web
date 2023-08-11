import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FiImage } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

interface Props {
  showFooter?: boolean;
  placeholder?: string;
  loading: boolean;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
}

export interface InputRefProps {
  reset: () => void;
  backFill: (v: string) => void;
}

const CommentInput = forwardRef<InputRefProps, Props>(
  ({ showFooter = false, placeholder, loading, onSubmit, onCancel }, ref) => {
    const [value, setValue] = useState('');

    useImperativeHandle(ref, () => ({
      backFill: (v: string) => {
        setValue(v);
      },
      reset: () => {
        setValue('');
      },
    }));

    return (
      <div className="">
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
            {loading && !showFooter ? (
              <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />
            ) : (
              <FiImage className="text-silver cursor-pointer text-xl" />
            )}
          </div>
        </div>

        {showFooter ? (
          <div className="mt-2 flex justify-end">
            <div
              className="bg-primary hover:bg-primary/90 mr-2 flex h-6 w-10 cursor-pointer items-center justify-center rounded text-center text-xs leading-6 text-white"
              onClick={() => {
                if (loading) return;
                if (value) onSubmit(value);
              }}
            >
              {loading ? (
                <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />
              ) : (
                '确定'
              )}
            </div>
            <div
              className="h-6 w-10 cursor-pointer rounded border text-center text-xs leading-6 text-black hover:bg-gray-100"
              onClick={() => {
                onCancel?.();
              }}
            >
              取消
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
