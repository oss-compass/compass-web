import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FiImage } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import useImagePreview from '@common/hooks/useImagePreview';
// import ImageItem from './ImageItem';
import { convertBase64 } from '@common/utils/file';
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
  onSubmit: (content: string, images: Image[]) => void;
  onCancel?: () => void;
}

export interface InputRefProps {
  reset: () => void;
  focus: () => void;
  backFill: (content: string, images: Image[]) => void;
}

const CommentInput = forwardRef<InputRefProps, Props>(
  ({ showFooter = false, placeholder, loading, onSubmit, onCancel }, ref) => {
    const boxRef = useRef<HTMLDivElement>();
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const [value, setValue] = useState('');
    const [images, setImages] = useState<Image[]>([]);
    // const { ref: previewRef, open: openPreview, close } = useImagePreview();
    const imagesLength = images.length;

    const { t } = useTranslation();

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

    const handleInputFile = async (files: FileList) => {
      const filesBase64 = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await convertBase64(file);
        filesBase64.push({
          id: randomFromInterval(0, 10000),
          name: file.name,
          base64,
        });
      }

      setImages((pre) => [...pre, ...filesBase64]);
    };

    useEffect(() => {
      if (boxRef && boxRef.current) {
        const handlePaste = (e: ClipboardEvent) => {
          const len = e.clipboardData.files.length;
          if (len === 0) return;
          if (imagesLength + len > 6) {
            toast.error('up to six pictures');
            return;
          }

          handleInputFile(e.clipboardData.files);
        };

        boxRef.current?.addEventListener('paste', handlePaste);
        return () => {
          boxRef.current?.removeEventListener('paste', handlePaste);
        };
      }
    }, [imagesLength]);

    const inputId = `comment-image-upload-${randomFromInterval(0, 100000)}`;

    return (
      <div className="relative">
        <div
          className="border-silver min-h-8 relative rounded-sm border text-sm"
          ref={boxRef}
        >
          <TextareaAutosize
            ref={textAreaRef}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            className="w-full resize-none  pt-1 pl-2 outline-0"
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
              {' '}
              <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />{' '}
            </div>
          )}
          {/* <div className="absolute bottom-1 right-2">
            {loading && !showFooter ? (
              <BiLoaderAlt className="text-silver animate-spin cursor-pointer text-xl" />
            ) : (
              <label htmlFor={inputId}>
                <FiImage className="text-silver cursor-pointer text-xl" />
              </label>
            )}
            <input
              type="file"
              multiple
              id={inputId}
              style={{ display: 'none' }}
              onChange={(e) => {
                const files = e.target.files;
                const len = files.length;
                if (imagesLength + len > 6) {
                  toast.error('up to six pictures');
                  return;
                }

                handleInputFile(files).then();
              }}
            />
          </div> */}

          {/* {images.length > 0 ? (
            <div
              className="grid grid-cols-4 gap-4 px-2 pt-4 pb-8"
              ref={previewRef}
            >
              {images.map((image) => {
                return (
                  <ImageItem
                    key={image.id}
                    id={image.id}
                    src={image.base64}
                    onClick={() => {
                      openPreview();
                    }}
                    onDelete={(id) => {
                      setImages((pre) => {
                        return pre.filter((i) => i.id !== id);
                      });
                    }}
                  />
                );
              })}
            </div>
          ) : null} */}
        </div>

        {showFooter ? (
          <div className="mt-2 flex justify-end">
            <div
              className="bg-primary hover:bg-primary/90 mr-2 flex h-6 cursor-pointer items-center justify-center rounded px-1 text-center text-xs leading-6 text-white"
              onClick={() => {
                if (loading) return;
                if (value) {
                  onSubmit(value, images);
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
      </div>
    );
  }
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
