import * as Phaser from "phaser";
import TextureKeys from "../../const/TextureKeys";
import Button from "./Button";
import { InstructionKeys } from "../../const/InstructionKeys";

export default class UpButton extends Button {
  public key = InstructionKeys.Up;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, TextureKeys.UpButton, x, y);
  }
}
