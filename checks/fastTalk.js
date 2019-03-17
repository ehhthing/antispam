module.exports = function (userData, currentViolations, currentMessage, previousMessage) {
    const timeDifference = currentMessage.createdTimestamp - previousMessage.createdTimestamp;
    if (timeDifference < 1000) currentViolations++;
    return currentViolations;
};