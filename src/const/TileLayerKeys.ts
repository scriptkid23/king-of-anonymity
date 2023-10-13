import { TileKeys } from "./TileKeys";

export enum TileLayerName {
    Beach = "Beach",
    Ground = "Ground",
    Background = "Background",

}
export type TileLayerKeysType = {
    layer: string;
    tilesets: string;
}

export const TileLayerKeys:TileLayerKeysType[] = [
   
    {
        layer: TileLayerName.Background,
        tilesets: TileKeys.TreasureHuntersAdditionalSky,
    },
    {
        layer: TileLayerName.Ground,
        tilesets: TileKeys.TreasureHuntersTerrain
    },
    {
        layer: TileLayerName.Beach,
        tilesets: TileKeys.TreasureHuntersBackground,
    },
]