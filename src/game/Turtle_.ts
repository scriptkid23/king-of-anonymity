import * as Phaser from "phaser";
import AnimationKeys from "../const/AnimationKeys";
import TextureKeys from "../const/TextureKeys";

enum TurtleState {
  Running,
  Dead,
}

const turtleSize = 40;
const approximately = 10;
const durationDefault = 1000;
const frameRateDefault = 15;

export default class Turtle extends Phaser.GameObjects.Container {
  private turtle: Phaser.GameObjects.Sprite;
  private grass: Phaser.GameObjects.Sprite;

  //   private turtleState = TurtleState.Running;

  private turtlePositionAvaiable;

  private turtlePositionDefault;

  private duration;

  private frameRate;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    duration: number = 1000
  ) {
    super(scene, x, y);

    this.duration = duration;
    this.frameRate = (durationDefault / duration) * frameRateDefault;

    this.grass = scene.add.sprite(0, 0, TextureKeys.Grass);

    this.turtlePositionAvaiable =
      (this.grass.width - turtleSize) / 2 + approximately;

    this.turtlePositionDefault = Phaser.Math.Between(
      -this.turtlePositionAvaiable,
      this.turtlePositionAvaiable
    );

    this.turtle = scene.add.sprite(0, 0, TextureKeys.TurtleShell).setOrigin(0.5, 1);



    this.createAnimations();

    this.turtle.play(AnimationKeys.TurtleRun);

    scene.matter.add.gameObject(this.turtle, {
      ignoreGravity: true,
      isStatic: true,
    });

    console.log(this.grass);

    scene.matter.add.gameObject(this.grass, {
      isStatic: true,
    });

    this.add(this.grass);
    this.add(this.turtle);

    this.startTurtleSwing(this.turtlePositionDefault);

    scene.add.existing(this);
  }

  private createAnimations() {
    this.turtle.anims.create({
      key: AnimationKeys.TurtleRun,
      frames: this.turtle.anims.generateFrameNames(TextureKeys.TurtleShell, {
        start: 1,
        end: 4,
        prefix: "shell-",
        suffix: ".png",
      }),
      frameRate: this.frameRate,
      repeat: -1,
    });
  }

  private startTurtleSwing(flip) {
    this.scene.tweens.add({
      targets: this.turtle,
      x: flip < 0 ? this.turtlePositionAvaiable : -this.turtlePositionAvaiable,
      duration: this.duration,
      ease: "Linear",

      onComplete: () => {
        this.startTurtleSwing(-flip);
      },
    });
  }
}
