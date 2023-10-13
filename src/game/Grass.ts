import * as Phaser from "phaser";
import TextureKeys from "../const/TextureKeys";

export default class Grass extends Phaser.GameObjects.Sprite {
  private isSensor = false;
  private isStatic = true;

  private gameObject: Phaser.GameObjects.GameObject;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    isPhysical: boolean = true
  ) {
    super(scene, x, y, TextureKeys.Grass);

    /*
        When an object is marked as a sensor (isSensor = true), 
        it can still detect and trigger collision events with other objects in the physics environment, 
        but it does not exert any physical impact on those objects.
    */
    this.gameObject =
      isPhysical &&
      scene.matter.add.gameObject(this, {
        isStatic: this.isStatic,
        label: "grass",
        isSensor: this.isSensor,
      });

    scene.add.existing(this);
  }

  swingY(to: number, speed: number = 1500) {
    this.scene.tweens.add({
      targets: this,
      y: to,
      duration: speed,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });
  }

  swingX(to: number, speed: number = 1500) {
    this.scene.tweens.add({
      targets: this,
      x: to,
      duration: speed,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });
  }
}
