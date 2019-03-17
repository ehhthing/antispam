const util = require("../util/index.js");
const removeDuplicates = util.removeDuplicates;
const stringDistance = util.stringDistance;

module.exports = function (userData, currentViolations, currentMessage, previousMessage) {
    const currentVocab = removeDuplicates(currentMessage.content);
    const previousVocab = removeDuplicates(previousMessage.content);
    // If distance between the two vocabs is less than the square root of the average length, flag;
    if (stringDistance(currentVocab, previousVocab) < Math.sqrt((currentVocab.length + previousVocab.length) / 2)) {
        currentViolations++;
    }
    return currentViolations;
};