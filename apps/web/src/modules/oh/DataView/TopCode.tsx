import React from 'react';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import classnames from 'classnames';

const TopCode = () => {
  const dataSource = [
    {
      employer: '华为',
      change_num: '20466505',
      addition_num: '15853318',
      deletion_num: '4613187',
      change_per: '88.20',
      addition_per: '68.32',
      deletion_per: '19.88',
      number: 1,
    },
    {
      employer: '深开鸿',
      change_num: '1455127',
      addition_num: '919642',
      deletion_num: '535485',
      change_per: '6.27',
      addition_per: '3.96',
      deletion_per: '2.31',
      number: 2,
    },
    {
      employer: '开鸿智谷',
      change_num: '547088',
      addition_num: '366170',
      deletion_num: '180918',
      change_per: '2.36',
      addition_per: '1.58',
      deletion_per: '0.78',
      number: 3,
    },
    {
      employer: '普华基础软件',
      change_num: '263552',
      addition_num: '248305',
      deletion_num: '15247',
      change_per: '1.14',
      addition_per: '1.07',
      deletion_per: '0.07',
      number: 4,
    },
    {
      employer: '九联开鸿',
      change_num: '233445',
      addition_num: '139556',
      deletion_num: '93889',
      change_per: '1.01',
      addition_per: '0.60',
      deletion_per: '0.40',
      number: 5,
    },
    {
      employer: '软通动力',
      change_num: '165160',
      addition_num: '159424',
      deletion_num: '5736',
      change_per: '0.71',
      addition_per: '0.69',
      deletion_per: '0.02',
      number: 6,
    },
    {
      employer: '中软国际',
      change_num: '23513',
      addition_num: '23310',
      deletion_num: '203',
      change_per: '0.10',
      addition_per: '0.10',
      deletion_per: '0.00',
      number: 7,
    },
    {
      employer: '润和',
      change_num: '21163',
      addition_num: '14486',
      deletion_num: '6677',
      change_per: '0.09',
      addition_per: '0.06',
      deletion_per: '0.03',
      number: 8,
    },
    {
      employer: '诚迈科技',
      change_num: '11359',
      addition_num: '8827',
      deletion_num: '2532',
      change_per: '0.05',
      addition_per: '0.04',
      deletion_per: '0.01',
      number: 9,
    },
    {
      employer: '新大陆自动识别',
      change_num: '6763',
      addition_num: '6458',
      deletion_num: '305',
      change_per: '0.03',
      addition_per: '0.03',
      deletion_per: '0.00',
      number: 10,
    },
  ];

  const columns = [
    {
      title: '排名',
      dataIndex: 'number',
      //   rowScope: 'row',
    },
    {
      title: '组织',
      dataIndex: 'employer',
      key: 'employer',
    },
    {
      title: '修改行数',
      dataIndex: 'change_per',
      key: 'change_per',
      width: 500,
      render: (text, col) => {
        return (
          <div className="flex">
            <div className="mr-1 w-12 text-right">{text + '%'}</div>
            <div className="flex flex-1 items-center">
              <div
                style={{
                  width: `${text}%`,
                }}
                className="h-2 rounded-full bg-[#409eff]"
              ></div>
            </div>
          </div>
        );
      },
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'topCode'} title={'Top代码量统计'}>
        <MyTable
          columns={columns}
          dataSource={dataSource}
          //   loading={isLoading || isFetching}
          //   onChange={handleTableChange}
          pagination={pagination}
          rowKey={'key'}
          scroll={{ x: 'max-content' }}
        />
      </TableCard>
    </>
  );
};

export default TopCode;
