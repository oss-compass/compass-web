import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';

const SubmitYouProject: React.FC<{ blackMode?: boolean }> = ({ blackMode }) => {
  const router = useRouter();
  if (router.pathname === '/analyze/create') {
    return null;
  }

  return (
    <Link href="/analyze/create">
      <a
        className={classnames(
          'cursor-pointer border-2 border-black px-6 py-3 font-semibold',
          {
            '!border-white': blackMode,
            'bg-black': blackMode,
            'text-white': blackMode,
          }
        )}
      >
        Submit your project
      </a>
    </Link>
  );
};

export default SubmitYouProject;
