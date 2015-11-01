/* global game, Phaser */
module.exports = {
    preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.baseURL = './assets/';
        game.load.image('pix');
        ['shapes', 'halloween', 'christmas'].forEach(function(deckName) {
            Phaser.ArrayUtils.numberArray(0, 9).forEach(function(n) {
                game.load.image(deckName + '_front_' + n);
            });
            game.load.image(deckName + '_back');
        });
        game.load.image('background');
        game.load.image('left');
        game.load.image('right');
        game.load.image('button');
        game.load.bitmapFont('font', 'font.png', 'font.fnt');
    },
    create: function() {
        game.state.start('Title');
    }
};