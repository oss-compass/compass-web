import { useEffect } from 'react';
import styles from './styles.module.scss';

let activeManagementPages = 0;

/** Scope management controls and body-mounted Ant Design dialogs to the active page. */
const useManagementControls = () => {
  useEffect(() => {
    activeManagementPages += 1;
    document.body.classList.add(styles.active);
    return () => {
      activeManagementPages -= 1;
      if (activeManagementPages === 0) {
        document.body.classList.remove(styles.active);
      }
    };
  }, []);
};

export default useManagementControls;
