import React, { useMemo, useState } from 'react'; // 导入 useState
import MyTable from '@common/components/Table';
import useGetTableOption from './useGetTableOption';
import { useTpcSoftwareSelectionReportPageQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTableColumns } from './useTableColumns';
import { useUserInfo } from '@modules/auth';
import { Button, message } from 'antd'; // 导入 Button 和 message
import { useRouter } from 'next/router'; // 导入 useRouter
import { useTranslation } from 'next-i18next';

const ReportTable = () => {
  const { currentUser } = useUserInfo();
  const { t } = useTranslation('os-selection');
  const router = useRouter(); // 初始化 useRouter

  const {
    tableData,
    setData,
    tableParams,
    setTableParams,
    query,
    handleTableChange,
  } = useGetTableOption();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 新增状态：选中行的 key
  const [selectedRows, setSelectedRows] = useState<any[]>([]); // 新增状态：选中行的完整数据

  const myQuery = useMemo(
    () => ({
      ...query,
      reportTypeList: [0],
      filterOpts: [{ type: 'user', values: [currentUser?.name] }],
    }),
    [query, currentUser?.name] // 添加 currentUser.name 依赖
  );

  const { isLoading, isFetching, refetch } =
    useTpcSoftwareSelectionReportPageQuery(client, myQuery, {
      onSuccess: (data) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.tpcSoftwareSelectionReportPage.count as number,
          },
        });
        setData(data.tpcSoftwareSelectionReportPage.items);
      },
      onError: (error) => {},
    });

  const { columns } = useTableColumns(refetch); // useTableColumns 不需要知道选中状态

  // 处理行选择变化
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    newSelectedRows: any[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => ({
      disabled: record?.tpcSoftwareReportMetric?.status !== 'success', // 只有当 status 为 'success' 时才可选中
      name: record.name,
    }),
  };

  // 处理对比按钮点击
  const handleCompare = () => {
    if (selectedRows.length < 2) {
      message.warning(t('my_reports.compare_tip'));
      return;
    }
    const shortCodes = selectedRows.map((row) => row.shortCode).join('..');
    router.push(`/os-selection/report?projectId=${shortCodes}`);
  };

  return (
    <>
      <div className="my-4 h-full bg-[#ffffff] p-4">
        <div className="mb-4">
          <Button disabled={selectedRowKeys.length < 2} onClick={handleCompare}>
            {t('my_reports.compare_button')}
          </Button>
        </div>
        <MyTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
          rowKey={'id'}
          tableLayout={'fixed'}
          rowSelection={rowSelection} // 添加 rowSelection 配置
          // scroll={{ x: 'max-content' }}
        />
      </div>
    </>
  );
};

export default ReportTable;
