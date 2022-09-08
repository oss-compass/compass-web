import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';

const Empty = () => (
  <div className="absolute left-0 right-0 top-[76px] z-[100] border-2 border-black bg-white drop-shadow">
    <div className="w-full">
      <p className="block px-4 py-3 text-center text-lg text-gray-400">
        No project
      </p>
    </div>
  </div>
);

const DropDownList: React.FC<{ result: string[] }> = ({ result }) => {
  const router = useRouter();
  const [active, setActive] = useState(-1);
  const max = result.length - 1;

  console.log('active', active);

  useHotkeys(
    'up,down,enter',
    (e, he) => {
      e.preventDefault();
      const press = he.key;
      // press first time
      if ((press === 'up' || press === 'down') && active === -1) {
        setActive(0);
        return;
      }
      // press up
      if (press === 'up' && active > 0) {
        setActive((p) => --p);
        return;
      }
      // press down
      if (press === 'down' && active < max) {
        setActive((p) => ++p);
        return;
      }
      // press enter,  navigate to analyze page
      if (press === 'enter' && active > -1) {
        router.push(`/analyze?url=${encodeURIComponent(result[active])}`);
      }
    },
    { enableOnTags: ['INPUT'] }
  );
  return (
    <div className="absolute left-0 right-0 top-[76px] z-[100] border-2 border-black bg-white drop-shadow">
      <div className="w-full">
        {result.map((url, index) => {
          return (
            <Link href={`/analyze?url=${encodeURIComponent(url)}`} key={url}>
              <a
                className={classnames(
                  { 'bg-gray-100': active === index },
                  'block px-4 py-3 text-xl hover:bg-gray-100'
                )}
              >
                {url}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
const SearchDropdown: React.FC<{
  keyword: string;
  result: string[] | undefined;
}> = ({ keyword, result }) => {
  if (!keyword) return null;
  if (keyword) {
    if (!result) return <Empty />;
    if (Array.isArray(result) && result.length === 0) return <Empty />;
  }

  return <DropDownList result={result!} />;
};

export default SearchDropdown;
