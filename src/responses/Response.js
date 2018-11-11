class Response {

    constructor() {
        this.__headers = [];
        this.__body;
        this.__status;
    };

    send(content, status = 200) {

        this.__status = status;

        this.setHeader("Content-Type", "text/plain");

        
        
        this.setHeader("Content-Length", Buffer.byteLength(this.__body));
    };

    sendJson(content, status = 200) {

        this.__status = status;
        
        this.setHeader("Content-Type", "application/json");


        
        this.setHeader("Content-Length", Buffer.byteLength(this.__body));
    };

    setHeader(headerKey, headerValue) {
        this.__headers.push({ key: headerKey, value: headerValue });
    };
}

module.exports = Response;