const urlCount = require("../util/index.js").url.count;
module.exports = function (userData, currentViolations, currentMessage) {
    // If there are embeds in the message, flag it. (Warning and kicking requires 4 embeds / 1 minute.)
    if (currentMessage.embeds.length !== 0) {
        currentViolations++;
    } else if (urlCount(currentMessage.content) > 0) {
        currentViolations++;
    }
    return currentViolations;
};