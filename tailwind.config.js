const plugin = require('./plugin');

module.exports = {
    theme: {
        extend: {},
    },
    variants: {
        display: ['responsive', 'ie'],
    },
    plugins: [plugin()],
};
