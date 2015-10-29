/* global game, Phaser */
global.conc = {};
global.game = new Phaser.Game(1080, 1920);
global.print = console.log.bind(console);
game.state.add('Load', require('./State/Load'));
game.state.add('Title', require('./State/Title'));
game.state.add('Main', require('./State/Main'));
game.state.start('Load');