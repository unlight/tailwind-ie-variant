const assert = require('assert');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const { stripIndents } = require('common-tags');

const plugin = require('.');

async function process(input) {
    const config = {
        ...defaultConfig,
        plugins: [plugin()],
    };
    return postcss([tailwindcss(config)])
        .process(input, { from: undefined })
        .then((result) => {
            assert(result.warnings().length === 0);
            return result.css;
        });
}

it('smoke', () => {
    assert(typeof plugin === 'function');
});

it('generate ie variant', async () => {
    const input = stripIndents`@variants ie {
        .example-box {
            font-family: 'Comic Sans';
        }
    }`;
    const output = stripIndents`${await process(input)}`;
    assert.equal(
        output,
        stripIndents`
.example-box {
  font-family: 'Comic Sans';
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .ie\\:example-box {
    font-family: 'Comic Sans';
  }
}
`,
    );
});
