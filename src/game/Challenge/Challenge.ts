import * as Phaser from "phaser";
import { InstructionKeys } from "../../const/InstructionKeys";
import Button from "../Button/Button";
import UpButton from "../Button/Up";
import DownButton from "../Button/Down";
import LeftButton from "../Button/Left";
import RightButton from "../Button/Right";

export default class Challenge extends Phaser.GameObjects.Container {
  private challengeList: Button[] = new Array();

  public size: number;

  constructor(scene: Phaser.Scene, challenges: number[]) {
    super(scene);

    let { cols, width } = this.getWidthDefault(challenges.length);

    const challengeX = (scene.scale.width - width) / 2 + 15;
    const challengeY = scene.scale.height - 170;

    this.setPosition(challengeX, challengeY); // Đặt vị trí của container

    this.size = challenges.length;

    challenges.map((key, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      switch (key) {
        case InstructionKeys.Up:
          this.challengeList.push(new UpButton(this.scene, col * 32, row * 32));

          break;
        case InstructionKeys.Down:
          this.challengeList.push(
            new DownButton(this.scene, col * 32, row * 32)
          );
          break;
        case InstructionKeys.Left:
          this.challengeList.push(
            new LeftButton(this.scene, col * 32, row * 32)
          );
          break;
        case InstructionKeys.Right:
          this.challengeList.push(
            new RightButton(this.scene, col * 32, row * 32)
          );
          break;

        default:
          break;
      }
    });
    this.add(this.challengeList);

    this.on("press", (data) => {
      if (this.challengeList.length > 0 && data === this.challengeList[0].key) {
        this.challengeList[0].remove();
        this.challengeList.shift();
        this.size -= 1;

        if (this.size === 0) {
          console.log("Challenge Destroyed");
          setTimeout(() => {
            this.destroy();
          }, 1000);
        }
      }
    });
  }

  getWidthDefault(len: number) {
    const boxSize = 32;

    switch (len) {
      case 5:
        return { cols: 5, width: boxSize * 5 };
      case 8:
        return { cols: 4, width: boxSize * 4 };
      case 10:
        return { cols: 5, width: boxSize * 5 };
      case 12:
        return { cols: 6, width: boxSize * 6 };
      default:
        break;
    }
  }
}
