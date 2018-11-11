const serializeJSON = require("./../serializers/serializeJSON");
const setHeaders = require("./../utils/setResponseHeaders");

class Response {

    constructor() {
        this.__headers = [];
        this.__body;
        this.__status;
    };

    send(content, status = 200) {

        this.setHeader("Content-Type", "text/plain");

        this.__body = content;

        setHeaders(this, status);

        return this;
    };

    sendJson(content, status = 200) {

        this.setHeader("Content-Type", "application/json");

        this.__body = serializeJSON(content);

        setHeaders(this, status);

        return this;
    };

    setHeader(headerKey, headerValue) {
        this.__headers.push({ key: headerKey, value: headerValue });
    };
}

module.exports = Response;