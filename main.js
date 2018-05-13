var mainState = {
  // Loads assets
  preload: function() {

  },
  // Sets up the game
  create: function() {

  },
  // Contains game logic. Refreshes 60 times per second.
  update: function() {

  },
};

// Initializes Phaser, and creates a 400px by 490px game
let game = new Phaser.Game(400, 490);

// Adds the mainState and calls it main
game.state.add('main', mainState);

// Starts the state to actually start the game
game.state.start('main');