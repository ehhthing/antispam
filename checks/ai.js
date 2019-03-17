const utils = require("../util/index.js");
const nn = utils.neuralNetwork;
const removeURLs = utils.url.remove;
const removeDuplicates = utils.removeDuplicates;
const getFrequency = utils.getFrequency;
const removeWords = utils.removeWords;
const removeEmoji = utils.emoji.remove;
module.exports = function (userData, currentViolations, currentMessage, previousMessage, lts) {
    let unknownWords = lts.unknownWords || ""; // If we have previous data of unknown words, use that. Otherwise, use a new string.
    unknownWords += removeWords(removeURLs(removeEmoji(currentMessage.content))); // Remove all emoji, urls and known words from string. Append it to unknown words.
    // If there are more than or equal to 128 characters and more than 16 unique characters, run the string through the neural network
    if (unknownWords.length >= 128 && removeDuplicates(unknownWords).length >= 16) {
        // If the network is more than 70% sure that this is spam, flag it for spam.
        if (nn(getFrequency(unknownWords, 16)) > 0.7) {
            currentViolations += 1;
            unknownWords = "";
        } else {
            // If not, clear the unknown words data.
            unknownWords = "";
        }
    }
    // Save the known words data.
    lts.unknownWords = unknownWords;
    return currentViolations;
};