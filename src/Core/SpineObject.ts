import GameObject from "./GameObject";
import { game } from "../Manager/Game";
import { Spine } from "pixi-spine";

export class SpineObject extends GameObject<Spine> {
  static spineAssetPath = '';
  static dataProp = 'spineData';

  constructor(data) {
    super(new Spine(data));
  }

  static setup() {
    game.loader.add(this.name, this.spineAssetPath);
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

  get state() {
    return this.screenObj.state;
  }

  get skeleton() {
    return this.screenObj.skeleton;
  }
}

export default SpineObject;
