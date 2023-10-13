import * as Phaser from "phaser";
import Preloader from "./scenes/Preloader";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: 384,
  height: 600,
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "matter",
    matter: {
      // debug: true,
      gravity: {
        y: 5,
      },
    },
  },
  scene: [Preloader],
};

export default new Phaser.Game(config);
