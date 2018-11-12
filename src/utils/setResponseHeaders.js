module.exports = function (response, status) {
    response.__status = status;
    response.setHeader("Content-Length", Buffer.byteLength(response.__body));
    response.__changesForbiddenReason = "after you stage the object to be sent.";
    response.__allowChanges = false;
}