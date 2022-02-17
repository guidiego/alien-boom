import Player from "../Player";
import SpriteObject from "../../Core/SpriteObject";

import { Graphics, Resource, Texture } from "pixi.js";
import { game } from "../../Manager/Game";

export class HealthBar extends SpriteObject {
  static spriteAssetPath = '/sprites/life.png';
  static assetHolder: Texture<Resource>;

  private healthBar: Graphics;
  private maxHpRef = 265;
  private player: Player;

  constructor() {
    super(HealthBar.assetHolder);

    this.scale.set(0.5)
    this.healthBar = new Graphics();
    this.healthBar.beginFill(0x870f0f);
    this.healthBar.drawRect(0, 0, this.maxHpRef, 30);
    this.screenObj.addChild(this.healthBar);
    this.healthBar.position.set(150, this.screenObj.height / 2 + 25)
  }


  update() {
    const player = game.findGameObjectInCurrentScene<Player>('Player');
    this.healthBar.width = (this.maxHpRef / player.maxHpRef) * player.lifes;
  }
}

export default HealthBar;
