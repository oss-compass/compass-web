import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import issueMetricsContent from './issueMetricsContent';

const markdownComponents = {
  h1: ({ children, ...props }: any) => (
    <h2
      className="mb-4 mt-0 text-xl font-bold leading-8 text-slate-900"
      {...props}
    >
      {children}
    </h2>
  ),
  h2: ({ children, ...props }: any) => (
    <h3
      className="mb-3 mt-8 border-b border-slate-200 pb-2 text-lg font-bold leading-7 text-slate-900 first:mt-0"
      {...props}
    >
      {children}
    </h3>
  ),
  h3: ({ children, ...props }: any) => (
    <h4
      className="mb-2 mt-6 text-base font-bold leading-6 text-slate-800"
      {...props}
    >
      {children}
    </h4>
  ),
  h4: ({ children, ...props }: any) => (
    <h5
      className="mb-2 mt-5 text-sm font-bold leading-6 text-slate-800"
      {...props}
    >
      {children}
    </h5>
  ),
  p: ({ children, ...props }: any) => (
    <p className="my-3 text-sm leading-7 text-slate-600" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul
      className="my-3 list-disc space-y-1.5 pl-6 text-sm leading-7 text-slate-600"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol
      className="my-3 list-decimal space-y-1.5 pl-6 text-sm leading-7 text-slate-600"
      {...props}
    >
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="my-4 border-l-4 border-blue-300 bg-blue-50/70 px-4 py-2 text-slate-600"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-4 max-w-full overflow-x-auto rounded-xl border border-slate-200">
      <table
        className="w-full min-w-[720px] border-collapse text-left text-[13px] leading-5 text-slate-600"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-slate-50 text-slate-800" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="border-b border-r border-slate-200 px-3 py-2.5 align-middle font-semibold last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td
      className="border-b border-r border-slate-100 px-3 py-2.5 align-top last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),
  hr: (props: any) => <hr className="my-7 border-slate-200" {...props} />,
  pre: ({ children, ...props }: any) => (
    <pre
      className="my-4 max-w-full overflow-x-auto rounded-xl bg-slate-900 p-4 text-[13px] leading-6 text-slate-100"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: any) => (
    <code
      className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[12px] text-slate-700"
      {...props}
    >
      {children}
    </code>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-slate-800" {...props}>
      {children}
    </strong>
  ),
};

const IssueMetricsAppendix: React.FC = () => (
  <div className="min-w-0 max-w-full">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {issueMetricsContent}
    </ReactMarkdown>
  </div>
);

export default IssueMetricsAppendix;
