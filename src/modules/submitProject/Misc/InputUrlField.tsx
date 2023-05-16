import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';
import Input from '@common/components/Input';
import { AiOutlineClose } from 'react-icons/ai';
import useProviderInfo from '@modules/auth/useProviderInfo';
import { getUrlReg } from '../Misc';

interface Props {
  onClose: () => void;
  onPressEnter?: (v: string) => void;
}

export interface InputRef {
  verification: () => string;
  shakeInput: () => void;
}

const InputUrlField = forwardRef<InputRef, Props>(
  ({ onClose, onPressEnter }, ref) => {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);
    const { providerUser: user } = useProviderInfo();
    const provider = user?.provider!;
    const [value, setValue] = useState('');

    const verificationUrl = (
      val: string,
      provider: string
    ): { message: string; error: boolean } => {
      if (!val) return { error: false, message: '' };
      return getUrlReg(provider).test(val)
        ? { error: false, message: '' }
        : {
            error: true,
            message: t('submit_project:please_enter_a_valid', {
              provider: provider,
            }),
          };
    };
    const { error, message } = verificationUrl(value, provider);

    useImperativeHandle(ref, () => ({
      verification: () => {
        const { error } = verificationUrl(value, provider);
        if (error) return '';
        return value;
      },
      shakeInput: () => {
        gsap.to(inputRef.current, {
          keyframes: {
            x: [0, 130, -130, 0],
            ease: 'power2.inOut',
          },
          repeat: 2,
          duration: 0.3,
        });
        inputRef.current?.focus();
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
              placeholder={
                t('submit_project:type_address_of', {
                  providerName: provider,
                }) as string
              }
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
            {message} ( {t('submit_project:eg')}:
            <span className="mx-2 font-semibold">{provider}.com/xxx/xxx</span>)
          </p>
        )}
      </>
    );
  }
);

InputUrlField.displayName = 'InputUrlField';

export default InputUrlField;
