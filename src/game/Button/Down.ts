import * as Phaser from "phaser";
import TextureKeys from "../../const/TextureKeys";
import Button from "./Button";
import { InstructionKeys } from "../../const/InstructionKeys";

export default class DownButton extends Button {
  public key = InstructionKeys.Down;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, TextureKeys.DownButton, x, y);
  }
}
