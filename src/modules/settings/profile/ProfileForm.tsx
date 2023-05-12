import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import Input from '@common/components/Input';
import Button from '@common/components/Button';

interface IFormInput {
  name: string;
  email: string;
}

const ProfileForm = () => {
  const { t } = useTranslation();
  const { currentUser, providerUser } = useSnapshot(userInfoStore);
  const name = currentUser?.name;
  const email = currentUser?.email;

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

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
            <div className="mb-4 font-medium">
              {t('setting:profile.form.email')}
            </div>
            <Input
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
            {errors['email']?.message && (
              <p className="p-1 text-red-500 ">{errors['email'].message}</p>
            )}
          </div>

          <Button className="w-[120px]" type="submit">
            {t('common:btn.save')}
          </Button>
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
