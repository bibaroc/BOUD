class Handler {

    constructor(methodStrat, urlStrat, location, callback) {

        this._methodStrat = methodStrat;
        this._urlStrat = urlStrat;
        this._test = location;
        this._callback = callback;

    };

    exec(request, response) {
        //if(!this._callback) console.log(this);
        let result = null;
        this._methodStrat(request) && this._urlStrat(request, this._test) && (result = this._callback(request, response));
        return result;
    };


}

module.exports = Handler;