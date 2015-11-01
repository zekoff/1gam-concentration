/* global game, Phaser */
module.exports = {
    preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.baseURL = './assets/';
        game.load.image('pix');
        Phaser.ArrayUtils.numberArray(0, 9).forEach(function(n) {
            game.load.image('card_front_' + n);
        });
        game.load.image('card_back');
        game.load.bitmapFont('font', 'font.png', 'font.fnt');
    },
    create: function() {
        game.state.start('Title');
    }
};