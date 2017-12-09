import FocusHighlight from '../../lib/FocusHighlight'

FocusHighlight.init({
  borderRadius: 4,
  padding: 0,
  color: 'blueViolet',
  transitionDuration: 0.3,
  transitionTimingFunction: 'ease-in-out',
  customStyle: false
})

// FocusHighlight.init()

const scriptBtn = document.querySelector('#scriptBtn')
const telInput = document.querySelector('#tel')

scriptBtn.addEventListener('click', () => {
  FocusHighlight.setFocus(telInput)
})
