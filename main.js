

let mainState = {
  // Loads assets
  preload() {
    // Load the bird sprite
    game.load.image('bird', 'assets/bird.png');
  },
  // Sets up the game
  create() {
    // Changes the background color of the game
    game.stage.backgroundColor = '#71c5cf';

    // Sets the physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Displays the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Adds physics to the bird
    // >Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Adds gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;

    // Calls the jump function when the spacekey is hit
    let spaceKey = game.input.keyboard.addKey(
      Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

  },
  // Contains game logic. Refreshes 60 times per second.
  update() {
    // >If the bird is out of the screen (too high or too low)
    // >Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();
  },
  // Makes the bird jump
  jump() {
    // Adds a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
  },

  // Restarts the game
  restartGame() {
    // Starts the main state, which restarts the game
    game.state.start('main');
  },

};

// Initializes Phaser, and creates a 400px by 490px game
let game = new Phaser.Game(400, 490);

// Adds the mainState and calls it main
game.state.add('main', mainState);

// Starts the state to actually start the game
game.state.start('main');