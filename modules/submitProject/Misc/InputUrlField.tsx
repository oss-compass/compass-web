import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Input from '@modules/submitProject/Form/Input';
import { AiOutlineClose } from 'react-icons/ai';
import { getUrlReg } from '../Misc';
import useProvider from '../Form/useProvider';
import { useHotkeys } from 'react-hotkeys-hook';

interface Props {
  onClose: () => void;
  onPressEnter?: (v: string) => void;
}

export interface InputRef {
  verification: () => string;
  shakeInput: () => void;
}

const verificationUrl = (
  val: string,
  provider: string
): { message: string; error: boolean } => {
  if (!val) return { error: false, message: '' };
  return getUrlReg(provider).test(val)
    ? { error: false, message: '' }
    : { error: true, message: `please enter a valid ${provider} url` };
};

const InputUrlField = forwardRef<InputRef, Props>(
  ({ onClose, onPressEnter }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const provider = useProvider();
    const [value, setValue] = useState('');
    const { error, message } = verificationUrl(value, provider);

    useImperativeHandle(ref, () => ({
      verification: () => {
        const { error } = verificationUrl(value, provider);
        if (error) return '';
        return value;
      },
      shakeInput: () => {
        inputRef.current?.focus();
        // todo
      },
    }));

    useHotkeys(
      'enter',
      (e, he) => {
        e.preventDefault();
        const press = he.key;
        if (press === 'enter') {
          if (!value) return;
          if (error) return;
          onPressEnter?.(value);
          setValue('');
        }
      },
      { enableOnTags: ['INPUT'] }
    );

    return (
      <>
        <div className="flex max-w-[600px] items-center justify-between">
          <div className="max-w-[500px] flex-1">
            <Input
              ref={inputRef}
              value={value}
              className="w-full"
              placeholder={`Type address of ${provider} repository`}
              error={error}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onBlur={() => {}}
            />
          </div>
          <div
            className="cursor-pointer p-2 transition-all hover:bg-gray-200"
            onClick={() => onClose()}
          >
            <AiOutlineClose />
          </div>
        </div>
        {error && (
          <p className="p-1 text-red-500">
            {message} ( eg:
            <span className="mx-2 font-semibold">{provider}.com/xxx/xxx</span>)
          </p>
        )}
      </>
    );
  }
);

InputUrlField.displayName = 'InputUrlField';

export default InputUrlField;
