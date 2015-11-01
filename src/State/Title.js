/* global game, conc */

var Title = {};

var DECKS = ['Shapes', 'Halloween', 'Christmas'];

Title.create = function() {
    game.add.image(0, 0, 'background');
    var titleText = game.add.bitmapText(540, 360, 'font', 'CONCENTRATION', 144);
    titleText.anchor.set(0.5);
    titleText.tint = 0x1ea7e1;
    titleText.angle = 30;

    var deckIndex = 0;
    conc.deck = DECKS[deckIndex].toLowerCase();
    game.add.bitmapText(540, 1200, 'font', 'Change Deck:', 100).anchor.set(0.5);
    var deckButton = game.add.image(540, 1400, 'button');
    deckButton.anchor.set(0.5);
    deckButton.tint = 0x1ea7e1;
    deckButton.inputEnabled = true;
    deckButton.events.onInputUp.add(function() {
        deckIndex++;
        if (deckIndex >= DECKS.length) deckIndex = 0;
        deckText.setText(DECKS[deckIndex]);
        conc.deck = DECKS[deckIndex].toLowerCase();
    });
    var deckText = game.add.bitmapText(540, 1400, 'font', DECKS[deckIndex], 100);
    deckText.anchor.set(0.5);

    var fullscreenButton = game.add.image(540, 1700, 'button');
    fullscreenButton.anchor.set(0.5);
    fullscreenButton.tint = 0x1ea7e1;
    fullscreenButton.inputEnabled = true;
    fullscreenButton.events.onInputUp.add(function() {
        game.scale.startFullScreen();
    });
    var fullscreenText = game.add.bitmapText(540, 1700, 'font', 'Fullscreen', 100);
    fullscreenText.anchor.set(0.5);

    var startButton = game.add.image(540, 800, 'button');
    startButton.anchor.set(0.5);
    startButton.tint = 0x1ea7e1;
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(function() {
        game.state.start('Main');
    });
    var startText = game.add.bitmapText(540, 800, 'font', 'Start Game', 100);
    startText.anchor.set(0.5);
};

module.exports = Title;