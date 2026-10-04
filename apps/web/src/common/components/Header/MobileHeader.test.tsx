import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileHeader from './MobileHeader';

const openDrawer = (container: HTMLElement) => {
  // The hamburger trigger is an unlabelled icon div; Testing Library has no
  // query for it, so a single scoped node access is the least brittle option.
  // eslint-disable-next-line testing-library/no-node-access
  const hamburger = container.querySelector('div.mr-2');
  expect(hamburger).not.toBeNull();
  fireEvent.click(hamburger!);
};

describe('MobileHeader drawer', () => {
  it('closes the drawer after tapping a navigation item', () => {
    const { container } = render(<MobileHeader />);

    openDrawer(container);
    expect(screen.getByText('common:header.home')).toBeInTheDocument();

    // tapping a menu item must close the drawer; the item handler and the
    // bubbling container handler must not cancel each other out
    fireEvent.click(screen.getByText('common:header.home'));

    expect(screen.queryByText('common:header.home')).not.toBeInTheDocument();
  });

  it('re-opens the drawer after a navigation close', () => {
    const { container } = render(<MobileHeader />);

    openDrawer(container);
    expect(screen.getByText('common:header.docs')).toBeInTheDocument();

    fireEvent.click(screen.getByText('common:header.docs'));
    expect(screen.queryByText('common:header.docs')).not.toBeInTheDocument();

    openDrawer(container);
    expect(screen.getByText('common:header.docs')).toBeInTheDocument();
  });
});
