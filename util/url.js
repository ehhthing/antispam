const regex = /(http|https):\/\/[^\s]+/g;
module.exports = {
    // Returns number of urls in string.
    count: function(string) {
        let matches = string.match(regex);
        if (matches !== null) {
            return matches.length;
        } else {
            return 0;
        }
    },
    // Removes all URLs in string.
    remove: function(string) {
        return string.replace(regex, "")
    }
};