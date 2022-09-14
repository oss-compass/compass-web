import React, { PropsWithChildren, Fragment } from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import classnames from 'classnames';

const SideBarConfig = [
  {
    name: 'Code Quality ',
    id: 'code-quality ',
    groups: [
      {
        name: 'Overview',
        id: 'overview',
      },
      {
        name: 'Code Changes Commits',
        id: 'code-changes-commits',
      },
      {
        name: 'Change Request linked with Issues',
        id: 'change-request-linked-with-issues',
      },
    ],
  },
  {
    name: 'Community Service and Support',
    id: 'community-service-and-support',
    groups: [
      {
        name: 'Overview',
        id: 'overview',
      },
      {
        name: 'Issue Response Time',
        id: 'issue-response-time',
      },
      {
        name: 'Issue Age and Issue Resolution Duration',
        id: 'issue-age-and-issue-resolution-duration',
      },
      {
        name: 'Activity Dates and Times',
        id: 'activity-dates-and-times',
      },
    ],
  },
  {
    name: 'Community Activity',
    id: 'community-activity',
    groups: [
      {
        name: 'Overview',
        id: 'overview',
      },
      {
        name: 'Change Request Reviews',
        id: 'change-request-reviews',
      },
      {
        name: 'Activity Dates and Times',
        id: 'activity-dates-and-times',
      },
      {
        name: 'Contribution Attribution',
        id: 'contribution-attribution',
      },
    ],
  },
];

const MenuItem: React.FC<PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  return (
    <a
      href={`#${id}`}
      className="flex h-8 cursor-pointer items-center rounded p-2 text-zinc-600 hover:bg-slate-100 hover:text-black"
    >
      <AiOutlineAppstore className="mr-2 flex-shrink-0 " />
      <h3 className="text-sm line-clamp-1">{children}</h3>
    </a>
  );
};

const Divider = () => <div className="m-2 border-b"></div>;

const SideBar = () => {
  return (
    <aside
      className={classnames('hidden w-64 flex-shrink-0 border-r', 'md:block')}
    >
      <div className="sticky top-14 p-6">
        <MenuItem id="trend">Trend</MenuItem>
        {SideBarConfig.map((item) => {
          return (
            <Fragment key={item.id}>
              <Divider />
              <h2 className="m-2 text-xs text-gray-400">{item.name}</h2>
              {item.groups.map((item) => {
                return (
                  <MenuItem id={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
