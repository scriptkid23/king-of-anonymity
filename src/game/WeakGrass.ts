import * as Phaser from "phaser";
import TextureKeys from "../const/TextureKeys";
import { BodyType, Pair } from "matter";

export default class WeakGrass extends Phaser.GameObjects.Sprite {
  private countDestroy = 0;

  private gameObject: Phaser.GameObjects.GameObject;

  private restitution: number;

  private;
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

    this.restitution = -30;

    this.gameObject =
      isPhysical &&
      scene.matter.add.gameObject(this, {
        isStatic: true,
        label: "weak-grass",
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
    this.countDestroy++;
    this.scene.matter.setVelocityY(body, this.restitution);

    if (this.countDestroy === 1) {
      this.countDestroy = 0;
      this.visible = false;
      setTimeout(() => {
        this.visible = true;
      }, 5000);
    }
  };

  setRestitution(value: number) {
    this.restitution = value;
    return this;
  }

  disableVisible() {
    this.visible = false;
    return this;
  }
}
