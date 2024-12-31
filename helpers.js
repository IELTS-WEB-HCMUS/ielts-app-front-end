const Handlebars = require('handlebars');

module.exports = {
    registerHelpers: () => {
        Handlebars.registerHelper('encodeURIComponent', function (value) {
            return encodeURIComponent(value);
        });
    }
};
