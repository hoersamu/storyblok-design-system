import dayjs from 'dayjs'
import { SbDatepicker } from './index'
import { datepickerOptions } from './utils'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
type Story = StoryObj<typeof SbDatepicker>

const meta: Meta<typeof SbDatepicker> = {
  title: 'Forms/SbDatepicker',
  component: SbDatepicker,
  args: {
    placeholder: 'Select date and time',
    modelValue: '2021-12-02 00:00',
    type: 'datetime',
    disabled: false,
    isoDate: false,
    timeZone: 'America/Detroit',
    tzTooltip: '',
    minDate: '',
    maxDate: '',
    minuteRange: 1,
    disabledPast: false,
  },
  argTypes: {
    timeZone: {
      name: 'timeZone',
      description:
        'Use this property to bind the user timezone, for example "America/Detroit". The component will calculate the offset automatically',
      defaultValue: 'UTC',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'UTC' },
      },
      control: {
        type: 'text',
      },
    },
    tzOffset: {
      name: 'tzOffset',
      description: `Use this property to bind the user tz offset. NOTE: If you use this, timeZone value will be disconsidered.
        Examples: GMT +05:00 or +05:00 GMT -03:00 or -03:00`,
      defaultValue: '',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' },
      },
      control: {
        type: 'text',
      },
    },
    tzTooltip: {
      name: 'tzTooltip',
      description:
        'Use this property to display a tooltip message for `timeZone` or `tzOffset` information.',
      defaultValue: null,
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'null' },
      },
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      options: [...datepickerOptions],
      description: 'Change the type of the input.',
      defaultValue: 'datetime',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: 'datetime' },
      },
      control: {
        type: 'select',
      },
    },
    isoDate: {
      name: 'isoDate',
      description:
        'If set to true, Datepicker will deliver the date as iso date format like 2010-02-27T05:00:37.845Z',
      defaultValue: false,
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: 'False' },
      },
      control: {
        type: 'boolean',
      },
    },
    minDate: {
      name: 'minDate',
      description:
        'If set, Datepicker will disable dates before the date entered in minDate. Expected format `YYYY-MM-DD`.',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    maxDate: {
      name: 'maxDate',
      description:
        'If set, Datepicker will disable dates after the date entered in maxDate. Expected format `YYYY-MM-DD`.',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    minuteRange: {
      name: 'minuteRange',
      description:
        'The range the minutes should be displayed. WARNING: the range number should be a multiplier of 60, if not it will fallback to 1',
      defaultValue: 1,
      control: {
        type: 'number',
      },
    },
    disabledPast: {
      name: 'disabledPast',
      description:
        'If set to true, Datepicker will disable dates before the current date',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    inlineLabel: {
      name: 'inlineLabel',
      description:
        'Use the `inline-label` property to add text inside the field',
      defaultValue: '',
      table: {
        type: { summary: 'String' },
        defaultValue: { summary: '' },
      },
      control: {
        type: 'text',
      },
    },
  },
  render: (args: Args) => ({
    components: { SbDatepicker },

    setup: () => {
      const internalDatetimeValue = ref(
        dayjs(args.modelValue).format('YYYY-MM-DD HH:mm'),
      )
      return { args, internalDatetimeValue }
    },

    template: `
      <div class="large">
        <SbDatepicker
          v-model="internalDatetimeValue"
          v-bind="args"
          style="width: 29.4rem"
        />
      </div>
    `,
  }),
}

export default meta

export const Default: Story = {}
export const TimeType: Story = {
  args: {
    minuteRange: 5,
  },

  parameters: {
    docs: {
      description: {
        story: 'Use `time` type to only change the time option.',
      },
    },
  },
}
export const DateType: Story = {
  args: {
    type: 'date',
  },

  parameters: {
    docs: {
      description: {
        story: 'Use `date` type to only change the date option.',
      },
    },
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Use `disabled` property to disable the input that opens the Datepicker',
      },
    },
  },
}
export const WithTzOffset: Story = {
  args: {
    tzOffset: '-02:00',
    tzTooltip: 'Timezone can be changed in settings',
  },

  parameters: {
    docs: {
      description: {
        story:
          'Use `timeZone` property to describe the user timezone. It is possible to use an optional property called `tzTooltip` to display a tooltip message for `timeZone` information.',
      },
    },
  },
}
export const MinMaxDate: Story = {
  args: {
    minDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    maxDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
  },

  parameters: {
    docs: {
      description: {
        story:
          'Add the `minDate` attribute to establish a minimum selectable date and add the `maxDate` attribute to establish a maximum selectable date. Expected format `YYYY-MM-DD`.',
      },
    },
  },
}
export const DisabledDatePast: Story = {
  args: {
    disabledPast: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          'Add the `disabled-past` attribute to disabled select dates in past.',
      },
    },
  },
}
export const WithInlineLabel: Story = {
  args: {
    inlineLabel: 'Date:',
  },

  parameters: {
    docs: {
      description: {
        story: 'Use the `inline-label` property to add text inside the field',
      },
    },
  },
}
