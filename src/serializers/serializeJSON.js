module.exports = function (jsonObject) {
    try {
        return JSON.stringify(jsonObject);
    } catch (e) {
        return jsonObject.toString();
    }
}