import './avatar.scss'
import avatarFallback from '../../assets/icons/avatar-fallback.svg'
import { canUseDOM, includes } from '../../utils'
import { isSizeValid, getInitials, generateRandomBgColor } from './utils.js'

import SbBadge from '../Badge'
import SbTooltip from '../Tooltip'

const positionTypes = ['top', 'bottom']

/**
 * SbAvatar component
 *
 * SbAvatar is a component to view user information or entity
 */
const SbAvatar = {
  name: 'SbAvatar',

  props: {
    description: {
      type: String
    },
    descriptionPosition: {
      type: String,
      default: 'top',
      validator: position => includes(positionTypes, position)
    },
    name: {
      type: String
    },
    size: {
      type: String,
      validator: isSizeValid
    },
    showName: {
      type: Boolean,
      default: false
    },
    src: {
      type: String
    },
    status: {
      type: String
    },
    useTooltip: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isImageLoaded: false
  }),

  methods: {
    loadImage (src) {
      if (!canUseDOM) {
        return
      }

      const image = new window.Image()
      image.src = src

      image.onload = () => {
        this.isImageLoaded = true
      }

      image.onerror = () => {
        this.isImageLoaded = false
      }
    }
  },

  created () {
    if (process.browser) {
      this.loadImage(this.src)
    }
  },

  render (h) {
    const avatarProps = {
      staticClass: 'sb-avatar'
    }

    if (this.size) {
      avatarProps.staticClass += ` sb-avatar--${this.size}`
    }

    const renderBadgeStatus = () => {
      return h(SbBadge, {
        props: {
          type: this.status,
          contract: true
        }
      })
    }

    const renderAvatarImage = () => {
      if (this.$slots.default) {
        return this.$slots.default
      }

      if (this.isImageLoaded) {
        return h('img', {
          attrs: {
            alt: this.name,
            src: this.src
          }
        })
      }

      return h('img', {
        staticClass: generateRandomBgColor(),
        attrs: {
          alt: this.name,
          src: avatarFallback
        }
      })
    }

    const renderName = () => {
      return h('span', {
        staticClass: 'sb-avatar__text'
      }, this.name)
    }

    const renderDescription = () => {
      return h('span', {
        staticClass: `sb-avatar__description sb-avatar__description--${this.descriptionPosition}`
      }, this.description)
    }

    const renderTextContainer = () => {
      const showDescription = this.showName && this.description
      const position = this.descriptionPosition

      return h(
        'div', {
          staticClass: 'sb-avatar__text-container'
        },
        [
          showDescription && position === 'top' && renderDescription(),
          renderName(),
          showDescription && position === 'bottom' && renderDescription()
        ]
      )
    }

    const renderAvatar = () => {
      if (this.src || this.$slots.default) {
        return h('div', {
          staticClass: 'sb-avatar__image',
          attrs: {
            ...(this.useTooltip && { tabindex: 0 })
          }
        }, [
          renderAvatarImage(),
          !!this.status && renderBadgeStatus()
        ])
      }

      if (this.name) {
        return h('div', {
          staticClass: 'sb-avatar__initials ' + generateRandomBgColor(),
          attrs: {
            ...(this.useTooltip && { tabindex: 0 })
          }
        }, [
          h('span', getInitials(this.name)),
          !!this.status && renderBadgeStatus()
        ])
      }
    }

    if (this.name && this.useTooltip) {
      return h('div', avatarProps, [
        h(SbTooltip, {
          props: {
            label: this.name,
            position: 'bottom'
          }
        }, [renderAvatar()])
      ])
    }

    const children = [
      renderAvatar()
    ]

    if (this.showName && this.name && !this.useTooltip) {
      children.push(
        renderTextContainer()
      )
    }

    return h('div', avatarProps, children)
  }
}

export default SbAvatar
