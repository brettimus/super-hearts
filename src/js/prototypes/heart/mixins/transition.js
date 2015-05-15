module.exports = {
    transitionDuration: null,
    transitionFunction: null,
    getTransition: function getTransition() {
        return this.transitionDuration+"ms "+ this.transitionFunction;
    },
};