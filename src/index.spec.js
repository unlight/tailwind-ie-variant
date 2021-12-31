const expect = require('expect');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const { oneLine } = require('common-tags');

const plugin = require('./index.js');

async function process(input) {
    const config = {
        ...defaultConfig,
        // content: [{ raw: '<div class="example">', extension: 'html' }],
        safelist: ['example', 'ie:example'],
        plugins: [plugin()],
    };
    return postcss([tailwindcss(config)])
        .process(input, { from: undefined })
        .then((result) => {
            expect(result.warnings()).toHaveLength(0);
            return result.css;
        });
}

it('smoke', () => {
    expect(typeof plugin).toBe('function');
});

it('generate ie variant', async () => {
    const input = `@tailwind utilities; .example { font-family: 'Comic Sans'; }`;
    const output = oneLine`${await process(input)}`;
    expect(output).toContain(
        `@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { .ie\\:example { font-family: 'Comic Sans'; } }`,
    );
});
