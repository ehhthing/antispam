const emojiCount = require("../util/index.js").emoji.count;
module.exports = function (userData, currentViolations, currentMessage, previousMessage, lts) {
    let count = lts.emoji || 0; // Either start at zero or start at the previous count.
    count += emojiCount(currentMessage.content); // If mentions @everyone, add one (doesn't get counted from the number of people mentions)
    // If there have been 10 or more emoji, flag for emoji spam.
    if (count >= 10) {
        currentViolations++;
        count = 0;
    }
    lts.emoji = count;
    return currentViolations;
};