import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { randomFromInterval } from '@common/utils/number';

interface Image {
  id: number;
  name: string;
  base64: string;
}

interface Props {
  showFooter?: boolean;
  placeholder?: string;
  loading: boolean;
  disabled?: boolean;
  content?: string;
  onSubmit: (content: string, images?: Image[]) => void;
  onCancel?: () => void;
}

export interface InputRefProps {
  reset: () => void;
  focus: () => void;
  backFill: (content: string, images: Image[]) => void;
}

const CommentInput = forwardRef<InputRefProps, Props>(
  (
    {
      showFooter = false,
      placeholder,
      loading,
      onSubmit,
      onCancel,
      content,
      disabled,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const boxRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState(content || '');
    const [images, setImages] = useState<Image[]>([]);

    useImperativeHandle(ref, () => ({
      backFill: (content: string, images: Image[]) => {
        setValue(content);
        setImages(images);
      },
      focus: () => {
        textAreaRef.current?.focus();
      },
      reset: () => {
        setValue('');
        setImages([]);
      },
    }));

    const inputId = `comment-image-upload-${randomFromInterval(0, 100000)}`;

    return (
      <>
        <div
          className="border-silver relative min-h-8 rounded-sm border text-sm"
          ref={boxRef}
        >
          <TextareaAutosize
            ref={textAreaRef}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            disabled={disabled}
            className="w-full resize-none pl-2 pt-1 outline-0"
            placeholder={placeholder ? placeholder : t('lab:commit_enter')}
            onKeyDown={(event) => {
              if (loading) return;
              if (event.key == 'Enter' || event.code == 'Enter') {
                if (event.shiftKey || event.ctrlKey) {
                  setValue((p) => p + '\n');
                } else {
                  if (value) {
                    onSubmit(value, images);
                  } else {
                    toast.error('澄清内容不能为空');
                  }
                }
                event.preventDefault();
              }
            }}
          />
          {loading && !showFooter && (
            <div className="absolute bottom-1 right-2">
              <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />{' '}
            </div>
          )}
        </div>
        {showFooter ? (
          <div className="mt-2 flex justify-end">
            <div
              className="bg-primary hover:bg-primary/90 mr-2 flex h-6 cursor-pointer items-center justify-center rounded px-1 text-center text-xs leading-6 text-white"
              onClick={() => {
                if (loading) return;
                if (value) {
                  onSubmit(value);
                } else {
                  toast.error('澄清内容不能为空');
                }
              }}
            >
              {loading ? (
                <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />
              ) : (
                t('common:btn.confirm')
              )}
            </div>
            <div
              className="h-6 cursor-pointer rounded border px-1 text-center text-xs leading-6 text-black hover:bg-gray-100"
              onClick={() => {
                onCancel?.();
              }}
            >
              {t('common:btn.cancel')}
            </div>
          </div>
        ) : null}
      </>
    );
  }
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
