import React from 'react';
import { getHubUrl } from '@common/utils/url';
import { getIcons } from '../utils';

const DomainPersona = ({ name, origin }) => {
  let icon = getIcons(origin, name);
  // GitHub contributors in this view open the Compass developer report.
  const url =
    origin === 'github' ? '/developer/' + name : getHubUrl(origin, name);
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

export default DomainPersona;
