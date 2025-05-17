import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

interface BreadcrumbProps {
  items: { label: string; onClick?: () => void }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex items-center space-x-2 border-l-4 border-blue-500 pl-4 text-gray-800">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`text-2xl font-bold ${
              item.onClick ? 'cursor-pointer text-blue-500 hover:underline' : ''
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <FaAngleRight className="text-lg text-[#555557]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
