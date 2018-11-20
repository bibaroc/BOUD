const http = require("http");
const HandlerBuilder = require("./src/HandlerBuilder");
const execServer = require("./src/utils/execServer");
const Response = require("./src/responses/Response");

class Boud {

    constructor() {
        this.__slaves = [];
        this.__middlewares = [];
        this.__handlers = [];
    }

    onConnect(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("CONNECT", url, callback));
    }

    onDelete(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("DELETE", url, callback));
    }

    onGet(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("GET", url, callback));
    }

    onHead(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("HEAD", url, callback));
    }

    onOptions(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("OPTIONS", url, callback));
    }

    onPatch(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("PATCH", url, callback));
    }

    onPost(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("POST", url, callback));
    }

    onPut(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("PUT", url, callback));
    }

    onTrace(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler("TRACE", url, callback));
    }

    onRequest(url, callback) {
        this.__handlers.push(HandlerBuilder.makeHandler(undefined, url, callback));
    }

    registerMiddleware(callback) {
        let middlewareFunction = HandlerBuilder.makeHandler(undefined, undefined, callback);
        this.__middlewares.push(middlewareFunction);
    }

    registerServer(server) {
        this.__slaves.push(server);
    }

    startServer(port = process.env.PORT || 8080) {
        http.createServer((request, response) => {
            response.setHeader("X-Powered-By", "BOUD github.com/bibaroc/BOUD");

            try {

                let result = execServer(this, request, new Response()).serverResult;
                if (result) {

                    response.statusCode = result.__status;
                    for (let header of result.__headers) {
                        response.setHeader(header.key, header.value);
                    }
                    response.write(result.__body);
                }

            } catch (e) {
                response.setHeader("Content-Type", "text/plain");
                response.statusCode = 500;
                response.write("Internal server error");

                console.error(e);
            }

            response.end();
        }).listen(port);
    }
}

module.exports = Boud;
