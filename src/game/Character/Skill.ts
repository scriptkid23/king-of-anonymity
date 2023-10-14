import * as Phaser from "phaser";
import TextureKeys from "../../const/TextureKeys";
import AnimationKeys from "../../const/AnimationKeys";

export default class Skill extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TextureKeys.Skill);

    this.createAnimations();
    this.play(AnimationKeys.SkillStart);

    scene.physics.add.existing(this);
    scene.add.existing(this);

    const skillBody = this.body as Phaser.Physics.Arcade.Body;
    skillBody.setAllowGravity(false);

    this.setData("label", "skill");
  }

  private createAnimations() {
    this.anims.create({
      key: AnimationKeys.SkillStart,
      frames: this.anims.generateFrameNames(TextureKeys.Skill, {
        start: 1,
        end: 30,
        suffix: ".png",
      }),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: AnimationKeys.SkillEnd,
      frames: this.anims.generateFrameNames(TextureKeys.Skill, {
        start: 31,
        end: 35,
        suffix: ".png",
      }),
      frameRate: 25,
    });
  }
}
