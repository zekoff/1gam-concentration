/* global game, Phaser, conc */

var Main = {};

var overlay;
var revealedCard;

Main.create = function() {
    var n = 4;
    var m = 5;
    var pairs = 10;
    var cards = [];

    var makeCard = function(id) {
        var card = game.add.sprite(0, 0, 'pix');
        card.id = id;
        card.height = 300;
        card.width = 200;
        card.tint = 0x0000ff;
        card.faceDown = true;
        card.inputEnabled = true;
        card.events.onInputUp.add(function() {
            // print(this.id);
            if (!this.faceDown) return;
            print('flipping card');
            this.faceDown = false;
            overlay.maskInput();
            // card reveal animation
            if (!revealedCard) {
                print('new revealed card: ' + this.id);
                revealedCard = this;
                overlay.unmaskInput();
                return;
            }
            if (this.id == revealedCard.id) {
                // play pair animation
                print('matching cards');
                this.tint = 0x00ff00;
                revealedCard.tint = 0x00ff00;
                revealedCard = null;
                // check for win
            }
            else {
                // delay so player can see newly revealed card
                // flip both cards back over
                print('no match: ' + this.id);
                this.faceDown = true;
                revealedCard.faceDown = true;
                revealedCard = null;
            }
            overlay.unmaskInput();
        }, card);
        return card;
    };

    var i, j;
    for (i = 0; i < pairs; i++) {
        cards.push(makeCard(i));
        cards.push(makeCard(i));
    }

    Phaser.ArrayUtils.shuffle(cards);

    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            var card = cards[j * n + i];
            card.x = i * (card.width + 20);
            card.y = j * (card.height + 20);
        }
    }

    overlay = game.add.image(0, 0, 'pix');
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
};

module.exports = Main;