import * as Phaser from "phaser";
import { BodyType } from "matter";
import TextureKeys from "../../const/TextureKeys";
import AnimationKeys from "../../const/AnimationKeys";
import Skill from "./Skill";
import Challenge from "../Challenge/Challenge";
import ChallengeFactory from "../Challenge/ChallengeFactory";
import { EventKeys } from "../../const/EventKeys";
import { InstructionKeys } from "../../const/InstructionKeys";

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

  private challengeFactory: ChallengeFactory;

  constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
    super(scene, x, y, TextureKeys.Character);

    this.createAnimations();

    this.play(AnimationKeys.CharacterIdle);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.scene.physics.add.existing(this);
    scene.add.existing(this);

    this.scene.events.on(`hurt-${id}`, () => {
      this.charaterState = CharacterState.Hurt;
    });

    this.scene.events.on(`attack-${id}`, () => {
      this.charaterState = CharacterState.Attack;
      setTimeout(() => {
        const skill = new Skill(scene, this.x + 23, this.y + 5);

        scene.tweens.add({
          targets: skill,
          x: this.scene.scale.width / 2 + 95,
          duration: 500,
          ease: "Linear",
          onUpdate: () => {
            // Update position of body when move
            // const body = skill.body as Phaser.Physics.Arcade.Body;
            // body.position.x = skill.x - 10;
            // body.position.y = skill.y - 10;
          },
          onComplete: () => {
            skill.play(AnimationKeys.SkillEnd);
            this.scene.events.emit(`hurt-right`, "data");

            skill.on("animationcomplete", () => {
              skill.destroy();
            });
          },
        });
      }, 300);
    });

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  addChallengeFactory(challengeFactory: ChallengeFactory) {
    this.challengeFactory = challengeFactory;
    return this;
  }

  private handleUp() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Up);
  }

  private handleDown() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Down);
  }

  private handleLeft() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Left);
  }

  private handleRight() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Right);
  }

  attack() {
    this.play(AnimationKeys.CharacterAttack1);
    this.charaterState = CharacterState.Attack;
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

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.handleUp();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.handleDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.handleLeft();
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.handleRight();
    }

    switch (this.charaterState) {
      case CharacterState.Hurt: {
        this.play(AnimationKeys.CharacterHurt);
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
