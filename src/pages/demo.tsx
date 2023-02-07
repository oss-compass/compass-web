import React from 'react';
import Tab from '@common/components/Tab';

const tabOptions = [
  { label: 'total', value: '1' },
  { label: 'code reviewer', value: '2' },
  { label: 'pr creator', value: '3' },
  { label: 'commit author', value: '4' },
];

const Demo = () => {
  return (
    <div className="my-10 w-[600px]">
      <div className="">
        <Tab
          options={tabOptions}
          value={'1'}
          onChange={(v) => {
            console.log(v);
          }}
        />
      </div>
    </div>
  );
};

export default Demo;

export function getServerSideProps() {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: process.env.NODE_ENV === 'production',
    };
  }

  return {
    props: {},
  };
}
