import React, { PropsWithChildren, useRef, useState } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown, AiFillGithub } from 'react-icons/ai';
import { useClickAway } from 'react-use';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from '@modules/submitProject/api/github';
import { LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';
import { SiGitee } from 'react-icons/si';
import Image from 'next/image';

export const getIcons = (type: LiteralUnion<BuiltInProviderType>) => {
  switch (type) {
    case 'github':
      return <AiFillGithub className="cursor-pointer text-xl" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="cursor-pointer text-xl" />;
    default:
      return null;
  }
};

const SourceItem: React.FC<{
  avatar_url: string;
  login: string;
  onClick?: () => void;
}> = ({ login, avatar_url, onClick }) => {
  return (
    <div
      className="flex h-12 cursor-pointer items-center px-4"
      onClick={() => onClick?.()}
    >
      <div className="h-5 w-5  bg-slate-100">
        <Image width={20} height={20} src={avatar_url} unoptimized alt={''} />
      </div>
      <div className="ml-2">{login}</div>
    </div>
  );
};

interface Item {
  avatar_url: string;
  login: string;
  user: boolean;
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

  const { data: session } = useSession();
  const token = session?.accessToken!;

  const { data } = useQuery(
    ['getOrganizations', token],
    () => getOrganizations({ token }),
    { enabled: Boolean(token) }
  );

  const options: Item[] = React.useMemo(() => {
    const items =
      data?.data?.map((item) => {
        return { login: item.login, avatar_url: item.avatar_url, user: false };
      }) || [];

    return [
      ...items,
      {
        login: session?.user.login!,
        avatar_url: session?.user.image!,
        user: true,
      },
    ];
  }, [data, session]);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div className={classnames(className, 'group relative')} ref={ref}>
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
