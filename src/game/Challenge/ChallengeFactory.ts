import * as Phaser from "phaser";
import Challenge from "./Challenge";
import { EventKeys } from "../../const/EventKeys";
import { InstructionKeys } from "../../const/InstructionKeys";

enum ChallengeFactoryStatus {
  Processing,
  Done,
  Empty,
}
export default class ChallengeFactory extends Phaser.GameObjects.Layer {
  private challengeList: Challenge[];
  private status: ChallengeFactoryStatus = ChallengeFactoryStatus.Processing;

  private currentChallenge: Challenge;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.challengeList = [
      new Challenge(scene, [1, 1, 3, 1, 2]),
      new Challenge(scene, [1, 3, 1, 4, 4, 1, 2, 3, 3, 1]),
    ];

    this.createChallenge();
  }

  createChallenge() {
    if (this.challengeList.length === 0) {
      this.status = ChallengeFactoryStatus.Empty;
      return;
    }
    this.currentChallenge = this.challengeList.shift();
    this.scene.add.existing(this.currentChallenge);
  }
  emit(event: EventKeys, instruction: InstructionKeys) {
    this.currentChallenge.emit(event, instruction);
  }

  preUpdate() {
    switch (this.status) {
      case ChallengeFactoryStatus.Processing: {
        if (this.currentChallenge.size === 0) {
          this.createChallenge();
        }
        break;
      }
      case ChallengeFactoryStatus.Done:
        break;

      case ChallengeFactoryStatus.Empty: {
        setTimeout(() => {
          this.challengeList.push(new Challenge(this.scene, [4, 3, 1, 1, 2]));
        }, 1000);
        this.status = ChallengeFactoryStatus.Processing;
      }
      default:
        break;
    }
  }
}
