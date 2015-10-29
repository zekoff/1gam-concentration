/* global Phaser, game, conc */
var FLIP_TIME = 200; // ms
var DELAY_AFTER_MISMATCH = 1000; // ms
var PAIR_ANIMATION_TIME = 200; // ms

var Card = function(id) {
    Phaser.Sprite.call(this, game, 0, 0, 'pix');
    this.anchor.set(0.5, 0.5);
    this.id = id;
    this.height = 300;
    this.width = 200;
    this.tint = 0x0000ff;
    this.faceDown = true;
    this.inputEnabled = true;
    this.events.onInputUp.add(function() {
        if (this.faceDown)
            this.flipUp();
    }, this);
    game.add.existing(this);

    this.debugFace = game.add.text(0, 0, id, {
        fontSize: 300
    });
    this.debugFace.anchor.set(0.5, 0.5);
    this.debugFace.alpha = 0;
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
        this.tint = 0x0000ff;
        this.debugFace.alpha = 0;
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
    // TODO: improve card reveal animation
    var tween = game.add.tween(this);
    tween.to({
        width: 0
    }, FLIP_TIME / 2);
    tween.onComplete.addOnce(function() {
        this.tint = 0x8080ff;
        this.debugFace.alpha = 1;
        this.debugFace.position.copyFrom(this.position);
        this.debugFace.bringToTop();
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
                    this.tint = 0x00ff00;
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