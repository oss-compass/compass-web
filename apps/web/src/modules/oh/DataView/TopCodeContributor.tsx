import React from 'react';
import TableCard from '@modules/oh/components/TableCard';
import MyTable from '@common/components/Table';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import classnames from 'classnames';

const TopCode = () => {
  const dataSource = [
    {
      author_email: 'artem.******henko@huawei.com',
      employer: '华为',
      change_num: '1356236',
      addition_num: '1346057',
      deletion_num: '10179',
    },
    {
      author_email: 'zhan****eng7@huawei.com',
      employer: '华为',
      change_num: '787137',
      addition_num: '649078',
      deletion_num: '138059',
    },
    {
      author_email: 'wang****582@huawei.com',
      employer: '华为',
      change_num: '593843',
      addition_num: '482343',
      deletion_num: '111500',
    },
    {
      author_email: 'lver****118@163.com',
      employer: '',
      change_num: '415431',
      addition_num: '413114',
      deletion_num: '2317',
    },
    {
      author_email: 'xin****ng1@huawei.com',
      employer: '华为',
      change_num: '401759',
      addition_num: '364534',
      deletion_num: '37225',
    },
    {
      author_email: 'xin***13@huawei.com',
      employer: '华为',
      change_num: '368068',
      addition_num: '295416',
      deletion_num: '72652',
    },
    {
      author_email: 'wa***hi@kaihong.com',
      employer: '深开鸿',
      change_num: '344785',
      addition_num: '267970',
      deletion_num: '76815',
    },
    {
      author_email: 'chuai*****hong@huawei.com',
      employer: '华为',
      change_num: '342279',
      addition_num: '288872',
      deletion_num: '53407',
    },
    {
      author_email: 'he***18@huawei.com',
      employer: '华为',
      change_num: '332115',
      addition_num: '326020',
      deletion_num: '6095',
    },
    {
      author_email: 'do***ei@kaihong.com',
      employer: '深开鸿',
      change_num: '314466',
      addition_num: '266383',
      deletion_num: '48083',
    },
    {
      author_email: 'liux****223@huawei.com',
      employer: '华为',
      change_num: '285420',
      addition_num: '206264',
      deletion_num: '79156',
    },
    {
      author_email: 'zhan****ei11@huawei.com',
      employer: '华为',
      change_num: '247931',
      addition_num: '243262',
      deletion_num: '4669',
    },
    {
      author_email: 'xi***ng@i-soft.com.cn',
      employer: '普华基础软件',
      change_num: '237068',
      addition_num: '234904',
      deletion_num: '2164',
    },
    {
      author_email: 'sun***g34@huawei.com',
      employer: '华为',
      change_num: '216183',
      addition_num: '207939',
      deletion_num: '8244',
    },
    {
      author_email: 'wan***ng@kaihong.com',
      employer: '深开鸿',
      change_num: '202541',
      addition_num: '9089',
      deletion_num: '193452',
    },
    {
      author_email: 'yang****ong@huawei.com',
      employer: '华为',
      change_num: '152402',
      addition_num: '128620',
      deletion_num: '23782',
    },
    {
      author_email: 'huya****ng5@huawei.com',
      employer: '华为',
      change_num: '149763',
      addition_num: '141833',
      deletion_num: '7930',
    },
    {
      author_email: '452***386@qq.com',
      employer: '',
      change_num: '148851',
      addition_num: '98417',
      deletion_num: '50434',
    },
    {
      author_email: 'lixi****eng5@huawei.com',
      employer: '华为',
      change_num: '146556',
      addition_num: '66092',
      deletion_num: '80464',
    },
    {
      author_email: 'bai****an4@huawei.com',
      employer: '华为',
      change_num: '143459',
      addition_num: '100579',
      deletion_num: '42880',
    },
  ];

  const columns = [
    {
      title: '贡献者',
      dataIndex: 'author_email',
      key: 'author_email',
    },
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
