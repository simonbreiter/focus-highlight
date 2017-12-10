# Focus Highlight

[![pipeline status](https://gitlab.com/simonbreiter/focus-highlight/badges/master/pipeline.svg)](https://gitlab.com/simonbreiter/focus-highlight/commits/master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Codacy grade](https://img.shields.io/codacy/grade/f668bdf6c65644f1b8bd63479613674b.svg)](https://www.codacy.com/app/simonbreiter/focus-highlight)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

Focus Highlight replaces your native focus outline with an animated one. This can be useful if you can't rely on the native focus outline or if you just want to have a nice animation.

![Focus Highlight](./focus_highlight.gif)


## How to use

Install via NPM:
```bash
npm install focus-highlight
```

Import Focus Highlight with the JS-Bundler of your choice:
```javascript
import FocusHighlight from 'focus-highlight'
```

Initialize Focus Highlight after you finish loading the page:
```javascript
FocusHighlight.init()
```

Each time a element is now focused with the keyboard, focus-highlight will get activated and renders the focus. If you want to focus an element programmatically use:

```javascript
FocusHighlight.setFocus(yourElement)
```

## Customization

Focus Highlight comes with default settings which can be changed:
```javascript
FocusHighlight.init({
  padding: 2,
  borderRadius: 4,
  borderThickness: 2,
  boxShadow: '0 0 5px 1px dodgerBlue',
  transition: 'all .3s ease',
  color: 'dodgerBlue',
  customStyle: false, // Set to true if you want to roll with your own CSS
  hideOnTransitionEnd: false, // Hides focus after transition ended
  zIndex: 9999
})
```

If your using custom forms and aren't happy with the default focus, you can add a custom wrapper-element with the `data-focus-highlight="wrapper"` attribute and focus-highlight will focus that instead.

## Known Limitations

Firefox comes with its own custom outline, `outline: none;` is not enough unfortunately. You have to style each form element in order to get rid of them.

## Alternatives

[Flying Focus](https://github.com/NV/flying-focus) offers a similiar solution and even comes with a browser extension, if that is what you looking for.

## License

[MIT](./LICENSE.md)