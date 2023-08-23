import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from '@oss-compass/ui';

const meta: Meta<typeof Modal> = {
  title: 'basic/Modal',
  component: Modal,
  argTypes: {
    open: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: ({ open }) => {
    return (
      <div className="p-10">
        <Modal open={open}>
          <div className="rounded bg-white p-10 shadow">
            <div>Text in a modal</div>
            <div>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
