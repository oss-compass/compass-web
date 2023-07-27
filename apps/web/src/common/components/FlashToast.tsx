import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import {
  storageGetToastError,
  storageSetToastError,
} from '@common/utils/storage';
import { isTimestampWithinSec } from '@common/utils/time';

const FlashToast = () => {
  const { query } = useRouter();

  useEffect(() => {
    const ts = query.ts as string;
    const error = query.error as string;

    let t: number;
    const hasToastError = storageGetToastError(`${ts}`);
    const isShowError = isTimestampWithinSec(ts, 30);

    if (!hasToastError && isShowError && ts && error) {
      t = window.setTimeout(() => {
        storageSetToastError(`${ts}`, `${error}`);

        toast.error((t) => <>{error}</>, {
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
