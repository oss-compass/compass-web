import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackDialog from './FeedbackDialog';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: '/' }),
}));

// Mock the shared ui package (its nested react@18 install would otherwise
// collide with the app's react@19 in jsdom); only the Button passthrough
// matters for this dialog test.
jest.mock('@oss-compass/ui', () => ({
  Button: (props: any) => <button {...props} />,
}));

describe('FeedbackDialog', () => {
  it('associates the visible content label with the textarea', () => {
    render(<FeedbackDialog open={true} onClose={jest.fn()} />);

    const textarea = screen.getByLabelText('common:feedback_content');

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });
});
