import React from 'react';

const Empty: React.FC<{
  content?: String;
  type?: 'DropDownItem' | 'default';
}> = ({ type = 'default', content }) => {
  if (type === 'DropDownItem') {
    return (
      <p className="block px-4 py-3 text-center text-lg text-gray-400">
        {content || 'No result'}
      </p>
    );
  }

  return <div> {content || 'Empty'}</div>;
};

export default Empty;
