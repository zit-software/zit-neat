function meteorHitGround(meteor, groundCollided, scene) {
  if (meteor == closestMeteor) {
    closestMeteor = null;
    closestMeteorLine.clear();
  }
  if (meteor == secondClosestMeteor) {
    secondClosestMeteor = null;
    secondClosestMeteorLine.clear();
  }
  if (meteor == thirdClosestMeteor) {
    thirdClosestMeteor = null;
    thirdClosestMeteorLine.clear();
  }
  const fire = scene.physics.add
    .sprite(meteor.x, meteor.y + 15, "fire")
    .setScale(0.25);
  scene.physics.add.collider(fire, ground);
  scene.physics.add.overlap(
    fire,
    ducks,
    (fire, ducks) => fireHitDuck(fire, ducks, scene),
    null,
    scene
  );
  fire.play("fire");
  meteor.destroy();
  setTimeout(() => {
    fire.destroy();
  }, 1500);
}
function meteorHitDuck(duck, meteor, scene) {
  console.log("Ouch!");
  duck.destroy();
  // Duck die
  killDuck(duck);
  ducks.remove(duck);
}
function fireHitDuck(fire, duck, scene) {
  fire.destroy();
}
