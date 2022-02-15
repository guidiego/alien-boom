import GameObject from "./GameObject";
import { game } from "../Manager/Game";
import { Sprite } from "pixi.js";

export class SpriteObject extends GameObject<Sprite> {
  static spriteAssetPath = '/sprites/laser.png';
  static dataProp = 'texture';

  constructor(data) {
    super(new Sprite(data));
  }

  static setup() {
    game.loader.add(this.name, this.spriteAssetPath);
  }

  get bounds() {
    const bounds = this.realObject.getBounds();

    return {
      x: [bounds.x, bounds.x + bounds.width],
      y: [bounds.y, bounds.y + bounds.height],
    }
  }

  get position() {
    return this.screenObj.position;
  }

  get scale() {
    return this.screenObj.scale;
  }

  get visible() {
    return this.screenObj.visible;
  }

}

export default SpriteObject;
