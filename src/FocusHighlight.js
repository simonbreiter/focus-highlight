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
    transitionDuration: 0.3,
    transitionTimingFunction: 'ease-in-out',
    color: 'dodgerBlue',
    customStyle: false
  },
  focus: {},
  mouseDown: false,
  visible: false,
  init (settings) {
    this.settings = Object.assign(this.settings, settings)
    this.focus = this.createFocus()
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
        box-shadow: 0 0 5px 1px ${this.settings.color};
        box-sizing: border-box;
        top: 0;
        left: 0;
        transition-timing-function: ${this.settings.transitionTimingFunction};
        transition: width ${this.settings.transitionDuration}s, 
                    height ${this.settings.transitionDuration}s, 
                    left ${this.settings.transitionDuration}s, 
                    top ${this.settings.transitionDuration}s, 
                    opacity ${this.settings.transitionDuration}s, 
                    border-radius .2s;
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
      this.mouseDown = true
    })
    document.documentElement.addEventListener('mouseup', e => {
      // Mouseup event should always fire after focus event
      setTimeout(() => { this.mouseDown = false }, 100)
    })
    document.documentElement.addEventListener(
      'focus', e => {
        if (!this.mouseDown) {
          this.move(e)
        }
      },
      true
    )
    document.addEventListener(
      'blur', e => {
        this.hide()
      },
      true
    )
    window.addEventListener('resize', throttle(this.hide.bind(this), 500))
  },
  move (e) {
    const target = closest(e.target, e.target, 'wrapper')
    const rect = target.getBoundingClientRect()

    if (target.type === 'radio') {
      this.focus.style.borderRadius = '50%'
    } else {
      this.focus.style.borderRadius = `${this.settings.borderRadius}px`
    }

    target.style.outline = 'none'
    this.focus.style.width = `${rect.width + this.settings.padding}px`
    this.focus.style.height = `${rect.height + this.settings.padding}px`
    this.focus.style.left = `${rect.left - this.settings.padding / 2}px`
    this.focus.style.top = `${rect.top + document.documentElement.scrollTop - this.settings.padding / 2}px`

    this.show()
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
  }
}
