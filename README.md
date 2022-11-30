# advanced-select-multiple

![](https://raw.githubusercontent.com/eineflocke/advanced-select-multiple/master/sample.gif)

more useful `<select multiple>`

just click (no Ctrl needed) and select/unselect from list

## usage

1. load `asm.js`

```html
<script src="asm.js"></script>
```

2. prepare a DOM element containing vacant `<select class="asm-noselect" multiple>` and `<select class="asm-selected" multiple>`

```html
<div id="test">
  <select class="asm-noselect" multiple></select>
  <select class="asm-selected" multiple></select>
</div>
```

3. add styling
4. make a new instance from `new Asm(CSSSelector, object or array)` for option initialization

```js
const asm = new Asm('#test', {
  option1: 'option with value "option1"',
  option2: 'more option with value "option2"',
  option3: 'another option with value "option3"'
});

new Asm('.test2', [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 'test']);

new Asm('.test3', [
  {
    value: 'a',
    text: 'pre-selected option',
    selected: true
  }, {
    value: 'b',
    text: 'non-pre-selected option',
    selected: false
  }, {
    value: 'c',
    text: 'default is non-pre-selected',
  }
]);
```

### methods

- `Asm.getselected()` to get selected options as array

```js
asm.getselected(); // value
asm.getselected('text'); // text
```

- `Asm.toggle(value, 'select' | 'unselect')` to select/unselect an option

```js
asm.toggle('option1', 'select');
asm.toggle('option2', 'unselect');
```
