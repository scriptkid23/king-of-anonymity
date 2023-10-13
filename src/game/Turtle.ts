import * as Phaser from "phaser";
import AnimationKeys from "../const/AnimationKeys";
import TextureKeys from "../const/TextureKeys";

enum TurtleState {
  Run,
  Dead,
}

export default class Turtle extends Phaser.GameObjects.Sprite {
  private frameRate;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frameRate: number = 15
  ) {
    super(scene, x, y, TextureKeys.TurtleShell);

    this.frameRate = frameRate;
    this.createAnimations();

    const shapes = this.scene.cache.json.get(TextureKeys.TurtleShellPhysic);
    scene.matter.add.gameObject(this, {
      isStatic: true,
      shape: shapes.shell,
    });
  }

  private createAnimations() {
    this.anims.create({
      key: AnimationKeys.TurtleRun,
      frames: this.anims.generateFrameNames(TextureKeys.TurtleShell, {
        start: 1,
        end: 4,
        prefix: "shell-",
        suffix: ".png",
      }),
      frameRate: this.frameRate,
      repeat: -1,
    });
  }
}
