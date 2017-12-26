const closest = (el, root, attr) => {
  const parent = el.parentNode
  if (parent.dataset.focusHighlight !== 'wrapper' && parent !== document.body) {
    return closest(parent, root, attr)
  } else if (parent === document.body) {
    return root
  } else {
    return parent
  }
}

const throttle = (callback, limit) => {
  let wait = false
  return () => {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, limit)
    }
  }
}

export default {
  settings: {
    padding: 2,
    borderRadius: 4,
    borderThickness: 2,
    boxShadow: '0 0 5px 1px dodgerBlue',
    transition: 'all .3s ease',
    color: 'dodgerBlue',
    customStyle: false,
    hideOnTransitionEnd: false,
    zIndex: 9999
  },
  focus: {},
  mouseDown: false,
  labelHasFocus: false,
  visible: false,
  firstFocus: true,
  init (settings) {
    this.settings = Object.assign(this.settings, settings)
    this.addListeners()
  },
  createFocus () {
    const focus = document.createElement('div')

    document.body.appendChild(focus)
    focus.classList.add('focus')
    focus.style.position = 'absolute'
    focus.style.opacity = 0
    focus.style.pointerEvents = 'none'

    if (!this.settings.customStyle) {
      this.appendDefaultStyle()
    }

    return focus
  },
  appendDefaultStyle () {
    const css = `
      .focus {
        border-radius: ${this.settings.borderRadius}px;
        border: ${this.settings.borderThickness}px solid ${this.settings.color};
        box-shadow: ${this.settings.boxShadow};
        box-sizing: border-box;
        transition: ${this.settings.transition};
        z-index: ${this.settings.zIndex};            
      }
    `
    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')

    style.type = 'text/css'

    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }

    head.appendChild(style)
  },
  addListeners () {
    document.documentElement.addEventListener('mousedown', e => {
      const nodeName = e.target.nodeName.toLowerCase()
      if (nodeName === 'label') {
        this.labelHasFocus = true
      }
      this.mouseDown = true
      this.hide()
    })
    document.documentElement.addEventListener('mouseup', e => {
      this.mouseDown = false
    })
    document.documentElement.addEventListener('customFocus', e => {
      this.move(e)
    })
    document.documentElement.addEventListener(
      'focus', e => {
        if (!this.mouseDown && e.target !== document.body && !this.labelHasFocus) {
          this.move(e)
        }
        this.labelHasFocus = false
      },
      true
    )
    document.addEventListener(
      'blur', e => {
        this.hide()
      },
      true
    )
    if (this.settings.hideOnTransitionEnd) {
      const transitions = ['webkitTransitionEnd', 'transitionend']
      transitions.forEach(transition => {
        transition.addEventListener(transition, e => {
          this.hide()
        })
      })
    }
    window.addEventListener('resize', throttle(this.hide.bind(this), 500))
  },
  move (e) {
    const target = closest(e.target, e.target, 'wrapper')
    const rect = target.getBoundingClientRect()
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (this.firstFocus) {
      this.focus = this.createFocus()
    }

    if (!this.firstFocus || !this.settings.hideOnTransitionEnd) {
      this.show()
    }

    this.firstFocus = false

    if (target.type === 'radio') {
      this.focus.style.borderRadius = '50%'
    } else {
      this.focus.style.borderRadius = `${this.settings.borderRadius}px`
    }

    if (!this.settings.hideOnTransitionEnd) {
      target.style.outline = 'none'
    }

    this.focus.style.width = `${rect.width + this.settings.padding}px`
    this.focus.style.height = `${rect.height + this.settings.padding}px`
    this.focus.style.left = `${rect.left - this.settings.padding / 2}px`
    this.focus.style.top = `${rect.top + scrollTop - this.settings.padding / 2}px`
  },
  hide () {
    if (this.visible) {
      this.visible = false
      this.focus.style.opacity = 0
    }
  },
  show () {
    this.visible = true
    this.focus.style.opacity = 1
  },
  setFocus (element) {
    const customFocus = new window.Event(
      'customFocus',
      {
        bubbles: true,
        cancelable: true
      }
    )
    element.dispatchEvent(customFocus)
  }
}
