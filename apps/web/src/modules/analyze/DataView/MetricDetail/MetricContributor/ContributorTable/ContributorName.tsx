import React from 'react';
import { IoPeopleCircle } from 'react-icons/io5';
import Image from 'next/image';

const DomainPersona = ({ name, origin }) => {
  let icon = getIcons(origin, name);
  let url = getHubUrl(origin, name);
  return (
    <div className="flex">
      <div>{icon}</div>
      {url ? (
        <a
          className="whitespace-nowrap hover:text-[black] hover:underline"
          href={url}
          target="_blank"
          rel={'noreferrer'}
        >
          {name}
        </a>
      ) : (
        name
      )}
    </div>
  );
};

const getHubUrl = (origin, name) => {
  switch (origin) {
    case 'github':
      return 'https://github.com/' + name;
    case 'gitee':
      return 'https://gitee.com/' + name;
    // return <SiGitee color="#c71c27" className="mr-0" />;
    default:
      return null;
  }
};
const getIcons = (origin, name) => {
  switch (origin) {
    case 'github':
      return (
        <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full border border-gray-100">
          <Image
            src={'https://github.com/' + name + '.png'}
            onError={(e) => (e.currentTarget.src = '/images/github.png')}
            unoptimized
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            alt="icon"
            placeholder="blur"
            blurDataURL="/images/github.png"
          />
        </div>
      );
    case 'gitee':
      return (
        <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full border border-gray-100">
          <Image
            src={'https://gitee.com/' + name + '.png'}
            onError={(e) =>
              (e.currentTarget.src = '/images/logos/gitee-red.svg')
            }
            unoptimized
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            alt="icon"
            placeholder="blur"
            blurDataURL="/images/logos/gitee-red.svg"
          />
        </div>
      );
    default:
      return <IoPeopleCircle />;
  }
};

export default DomainPersona;
