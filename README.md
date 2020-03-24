# tailwind-ie-variant

Tailwind CSS plugin to add variants (css hacks) for IE10+

## Install

```sh
npm i -D tailwind-ie-variant
```

Update your `tailwind.config.js`

```js
variants: {
    display: ['responsive', 'ie'],
}
```

## Usage

```html
<div class="ie:italic ie:text-sm border sm:ie:font-bold">
    Example box text
</div>
<div class="hidden ie:block">Only IE10+ see me</div>
```

As tailwind plugin this plugin is working partially, only first level variants will work.
ie:italic sm:ie:font-bold

This plugin is supposed to work with [postcss-nesting](https://github.com/jonathantneal/postcss-nesting)
