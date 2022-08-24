## Basic custom element guide. (by incremental_gamer)

### To use them you must:

1. create a class that extends from `HTMLElement` (you can extend from other elements)
2. use `customElements.define` (and the name must use a hyphen), which accepts two arguements: the name and the element
3. If you extend from something other than `HTMLElement` (like `HTMLDivElement`), you must specify a third argument: `{extends: 'built in html component'}`

### Actually using custom elements

If you extend from `HTMLElement` (not the specific ones), you just use `<custom-element-name></custom-element-name>`. However, if you extend from a more specific `HTMLElement`, you must use that element and its `extends` value that you used in `customElements.define`. Ex:

```js
class Element extends HTMLDivElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    this.shadowRoot.append(wrapper);
  }
}

customElements.define("hi-there", Element, {extends: 'div'});

// in html
// note is is set to the element name
// the element you use is based on the `extends` value
// <div is="hi-there"></div>
// ex <span is="some-component"></span> if it extends from span
```

### Lifecycle hooks:

1. `connectedCallback`: used when the element is created
2. `disconnectedCallback`: used when the element is destroyed
3. `adoptedCallback`: similar to `connectedCallback`, but when it is moved
4. `attributeChangedCallback`: when a attribute is changed
   NOTE: 4. requires the use of `static get observedAttributes()`. The function should return a list of props to watch for

### FAQ:

1. How do I use props?

- A: use `this.getAttribute("prop name")`

### Slots:

Idk for now

### More info on custom elements

Take a look here: [Custom Elements Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

Example element:

```js
class Element extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.attachShadow({mode: "open"})
    const wrapper = document.createElement("div")
    this.shadowRoot.append(wrapper)
  }
}

customElements.define("element-hi", Element)
```
