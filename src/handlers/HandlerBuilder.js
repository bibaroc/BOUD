const Handler = require("./Handler");

const methodStrats = {
    "CONNECT": require("./methodHandlingStrategies/ConnectStrategy"),
    "DELETE": require("./methodHandlingStrategies/DeleteStrategy"),
    "GET": require("./methodHandlingStrategies/GetStrategy"),
    "HEAD": require("./methodHandlingStrategies/HeadStrategy"),
    "OPTIONS": require("./methodHandlingStrategies/OptionsStrategy"),
    "PATCH": require("./methodHandlingStrategies/PatchStrategy"),
    "POST": require("./methodHandlingStrategies/PostStrategy"),
    "PUT": require("./methodHandlingStrategies/PutStrategy"),
    "TRACE": require("./methodHandlingStrategies/TraceStrategy")
};

const defaultMethodStrat = require("./methodHandlingStrategies/AnyMethodStrategy");

const urlStrats = {
    "object": require("./urlHandlingStrategies/RegexStrategy"),
    "string": require("./urlHandlingStrategies/StringStrategy")
}

const defaultURLStrat = require("./urlHandlingStrategies/AnyStrategy")


class HandlerBuilder {

    constructor() { };

    static makeHandler(method = null, url, callback) {

        let methodStrat;
        if (Object.keys(methodStrats).includes(method))
            methodStrat = methodStrats[method];
        else
            methodStrat = defaultMethodStrat;

        let locationStrat;

        if (Object.keys(urlStrats).includes(typeof url))
            locationStrat = urlStrats[typeof url]
        else
            locationStrat = defaultURLStrat;

        return new Handler(methodStrat, locationStrat, url, callback);
    }
}

module.exports = HandlerBuilder;