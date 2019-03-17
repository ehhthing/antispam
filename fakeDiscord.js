module.exports = {
    load: function (client) {
        this.messageSender = require("C:\\Users\\Me\\Desktop\\Discord\\fakeAPI\\adapters\\downloadedMessages.js")(client);
        this.totalMessages = this.messageSender.load("C:\\Users\\Me\\Desktop\\Discord\\fakeAPI\\data\\messages.json");
    },
    sendMessages: function () {
        this.messageSender.sendMessages();
    },
    api: require("C:\\Users\\Me\\Desktop\\Discord\\fakeAPI\\index.js")
};