import React from 'react';
import { getIcons } from '../utils';

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

export default DomainPersona;
