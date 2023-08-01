import React from 'react';

const BadgeCount = ({ count = 0 }: { count: number }) => {
  return (
    <span className="bg-primary h-4 w-4 shrink-0 rounded-full text-center text-xs leading-4 text-white">
      {count}
    </span>
  );
};

export default BadgeCount;
