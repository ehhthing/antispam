module.exports = function (userData, currentViolations, currentMessage, previousMessage, lts) {
    let tags = lts.count || 0; // Start at 0 or previous count.
    tags += currentMessage.mentions.members.size; // Add number of people mentions
    if (currentMessage.mentions.everyone) tags++; // If mentions @everyone, add one (doesn't get counted from the number of people mentions)
    if (tags >= 10) currentViolations += 10; // If more than 10 tags, immediately warn.
    else if (tags >= 4) currentViolations++; // If more than 4 tags, increase current violations.
    lts.count = tags;
    return currentViolations;
};