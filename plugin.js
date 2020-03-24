const _ = require('lodash');

module.exports = () => {
    return ({ addUtilities, addComponents, addVariant, e, theme }) => {
        addVariant('ie', ({ container, separator }) => {
            const supportsRule = postcss.atRule({ name: 'supports', params: '(display: grid)' });
            supportsRule.append(container.nodes);
            container.append(supportsRule);
            supportsRule.walkRules((rule) => {
                rule.selector = `.${e(`supports-grid${separator}${rule.selector.slice(1)}`)}`;
            });
        });
    };
};
