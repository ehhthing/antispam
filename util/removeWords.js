// TODO: Implement support for non latin alphabet.

const fs = require("fs");
// Read word list, convert it to lower case and remove all characters not in the alphabet. Then convert to array and sort.
let words = fs.readFileSync("util/words.txt", "utf-8").toLowerCase().replace(/^[a-z]/g, "").split("\n").sort();

const lookupTable = {}; // Create lookup table
words.forEach(function(x) {
    lookupTable[x] = true; // Add every word in list as a key to the hashmap.
});
words = null; // To save memory, remove the original word list.

// Returns string with all the words removed.
module.exports = function(str) {
    let out = []; // Output non-word list.
    if(str.indexOf(" ") !== -1) str = str.split(" "); // Get all words by splitting the string by a space.
    else str = [str]; // If no spaces, just use an array with only the string.
    str.forEach(function(word) { // For every word, look up in word list by removing all non-alphabet characters and checking if it is a key within the word list.
        if (lookupTable[word.toLowerCase().replace(/[^a-z]/g, "")] === undefined) out.push(word)
    });
    return out.join(" ");
};