import FocusHighlight from '../../lib/FocusHighlight'

FocusHighlight.init({
  borderRadius: 4,
  padding: 10,
  transition: 'all .2s ease',
  boxShadow: '0px 0px 1px 1px #4169E1',
  borderThickness: 2,
  color: '#4169E1',
  hideOnTransitionEnd: false
})

// FocusHighlight.init()

const scriptBtn = document.querySelector('#scriptBtn')
const telInput = document.querySelector('#tel')

scriptBtn.addEventListener('click', () => {
  FocusHighlight.setFocus(telInput)
})
