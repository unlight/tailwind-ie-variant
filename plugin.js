const postcss = require('postcss');

module.exports = () => {
    return ({ addVariant, e }) => {
        addVariant('ie', ({ container, separator }) => {
            // http://api.postcss.org/
            // Create at-rule css hack for IE10+
            const mediaRule = postcss.atRule({
                name: 'media',
                params: 'screen and (-ms-high-contrast: active), (-ms-high-contrast: none)',
            });
            mediaRule.append(container.nodes);
            container.append(mediaRule);
            mediaRule.walkRules((rule) => {
                rule.selector = `.${e(`ie${separator}${rule.selector.slice(1)}`)}`;
            });
        });
    };
};
