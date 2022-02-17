import Player from "../Player";
import SpriteObject from "../../Core/SpriteObject";

import { Graphics, Resource, Texture, Text, TextStyle } from "pixi.js";
import { totalKill } from "../../Manager/Score";

export class KillBar extends SpriteObject {
  static spriteAssetPath = '/sprites/kills.png';
  static assetHolder: Texture<Resource>;

  private counter: Text;

  constructor() {
    super(KillBar.assetHolder);
    this.scale.set(0.5)
    this.position.set(innerWidth - this.screenObj.width - 30, 0);

    const style = new TextStyle({
      fill: "white",
      fontFamily: "Impact",
      fontSize: 34,
      fontWeight: "bolder"
    });

    this.counter = new Text(this.getCounter(), style);
    this.counter.anchor.set(0.5, 1);
    this.counter.position.set(this.screenObj.width + 40, this.screenObj.height + 25);

    this.screenObj.addChild(this.counter);
  }

  getCounter() {
    return `Alien Heads: ${totalKill}`
  }

  update() {
    this.counter.text = this.getCounter();
  }
}

export default KillBar;
