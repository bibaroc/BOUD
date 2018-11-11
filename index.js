const http = require("http");
const HandlerBuilder = require("./src/HandlerBuilder")

class Boud {

    constructor() {
        this.__slaves = [];
        this.__middlewares = [];
        this.__handlers = [];
    }

    get registeredPaths() {
        let cumulativePaths = {};

        cumulativePaths["middlewares"] = this.__middlewares;

        cumulativePaths["handlers"] = this.__handlers;

        cumulativePaths["slaveRouters"] = this.__slaves;

        return cumulativePaths;
    }

    set registeredPaths(p) { };


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

    exec() {

        let result;

        let paths = this.registeredPaths;

        for (let middleware of paths.middlewares) {

            if (result = middleware.exec(request)) {
                return result;
            }

        }

        for (let handler of paths.handlers) {

            if (result = handler.exec(request)) {

                return result;
            }
        }

        for (let router of paths.slaveRouters) {

            if (result = router.exec(request)) {

                return result;

            }
        }

        return null;

    }

    startServer(port = process.env.PORT || 8080) {
        let result;
        http.createServer((request, response) => {

            let paths = this.registeredPaths;

            for (let middleware of paths.middlewares) {

                if (result = middleware.exec(request)) {

                    console.log(`un middlware ha matchato ${request.url}`);

                    //TODO: send the actual response
                }

            }

            for (let handler of paths.handlers) {

                if (result = handler.exec(request)) {

                    console.log(`un middlware ha matchato ${request.url}`);

                    //TODO: send the actual response
                }
            }

            for (let router of paths.slaveRouters) {

                if (result = router.exec(request)) {

                    console.log(`un middlware ha matchato ${request.url}`);

                    //TODO: send the actual response
                }
            }



        }).listen(port);
    }


}

module.exports = Boud;