import * as Phaser from "phaser";
import TextureKeys from "../const/TextureKeys";
import { BodyType, Pair } from "matter";

export default class Teleport extends Phaser.GameObjects.Sprite {
  private gameObject: Phaser.GameObjects.GameObject;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    isPhysical: boolean = true
  ) {
    super(scene, x, y, TextureKeys.Teleport);

    /*
        When an object is marked as a sensor (isSensor = true), 
        it can still detect and trigger collision events with other objects in the physics environment, 
        but it does not exert any physical impact on those objects.
    */
    this.setScale(0.3);

    this.gameObject =
      isPhysical &&
      scene.matter.add.gameObject(this, {
        isStatic: true,
        label: "teleport",
        shape: {
          type: "rectangle",
          width: this.width * 0.3, // 'cause character have a item at back, so we should sub with 15
          height: this.height * 0.3,
        },
        onCollideCallback: this.onCollideCallback,
        onCollideEndCallback: this.onCollideEndCallback,
      });

    scene.add.existing(this);
  }
  onCollideEndCallback = (pair: BodyType) => {
    const body = this.body as BodyType;
  };
  onCollideCallback = ({
    bodyA,
    bodyB,
  }: {
    bodyA: BodyType;
    bodyB: BodyType;
  }) => {
    const body = this.body as BodyType;
  };
}
