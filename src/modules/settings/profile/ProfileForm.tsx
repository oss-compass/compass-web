import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSnapshot } from 'valtio';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import useProviderInfo from '@modules/auth/useProviderInfo';
import Input from '@common/components/Input';
import Button from '@common/components/Button';
import Tooltip from '@common/components/Tooltip';

interface IFormInput {
  name: string;
  email: string;
}

const ProfileForm = () => {
  const { t } = useTranslation();
  const { providerUser } = useProviderInfo();
  const { currentUser } = useSnapshot(userInfoStore);
  const name = currentUser?.name;
  const email = currentUser?.email;

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const inputEmail = watch('email');

  useEffect(() => {
    if (name) setValue('name', name);
    if (email) setValue('email', email);
  }, [name, email, setValue]);

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
                <div className="flex text-sm">
                  {t('setting:profile.unverified_yet')}
                  <div
                    className="ml-1 cursor-pointer text-primary"
                    onClick={() => {}}
                  >
                    {t('setting:profile.resend_verification_email')}
                  </div>
                </div>
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

              {currentUser?.emailVerified ? (
                inputEmail === email ? (
                  <div className="absolute right-2 top-3.5 rounded-lg bg-[#E6FDCD] px-2 text-sm text-[#00B400]">
                    {t('setting:profile.verified')}
                  </div>
                ) : null
              ) : null}
            </div>
            {errors['email']?.message && (
              <p className="p-1 text-red-500 ">{errors['email'].message}</p>
            )}
          </div>

          <Tooltip
            arrow
            title={<>{t('common:btn.func_disabled')}</>}
            placement="right"
          >
            <Button className="w-[120px]" disabled type="submit">
              {t('common:btn.save')}
            </Button>
          </Tooltip>
        </div>

        <div className="ml-10 mb-10 lg:ml-0 lg:w-full">
          <div className="mb-4 font-medium">{t('setting:profile.avatar')}</div>
          <div className="relative h-[156px] w-[156px] border">
            {providerUser?.avatarUrl ? (
              <Image
                layout="fill"
                src={providerUser?.avatarUrl!}
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
