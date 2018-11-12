let router = require("./index");

let r = new router();


r.onGet("/abc", function (request, response) {

    return response;

});

let r2 = new router();
r2.registerMiddleware((request, response) => { return response.send("sdf"); });

r2.onGet("/", (req, res) => { return res.send("ciao io sono il server bloccante, non mi dovresti vedere"); });


let r3 = new router();

r3.onGet("/", (req, res) => { return res.send("ciao dovresti vedermi"); });

r.registerServer(r2);
r.registerServer(r3);

console.log(r)
r.startServer(7070);