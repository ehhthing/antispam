module.exports = [
    {
        run: require("./checks/diff.js"),
        name: "diffCheck",
        minMessages: 2,
        threshold: {
            warning: 3,
            punish: 6
        },
        warningMessage: "Please stop repeating yourself! You will be punished if you continue."
    }, {
        run: require("./checks/vocab.js"),
        name: "vocabCheck",
        minMessages: 2,
        threshold: {
            warning: 4,
            punish: 7
        },
        warningMessage: "Please stop spamming! You will be punished if you continue."
    }, {
        run: require("./checks/bot.js"),
        name: "botCheck",
        minMessages: 1,
        lts: true,
        ttl: 2000,
        threshold: {
            warning: 4,
            punish: 8
        },
        warningMessage: "Please leave, unauthorized bots are not allowed on the server!"
    }, {
        run: require("./checks/tag.js"),
        name: "tagCheck",
        minMessages: 1,
        threshold: {
            warning: 1,
            punish: 2
        },
        warningMessage: "Please use less than 4 tags in each message! You will be punished if you continue"
    }, {
        run: require("./checks/timeTag.js"),
        name: "timeTagCheck",
        minMessages: 2,
        lts: true,
        ttl: 1000 * 60,
        threshold: {
            warning: 1,
            punish: 2
        },
        warningMessage: "Please stop spam tagging (more than 4 tags / minute)! You will be punished if you continue."
    }, {
        run: require("./checks/emoji.js"),
        name: "emojiCheck",
        minMessages: 1,
        threshold: {
            warning: 1,
            punish: 3
        },
        warningMessage: "Please stop emoji spamming. This can cause significant lag and you will be punished if you continue."
    }, {
        run: require("./checks/timeEmoji.js"),
        name: "timeEmojiCheck",
        lts: true,
        ttl: 1000 * 60,
        minMessages: 1,
        threshold: {
            warning: 1,
            punish: 2
        },
        warningMessage: "Please stop emoji spamming. This can cause significant lag and you will be punished if you continue."
    }, {
        run: require("./checks/fastTalk.js"),
        name: "fastTalkCheck",
        minMessages: 2,
        threshold: {
            warning: 5,
            punish: 10
        },
        warningMessage: "Please slowdown (1 message every second). You will be punished if you continue."
    }, {
        run: require("./checks/ai.js"),
        name: "aiCheck",
        lts: true,
        ttl: 1000 * 60 * 10,
        minMessages: 1,
        threshold: {
            warning: 1,
            punish: 2
        },
        warningMessage: "Please stop spamming! You will be punished if you continue."
    }, {
        run: require("./checks/embed.js"),
        name: "embedCheck",
        minMessages: 1,
        threshold: {
            warning: 3,
            punish: 6
        },
        warningMessage: "Please stop spamming links/embeds! You will be punished if you continue"
    }
];