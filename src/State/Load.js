/* global game, Phaser */
module.exports = {
    preload: function() {
        game.scale.scaleMode = game.device.desktop ?
            Phaser.ScaleManager.SHOW_ALL : Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.baseURL = './assets/';
    },
    create: function() {
        game.add.text(540, 960, 'Loading...', {
            fontSize: 200,
            fill: 'white'
        }).anchor.set(0.5);
        game.load.image('pix');
        ['shapes', 'halloween', 'christmas'].forEach(function(deckName) {
            Phaser.ArrayUtils.numberArray(0, 9).forEach(function(n) {
                game.load.image(deckName + '_front_' + n);
            });
            game.load.image(deckName + '_back');
        });
        game.load.image('background');
        game.load.image('button');
        game.load.bitmapFont('font', 'font.png', 'font.fnt');
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) game.state.start('Title');
    }
};