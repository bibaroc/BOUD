"use strict";
module.exports = function (request) {
    return request.method === "PUT";
}