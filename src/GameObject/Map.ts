import GameObject from "../Core/GameObject";
import { game } from "../Manager/Game";
import { BaseTexture, Container, Texture, Resource, Sprite, Rectangle } from "pixi.js";
import SpriteObject from "../Core/SpriteObject";

export class Map extends SpriteObject {
  static spriteAssetPath = '/sprites/map.jpg'

  start() {
    const widthMax = 2200;
    const heightMax = 1400;
    const fixedOffset = 120;
    const offsetY = (heightMax > innerHeight ?
      heightMax - innerHeight : innerHeight - heightMax) + fixedOffset;
    const offsetW = (widthMax > innerWidth ?
      widthMax - innerWidth : innerWidth - widthMax) + fixedOffset * 2;

    this.screenObj.height = innerHeight + offsetY;
    this.screenObj.width = innerWidth + offsetW;
    this.screenObj.position.set((offsetW / 2) * -1, offsetY * -1);
  }
}

export default Map;
