import React from 'react';

const SuccessMessage: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="daisy-alert-success daisy-alert mt-5 text-green-500">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>
          <span>submit success! see more: </span>
          <a className="underline underline-offset-2" href={url}>
            {url}
          </a>
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
