import * as Phaser from "phaser";
import TextureKeys from "../../const/TextureKeys";
import Button from "./Button";
import { InstructionKeys } from "../../const/InstructionKeys";

export default class RightButton extends Button {
  public key = InstructionKeys.Right;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, TextureKeys.RightButton, x, y);
  }
}
