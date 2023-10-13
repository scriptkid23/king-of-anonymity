import * as Phaser from "phaser";
import TextureKeys from "../const/TextureKeys";
import AnimationKeys from "../const/AnimationKeys";


export default class TurtleFlying extends Phaser.GameObjects.Sprite {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        isPhysical: boolean = true
      ) {
        super(scene, x,y, TextureKeys.TurtleFlying);

        this.setScale(0.5);
        this.createAnimations();
        this.play(AnimationKeys.TurtleFlying);

        scene.add.existing(this);

      }

      private createAnimations() {
        this.anims.create({
          key: AnimationKeys.TurtleFlying,
          frames: this.anims.generateFrameNames(TextureKeys.TurtleFlying, {
            start: 0,
            end: 8,
            prefix: "turtle-flying-",
            suffix: ".png",
          }),
          frameRate: 15,
          repeat: -1,
        });
      }
      flip(){
        this.setFlip(true, false);
        return this;
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
          ease: Phaser.Math.Easing.Quadratic.InOut,
          yoyo: true,
          repeat: -1,
        });
      }

}
