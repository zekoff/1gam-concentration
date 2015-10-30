/* global Phaser, game, conc */
var FLIP_TIME = 200; // ms
var DELAY_AFTER_MISMATCH = 1000; // ms
var PAIR_ANIMATION_TIME = 200; // ms
var WIDTH = 200;
var HEIGHT = 300;

var Card = function(id) {
    Phaser.Sprite.call(this, game, 0, 0, 'card_back');
    this.anchor.set(0.5, 0.5);
    this.id = id;
    this.height = HEIGHT;
    this.width = WIDTH;
    this.faceDown = true;
    this.inputEnabled = true;
    this.events.onInputUp.add(function() {
        if (this.faceDown)
            this.flipUp();
    }, this);
    game.add.existing(this);
};
Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;
Card.prototype.flipDown = function() {
    this.faceDown = true;
    conc.overlay.maskInput();
    var tween = game.add.tween(this);
    tween.to({
        width: 0
    }, FLIP_TIME / 2);
    tween.onComplete.addOnce(function() {
        this.loadTexture('card_back');
        this.width = 0;
        this.height = HEIGHT;
    }, this);
    var chained = game.add.tween(this);
    chained.to({
        width: 200
    }, FLIP_TIME / 2);
    chained.onComplete.addOnce(function() {
        conc.overlay.unmaskInput();
    }, this);
    tween.chain(chained);
    tween.start();
};
Card.prototype.flipUp = function() {
    print('card id: ' + this.id);
    this.faceDown = false;
    conc.overlay.maskInput();
    var tween = game.add.tween(this);
    tween.to({
        width: 0
    }, FLIP_TIME / 2);
    tween.onComplete.addOnce(function() {
        this.loadTexture('card_front_' + this.id);
        this.width = 0;
        this.height = HEIGHT;
    }, this);
    var chained = game.add.tween(this);
    chained.to({
        width: 200
    }, FLIP_TIME / 2);
    chained.onComplete.addOnce(function() {
        if (!conc.revealedCard) {
            conc.revealedCard = this;
            conc.overlay.unmaskInput();
            return;
        }
        if (this.id == conc.revealedCard.id) {
            // TODO: improve pair animation
            print('matching cards');
            [this, conc.revealedCard].forEach(function(card) {
                var tween = game.add.tween(card);
                tween.to({
                    angle: -5
                }, PAIR_ANIMATION_TIME);
                tween.onComplete.addOnce(function() {
                    conc.overlay.unmaskInput();
                }, card);
                tween.start();
            });
            conc.revealedCard = null;
            // TODO: check for win
        }
        else {
            game.time.events.add(DELAY_AFTER_MISMATCH, function() {
                this.flipDown();
                conc.revealedCard.flipDown();
                conc.revealedCard = null;
                conc.overlay.unmaskInput();
            }, this);
        }
    }, this);
    tween.chain(chained);
    tween.start();
};

module.exports = Card;