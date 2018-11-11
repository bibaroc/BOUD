let router = require("./index.js");

let r = new router();

r.registerMiddleware((request, response)=>{console.log("il liddleware ha fatto qualcosa alle: "+Date.now())});
r.onGet("/", function(request, response){
    return "ciao io sono la risposta"+Date.now();
})

r.startServer(7070);