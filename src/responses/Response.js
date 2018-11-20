const serializeJSON = require("./../serializers/serializeJSON");
const setHeaders = require("./../utils/setResponseHeaders");

class Response {

    constructor() {
        this.__headers = [];
        this.__body = "";
        this.__status = 200;
        this.__allowChanges = true;
        this.__changesForbiddenReason = "";
    }

    send(content, status = 200) {
        if (this.__allowChanges) {

            this.setHeader("Content-Type", "text/plain");
            this.__body = content;
            setHeaders(this, status);

            return this;
        }

        throw new Error(`Further changes are not allowed ${this.__changesForbiddenReason}`);
    }

    sendJson(content, status = 200) {

        if (this.__allowChanges) {

            this.setHeader("Content-Type", "application/json");
            this.__body = serializeJSON(content);
            setHeaders(this, status);

            return this;
        }

        throw new Error(`Further changes are not allowed ${this.__changesForbiddenReason}`);
    }

    setHeader(headerKey, headerValue) {
        this.__headers.push({
            key: headerKey,
            value: headerValue
        });
    }

    clone() {

        let clonedResponse = new Response();

        for (let prop of Object.getOwnPropertyNames(this)) {
            clonedResponse[prop] = this[prop];
        }
        
        return clonedResponse;
    }
}

module.exports = Response;