/* global game */

var Title = {};

Title.create = function() {
    game.state.start('Main');
};

module.exports = Title;