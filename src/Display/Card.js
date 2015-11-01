/* global Phaser, game, conc */
var FLIP_TIME = 200; // ms
var DELAY_AFTER_MISMATCH = 500; // ms
var PAIR_ANIMATION_TIME = 200; // ms
var WIDTH = 200;
var HEIGHT = 300;

var Card = function(id) {
    Phaser.Sprite.call(this, game, 0, 0, 'card_front_' + id);
    this.anchor.set(0.5, 0.5);
    this.id = id;
    this.height = HEIGHT;
    this.width = WIDTH;
    this.faceDown = false;
    this.inputEnabled = true;
    this.events.onInputUp.add(function() {
        if (this.faceDown)
            this.flip();
    }, this);
    game.add.existing(this);
};
Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;
Card.prototype.flip = function() {
    this.faceDown = !this.faceDown;
    conc.maskInput();
    var tween = game.add.tween(this);
    tween.to({
        width: 0
    }, FLIP_TIME / 2);
    tween.onComplete.addOnce(function() {
        this.loadTexture(this.faceDown ? 'card_back' : 'card_front_' + this.id);
        this.width = 0;
        this.height = HEIGHT;
    }, this);
    var chained = game.add.tween(this);
    chained.to({
        width: 200
    }, FLIP_TIME / 2);
    chained.onComplete.addOnce(this.faceDown ?
        conc.unmaskInput :
        this.checkPair.bind(this),
        this);
    tween.chain(chained);
    tween.start();
};
Card.prototype.checkPair = function() {
    if (!conc.revealedCard) {
        conc.revealedCard = this;
        conc.unmaskInput();
        return;
    }
    if (this.id == conc.revealedCard.id) {
        // TODO: improve pair animation
        [this, conc.revealedCard].forEach(function(card) {
            var tween = game.add.tween(card);
            tween.to({
                angle: -5
            }, PAIR_ANIMATION_TIME);
            tween.onComplete.addOnce(function() {
                conc.unmaskInput();
            }, card);
            tween.start();
        });
        conc.revealedCard = null;
        checkWin();
    }
    else {
        game.time.events.add(DELAY_AFTER_MISMATCH, function() {
            this.flip();
            conc.revealedCard.flip();
            conc.revealedCard = null;
            conc.unmaskInput();
        }, this);
    }
};

var checkWin = function() {
    var foundFaceDown = false;
    conc.cards.forEach(function(card) {
        if (card.faceDown) foundFaceDown = true;
    });
    if (foundFaceDown) return;
    Phaser.ArrayUtils.shuffle(conc.cards);
    var i;
    for (i = 0; i < conc.cards.length; i++)
        game.time.events.add(200 * i, function(card, i) {
            game.add.tween(card).to({
                x: 1300
            }, 1500, Phaser.Easing.Quadratic.Out, true);
            game.add.tween(card).to({
                y: 2200
            }, 1500, Phaser.Easing.Quadratic.In, true);
        }, null, conc.cards[i], i);
    var winText = game.add.bitmapText(540, 960, 'font', 'YOU WIN!', 170);
    winText.anchor.set(0.5);
    winText.tint = 0x8080ff;
    game.time.events.add(1000, function() {
        var restartText = game.add.bitmapText(540, 1820, 'font', 'Tap to restart...', 100);
        restartText.anchor.set(0.5);
        restartText.tint = 0x8080ff;
        game.input.onUp.addOnce(game.state.start.bind(game.state, 'Title'));
    });
};

module.exports = Card;