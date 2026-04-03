import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLocalizedText } from '@modules/dataHub/utils';

const MARKDOWN_PATTERNS = [
  /(^|\n)\s{0,3}#{1,6}\s+/m,
  /(^|\n)\s{0,3}[-*+]\s+/m,
  /(^|\n)\s{0,3}\d+\.\s+/m,
  /(^|\n)\s{0,3}>\s+/m,
  /```/,
  /\[.+\]\(.+\)/,
  /(^|\n)\s*\|.+\|\s*\n\s*\|[-:\s|]+\|/m,
];

const TABLE_NAME_HEADERS = [
  '\u63a5\u53e3\u540d\u79f0',
  'api name',
  'interface name',
];
const TABLE_PATH_HEADERS = ['\u5730\u5740', 'path', 'api path', 'address'];

type MarkdownNode = {
  type?: string;
  value?: string;
  url?: string;
  children?: MarkdownNode[];
};

const isMarkdownContent = (content: string) => {
  return MARKDOWN_PATTERNS.some((pattern) => pattern.test(content));
};

const convertPathToHash = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return normalizedPath.replaceAll('/', '_');
};

const normalizeHeaderCell = (value: string) => {
  return value.trim().toLowerCase();
};

const getHeaderAliases = (value: string) => {
  return value
    .split(' / ')
    .map((item) => normalizeHeaderCell(item))
    .filter(Boolean);
};

const getNodeText = (node?: MarkdownNode): string => {
  if (!node) {
    return '';
  }

  if (typeof node.value === 'string') {
    return node.value;
  }

  if (!Array.isArray(node.children)) {
    return '';
  }

  return node.children.map((child) => getNodeText(child)).join('');
};

const setNodeText = (node: MarkdownNode, value: string) => {
  node.children = [{ type: 'text', value }];
};

const setNodeLink = (node: MarkdownNode, label: string, url: string) => {
  node.children = [
    {
      type: 'link',
      url,
      children: [{ type: 'text', value: label }],
    },
  ];
};

const transformTableNode = (tableNode: MarkdownNode, language: string) => {
  const rows = tableNode.children || [];
  if (rows.length < 2) {
    return;
  }

  const headerRow = rows[0];
  const headerCells = headerRow.children || [];
  const headerTexts = headerCells.map((cell) => getNodeText(cell));
  const firstDataRow = rows[1];
  const firstDataCells = (firstDataRow?.children || []).map((cell) =>
    getNodeText(cell).trim()
  );

  let nameColumnIndex = headerTexts.findIndex((text) =>
    getHeaderAliases(text).some((alias) => TABLE_NAME_HEADERS.includes(alias))
  );
  let pathColumnIndex = headerTexts.findIndex((text) =>
    getHeaderAliases(text).some((alias) => TABLE_PATH_HEADERS.includes(alias))
  );

  if (pathColumnIndex === -1) {
    pathColumnIndex = firstDataCells.findIndex((cell) => cell.startsWith('/'));
  }

  if (nameColumnIndex === -1 && firstDataCells.length > 0) {
    nameColumnIndex = firstDataCells.findIndex(
      (cell, index) => index !== pathColumnIndex && cell.includes(' / ')
    );
  }

  headerCells.forEach((cell) => {
    setNodeText(cell, getLocalizedText(getNodeText(cell), language));
  });

  rows.slice(1).forEach((row) => {
    (row.children || []).forEach((cell, index) => {
      const cellText = getNodeText(cell).trim();

      if (index === pathColumnIndex && cellText.startsWith('/')) {
        setNodeLink(cell, cellText, `#${convertPathToHash(cellText)}`);
        return;
      }

      setNodeText(cell, getLocalizedText(cellText, language));
    });
  });
};

const remarkApiTableEnhancer =
  ({ language }: { language: string }) =>
  (tree: MarkdownNode) => {
    const visit = (node?: MarkdownNode) => {
      if (!node) {
        return;
      }

      if (node.type === 'table') {
        transformTableNode(node, language);
      }

      (node.children || []).forEach((child) => visit(child));
    };

    visit(tree);
  };

const markdownComponents = {
  p: ({ children, ...props }: any) => (
    <p className="my-3 leading-relaxed text-gray-600" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="my-3 list-disc space-y-1 pl-6 text-gray-600" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="my-3 list-decimal space-y-1 pl-6 text-gray-600" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
      <table
        className="min-w-full border-collapse text-left text-sm text-gray-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="border-b border-gray-100 px-4 py-3 align-top" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: any) => {
    const isInternalHashLink = typeof href === 'string' && href.startsWith('#');
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isInternalHashLink || !href) {
        return;
      }

      event.preventDefault();
      window.location.hash = href.slice(1);
    };

    return (
      <a
        className="text-blue-600 underline underline-offset-2"
        href={href}
        onClick={handleClick}
        target={isInternalHashLink ? undefined : '_blank'}
        rel={isInternalHashLink ? undefined : 'noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: any) => (
    <code
      className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
      {...props}
    >
      {children}
    </pre>
  ),
};

interface DescriptionContentProps {
  content: string;
  language: string;
}

const DescriptionContent: React.FC<DescriptionContentProps> = ({
  content,
  language,
}) => {
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    return null;
  }

  if (!isMarkdownContent(normalizedContent)) {
    return (
      <p className="mt-2 whitespace-pre-wrap leading-relaxed text-gray-600">
        {getLocalizedText(normalizedContent, language)}
      </p>
    );
  }

  return (
    <div className="mt-2 text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, [remarkApiTableEnhancer, { language }]]}
        components={markdownComponents}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
};

export default DescriptionContent;
