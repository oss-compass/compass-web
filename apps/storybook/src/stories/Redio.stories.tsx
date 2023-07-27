import type { Meta, StoryObj } from '@storybook/react';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { CustomRadio } from '@oss-compass/ui';

const meta: Meta<typeof RadioGroup> = {
  title: 'basic/RadioGroup',
  component: RadioGroup,
  argTypes: {
    defaultValue: {
      options: ['female', 'male', 'other'],
      control: { type: 'radio' },
    },
    value: {
      options: ['female', 'male', 'other'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const CustomStyledRadio: Story = {
  args: { defaultValue: 'first' },
  render: (args) => {
    const { defaultValue, value } = args;
    return (
      <FormControl>
        <FormLabel id="demo-customized-radios">Gender</FormLabel>
        <RadioGroup
          defaultValue={defaultValue}
          value={value}
          aria-labelledby="demo-customized-radios"
          name="customized-radios"
        >
          <FormControlLabel
            value="female"
            control={<CustomRadio />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<CustomRadio />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<CustomRadio />}
            label="Other"
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<CustomRadio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    );
  },
};
