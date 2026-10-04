import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@oss-compass/ui';

describe('ui Input native attributes', () => {
  it('forwards id and aria attributes to the native input', () => {
    render(<Input id="org-name" aria-label="Organization name" />);

    const input = screen.getByRole('textbox', { name: 'Organization name' });
    expect(input).toHaveAttribute('id', 'org-name');
  });

  it('forwards other native input attributes such as maxLength and type', () => {
    render(<Input maxLength={5} type="password" aria-label="Secret" />);

    const input = screen.getByLabelText('Secret');
    expect(input).toHaveAttribute('maxlength', '5');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('still reports values through the controlled onChange contract', async () => {
    const handleChange = jest.fn();
    render(<Input aria-label="Name" defaultValue="" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'ab' },
    });

    expect(handleChange).toHaveBeenLastCalledWith('ab');
  });
});
