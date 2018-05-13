

let mainState = {
  // Loads assets
  preload() {
    // Loads the bird sprite
    game.load.image('bird', 'assets/bird.png');

    // Loads the pipe sprite
    game.load.image('pipe', 'assets/pipe.png');

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

    // Create an empty group
    this.pipes = game.add.group();

    // Generates pipes and loops them.
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    // Initiates the score and displays it
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
      { font: "30px Arial", fill: "#ffffff" });

    // Move the anchor to the left and downward
    this.bird.anchor.setTo(-0.2, 0.5);

  },
  // Contains game logic. Refreshes 60 times per second.
  update() {
    // >If the bird is out of the screen (too high or too low)
    // >Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490)
      this.restartGame();

    // Calls hitPipe if the bird overlaps the pipe.
    game.physics.arcade.overlap(
      this.bird, this.pipes, this.hitPipe, null, this);

    if (this.bird.angle < 20)
      this.bird.angle += 1;
  },

  /*
   * Custom functions
   */
  addOnePipe: function(x, y) {
    // Creates a pipe at the position x and y
    let pipe = game.add.sprite(x, y, 'pipe');

    // Adds the pipe to our previously created group
    this.pipes.add(pipe);

    // Enables physics on the pipe
    game.physics.arcade.enable(pipe);

    // Adds velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kills the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },
  addRowOfPipes: function() {
    // Randomly picks a number between 1 and 5
    // >This will be the hole position
    let hole = Math.floor(Math.random() * 5) + 1;

    // Adds the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (let i = 0; i < 8; i++)
      if (i !== hole && i !== hole + 1)
        this.addOnePipe(400, i * 60 + 10);

    // Adds a score every time a pipe is passed
    this.score += 1;
    this.labelScore.text = this.score;
  },
  // Makes the bird jump
  jump() {

    if (this.bird.alive === false)
      return;

    // Adds a vertical velocity to the bird
    this.bird.body.velocity.y = -350;

    // Creates an animation on the bird
    let animation = game.add.tween(this.bird);

    // Changes the angle of the bird to -20° in 100 milliseconds
    animation.to({angle: -20}, 100);

    // And start the animation
    animation.start();
  },

  // Restarts the game
  restartGame() {
    // Starts the main state, which restarts the game
    game.state.start('main');
  },
  hitPipe: function() {
    // >If the bird has already hit a pipe, do nothing
    // >It means the bird is already falling off the screen
    if (this.bird.alive === false)
      return;

    // Sets the alive property of the bird to false
    this.bird.alive = false;

    // Prevents new pipes from appearing
    game.time.events.remove(this.timer);

    // Goes through all the pipes, and stops their movement
    this.pipes.forEach(function(p){
      p.body.velocity.x = 0;
    }, this);
  },

};

// Initializes Phaser, and creates a 400px by 490px game
let game = new Phaser.Game(400, 490);

// Adds the mainState and calls it main
game.state.add('main', mainState);

// Starts the state to actually start the game
game.state.start('main');