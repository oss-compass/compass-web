import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@oss-compass/ui';

const meta: Meta<typeof Input> = {
  title: 'basic/Input',
  component: Input,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    placeholder: {
      control: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { disabled: false, error: false, placeholder: 'please input' },
  render: (args) => {
    return <Input intent={'primary'} style={{ width: '400px' }} {...args} />;
  },
};

export const Secondary: Story = {
  args: { disabled: false, error: false, placeholder: 'please input' },
  render: (args) => {
    return <Input intent={'secondary'} style={{ width: '400px' }} {...args} />;
  },
};

export const Md: Story = {
  args: { disabled: false, error: false, placeholder: 'please input' },
  render: (args) => {
    return <Input size="md" style={{ width: '400px' }} {...args} />;
  },
};

export const Lg: Story = {
  args: { disabled: false, error: false, placeholder: 'please input' },
  render: (args) => {
    return <Input size="lg" {...args} />;
  },
};
