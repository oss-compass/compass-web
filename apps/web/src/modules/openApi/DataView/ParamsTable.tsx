import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

export interface ApiParameter {
  name: string;
  required: boolean;
  type: string;
  description?: string;
}
const ParamsTable = ({ params }: { params: ApiParameter[] }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-semibold">{t('open_api:parameters')}</h3>
      <Table
        bordered
        size="small"
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          {
            title: 'Required',
            render: (_, r) => (r?.required ? 'Yes' : 'No'),
            key: 'name',
          },
          { title: 'Type', dataIndex: 'type', key: 'type' },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
        ]}
        dataSource={params}
        pagination={false}
      />
    </div>
  );
};
export default ParamsTable;
