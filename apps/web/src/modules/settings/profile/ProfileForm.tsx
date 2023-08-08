import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSnapshot } from 'valtio';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useModifyUserMutation } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { userInfoStore, userEvent } from '@modules/auth/UserInfoStore';
import { useUserInfo } from '@modules/auth';
import { storageSaveResendEmailTime } from '@common/utils/storage';
import SendVerificationEmail from './SendVerificationEmail';
import Input from '@common/components/Input';
import { Button } from '@oss-compass/ui';
import Tooltip from '@common/components/Tooltip';
import * as RadioGroup from '@radix-ui/react-radio-group';

interface IFormInput {
  name: string;
  email: string;
  language: string;
}

const ProfileForm = () => {
  const { t } = useTranslation();
  const { providerUser } = useUserInfo();
  const { currentUser } = useSnapshot(userInfoStore);
  const name = currentUser?.name;
  const email = currentUser?.email;
  const language = currentUser?.language;

  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate({
      name: data.name,
      email: data.email,
      language: data.language,
    });
  };

  useEffect(() => {
    if (name) setValue('name', name);
    if (email) setValue('email', email);
  }, [name, email, setValue]);

  const inputEmail = watch('email');
  const inputName = watch('name');
  const inputLang = watch('language');

  const changedName = inputName !== name;
  const changedEmail = inputEmail !== email;
  const changedLanguage = inputLang !== language;

  const mutation = useModifyUserMutation(client, {
    onSuccess(res) {
      if (res.modifyUser?.status === 'true') {
        toast.success(
          res.modifyUser?.message || t('common:toast.modification_successful')
        );

        // After changing the email, the server will send an email to verify the new email address.
        if (changedEmail) {
          storageSaveResendEmailTime(String(Date.now() + 1000 * 60));
        }
        userInfoStore.event$?.emit(userEvent.REFRESH);
      }

      if (res.modifyUser?.status === 'false') {
        toast.error(
          res.modifyUser?.message || t('common:toast.modification_successful')
        );
      }
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="pb-6 pt-10 text-xl font-bold">
        {t('setting:profile.userinfo')}
      </h1>
      <div className="flex w-full lg:flex-col-reverse">
        <div className="w-[560px] lg:w-full">
          <div className="mb-6">
            <div className="mb-4 font-medium">
              {t('setting:profile.form.name')}
            </div>
            <Input
              {...register('name', {
                required: t('setting:profile.form.error_require', {
                  field: t('setting:profile.form.name'),
                }),
                maxLength: {
                  value: 100,
                  message: t('setting:profile.form.error_name_max_len', {
                    length: 100,
                  }),
                },
              })}
              placeholder={t('setting:profile.form.name_placeholder')}
              error={Boolean(errors['name'])}
            />
            {errors['name']?.message && (
              <p className="p-1 text-red-500 ">{errors['name'].message}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center font-medium">
                {t('setting:profile.form.email')}
                <Tooltip
                  arrow
                  title={<>{t('setting:profile.form.email_ques_icon')}</>}
                  placement="right"
                >
                  <span className="ml-1 text-gray-400">
                    <AiOutlineQuestionCircle />
                  </span>
                </Tooltip>
              </div>
              {currentUser?.emailVerified ? null : (
                <SendVerificationEmail email={email} />
              )}
            </div>

            <div className="relative">
              <Input
                className="pr-20"
                {...register('email', {
                  required: {
                    value: true,
                    message: t('setting:profile.form.error_require', {
                      field: t('setting:profile.form.email'),
                    }),
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('setting:profile.form.error_email_format'),
                  },
                })}
                placeholder={t('setting:profile.form.email_placeholder')}
                error={Boolean(errors['email'])}
              />

              {email && currentUser?.emailVerified && !changedEmail ? (
                <div className="absolute right-2 top-3.5 rounded-lg bg-[#E6FDCD] px-2 text-sm text-[#00B400]">
                  {t('setting:profile.verified')}
                </div>
              ) : null}
            </div>
            {errors['email']?.message && (
              <p className="p-1 text-red-500 ">{errors['email'].message}</p>
            )}
          </div>

          <div className="mb-10">
            <div className="mb-4 flex items-center font-medium font-medium">
              {t('setting:profile.language_preferences')}
              <Tooltip
                arrow
                title={<> {t('setting:profile.language_preferences_desc')}</>}
                placement="right"
              >
                <span className="ml-1 text-gray-400">
                  <AiOutlineQuestionCircle />
                </span>
              </Tooltip>
            </div>
            <Controller
              control={control}
              name={'language'}
              render={({ field, fieldState, formState }) => {
                return (
                  <RadioGroup.Root
                    className="flex"
                    defaultValue={language}
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                  >
                    <div className="mr-8 flex items-center">
                      <RadioGroup.Item
                        className="h-[20px] w-[20px] cursor-default rounded-full border-2 border-black bg-white outline-none "
                        value="en"
                        id="r1"
                      >
                        <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:bg-black after:content-['']" />
                      </RadioGroup.Item>
                      <label
                        className="pl-[15px] text-[15px] leading-none text-black"
                        htmlFor="r1"
                      >
                        English
                      </label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroup.Item
                        className="h-[20px] w-[20px] cursor-default rounded-full border-2 border-black bg-white outline-none  "
                        value="zh-CN"
                        id="r2"
                      >
                        <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[12px] after:w-[12px] after:rounded-[50%] after:bg-black after:content-['']" />
                      </RadioGroup.Item>
                      <label
                        className="pl-[15px] text-[15px] leading-none text-black"
                        htmlFor="r2"
                      >
                        简体中文
                      </label>
                    </div>
                  </RadioGroup.Root>
                );
              }}
            />
          </div>

          {/*<Tooltip*/}
          {/*  arrow*/}
          {/*  title={<>{t('common:btn.func_disabled')}</>}*/}
          {/*  placement="right"*/}
          {/*>*/}

          <Button
            className="w-[120px]"
            loading={mutation.isLoading}
            type="submit"
            disabled={!changedName && !changedEmail && !changedLanguage}
          >
            {t('common:btn.save')}
          </Button>
        </div>

        <div className="ml-10 mb-10 lg:ml-0 lg:w-full">
          <div className="mb-4 font-medium">{t('setting:profile.avatar')}</div>
          <div className="relative h-[156px] w-[156px] border">
            {providerUser?.avatarUrl ? (
              <Image
                src={providerUser?.avatarUrl!}
                unoptimized
                fill
                sizes="156px"
                style={{
                  objectFit: 'cover',
                }}
                alt="avatar"
              />
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
