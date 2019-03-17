module.exports = function() {
    return {
        violations: {},
        currentMessage: "",
        previousMessage: null,
        time: 0,
        warned: false,
        punished: false,
        lts: {}
    }
};