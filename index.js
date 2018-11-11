const http = require("http");
const HandlerBuilder = require("./src/HandlerBuilder")
const execServer = require("./src/utils/execServer");

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

    startServer(port = process.env.PORT || 8080) {

        http.createServer((request, response) => {

            let result = execServer(this, request, response);

            console.log(result);
            
        }).listen(port);

    }


}

module.exports = Boud;