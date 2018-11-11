const Handler = require("./handlers/Handler");

const methodStrats = {
    "CONNECT": require("./handlers/methodHandlingStrategies/ConnectStrategy"),
    "DELETE": require("./handlers/methodHandlingStrategies/DeleteStrategy"),
    "GET": require("./handlers/methodHandlingStrategies/GetStrategy"),
    "HEAD": require("./handlers/methodHandlingStrategies/HeadStrategy"),
    "OPTIONS": require("./handlers/methodHandlingStrategies/OptionsStrategy"),
    "PATCH": require("./handlers/methodHandlingStrategies/PatchStrategy"),
    "POST": require("./handlers/methodHandlingStrategies/PostStrategy"),
    "PUT": require("./handlers/methodHandlingStrategies/PutStrategy"),
    "TRACE": require("./handlers/methodHandlingStrategies/TraceStrategy")
};

const defaultMethodStrat = require("./handlers/methodHandlingStrategies/AnyMethodStrategy");

const urlStrats = {
    "object": require("./handlers/urlHandlingStrategies/RegexStrategy"),
    "string": require("./handlers/urlHandlingStrategies/StringStrategy")
}

const defaultURLStrat = require("./handlers/urlHandlingStrategies/AnyStrategy")


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