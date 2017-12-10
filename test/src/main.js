import FocusHighlight from '../../lib/FocusHighlight'

FocusHighlight.init({
  borderRadius: 4,
  padding: 2,
  transition: 'all .2s ease',
  boxShadow: 'none',
  borderThickness: 3,
  color: '#c0dffe',
  hideOnTransitionEnd: false
})

// FocusHighlight.init()

const scriptBtn = document.querySelector('#scriptBtn')
const telInput = document.querySelector('#tel')

scriptBtn.addEventListener('click', () => {
  FocusHighlight.setFocus(telInput)
})
