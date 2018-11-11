module.exports = function(response, status){
    response.__status = status;
    response.setHeader("Content-Length", Buffer.byteLength(response.__body));
}