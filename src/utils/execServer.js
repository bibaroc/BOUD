const getRegisteredPaths = require("./getRoutersRegisteredPaths");


function execServer(server, request, response) {

    let result;


    let serversPaths = getRegisteredPaths(server);

    for (let middleware of serversPaths.middlewares) {

        if (result = middleware.exec(request, response)) {

            return result;

        }

    }

    for (let handler of serversPaths.handlers) {

        if (result = handler.exec(request, response)) {

            return result;

        }
    }

    for (let router of serversPaths.slaveRouters) {

        if (result = execServer(router, request, response)) {

            return result;

        }
    }

    return null;
}

module.exports = execServer;