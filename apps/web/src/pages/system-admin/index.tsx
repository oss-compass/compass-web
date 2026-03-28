import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';

const SystemAdmin = dynamic(() => import('@modules/system-admin'));

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['common', 'analyze'])),
    },
  };
};

const SystemAdminPage = () => {
  return <SystemAdmin />;
};

export default SystemAdminPage;
