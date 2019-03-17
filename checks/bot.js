module.exports = function (userData, currentViolations, currentMessage, previousMessage, lts) {
    // If the user hasn't typed and this check hasn't fired in the past second, flag this for spam.
    if (!currentMessage.author.typingIn(currentMessage.channel) && !lts.fired) {
        currentViolations++;
        lts.fired = true;
    }
    return currentViolations;
};