/* global game, Phaser, conc */
var Card = require('../Display/Card');

var Main = {};

Main.create = function() {
    var n = 4;
    var m = 5;
    var pairs = 10;
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
            card.x = i * (card.width + 20) + 100;
            card.y = j * (card.height + 20) + 150;
        }
    }

    var overlay = game.add.image(0, 0, 'pix');
    overlay.alpha = 0;
    overlay.height = 1920;
    overlay.width = 1080;
    overlay.maskInput = function() {
        this.inputEnabled = true;
        this.events.onInputUp.removeAll();
        this.events.onInputUp.add(function() {
            print('clicking input mask');
        });
    };
    overlay.unmaskInput = function() {
        this.inputEnabled = false;
    };
    conc.overlay = overlay;
};

module.exports = Main;