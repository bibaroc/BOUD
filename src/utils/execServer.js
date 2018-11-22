const getRegisteredPaths = require("./getRoutersRegisteredPaths");

function execServer(server, request, response, basePath) {

    let result = { middlewareMatched: false, serverResult: null },
        serversPaths = getRegisteredPaths(server);

    for (let middleware of serversPaths.middlewares) {
        if (result.serverResult = middleware.exec(basePath, request, response)) {
            result.middlewareMatched = true;

            return result;
        }
    }

    for (let handler of serversPaths.handlers) {
        if (result.serverResult = handler.exec(basePath, request, response)) {
            return result;
        }
    }


    let buffer, firstMiddlewareToMatch;

    for (let router of serversPaths.slaveRouters) {
        if (buffer = execServer(router, request, response.clone(), basePath.concat(router.__basePath))) {
            if (!buffer.middlewareMatched && buffer.serverResult)
                return buffer;
            else if (buffer.middlewareMatched && !firstMiddlewareToMatch) {
                firstMiddlewareToMatch = buffer;
            }
        }
    }
    return { middlewareMatched: false, serverResult: null };
}

module.exports = execServer;