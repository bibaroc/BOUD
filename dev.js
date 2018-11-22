let router = require("./index");

let r = new router();

r.onGet("", function (request, response) {

    return response.sendJson({"ciao":"fica"});

});


r.setBasePath("/abc")

let r2 = new router();

r2.onGet("/", (req, res) => { return res.send("ciao io sono il server bloccante, non mi dovresti vedere"); });
r2.setBasePath("/2");

let r3 = new router();

r3.setBasePath("/3");
r3.onGet("/", (req, res) => { return res.send("ciao dovresti vedermi"); });


r.registerServer(r2);
r.registerServer(r3);

r.startServer(7070);