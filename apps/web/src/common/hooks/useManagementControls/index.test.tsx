import React from 'react';
import { render } from '@testing-library/react';
import useManagementControls from './index';
import styles from './styles.module.scss';

const ManagementPage = () => {
  useManagementControls();
  return null;
};

test('keeps portal controls styled until the last management scope leaves', () => {
  const { unmount } = render(<ManagementPage />);
  const { unmount: unmountDialog } = render(<ManagementPage />);
  expect(document.body).toHaveClass(styles.active);
  unmount();
  expect(document.body).toHaveClass(styles.active);
  unmountDialog();
  expect(document.body).not.toHaveClass(styles.active);
});

test('removes management styling when navigating away from a management page', () => {
  const { rerender } = render(<ManagementPage />);
  expect(document.body).toHaveClass(styles.active);
  rerender(<div>普通页面</div>);
  expect(document.body).not.toHaveClass(styles.active);
});
