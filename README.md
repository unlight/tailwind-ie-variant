# tailwind-ie-variant

Tailwind CSS plugin to add variants (css hacks) for IE10+

## Install

```sh
npm install tailwind-ie-variant --save-dev
```

Add the plugin to your `tailwind.config.js`:

```js
const tailwindIeVariant = require('tailwind-ie-variant');

module.exports = {
    // ...
    plugins: [tailwindIeVariant()],
};
```

## Usage

```html
<div class="hidden ie:block">Only IE10+ see me</div>
```

As a tailwind plugin the plugin is working partially, only first level variants will work,
e.g. `ie:block`.
There is an issue with other tailwind variants,
since css hack `@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)` is used,
the result is nested media queries wich is not supported in IE,
so `sm:ie:block` will not work.

## Example

Input:

```css
@variants ie {
    .example {
        font-family: 'Comic Sans';
    }
}
```

Output:

```css
.example {
    font-family: 'Comic Sans';
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .ie:example {
        font-family: 'Comic Sans';
    }
}
```
