import SceneKeys from "../const/SceneKeys";
import * as Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }
  preload() {}
  create() {
    this.scene.start(SceneKeys.GameStart);
  }
}
