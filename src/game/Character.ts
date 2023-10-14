import * as Phaser from "phaser";
import AnimationKeys from "../const/AnimationKeys";
import TextureKeys from "../const/TextureKeys";
import { BodyType } from "matter";

export enum CharacterState {
  Idle,
  Death,
  Attack,
  Until,
  Hurt,
}

export default class Character extends Phaser.GameObjects.Sprite {
  private charaterState = CharacterState.Idle;

  private isHurt = false;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TextureKeys.Character);

    this.createAnimations();

    this.play(AnimationKeys.CharacterIdle);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.scene.physics.add.existing(this);
    scene.add.existing(this);

    this.cursors = scene.input.keyboard.createCursorKeys();
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
      // Xử lý khi phím mũi tên lên được nhấn
    }
    switch (this.charaterState) {
      case CharacterState.Hurt: {
        if (this.isHurt) {
          this.play(AnimationKeys.CharacterHurt);
          this.isHurt = false;
          this.on('animationcomplete', this.handleAnimationComplete, this);
        }

        break;
      }
      case CharacterState.Attack: {
        break;
      }
    }
  }
  handleAnimationComplete(animation: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame, gameObject: Phaser.GameObjects.Sprite) {
    if (animation.key === AnimationKeys.CharacterHurt) {
        console.log("Animation complete: hurt");
        this.charaterState = CharacterState.Idle;
        this.play(AnimationKeys.CharacterIdle);
        this.off('animationcomplete', this.handleAnimationComplete, this);
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
