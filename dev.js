let router = require("./index.js");

let r = new router();
r.onConnect("/", () => { return "ciao" })

r.registerMiddleware(() => { console.log("il middleware procca"); return "ciao" })
r.onGet("/", () => { return "ciao" })

r.startServer(7070);