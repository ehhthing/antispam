const stringDistance = require("../util/index.js").stringDistance;

module.exports = function (userData, currentViolations, currentMessage, previousMessage) {
    let x = currentMessage.content.toLowerCase();
    let y = previousMessage.content.toLowerCase();
    // If the distance between the two messages is less than the average length of the messages multiplied by 0.4, flag for spam.
    if (stringDistance(y, x) < ((x.length + y.length) / 2) * 0.4) currentViolations++;
    return currentViolations;
};