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
    },
    {
      employer: '深开鸿',
      change_num: '1455127',
      addition_num: '919642',
      deletion_num: '535485',
    },
    {
      employer: '开鸿智谷',
      change_num: '547088',
      addition_num: '366170',
      deletion_num: '180918',
    },
    {
      employer: '普华基础软件',
      change_num: '263552',
      addition_num: '248305',
      deletion_num: '15247',
    },
    {
      employer: '九联开鸿',
      change_num: '233445',
      addition_num: '139556',
      deletion_num: '93889',
    },
    {
      employer: '软通动力',
      change_num: '165160',
      addition_num: '159424',
      deletion_num: '5736',
    },
    {
      employer: '中软国际',
      change_num: '23513',
      addition_num: '23310',
      deletion_num: '203',
    },
    {
      employer: '润和',
      change_num: '21163',
      addition_num: '14486',
      deletion_num: '6677',
    },
    {
      employer: '诚迈科技',
      change_num: '11359',
      addition_num: '8827',
      deletion_num: '2532',
    },
    {
      employer: '新大陆自动识别',
      change_num: '6763',
      addition_num: '6458',
      deletion_num: '305',
    },
    {
      employer: '中国科学院软件研究所',
      change_num: '5622',
      addition_num: '5550',
      deletion_num: '72',
    },
    {
      employer: '泰凌微电子',
      change_num: '2043',
      addition_num: '1632',
      deletion_num: '411',
    },
    {
      employer: '北理工',
      change_num: '1022',
      addition_num: '1022',
      deletion_num: '0',
    },
    {
      employer: '汇顶科技',
      change_num: '800',
      addition_num: '503',
      deletion_num: '297',
    },
    {
      employer: '中科创达',
      change_num: '450',
      addition_num: '449',
      deletion_num: '1',
    },
    {
      employer: '小熊派',
      change_num: '354',
      addition_num: '310',
      deletion_num: '44',
    },
    {
      employer: '东软集团',
      change_num: '117',
      addition_num: '55',
      deletion_num: '62',
    },
    {
      employer: '恒玄科技',
      change_num: '40',
      addition_num: '18',
      deletion_num: '22',
    },
  ];

  const columns = [
    // {
    //   title: '排名',
    //   dataIndex: 'number',
    //   //   rowScope: 'row',
    // },
    {
      title: '组织',
      dataIndex: 'employer',
      key: 'employer',
    },
    {
      title: '增加行数',
      dataIndex: 'addition_num',
      key: 'addition_num',
    },
    {
      title: '减少行数',
      dataIndex: 'deletion_num',
      key: 'deletion_num',
    },
    {
      title: '修改行数',
      dataIndex: 'change_num',
      key: 'change_num',
    },
  ];
  const pagination = {
    hideOnSinglePage: true,
  };
  return (
    <>
      <TableCard id={'topCode'} title={'Top20代码修改量'}>
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
