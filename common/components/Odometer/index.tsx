import dynamic from 'next/dynamic';
import styles from './index.module.scss';

type OdometerProps = {
  value: number;
  animation?: string;
  auto?: boolean;
  duration?: number;
  format?: string;
  theme?: string;
};

const ReactOdometerjs = dynamic(() => import('react-odometerjs'), {
  ssr: false,
});

const Odometer: React.FC<OdometerProps> = (props = { value: 0 }) => {
  return (
    <div className={styles['odometer-scope']}>
      <ReactOdometerjs {...props} />
    </div>
  );
};

export type { OdometerProps };
export default Odometer;
