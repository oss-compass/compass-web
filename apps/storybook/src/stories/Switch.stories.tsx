import type { Meta, StoryObj } from '@storybook/react';

import { Switch, SelectOption } from '@oss-compass/ui';

const meta: Meta<typeof Switch> = {
  title: 'basic/Switch',
  component: Switch,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <>
        <Switch defaultChecked inputProps={{ 'aria-label': 'switch' }} />
      </>
    );
  },
};
