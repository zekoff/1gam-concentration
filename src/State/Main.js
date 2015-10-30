/* global game, Phaser, conc */
var Card = require('../Display/Card');

var Main = {};

Main.create = function() {
    var n = 4;
    var m = 5;
    var pairs = n * m / 2;
    var cards = [];

    var i, j;
    for (i = 0; i < pairs; i++) {
        cards.push(new Card(i));
        cards.push(new Card(i));
    }

    Phaser.ArrayUtils.shuffle(cards);

    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            var card = cards[j * n + i];
            card.x = i * (card.width + 25) + 150;
            card.y = j * (card.height + 25) + 200;
        }
    }

    var overlay = game.add.image(0, 0, 'pix');
    overlay.alpha = 0;
    overlay.height = 1920;
    overlay.width = 1080;
    conc.maskInput = function() {
        overlay.inputEnabled = true;
        overlay.events.onInputUp.removeAll();
        overlay.events.onInputUp.add(function() {
            print('clicking input mask');
        });
    };
    conc.unmaskInput = function() {
        overlay.inputEnabled = false;
    };

    game.input.onUp.addOnce(function() {
        game.scale.startFullScreen();
    });
};

module.exports = Main;