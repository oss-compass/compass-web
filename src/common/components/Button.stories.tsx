import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'basic/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    intent: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
    },
    size: {
      options: ['lg', 'md', 'sm'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button' },
  render: (args) => {
    const { loading, intent, disabled, children } = args;
    return (
      <Button loading={loading} disabled={disabled} intent={intent}>
        {children}
      </Button>
    );
  },
};

export const Loading: Story = {
  args: { children: 'Button', loading: true },
};

export const Disabled: Story = {
  args: { children: 'Button', disabled: true },
};

export const variantsPrimary: Story = {
  args: { children: 'Button', intent: 'primary' },
};

export const variantsSecondary: Story = {
  args: { children: 'Button', intent: 'secondary' },
};

export const variantsDanger: Story = {
  args: { children: 'Button', intent: 'danger' },
};
