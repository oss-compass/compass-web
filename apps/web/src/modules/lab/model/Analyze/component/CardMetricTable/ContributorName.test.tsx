import React from 'react';
import { render, screen } from '@testing-library/react';
import ContributorName from './ContributorName';

it.each([
  ['atomgit', 'https://atomgit.com/alice'],
  ['github', 'https://github.com/alice'],
])('links a %s contributor to %s', (origin, href) => {
  render(<ContributorName name="alice" origin={origin} />);

  expect(screen.getByRole('link', { name: 'alice' })).toHaveAttribute(
    'href',
    href
  );
});
