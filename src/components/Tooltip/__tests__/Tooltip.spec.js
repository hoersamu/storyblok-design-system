import { mount } from '@vue/test-utils'
import SbTooltip from '..'
import SbButton from '../../Button'
import SbIcon from '../../Icon'

const factory = (
  template,
  additionalComponents = {},
  additionalInformation = {}
) => {
  const WrapperComponent = {
    components: { SbTooltip, ...additionalComponents },
    template,
    ...additionalInformation
  }

  return mount(WrapperComponent)
}

describe('test SbTooltip component', () => {
  describe('when using along with a SbButton component', () => {
    const label = 'This is a label to SbButton'
    const buttonText = 'Hover Me!'
    const template = `
      <SbTooltip label="${label}">
        <SbButton is-full-width icon="close" @click="onClick">
          ${buttonText}
        </SbButton>
      </SbTooltip>
    `

    const onClick = jest.fn()
    const onFocus = jest.fn()
    const additionalInfo = {
      methods: {
        onClick,
        onFocus
      }
    }

    const wrapper = factory(template, { SbButton }, additionalInfo)
    const ButtonComponent = wrapper.findComponent(SbButton)
    const IconComponent = wrapper.findComponent(SbIcon)

    it('should render the tooltip label with correct text', () => {
      expect(wrapper.find('.sb-tooltip__label').text()).toBe(label)
    })

    it('should render the SbButton component', () => {
      expect(ButtonComponent.exists()).toBe(true)
      expect(ButtonComponent.text()).toBe(buttonText)
    })

    it('should render the SbButton with isFullWidth', () => {
      expect(ButtonComponent.props('isFullWidth')).toBe(true)
    })

    it('should render with icon close', () => {
      expect(ButtonComponent.props('icon')).toBe('close')
    })

    it('should allow clicks', async () => {
      await ButtonComponent.trigger('click')
      expect(onClick).toHaveBeenCalled()
    })

    it('should have the same id and aria-describedby in the SbButton', () => {
      const id = ButtonComponent.attributes('aria-describedby')
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    })

    it('should exists the SbIcon component', () => {
      expect(IconComponent.exists()).toBe(true)
    })

    it('should render the SbIcon with close name', () => {
      expect(IconComponent.props('name')).toBe('close')
    })
  })

  describe('when using along with texted elements', () => {
    const label = 'This is a label to a texted element'
    const template = `
      <SbTooltip label="${label}">
        Hover me! I'm just a text
      </SbTooltip>
    `

    const wrapper = factory(template, { SbButton })

    it('should render the tooltip label with correct text', () => {
      expect(wrapper.find('.sb-tooltip__label').text()).toBe(label)
    })

    it('should wrap the element with a span', () => {
      expect(wrapper.find('span.sb-tooltip').exists()).toBe(true)
    })

    it('should have the same id and aria-describedby in the container', () => {
      const id = wrapper.attributes('aria-describedby')
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    })
  })

  describe('when render a tooltip with a specific position', () => {
    const label = 'This is a label with a specific position'
    const template = `
      <SbTooltip label="${label}" position="right">
        <p> Hover me! </p>
      </SbTooltip>
    `

    const wrapper = factory(template, { SbButton })

    it('should render with a correct class', () => {
      expect(wrapper.classes('sb-tooltip--right')).toBe(true)
    })
  })
})
