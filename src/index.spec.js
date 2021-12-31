const expect = require('expect');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const { oneLine, stripIndents } = require('common-tags');
const tailwindcssNesting = require('tailwindcss/nesting');

const plugin = require('./index.js');

async function process(input, { safelist = [] }) {
    const config = {
        ...defaultConfig,
        // content: [{ raw: '<div class="example">', extension: 'html' }],
        safelist,
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

it('ie variant', async () => {
    const input = `@tailwind utilities`;
    const output = stripIndents`${await process(input, { safelist: ['ie:block'] })}`;
    expect(output).toContain(
        stripIndents`
            .ie\\:block {
                display: block
            }
        `,
    );
});

it.skip('ie for small screen', async () => {
    const input = stripIndents`
        @tailwind utilities;
        .example { font-family: 'Comic Sans'; }
    `;
    const output = await process(input);
    // const output = stripIndents`${await process(input)}`;
    console.log('output', output);
    // expect(output).toContain(
    //     `@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { .ie\\:example { font-family: 'Comic Sans'; } }`,
    // );
});
