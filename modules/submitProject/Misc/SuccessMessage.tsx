import React from 'react';

const SuccessMessage: React.FC<{ url?: string; content: string }> = ({
  url,
  content,
}) => {
  return (
    <div className="daisy-alert-success daisy-alert mt-5 text-green-500">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 flex-shrink-0 stroke-current"
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
        <div className="flex flex-col">
          <h3 className="mr-2 text-xl font-bold">{content}</h3>
          {url && (
            <a
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              href={url}
            >
              {url}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
