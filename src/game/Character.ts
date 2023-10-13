import * as Phaser from "phaser";
import AnimationKeys from "../const/AnimationKeys";
import TextureKeys from "../const/TextureKeys";
import { BodyType } from "matter";

export enum CharacterState {
  Idle,
  Jump,
  Fall,
  Dead,
}

export default class Character extends Phaser.GameObjects.Sprite {
  private charaterState;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TextureKeys.Character);

    this.createAnimations();

    this.play(AnimationKeys.CharacterIdle);
    
    this.scene.physics.add.existing(this);

    this.cursors = scene.input.keyboard.createCursorKeys();
    scene.add.existing(this);
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
  }

  jump(flag: boolean) {
    const body = this.body as BodyType;
    this.scene.matter.setVelocityY(body, -25);
    if (flag) {
      this.scene.matter.setVelocityX(body, 10);
    } else {
      this.scene.matter.setVelocityX(body, -10);
    }
  }

  private handleInput() {}

  protected preUpdate(time: number, delta: number): void {}

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
