import SceneKeys from "../const/SceneKeys";
import * as Phaser from "phaser";
import { TileKeys } from "../const/TileKeys";
import { TileMapKeys } from "../const/TileMapKeys";
import TextureKeys from "../const/TextureKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }
  preload() {
    this.load.image(
      TileKeys.TreasureHuntersAdditionalSky,
      "assets/environments/maps/treasure-hunters/Background/Additional Sky.png"
    );
    this.load.image(
      TileKeys.TreasureHuntersBackground,
      "assets/environments/maps/treasure-hunters/Background/BG Image.png"
    );
    this.load.image(
      TileKeys.TreasureHuntersTerrain,
      "assets/environments/maps/treasure-hunters/Terrain/Terrain (32x32).png"
    );

    this.load.tilemapTiledJSON(
      TileMapKeys.TreatureHunters,
      "assets/environments/maps/treasure-hunters/map.json"
    );

    this.load.spritesheet(
      TextureKeys.WaterReflect,
      "assets/environments/maps/treasure-hunters/Background/water-reflect.png",
      { frameWidth: 170, frameHeight: 10 }
    );
    this.load.spritesheet(TextureKeys.UpButton, "assets/button/up.png", {
      frameWidth: 34,
      frameHeight: 34,
    });
    this.load.spritesheet(TextureKeys.DownButton, "assets/button/down.png", {
      frameWidth: 34,
      frameHeight: 34,
    });
    this.load.spritesheet(TextureKeys.LeftButton, "assets/button/left.png", {
      frameWidth: 34,
      frameHeight: 34,
    });
    this.load.spritesheet(TextureKeys.RightButton, "assets/button/right.png", {
      frameWidth: 34,
      frameHeight: 34,
    });

    this.load.atlas(
      TextureKeys.Character,
      "assets/characters/Owlet/Owlet.png",
      "assets/characters/Owlet/Owlet.json"
    );

    this.load.atlas(
      TextureKeys.Skill,
      "assets/skill/owlet-skill.png",
      "assets/skill/owlet-skill.json"
    );

    this.load.image(
      TextureKeys.BigClouds,
      "assets/environments/maps/treasure-hunters/Background/Big Clouds.png"
    );
  }
  create() {
    this.scene.start(SceneKeys.Game);
  }
}
