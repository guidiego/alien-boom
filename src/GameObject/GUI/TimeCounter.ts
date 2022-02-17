import SpriteObject from "../../Core/SpriteObject";
import { Resource, Text, Texture, TextStyle } from "pixi.js";
import { getFormatedCounter } from "../../Manager/Time";

export class TimeCounter extends SpriteObject {
  static spriteAssetPath = '/sprites/counter.png';
  static assetHolder: Texture<Resource>;

  private counter: Text;

  constructor() {
    super(TimeCounter.assetHolder);
    this.scale.set(0.5);

    this.realObject.anchor.set(0.5);
    this.position.set(innerWidth / 2, 40);

    const style = new TextStyle({
      fill: "white",
      fontFamily: "Impact",
      fontSize: 34,
      fontWeight: "bolder"
    });

    this.counter = new Text(this.getCounter(), style);
    this.counter.anchor.set(0, 0.5);
    this.screenObj.addChild(this.counter);
  }

  private getCounter() {
    return getFormatedCounter();
  }


  update() {
    return this.counter.text = this.getCounter();
  }
}

export default TimeCounter;
