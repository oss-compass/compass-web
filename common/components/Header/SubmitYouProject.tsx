import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SubmitYouProject: React.FC<{ blackMode?: boolean }> = ({ blackMode }) => {
  const router = useRouter();
  if (router.pathname === '/submit-your-project') {
    return null;
  }

  return (
    <Link href="/submit-your-project">
      <a
        className={
          'ml-5 cursor-pointer truncate border-2 border-white bg-black px-6 py-3 font-medium text-white'
        }
      >
        Submit your project
      </a>
    </Link>
  );
};

export default SubmitYouProject;
