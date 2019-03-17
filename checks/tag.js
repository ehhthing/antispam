module.exports = function (userData, currentViolations, currentMessage) {
    let tagsInMessage = currentMessage.mentions.members.size; // Add number of people mentions
    if (currentMessage.mentions.everyone) tagsInMessage++;
    if (tagsInMessage >= 10) currentViolations += 10; // If more than or equal to 10 emoji in one message, immediately warn.
    else if (tagsInMessage >= 4) currentViolations++; // If more than or equal to 4, increase violations
    return currentViolations;
};