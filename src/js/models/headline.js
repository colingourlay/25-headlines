var utils = require('../utils');

module.exports = function (title) {
    return {
        id: utils.uuid(),
        title: title,
        shortlisted: false
    };
};