import React, { useMemo, useState } from 'react';
import {
  useContributorsDetailListQuery,
  ContributorDetail,
  FilterOptionInput,
  SortOptionInput,
} from '@oss-compass/graphql';
import client from '@common/gqlClient';
import MyTable from '@common/components/Table';
import classnames from 'classnames';
import {
  useContributionTypeLsit,
  useEcologicalType,
  useMileageOptions,
} from '../contribution';
import { getMaxDomain } from '../utils';
import {
  getContributorPolling,
  getContributorExport,
} from '../../tableDownload';
import DomainPersona from './DomainPersona';
import ContributorName from './ContributorName';
import RolePersona from './RolePersona';
import ContributorDropdown from './ContributorDropdown';
import { useTranslation } from 'next-i18next';
import Download from '@common/components/Table/Download';
import { useRouter } from 'next/router';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';
import Dialog from '@common/components/Dialog';
import Tooltip from '@common/components/Tooltip';
import ManageOrgEdit from '@common/components/OrgEdit/ManageOrgEdit';
import useVerifyDetailRangeQuery from '@modules/analyze/hooks/useVerifyDetailRangeQuery';
import { useIsCurrentUser } from '@modules/analyze/hooks/useIsCurrentUser';
import { FiEdit } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { AiOutlineSearch, AiFillFilter } from 'react-icons/ai';

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
interface TableParams {
  pagination?: TablePaginationConfig;
  filterOpts?: FilterOptionInput[];
  sortOpts?: SortOptionInput;
  filters?: Record<string, FilterValue>;
}

const MetricTable: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
  commonFilterOpts: any[];
}> = ({ label, level, beginDate, endDate, commonFilterOpts }) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [currentOrgName, setCurrentOrgName] = useState('');
  const [origin, setOrigin] = useState('');

  const { data } = useVerifyDetailRangeQuery();
  const { isCurrentUser } = useIsCurrentUser();
  const ecologicalOptions = useEcologicalType();
  const mileageOptions = useMileageOptions();
  const filterMap = {
    ecologicalType: 'ecological_type',
    contributionTypeList: 'contribution_type',
  };
  const router = useRouter();
  const { handleQueryParams } = useHandleQueryParams();

  const queryFilterOpts = router.query?.filterOpts as string;
  const defaultFilterOpts = queryFilterOpts ? JSON.parse(queryFilterOpts) : [];
  const defaultSortOpts = router.query?.sortOpts
    ? JSON.parse(router.query?.sortOpts as string)
    : null;
  const [filterOpts, setFilterOpts] = useState(defaultFilterOpts || []);
  const filterContributionType = useMemo(() => {
    return filterOpts.find((i) => i.type === 'contribution_type');
  }, [filterOpts]);
  const [tableData, setData] = useState<ContributorDetail[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      position: ['bottomCenter'],
      showTotal: (total) => {
        return `${t('analyze:total_people', { total })} `;
      },
    },
    sortOpts: defaultSortOpts,
  });
  const query = {
    page: tableParams.pagination.current,
    per: tableParams.pagination.pageSize,
    filterOpts: [...filterOpts, ...commonFilterOpts],
    sortOpts: tableParams.sortOpts,
    label,
    level,
    beginDate,
    endDate,
  };

  const maxDomain = useMemo(() => {
    return getMaxDomain(tableData);
  }, [tableData]);
  const { isLoading, isFetching } = useContributorsDetailListQuery(
    client,
    query,
    {
      onSuccess: (data) => {
        const items = data.contributorsDetailList.items;
        const hasTypeFilter = filterOpts.find(
          (i) => i.type === 'contribution_type'
        );
        if (hasTypeFilter) {
          let value = hasTypeFilter.values;
          items.map((item) => {
            let list = item.contributionTypeList;
            item.contributionTypeList = list.filter((i) => {
              if (value.includes(i.contributionType)) {
                return true;
              }
            });
          });
        }
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.contributorsDetailList.count,
          },
        });
        setData(items);
        setOrigin(data.contributorsDetailList.origin);
      },
    }
  );
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<ContributorDetail>
  ) => {
    let sortOpts = null;
    let filterOpts = [];
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const transformedObj = {
          type: filterMap[key] || key,
          values: filters[key] as string[],
        };
        filters[key] && filterOpts.push(transformedObj);
      }
    }
    if (filterOpts.find((i) => i.type === 'contribution_type')) {
      sortOpts = sorter.order && {
        type:
          sorter.field === 'contribution'
            ? 'contribution_filterd'
            : sorter.field,
        direction: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
    } else {
      sortOpts = sorter.order && {
        type: sorter.field,
        direction: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
    }
    handleQueryParams({
      filterOpts: filterOpts.length > 0 ? JSON.stringify(filterOpts) : null,
      sortOpts: sortOpts && JSON.stringify(sortOpts),
    });
    setFilterOpts(filterOpts);
    setTableParams({
      pagination: {
        showTotal: tableParams.pagination.showTotal,
        ...pagination,
      },
      sortOpts,
    });
  };

  const columns: ColumnsType<ContributorDetail> = [
    {
      title: t('analyze:metric_detail:contributor'),
      dataIndex: 'contributor',
      align: 'left',
      width: '200px',
      fixed: 'left',
      render: (name) => {
        return <ContributorName name={name} origin={origin} />;
      },
      filterIcon: (filtered: boolean) => (
        <AiFillFilter
          className="text-sm"
          style={{ color: filtered ? '#1677ff' : undefined }}
        />
      ),
      defaultFilteredValue:
        defaultFilterOpts.find((i) => i.type === 'contributor')?.values || null,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <ContributorDropdown
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            placeholder={t('analyze:metric_detail:search_contributor')}
          />
        );
      },
    },
    {
      title: <RolePersona />,
      dataIndex: 'ecologicalType',
      align: 'left',
      width: '200px',
      filters: ecologicalOptions,
      defaultFilteredValue:
        defaultFilterOpts.find((i) => i.type === 'ecological_type')?.values ||
        null,
      render: (text) => {
        return ecologicalOptions.find((i) => i.value === text)?.text || text;
      },
    },

    {
      title: t('analyze:metric_detail:milestone_persona'),
      dataIndex: 'mileageType',
      render: (text) => {
        return mileageOptions.find((i) => i.value === text)?.label || text;
      },
      align: 'left',
      width: '200px',
    },
    {
      title: t('analyze:metric_detail:domain_persona'),
      dataIndex: 'contributionTypeList',
      render: (dataList, col) => {
        return (
          <DomainPersona
            maxDomain={maxDomain}
            dataList={dataList}
            name={col.contributor}
            origin={origin}
          />
        );
      },
      filters: useContributionTypeLsit(),
      defaultFilteredValue:
        defaultFilterOpts.find((i) => i.type === 'contribution_type')?.values ||
        null,
      filterMode: 'tree',
      align: 'left',
      width: '300px',
    },
    {
      title: t('analyze:metric_detail:organization'),
      dataIndex: 'organization',
      align: 'left',
      width: '160px',
      render: (text, col) => {
        let edit = null;
        if (isCurrentUser(col.contributor)) {
          edit = (
            <FiEdit
              className="cursor-pointer"
              onClick={() => {
                window.open('/settings/profile');
              }}
            />
          );
        } else if (data?.verifyDetailDataRange?.status) {
          edit = (
            <FiEdit
              className="cursor-pointer"
              onClick={() => {
                setCurrentName(col.contributor);
                col.organization && setCurrentOrgName(col.organization);
                setOpenConfirm(true);
              }}
            />
          );
        } else {
          edit = (
            <Tooltip
              arrow
              title={<div>{t('analyze:no_role_desc')}</div>}
              placement="top"
            >
              <div>
                <FiEdit className="cursor-not-allowed text-[#868690]" />
              </div>
            </Tooltip>
          );
        }
        return (
          <div className="flex">
            <span>{text || '-'}</span>
            <span className="text-primary ml-2 mt-1">{edit}</span>
          </div>
        );
      },
      filterIcon: (filtered: boolean) => (
        <AiFillFilter
          className="text-sm"
          style={{ color: filtered ? '#1677ff' : undefined }}
        />
      ),
      defaultFilteredValue:
        defaultFilterOpts.find((i) => i.type === 'organization')?.values ||
        null,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <ContributorDropdown
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            confirm={confirm}
            placeholder={t('analyze:metric_detail:search_organization')}
          />
        );
      },
    },
    {
      title: t('analyze:metric_detail:contribution'),
      dataIndex: 'contribution',
      key: 'contribution',
      render: (contribution, record) => {
        if (filterContributionType) {
          let filterCount = record.contributionTypeList.reduce(
            (total, obj) => total + obj.contribution,
            0
          );
          return filterCount;
        } else {
          return contribution;
        }
      },
      align: 'left',
      width: '120px',
      sorter: true,
    },
  ];
  return (
    <>
      <div className="absolute right-4 top-16">
        <Download
          beginFun={getContributorExport}
          pollingFun={getContributorPolling}
          query={query}
          fileName={t('analyze:metric_detail:contributor_data_table')}
        />
      </div>
      <MyTable
        columns={columns}
        dataSource={tableData}
        loading={isLoading || isFetching}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
        rowKey={'contributor'}
        scroll={{ x: 'max-content' }}
      />
      <Dialog
        open={openConfirm}
        classes={{
          paper: classnames(
            'border-2 border-black w-[460px] !max-w-[660px] !rounded-none !m-0',
            'md:w-full md:h-full md:!m-0 md:!min-h-full md:border-none'
          ),
        }}
        dialogTitle={
          <>
            <p className="mb-4">
              {currentName +
                ' ' +
                t('analyze:organization_information_modification')}
            </p>
            <div
              className="absolute right-6 top-4 cursor-pointer p-2"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <GrClose className="text-base" />
            </div>
          </>
        }
        dialogContent={
          <div className="w-full">
            <ManageOrgEdit
              label={label}
              level={level}
              contributor={currentName}
              name={currentOrgName}
              provider={origin}
              setShowEdit={() => {
                setOpenConfirm(false);
              }}
            />
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};
export default MetricTable;
