import * as Phaser from "phaser";
import Preloader from "./scenes/Preloader";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: 400,
  height: 640,
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [Preloader, GameScene],
};

export default new Phaser.Game(config);
