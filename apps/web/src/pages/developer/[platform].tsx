import React from 'react';
import { GetServerSideProps } from 'next';

const KNOWN_PLATFORMS = ['github', 'gitee', 'gitcode', 'atomgit'] as const;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const platform = String(params?.platform || '').toLowerCase();

  if (platform && !(KNOWN_PLATFORMS as readonly string[]).includes(platform)) {
    return {
      redirect: {
        destination: `/developer/github/${encodeURIComponent(platform)}`,
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
};

const DeveloperLegacyOrNotFoundPage = () => {
  return null;
};

export default DeveloperLegacyOrNotFoundPage;
