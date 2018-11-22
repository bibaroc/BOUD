"use strict";
module.exports = function (request, regex) {
    return regex.test(request.url);
}