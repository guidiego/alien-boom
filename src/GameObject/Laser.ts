import { LoaderResource } from "pixi.js";
import SpriteObject from "../Core/SpriteObject";
import { game } from "../Manager/Game";
import { deltaTime } from "../Manager/Time";

export class Laser extends SpriteObject {
  static assetHolder: LoaderResource['texture'];
  private speed = 5;
  private _hash: string;

  constructor(hash: string) {
    super(Laser.assetHolder);
    this._hash = hash;
    this.screenObj.anchor.set(0.5, 0.5);
  }

  get hash() {
    return this._hash;
  };

  destroy() {
    if (this.realObject.parent) {
      this.realObject.parent.removeChild(this.realObject);
    }
  }

  update() {
    const direction = this.scale.x > 0 ? 1 : -1;
    this.position.set(
      this.position.x + (deltaTime * this.speed * direction),
      this.position.y
    );
  }
}

export default Laser;
