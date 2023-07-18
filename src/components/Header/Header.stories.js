import SbHeader from './index'
import LIB_ICONS from '../../lib/internal-icons'
import { availableVariants } from '../Button/lib'

const availableIcons = Object.keys(LIB_ICONS)

const HeaderTemplate = (args) => ({
  components: { SbHeader },
  setup() {
    return { args }
  },
  template: `
    <SbHeader
      v-bind="args"
    />
  `,
})

export default {
  title: 'Basic/SbHeader',
  component: SbHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Header is used to name an area. It could also have a button which trigger an action called button-click',
      },
    },
  },
  args: {
    hasButton: true,
    title: 'Example title',
    subtitleText: 'Example subtitle',
    isLoading: false,
    buttonLabel: 'Example button label',
    buttonIcon: 'plus',
    buttonVariant: 'primary',
    buttonDisabled: false,
    buttonTooltip: '',
  },
  argTypes: {
    title: {
      description: 'Define the title of the header',
      control: 'text',
    },
    subtitleText: {
      description: 'Define the subtitle of the header',
      control: 'text',
    },
    hasButton: {
      description: 'Shows the button',
      control: 'boolean',
    },
    buttonLabel: {
      description: 'Define the label of the button',
      control: 'text',
    },
    buttonDisabled: {
      description: 'Define if it is disabled or not',
      control: 'boolean',
    },
    isLoading: {
      description: 'Define the loading state of the button',
      control: 'boolean',
    },
    buttonIcon: {
      description: 'Choose the icon of the button',
      options: availableIcons,
      control: 'select',
    },
    buttonVariant: {
      description: 'Choose the color of the button',
      options: availableVariants,
      control: 'select',
    },
    buttonTooltip: {
      description: 'Define the button tooltip',
      control: 'text',
    },
  },
}

export const Default = HeaderTemplate.bind({})
