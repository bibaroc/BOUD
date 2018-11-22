"use strict";
module.exports = function (request, testUrl) {
    let result = request.url === testUrl;

    if (!result && request.url.slice(-1) === "/")
        result = request.url.slice(0, -1) === testUrl;
    if (!result && testUrl.slice(-1) === "/")
        result = request.url === testUrl.slice(0, -1);

    return result;
}