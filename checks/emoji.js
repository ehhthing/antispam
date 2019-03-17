const emojiCount = require("../util/index.js").emoji.count;
const silentMode = require("../debugConfig.js").silentMode;
module.exports = function (userData, currentViolations, currentMessage) {
    const numEmoji = emojiCount(currentMessage.content);
    if (numEmoji >= 10) {
        // If not in "Ghost" mode, delete messages with >= 10 emoji (causes significant lag)
        if (!silentMode) currentMessage.delete("Too many emoji.");
        currentViolations++;
    }
    return currentViolations;
};