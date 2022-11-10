import React, { PropsWithChildren, useRef, useState } from 'react';
import classnames from 'classnames';
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { useClickAway } from 'react-use';
import { useSession, signIn } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from '@modules/submitProject/api';
import Image from 'next/image';

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
        <Image width={20} height={20} src={avatar_url} unoptimized alt={''} />
      </div>
      <div className="ml-2">{login}</div>
    </div>
  );
};

const OrganizationAccess: React.FC<{
  provider: string;
  hasOrgList: boolean;
}> = ({ provider, hasOrgList }) => {
  let scope = '';
  let grantAccessUrl = '';

  if (provider === 'github') {
    scope = 'public_repo read:org';
  }

  if (provider === 'gitee') {
    scope = 'projects groups';
  }

  return (
    <>
      {!hasOrgList && (
        <div
          className="flex h-12 cursor-pointer items-center px-4 hover:bg-gray-100"
          onClick={async () => {
            await signIn(
              provider,
              { callbackUrl: '/submit-your-project' },
              { scope }
            );
          }}
        >
          <AiOutlinePlus className="h-5 w-5" />
          <div className="ml-2 text-base">Add Organization</div>
        </div>
      )}

      {provider === 'github' && (
        <div className="flex h-12 cursor-pointer items-center px-4 hover:bg-gray-100">
          <HiOutlineExternalLink className="h-5 w-5" />
          <a
            className="ml-2 text-base"
            target="_blank"
            rel="noopener noreferrer"
            href={grantAccessUrl}
          >
            Grant Organization access
          </a>
        </div>
      )}
    </>
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
  const provider = session?.provider!;

  const { data } = useQuery(
    ['getOrganizations', token],
    () => {
      return getOrganizations(provider)({ token });
    },
    { enabled: Boolean(token) }
  );
  const hasOrgList = Array.isArray(data?.data) && data?.data?.length;

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
          <OrganizationAccess
            provider={provider}
            hasOrgList={Boolean(hasOrgList)}
          />
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
