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

  private canPressSpace: boolean = false;
  private spaceCooldown: number = 100;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    characterRatio: number
  ) {
    super(scene, x, y, TextureKeys.Character);

    this.setScale(characterRatio);

    this.createAnimations();

    scene.matter.add.gameObject(this, {
      mass: 2,
      frictionAir: 0.05,
      restitution: 0.1,
      friction: 0.3,
      label: "character",
      shape: {
        type: "rectangle",
        width: width - 15, // 'cause character have a item at back, so we should sub with 15
        height: height,
      },
    });

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

  private handleInput() {
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.space) &&
      !this.canPressSpace
    ) {
      if (
        this.charaterState !== CharacterState.Jump &&
        this.charaterState !== CharacterState.Fall
      ) {
        this.charaterState = CharacterState.Jump;
        const body = this.body as BodyType;
        this.scene.matter.setVelocityY(body, -25);

        setTimeout(() => {
          this.canPressSpace = false;
        }, this.spaceCooldown);

        this.canPressSpace = true;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.setFlip(false, false);
      this.scene.matter.setVelocityX(this.body as BodyType, 8);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.setFlip(true, false);
      this.scene.matter.setVelocityX(this.body as BodyType, -8);
    }
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    // handle press event
    this.handleInput();

    this.scene.matter.setAngularVelocity(this.body as BodyType, 0);

    // check character is falling
    // if (
    //   this.body.velocity.y > 0 &&
    //   this.charaterState === CharacterState.Jump
    // ) {
    //   this.charaterState = CharacterState.Fall;
    // }

    // Check the state of game and then transform
    switch (this.charaterState) {
      case CharacterState.Jump:
        this.play(AnimationKeys.CharacterJump, true);
        break;
      case CharacterState.Fall:
        this.play(AnimationKeys.CharacterFall, true);
        break;
      case CharacterState.Dead:
        break;
    }
  }

  private createAnimations() {
    this.anims.create({
      key: AnimationKeys.CharacterIdle,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 26,
        prefix: "idle-",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.CharacterJump,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 4,
        prefix: "jump-",
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.CharacterFall,
      frames: this.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 2,
        prefix: "door-in-",
        suffix: ".png",
      }),
      frameRate: 10,
    });
  }
}
