import React from 'react';
import Image from 'next/image';
import Center from '@common/components/Layout/Center';
import Input from '@common/components/Input';
import Button from '@common/components/Button';

const ProfileForm = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="pb-5 pt-10 text-xl font-bold">Profile</h1>

        <div className="mb-6">
          <div className="mb-4 font-medium">Name</div>
          <Input placeholder="username" />
        </div>

        <div className="mb-6">
          <div className="mb-4 font-medium">Email</div>
          <Input value="max@gmail.com" placeholder="username" />
        </div>

        <Button>Save</Button>
      </div>

      <div className="w-[440px] pt-[88px] pl-10">
        <div className="mb-4 font-medium">Avatar</div>
        <div className="relative h-[156px]  w-[156px] bg-[#D7D7D7]">
          <Image layout="fill" src="/vercel.svg" alt="avatar" />
        </div>
      </div>
    </div>
  );
};

const OAuthList = () => {
  return (
    <div className="">
      <div className="pb-5 pt-10 text-xl font-bold">Connected Accounts</div>
      <div>
        Connect multiple accounts to your user and sign in with any of them
      </div>
      <div className="">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
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
      <Button>Delete your account</Button>
    </>
  );
};

const ProfileSetting = () => {
  return (
    <Center widthClassName="w-[1000px]">
      <ProfileForm />
      <OAuthList />
      <DeleteAccount />
    </Center>
  );
};

export default ProfileSetting;
