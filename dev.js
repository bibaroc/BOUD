let router = require("./index");

let r = new router();

r.registerMiddleware(()=>{console.log("il middleware dovrebbe proccare")});

r.onGet("/", function(request, response){
  
    return response.send("ciao");

});

r.startServer(7070);