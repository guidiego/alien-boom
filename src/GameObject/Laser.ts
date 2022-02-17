import { LoaderResource } from "pixi.js";
import SpriteObject from "../Core/SpriteObject";
import { deltaTime } from "../Manager/Time";

export class Laser extends SpriteObject {
  static spriteAssetPath = '/sprites/laser.png';
  static assetHolder: LoaderResource['texture'];
  private speed = 9;
  private _hash: string;
  private _inactive: boolean = false;

  constructor(hash: string) {
    super(Laser.assetHolder);
    this._hash = hash;
    this.screenObj.anchor.set(0.5, 0.5);
  }

  get hash() {
    return this._hash;
  };

  get inactive() {
    return this._inactive;
  }

  destroy() {
    this._inactive = true;
  }

  update() {
    if (this._inactive) {
      return this.realObject.destroy();
    }

    const direction = this.scale.x > 0 ? 1 : -1;
    this.position.set(
      this.position.x + (deltaTime * this.speed * direction),
      this.position.y
    );
  }
}

export default Laser;
