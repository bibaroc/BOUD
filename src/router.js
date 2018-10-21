const http = require("http");
const HandlerBuilder = require("./handlers/HandlerBuilder")

class Boud {

    constructor(middlewareFunction = null) {
        this.__slave = null;
        this.__middleware = middlewareFunction;
        this.__handlersRegisteredBeforeMiddleware = [];
        this.__handlersRegisteredAfterMiddleware = [];
    }

    get registeredPaths() {
        let cumulativePaths = [];

        for (let handler of this.__handlersRegisteredBeforeMiddleware) {
            cumulativePaths.push(handler);
        }

        if (this.__middleware) {

            cumulativePaths.push(this.__middleware);

            for (let handler of this.__handlersRegisteredAfterMiddleware) {
                cumulativePaths.push(handler);
            }

            if (this.__slave) {

                for (let slavesHandler of this.__slave.registeredPaths) {
                    cumulativePaths.push(slavesHandler);
                }

            }
        }

        return cumulativePaths;
    }

    set registeredPaths(p) { };


    onConnect(url, callback) {
        if (this.__slave) {
            this.__slave.onConnect(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("CONNECT", url, callback));
        }
    }

    onDelete(url, callback) {
        if (this.__slave) {
            this.__slave.onDelete(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("DELETE", url, callback));
        }
    }

    onGet(url, callback) {
        if (this.__slave) {
            this.__slave.onGet(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("GET", url, callback));
        }

    }

    onHead(url, callback) {
        if (this.__slave) {
            this.__slave.onHead(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("HEAD", url, callback));
        }
    }

    onOptions(url, callback) {
        if (this.__slave) {
            this.__slave.onOptions(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("OPTIONS", url, callback));
        }
    }

    onPatch(url, callback) {
        if (this.__slave) {
            this.__slave.onPatch(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("PATCH", url, callback));
        }
    }

    onPost(url, callback) {
        if (this.__slave) {
            this.__slave.onPost(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("POST", url, callback));
        }
    }

    onPut(url, callback) {
        if (this.__slave) {
            this.__slave.onPut(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("PUT", url, callback));
        }
    }

    onTrace(url, callback) {
        if (this.__slave) {
            this.__slave.onTrace(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler("TRACE", url, callback));
        }
    }

    onRequest(url, callback) {
        if (this.__slave) {
            this.__slave.onRequest(url, callback);
        } else {
            this.__placeHandler(HandlerBuilder.makeHandler(undefined, url, callback));
        }
    }

    registerMiddleware(callback) {
        let middlewareFunction = HandlerBuilder.makeHandler(undefined, undefined, callback);
        if (this.__middleware) {
            this.slave = new Boud(middlewareFunction);
        } else {
            this.__middleware = middlewareFunction;
        }

    }

    __placeHandler(handler) {
        if (this.__middleware) {
            this.__handlersRegisteredAfterMiddleware.push(handler);
        } else {
            this.__handlersRegisteredBeforeMiddleware.push(handler);
        }
    };

    startServer(port = process.env.PORT || 8080) {
        let result;
        http.createServer((request, response) => {


            for (let handler of this.registeredPaths) {

                if (result = handler.exec(request)) {
                    console.log(`un handler ha matchato ${request.url}`);

                    //TODO send the actual response
                }
            }


        }).listen(port);
    }


}

module.exports = Boud;