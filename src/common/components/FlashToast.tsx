import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import {
  storageGetToastError,
  storageSetToastError,
} from '@common/utils/storage';

const FlashToast = () => {
  const { query } = useRouter();

  useEffect(() => {
    let t: number;

    const hasToastError = storageGetToastError(`${query.ts}`);

    if (!hasToastError && query.ts && query.error) {
      t = window.setTimeout(() => {
        storageSetToastError(`${query.ts}`, `${query.error}`);

        toast.error((t) => <>{query.error}</>, {
          position: 'top-center',
        });
      }, 400);
    }

    return () => {
      t && clearTimeout(t);
    };
  }, [query.ts, query.error]);

  return <></>;
};

export default FlashToast;
