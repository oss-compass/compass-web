import React, { useEffect, useRef, useState } from 'react';
import { useOverviewQuery } from '@graphql/generated';
import client from '@graphql/client';
import Recently from './Recently';
import HotProjects from './HotProjects';
import classnames from 'classnames';

const SectionProjects = () => {
  const { data, isLoading } = useOverviewQuery(client);
  const { trends } = data?.overview || {};

  return (
    <section
      className={classnames(
        'relative mx-auto flex w-[1200px] justify-between pt-[40px] pb-[120px]',
        'lg:w-full lg:flex-col'
      )}
    >
      <Recently list={data?.recentUpdates} />
      <HotProjects trends={trends} />
    </section>
  );
};

export default SectionProjects;
