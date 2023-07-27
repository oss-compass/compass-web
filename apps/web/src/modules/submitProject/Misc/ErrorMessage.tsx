import React from 'react';

const ErrorMessage: React.FC<{ content?: string; reportUrl?: string }> = ({
  content,
  reportUrl,
}) => {
  return (
    <div className="daisy-alert-error daisy-alert mt-5 text-red-500  ">
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
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col">
          <h3 className="mr-2 text-base font-bold">{content}</h3>
          {reportUrl && (
            <a
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              href={`${window.origin}${reportUrl}`}
            >
              {`${window.origin}${reportUrl}`}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
