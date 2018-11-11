let router = require("./index");

let r = new router();

r.registerMiddleware((request, response)=>{});
r.onGet("/", function(request, response){
    return "ciao io sono la risposta"+Date.now();
})

r.startServer(7070);