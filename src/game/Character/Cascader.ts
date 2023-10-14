import * as Phaser from "phaser";
import { BodyType } from "matter";
import TextureKeys from "../../const/TextureKeys";
import AnimationKeys from "../../const/AnimationKeys";
import Skill from "./Skill";

export enum CharacterState {
  Idle,
  Death,
  Attack,
  Until,
  Hurt,
}

export default class Cascader extends Phaser.GameObjects.Sprite {
  private charaterState = CharacterState.Idle;

  private isHurt = false;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TextureKeys.Character);

    this.createAnimations();

    this.play(AnimationKeys.CharacterIdle);

    this.cursors = scene.input.keyboard.createCursorKeys();

    this.scene.physics.add.existing(this);
    this.scene.events.on("hurt", () => {
      this.charaterState = CharacterState.Hurt;
    });
    scene.add.existing(this);
    this.setData("label", "playerBody");
  }

  getCharacterState = () => {
    return this.charaterState;
  };

  setCharacterState = (state: CharacterState) => {
    this.charaterState = state;
  };

  idle() {
    this.play(AnimationKeys.CharacterIdle, true);
    this.charaterState = CharacterState.Idle;
    return this;
  }

  hurt() {
    this.charaterState = CharacterState.Hurt;
    this.isHurt = true;
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.right.isDown) {
    }
    switch (this.charaterState) {
      case CharacterState.Hurt: {
        this.play(AnimationKeys.CharacterDeath);
        this.charaterState = CharacterState.Idle;
        this.on("animationcomplete", this.handleAnimationComplete, this);

        break;
      }
      case CharacterState.Attack: {
        this.play(AnimationKeys.CharacterAttack1);
        this.charaterState = CharacterState.Idle;
        this.on("animationcomplete", this.handleAnimationComplete, this);
        break;
      }
    }
  }
  handleAnimationComplete(
    animation: Phaser.Animations.Animation,
    frame: Phaser.Animations.AnimationFrame,
    gameObject: Phaser.GameObjects.Sprite
  ) {
    console.log(animation);
    if (animation.key === AnimationKeys.CharacterAttack1) {
      this.play(AnimationKeys.CharacterIdle);
      this.off("animationcomplete", this.handleAnimationComplete, this);
    }
    if (animation.key === AnimationKeys.CharacterHurt) {
      console.log("Animation complete: hurt");
      this.play(AnimationKeys.CharacterIdle);
      this.off("animationcomplete", this.handleAnimationComplete, this);
    }
    if (animation.key === AnimationKeys.CharacterDeath) {
        this.play(AnimationKeys.CharacterIdle);
        this.off("animationcomplete", this.handleAnimationComplete, this);
    }
  }

  private createAnimations() {
    this.anims.create({
      key: AnimationKeys.CharacterIdle,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 0,
        end: 3,
        prefix: "Owlet_Monster_Idle_4-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.CharacterAttack1,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 0,
        end: 3,
        prefix: "Owlet_Monster_Attack1_4-",
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.CharacterAttack2,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 0,
        end: 5,
        prefix: "Owlet_Monster_Attack2_6-",
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.CharacterDeath,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 0,
        end: 7,
        prefix: "Owlet_Monster_Death_8-",
        suffix: ".png",
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: AnimationKeys.CharacterHurt,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 0,
        end: 3,
        prefix: "Owlet_Monster_Hurt_4-",
        suffix: ".png",
      }),
      frameRate: 10,
    });
  }
}
