import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectOption } from '@oss-compass/ui';

const meta: Meta<typeof Select> = {
  title: 'basic/Select',
  component: Select,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <Select>
        <SelectOption value={'1'}>Frodo</SelectOption>
        <SelectOption value={'2'}>Sam</SelectOption>
        <SelectOption value={'3'}>Merry</SelectOption>
        <SelectOption value={'4'}>Pippin</SelectOption>
      </Select>
    );
  },
};
