// Returns the list of unique characters in the string.
module.exports = function (string) {
    let hashmap = {};
    let returnedString = "";
    for(let i = 0; i < string.length; i++) {
        let char = string[i]; // Get the current character.
        // If not in hashmap, add to hashmap.
        if (hashmap[char] === undefined) {
            hashmap[char] = true;
            // Add to returned string.
            returnedString += char;
        }
    }
    return returnedString;
};