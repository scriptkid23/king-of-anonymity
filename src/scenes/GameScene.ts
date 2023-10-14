import * as Phaser from "phaser";
import SceneKeys from "../const/SceneKeys";
import { TileMapKeys } from "../const/TileMapKeys";
import { TileKeys } from "../const/TileKeys";
import {
  TileLayerKeys,
  TileLayerKeysType,
  TileLayerName,
} from "../const/TileLayerKeys";
import WaterReflect from "../game/WaterReflect";
import TextureKeys from "../const/TextureKeys";
import Character from "../game/Character";
import DownButton from "../game/Button/Down";
import LeftButton from "../game/Button/Left";
import Challenge from "../game/Challenge/Challenge";
import { EventKeys } from "../const/EventKeys";
import { InstructionKeys } from "../const/InstructionKeys";
import ChallengeFactory from "../game/Challenge/ChallengeFactory";

export default class GameScene extends Phaser.Scene {
  private bigClouds: Phaser.GameObjects.TileSprite;
  private ground: Phaser.Tilemaps.TilemapLayer;
  private character: Character;

  private instruction: number;

  private challengeFactory: ChallengeFactory;

  constructor() {
    super(SceneKeys.Game);
  }

  preload(): void {}

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const map = this.make.tilemap({
      key: TileMapKeys.TreatureHunters,
    });

    this.loadMap(map, TileLayerKeys);

    new WaterReflect(this, width / 2, height / 2 + 63);

    this.bigClouds = this.add.tileSprite(
      width / 2,
      height / 2 + 3,
      width,
      101,
      TextureKeys.BigClouds
    );

    this.challengeFactory = new ChallengeFactory(this);

    this.character = new Character(this, width / 2, height / 2);
    this.cameras.main.setBounds(0, 0, width, height);
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.add.collider(this.character, this.ground);

    this.handleInput();
  }

  setInstruction = (instruction: number) => {
    this.instruction = instruction;
  };

  private handleInput() {
    this.input.keyboard.on("keydown-UP", this.handleUp, this); // instruction = 1

    this.input.keyboard.on("keydown-DOWN", this.handleDown, this); // instruction = 3

    this.input.keyboard.on("keydown-LEFT", this.handleLeft, this); // instruction = 4

    this.input.keyboard.on("keydown-RIGHT", this.handleRight, this); // instuction = 2
  }

  private handleUp() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Up);
  }

  private handleDown() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Down);
  }

  private handleLeft() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Left);
  }

  private handleRight() {
    this.challengeFactory.emit(EventKeys.Press, InstructionKeys.Right);
  }

  private loadMap(map: Phaser.Tilemaps.Tilemap, types: TileLayerKeysType[]) {
    types.forEach((type) => {
      const tileset = map.addTilesetImage(type.tilesets);
      const layer = map.createLayer(type.layer, tileset);

      if (type.layer === TileLayerName.Ground) {
        layer.setCollisionByProperty({ collides: true });
        this.ground = layer;

        // active debug for tiled
        // const debugGraphics = this.add.graphics().setAlpha(0.7);

        // layer.renderDebug(debugGraphics, {
        //   tileColor: null,
        //   collidingTileColor: new Phaser.Display.Color(243, 234, 48,255),
        //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })
      }
      this.add.existing(layer);
    });
  }

  setCloudParallax() {
    this.bigClouds.tilePositionX += 0.5;
  }
  update(time: number, delta: number): void {
    this.setCloudParallax();
    this.challengeFactory.preUpdate();
  }
}
