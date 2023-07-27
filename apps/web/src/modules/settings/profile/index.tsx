import React, { useEffect } from 'react';
import Center from '@common/components/Layout/Center';
import ProfileForm from './ProfileForm';
import OAuthList from './OAuthList';
import DeleteAccount from './DeleteAccount';

const ProfileSetting = () => {
  return (
    <Center widthClassName="w-[1000px] pb-20 lg:px-6">
      <ProfileForm />
      <OAuthList />
      <DeleteAccount />
    </Center>
  );
};

export default ProfileSetting;
