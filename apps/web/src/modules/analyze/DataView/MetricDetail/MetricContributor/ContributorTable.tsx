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
} from './contribution';
import { getMaxDomain } from './utils';
import DomainPersona from './DomainPersona';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useTranslation } from 'next-i18next';
import Download from '@common/components/Table/Download';
import { getContributorPolling, getContributorExport } from '../tableDownload';
import { useRouter } from 'next/router';
import { useHandleQueryParams } from '@modules/analyze/hooks/useHandleQueryParams';
import Dialog from '@common/components/Dialog';
import { FiEdit } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import ManageOrgEdit from '@common/components/OrgEdit/ManageOrgEdit';
import useVerifyDetailRange from '@modules/analyze/hooks/useVerifyDetailRange';

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
  mileage: string[];
}> = ({ label, level, beginDate, endDate, mileage }) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [currentOrgName, setCurrentOrgName] = useState('');
  const { data } = useVerifyDetailRange();

  const ecologicalOptions = useEcologicalType();
  const mileageOptions = useMileageOptions();
  const filterMap = {
    ecologicalType: 'ecological_type',
    contributionTypeList: 'contribution_type',
  };
  const router = useRouter();
  const { handleQueryParams } = useHandleQueryParams();

  const mileageFilter = useMemo(() => {
    if (mileage.length > 0) {
      return { type: 'mileage_type', values: mileage };
    } else {
      return null;
    }
  }, [mileage]);

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
      showSizeChanger: false,
      position: ['bottomCenter'],
      showTotal: (total) => {
        return `${t('analyze:total_people', { total })} `;
      },
    },
    filterOpts: filterOpts,
    sortOpts: defaultSortOpts,
  });
  const query = {
    page: tableParams.pagination.current,
    per: tableParams.pagination.pageSize,
    filterOpts: [...tableParams.filterOpts, mileageFilter],
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
        const hasTypeFilter = tableParams.filterOpts.find(
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
      },
      // keepPreviousData: true,
      // onError(res: any) {
      //   toast.error(
      //     getErrorMessage(res) || (() => <>{t('lab:create_failed')}</>),
      //     {
      //       position: 'top-center',
      //     }
      //   );
      // },
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
          type: filterMap[key],
          values: filters[key] as string[],
        };
        filters[key] && filterOpts.push(transformedObj);
      }
    }
    if (filterOpts.find((i) => i.type === 'contribution_type')) {
      sortOpts = sorter.field && {
        type:
          sorter.field === 'contribution'
            ? 'contribution_filterd'
            : sorter.field,
        direction: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
    } else {
      sortOpts = sorter.field && {
        type: sorter.field,
        direction: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
    }
    handleQueryParams({
      filterOpts: JSON.stringify(filterOpts),
      sortOpts: JSON.stringify(sortOpts),
    });
    setFilterOpts(filterOpts);
    setTableParams({
      pagination: {
        showTotal: tableParams.pagination.showTotal,
        ...pagination,
      },
      sortOpts,
      filterOpts,
    });
  };

  const columns: ColumnsType<ContributorDetail> = [
    {
      title: t('analyze:metric_detail:contributor'),
      dataIndex: 'contributor',
      align: 'left',
      width: '200px',
      sorter: true,
      fixed: 'left',
    },
    {
      title: t('analyze:metric_detail:role_persona'),
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
          />
        );
      },
      filters: useContributionTypeLsit(),
      defaultFilteredValue:
        defaultFilterOpts.find((i) => i.type === 'contribution_type')?.values ||
        null,
      filterMode: 'tree',
      // ellipsis: { showTitle: true },
      align: 'left',
      width: '300px',
    },
    {
      title: t('analyze:metric_detail:organization'),
      dataIndex: 'organization',
      align: 'left',
      width: '160px',
      render: (text, col) => {
        return (
          <div className="flex">
            <span>{text || '-'}</span>
            <span className="text-primary ml-2 mt-1">
              {data?.verifyDetailDataRange?.labelAdmin && (
                <FiEdit
                  className="cursor-pointer"
                  onClick={() => {
                    setCurrentName(col.contributor);
                    col.organization && setCurrentOrgName(col.organization);
                    setOpenConfirm(true);
                  }}
                />
              )}
            </span>
          </div>
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
      <div className="absolute right-0 top-2">
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
