class Handler {

    constructor(methodStrat, urlStrat, location, callback) {
        this._methodStrat = methodStrat;
        this._urlStrat = urlStrat;
        this._test = location;
        this._callback = callback;
    }

    exec(basePath, request, response) {
        let result = null;
        this._methodStrat(request) && this._urlStrat(request, basePath.concat(this._test)) && (result = this._callback(request, response));
        return result;
    }

}

module.exports = Handler;