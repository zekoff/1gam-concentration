/* global game, Phaser, conc */
var Card = require('../Display/Card');

var Main = {};

Main.create = function() {
    var n = 4;
    var m = 5;
    var pairs = n * m / 2;
    var cards = [];
    conc.cards = cards;

    var i, j;
    for (i = 0; i < pairs; i++) {
        cards.push(new Card(i));
        cards.push(new Card(i));
    }

    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            var card = cards[j * n + i];
            card.x = game.rnd.between(200, 880);
            card.y = game.rnd.between(300, 1620);
            card.angle = game.rnd.between(-40, 40);
        }
    }

    for (i = 0; i < cards.length; i++) {
        game.time.events.add(50 * i, function(i) {
            var tween = game.add.tween(cards[i]);
            tween.to({
                x: 140 + 40 * i,
                y: 960,
                angle: -40 + 4 * i
            }, 1000, Phaser.Easing.Quadratic.Out, true);
        }, null, i);
    }

    Phaser.ArrayUtils.shuffle(cards);

    game.time.events.add(50 * cards.length + 1000, function() {
        for (i = 0; i < n; i++) {
            for (j = 0; j < m; j++) {
                game.time.events.add(50 * i * j, function(i, j) {
                    var card = cards[j * n + i];
                    card.flip();
                    var tween = game.add.tween(card);
                    tween.to({
                        x: i * (card.width + 25) + 150,
                        y: j * (card.height + 25) + 200,
                        angle: 0
                    }, 1000, Phaser.Easing.Quadratic.Out, true);
                }, null, i, j);
            }
        }
    });

    var overlay = game.add.image(0, 0, 'pix');
    overlay.alpha = 0;
    overlay.height = 1920;
    overlay.width = 1080;
    conc.maskInput = function() {
        overlay.inputEnabled = true;
    };
    conc.unmaskInput = function() {
        overlay.inputEnabled = false;
    };

    game.input.onUp.addOnce(function() {
        game.scale.startFullScreen();
    });
};

module.exports = Main;