import React from 'react';
import Image from 'next/image';
import Center from '@common/components/Layout/Center';
import Input from '@common/components/Input';
import Button from '@common/components/Button';
import OAuthProviders from './OAuthProviders';

const ProfileForm = () => {
  return (
    <>
      <h1 className="pb-5 pt-10 text-xl font-bold">Profile</h1>
      <div className="flex w-full lg:flex-col-reverse">
        <div className="w-[560px] lg:w-full">
          <div className="mb-6">
            <div className="mb-4 font-medium">Name</div>
            <Input placeholder="username" />
          </div>

          <div className="mb-6">
            <div className="mb-4 font-medium">Email</div>
            <Input value="max@gmail.com" placeholder="username" />
          </div>

          <Button className="w-[120px]">Save</Button>
        </div>

        <div className="ml-10 lg:ml-0 lg:w-full">
          <div className="mb-4 font-medium">Avatar</div>
          <div className="relative h-[156px]  w-[156px] bg-[#D7D7D7]">
            <Image layout="fill" src="/vercel.svg" alt="avatar" />
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteAccount = () => {
  return (
    <>
      <div className="pb-5 pt-10 text-xl font-bold">Delete account</div>
      <div className="mb-4">
        Once you delete your account, there is no going back. Please be certain
        when taking this action.
      </div>
      <Button intent="danger">Delete your account</Button>
    </>
  );
};

const ProfileSetting = () => {
  return (
    <Center widthClassName="w-[1000px] pb-10 lg:px-6">
      <ProfileForm />
      <OAuthProviders />
      <DeleteAccount />
    </Center>
  );
};

export default ProfileSetting;
