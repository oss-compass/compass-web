import React, { PropsWithChildren, useRef, useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { AiFillCaretDown } from 'react-icons/ai';
import { useClickAway } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from '@modules/submitProject/api';
import { useSubmitUser } from '@modules/auth';

const SourceItem: React.FC<{
  className?: string;
  avatar_url: string;
  login: string;
  onClick?: () => void;
}> = ({ login, avatar_url, onClick, className }) => {
  return (
    <div
      className={classnames(
        'flex h-12 cursor-pointer items-center px-4',
        className
      )}
      onClick={() => onClick?.()}
    >
      <div className="h-5 w-5  bg-slate-100">
        <Image
          width={20}
          height={20}
          src={avatar_url || '/images/default.png'}
          unoptimized
          alt={''}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="ml-2 truncate">{login}</div>
    </div>
  );
};

interface Item {
  avatar_url: string;
  login: string;
  isUser: boolean;
}

const SelectRepoSource: React.FC<
  PropsWithChildren<{
    value?: Item;
    onChange?: (value: Item) => void;
    className?: string;
  }>
> = ({ className, onChange, value }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { submitUser: user } = useSubmitUser();
  const nickname = user?.nickname!;
  const account = user?.account!;
  const provider = user?.provider!;
  const avatarUrl = user?.avatarUrl!;

  const { data } = useQuery(
    ['getOrganizations', account],
    () => {
      return getOrganizations(provider)({ username: account });
    },
    { enabled: Boolean(account) }
  );

  const options: Item[] = React.useMemo(() => {
    const items =
      data?.data?.map((item) => {
        return {
          login: item.login,
          avatar_url: item.avatar_url,
          isUser: false,
        };
      }) || [];

    return [
      ...items,
      {
        login: nickname,
        avatar_url: avatarUrl!,
        isUser: true,
      },
    ];
  }, [data, nickname, avatarUrl]);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div className={classnames(className, 'group relative z-10')} ref={ref}>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className={classnames(
          'flex h-12 w-full flex-1 cursor-pointer items-center border-2  border-black text-base outline-none'
        )}
      >
        <SourceItem avatar_url={value?.avatar_url!} login={value?.login!} />
      </div>
      {open && (
        <div className="min-h-12 absolute top-[50px] left-0 right-0 border-2 border-black  bg-white ">
          {options.map((item) => {
            return (
              <SourceItem
                key={item.login}
                avatar_url={item.avatar_url}
                login={item.login}
                className={'hover:bg-gray-100'}
                onClick={() => {
                  onChange?.(item);
                  setOpen(false);
                }}
              />
            );
          })}
        </div>
      )}
      <div
        onClick={() => {
          setOpen((pre) => !pre);
        }}
        className={classnames('absolute top-2 right-2 cursor-pointer p-2', {
          'rotate-180': open,
        })}
      >
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default SelectRepoSource;
