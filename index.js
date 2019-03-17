const debugConfig = require("./debugConfig.js");
let discord;
let fakeAPI = false; // debug stub (now removed)
const now = require("performance-now");
const template = require("./userTemplate.js");
const checks = require("./checks/index.js");
const client = new discord.Client();
const token = require("./token.js"); // add token here
let users = new Map();
let startTime;
let nMessages = 0;
let totalMessages;
client.on("message", function (message) {
    if (nMessages === 0 && fakeAPI) startTime = now();
    if (message.guild == null) return; // Only track messages from a server, no DM messages.
    const authorID = message.author.id.toString();
    let userData;
    if (authorID === client.user.id) return; // Ignore messages sent by this bot.
    if (message.author.bot) return; // Ignore bots since they are explicitly allowed!
    if (!users.has(authorID)) { // If author isn't in DB, add them in.
        userData = resetUserData(authorID, message);
    } else { // otherwise, get their data.
        userData = users.get(authorID);
    }
    // If more than a minute since their first message, reset their data (prevents accumulation of violations)
    if (message.createdTimestamp - userData.time >= 60000) {
        userData = resetUserData(authorID, message);
    }
    if (userData.previousMessage !== null) {
        // If we have 2 messages, current message should be this message and previous message should be the message that used to be the current message.
        userData.previousMessage = userData.currentMessage;
        userData.currentMessage = message;
        checks.check(userData, 2)
    } else {
        // Otherwise, set the previous message to nothing so next time, we know we have two messages.
        userData.previousMessage = "";
        checks.check(userData, 1)
    }

    if (userData.punished === true) { // If user has been punished, remove from DB.
        users.delete(authorID);
    } else {
        // Otherwise, save their data into DB.
        users.set(authorID, userData);
    }
    if (fakeAPI) nMessages++;

    if (fakeAPI && nMessages === totalMessages) {
        console.log("Took", now() - startTime, "ms to process", nMessages, "messages");
    }
});
if (debugConfig.demoMode) {
    setInterval(async function() {
        let guild = client.guilds.array()[0];
        await guild.channels.array()[0].delete();
        await guild.createChannel("test", "text");
    }, 60000)
}
function resetUserData(authorID, message) {
    const time = message.createdTimestamp;
    const userData = template();
    userData.time = time;
    userData.currentMessage = message;
    // Copy LTS data over if possible.
    if (users.has(authorID)) userData.lts = JSON.parse(JSON.stringify(users.get(authorID).lts));
    users.set(authorID, userData);
    return userData;
}

function getStatistics() {
    console.log("CLEARCONSOLE");
    console.info("Process time for past " + nMessages + " messages: " + (now() - startTime) + "ms ");
    Object.keys(checks.checkPerf).forEach(function (check) {
        console.info("Process time for " + check + ": " + checks.checkPerf[check].toFixed(2) + "ms");
    });
}

if (debugConfig.speedDebug) setInterval(getStatistics, 5000);

client.login(token).then(async function () {
    await client.user.setActivity('Preventing spam since 2017');
    console.log("Logged in")
});