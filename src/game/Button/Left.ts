import * as Phaser from "phaser";
import TextureKeys from "../../const/TextureKeys";
import Button from "./Button";
import { InstructionKeys } from "../../const/InstructionKeys";

export default class LeftButton extends Button {
  public key = InstructionKeys.Left;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, TextureKeys.LeftButton, x, y);
  }
}
