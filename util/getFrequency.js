// Returns the frequency of the top characters (by the number of occurrences).
module.exports = function(str, len) {
    let hashlookup = {};
    for (let i = 0; i < str.length; i++) {
        let char = str[i]; // Get current character;
        if (!hashlookup[char]) hashlookup[char] = 1; // If not in lookup table, add to lookup table
        else hashlookup[char]++; // If in lookup table, increase the number by 1.
    }
    // Get list of character counts and sort from greatest to least.
    return Object.values(hashlookup).sort(function (x, y) {
        return y - x;
    }).map(function (x) {
        // Divide each by the length of the string to get percent of string is made out of this character.
        return x / str.length;
    }).slice(0, len);
};