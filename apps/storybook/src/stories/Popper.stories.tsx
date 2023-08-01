import type { Meta, StoryObj } from '@storybook/react';

import { Popper } from '@oss-compass/ui';

const meta: Meta<typeof Popper> = {
  title: 'basic/Popper',
  component: Popper,
  argTypes: {
    placement: {
      options: ['top', 'bottom', 'right', 'left'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popper>;

export const Default: Story = {
  args: {
    placement: 'left',
  },
  render: (args) => {
    return (
      <div className="flex p-10">
        <Popper
          placement={args.placement}
          content={
            <div className={'rounded bg-black/90 p-2 text-white shadow'}>
              Popper Content
            </div>
          }
        >
          {(trigger) => (
            <button
              onClick={(e) => {
                trigger(e);
              }}
            >
              trigger btn
            </button>
          )}
        </Popper>
      </div>
    );
  },
};
