var cloud1;
var cloud2;
var ducks;
var ground;
var meteorGroup;
var scoreText;
var score = 0;
var generationText;
function create() {
  scene = this;
  // Create new duck group for game
  ducks = this.physics.add.group();

  this.add.image(400, 300, "bg");
  generationText = this.add.text(16, 16, "Generation: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  createCloud(this);
  createGround(this);
  createMeteorGroup(this);
  createFireEffect(this);
  createDuckAnimation(this);
  setup(this);
  const createScope = this;
  this.physics.add.overlap(
    ducks,
    meteorGroup,
    (duck, meteor) => {
      meteorHitDuck(duck, meteor, createScope);
    },
    null,
    this
  );
}

function createCloud(scene) {
  cloud1 = scene.add.sprite(800, 100, "cloud1");
  cloud2 = scene.add.sprite(200, 200, "cloud1");
  scene.anims.create({
    key: "cloud1-idle",
    frames: scene.anims.generateFrameNumbers("cloud1", { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1,
  });
  scene.anims.create({
    key: "cloud2-idle",
    frames: scene.anims.generateFrameNumbers("cloud1", { start: 1, end: 0 }),
    frameRate: 2,
    repeat: -1,
  });
}
function createDuckAnimation(scene) {
  scene.anims.create({
    key: "left",
    frames: scene.anims.generateFrameNumbers("duck", { start: 0, end: 1 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "turn",
    frames: [{ key: "duck", frame: 2 }],
    frameRate: 20,
  });

  scene.anims.create({
    key: "right",
    frames: scene.anims.generateFrameNumbers("duck", { start: 3, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });
}
function createDuck(scene) {
  const duck = ducks.create(
    Phaser.Math.Between(100, game.config.width - 100),
    // 100,
    500,
    "duck"
  );
  const fxPixelated = duck.preFX.addPixelate(-3);
  duck.setScale(0.65);
  duck.setCrop(10, 5, 140, 140);
  duck.setSize(80, 80);
  duck.setBounce(0.2);
  duck.setDepth(1);
  duck.setCollideWorldBounds(true);
  scene.physics.add.collider(duck, ground);
  // scene.physics.add.overlap(
  //   meteorGroup,
  //   duck,
  //   (meteor, duck) => meteorHitDuck(duck, meteor, scene),
  //   null,
  //   scene
  // );
  return duck;
}

function createGround(scene) {
  ground = scene.physics.add.staticGroup();
  ground.create(400, 700, "ground").setScale(1).refreshBody();
  ground.create(800, 700, "ground").setScale(1).refreshBody();
}

function createMeteorGroup(scene) {
  meteorGroup = scene.physics.add.group();
  scene.time.addEvent({
    delay: Phaser.Math.Between(
      (MAX_METEOR_DIFFICULTY - METEOR_DIFFICULTY) * 200,
      (MAX_METEOR_DIFFICULTY - METEOR_DIFFICULTY) * 300
    ),
    callback: createMeteor,
    callbackScope: scene,
    loop: true,
  });
  scene.time.addEvent({
    delay: Phaser.Math.Between(
      (MAX_METEOR_DIFFICULTY - METEOR_DIFFICULTY) * 500,
      (MAX_METEOR_DIFFICULTY - METEOR_DIFFICULTY) * 1500
    ),
    callback: createMeteorBoundaries,
    callbackScope: scene,
    loop: true,
  });
  scene.anims.create({
    key: "meteor_fall",
    frames: scene.anims.generateFrameNumbers("meteor", { start: 0, end: 2 }), // Adjust the frame range based on your sprite sheet
    frameRate: 10, // Adjust the frame rate as needed
    repeat: -1, // Repeat the animation indefinitely
  });
  scene.physics.add.overlap(
    meteorGroup,
    ground,
    (meteor, ground) => meteorHitGround(meteor, ground, scene),
    null,
    scene
  );
}

function createFireEffect(scene) {
  scene.anims.create({
    key: "fire",
    frames: scene.anims.generateFrameNumbers("fire", { start: 0, end: 2 }), // Adjust the frame range based on your sprite sheet
    frameRate: 12, // Adjust the frame rate as needed
    repeat: -1, // Repeat the animation indefinitely
  });
}

function createMeteor() {
  const meteor = meteorGroup
    .create(Phaser.Math.Between(0, game.config.width), -50, "meteor")
    .setScale(2.5);

  meteor.play("meteor_fall");

  meteor.setVelocity(0, 0);
  meteor.setGravityY(-100);
  updateScore(10);
}
function createMeteorBoundaries() {
  const meteor = meteorGroup.create(0, -50, "meteor").setScale(2.5);

  meteor.play("meteor_fall");

  meteor.setVelocity(0, 0);
  meteor.setGravityY(-100);
  updateScore(10);
  const meteor2 = meteorGroup
    .create(game.config.width, -50, "meteor")
    .setScale(2.5);

  meteor2.play("meteor_fall");

  meteor2.setVelocity(0, 0);
  meteor2.setGravityY(-100);
  updateScore(10);
}
