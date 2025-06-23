import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import SystemAdmin from '@modules/system-admin';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['common'])),
    },
  };
};

const SystemAdminPage = () => {
  return <SystemAdmin />;
};

export default SystemAdminPage;
