const checks = require("../config.js");
const now = require("performance-now");
const debugConfig = require("../debugConfig.js");
let checkPerf = {};

function check(userData, numMessages) {
    // Loop through all checks.
    for (let check of checks) {
        try {
            // Check if number of messages obtained is enough to run check. If not, don't run check
            if (numMessages < check.minMessages) continue;

            if (!checkPerf[check.name]) checkPerf[check.name] = 0;
            // Get current violations for this check, if not available, set to zero.
            let currentViolations = userData.violations[check.name] || 0;
            // If check requires LTS and User does not have it, initialize LTS for this check/user
            if (check.lts && userData.lts[check.name] === undefined) {
                userData.lts[check.name] = {expiry: userData.currentMessage.createdTimestamp + check.ttl};
            } else if (userData.lts[check.name] && userData.lts[check.name].expiry < userData.currentMessage.createdTimestamp) { // If LTS is expired for this check, reset it.
                userData.lts[check.name] = {expiry: userData.currentMessage.createdTimestamp + check.ttl};
            }
            const begin = now();
            // Run check.
            userData.violations[check.name] = check.run(userData,
                currentViolations,
                userData.currentMessage || userData.previousMessage,
                userData.previousMessage,
                userData.lts[check.name]);
            checkPerf[check.name] += now() - begin;

            currentViolations = userData.violations[check.name];
            // Punish user if warned and violations are above or equal to violation threshold.
            if (currentViolations >= check.threshold.punish && !userData.punished && userData.warned) {
                punishUser(userData.currentMessage, userData.violations);
                userData.punished = true;
            }
            // Warn users that they are spamming if over warning threshold.
            if (currentViolations >= check.threshold.warning && !userData.warned && !userData.punished) {
                warnUser(userData.currentMessage, check.warningMessage, userData.violations);
                userData.warned = true;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

function punishUser(message, vio) {
    // If not kickable, tell them that they should be punished.
    if (!message.member.kickable && !debugConfig.silentMode) {
        message.reply("I cannot kick you, but you would have been punished for spamming.");
        return;
    }
    // If able to kick and not in "Ghost mode", kick the user.
    if (!debugConfig.silentMode) message.member.kick("[AntiSpamBot] Spamming.").then(function () {
        // Log the kick
        console.info("[Kick] " + message.author.id + " violations: ", vio);
    }).catch(function (e) {
        console.info("Failed to kick player!", e)
    });
}

function warnUser(message, warningMessage, violations) {
    if (!debugConfig.silentMode) message.reply(warningMessage + (debugConfig.detailsMode ? JSON.stringify(violations) : ""));
}

module.exports = {
    check: check,
    checkPerf: checkPerf
};