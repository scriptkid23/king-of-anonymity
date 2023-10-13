import { BodyType } from "matter";
import * as Phaser from "phaser";
import AnimationKeys from "../const/AnimationKeys";
import TextureKeys from "../const/TextureKeys";
import Turtle from "./Turtle";
import Grass from "./Grass";
enum TurtleState {
  Running,
  Dead,
}
const turtleSize = 40;
const approximately = 10;
const durationDefault = 1000;
const frameRateDefault = 15;

export default class TurtleGrass extends Phaser.GameObjects.Layer {
  private turtle: Phaser.GameObjects.Sprite;
  private grass: Phaser.GameObjects.Sprite;

  private duration;

  private frameRate;

  private grassMaxAmplitude;
  private grassMinAmplitude;



  constructor(scene: Phaser.Scene, x: number, y: number, duration: number = durationDefault, left: boolean = false) {
    super(scene);
    
    this.frameRate = (durationDefault / duration) * frameRateDefault;

    this.duration = duration;

    this.grass = new Grass(scene, x, y);

    this.grassMaxAmplitude =
      x + (this.grass.width - turtleSize) / 2 + approximately;

    this.grassMinAmplitude =
      x - (this.grass.width - turtleSize) / 2 - approximately;


    const turtlePositionXDefault = left ? this.grassMinAmplitude : this.grassMaxAmplitude;

    const turtlePositionYDefault = y - this.grass.height / 2 - 5;
    this.turtle = new Turtle(
      scene,
      turtlePositionXDefault,
      turtlePositionYDefault,
      this.frameRate
    );

    this.turtle.play(AnimationKeys.TurtleRun);

    this.add(this.grass);
    this.add(this.turtle);

    this.startTurtleSwing(x > turtlePositionXDefault ? true : false);

    scene.add.existing(this);
  }
  private startTurtleSwing(flip: boolean) {
    this.scene.tweens.add({
      targets: this.turtle,
      x: flip ? this.grassMaxAmplitude : this.grassMinAmplitude,
      duration: this.duration,
      ease: "Linear",

      onComplete: () => {
        this.startTurtleSwing(!flip);
      },
    });
  }
}
