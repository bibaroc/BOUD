"use strict";
module.exports = function (request, url) {
    return request.url === url;
}