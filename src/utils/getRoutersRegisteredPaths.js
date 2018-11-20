module.exports = function (router) {
    let cumulativePaths = {};

    cumulativePaths["middlewares"] = router.__middlewares;
    cumulativePaths["handlers"] = router.__handlers;
    cumulativePaths["slaveRouters"] = router.__slaves;

    return cumulativePaths;
};