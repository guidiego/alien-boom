import { Container, Graphics, Text, TextStyle } from "pixi.js";
import GameObject from "../Core/GameObject";
import { game } from "../Manager/Game";
import { Player } from "./Player";

export class Hud extends GameObject<Container> {
  private maxHpRef = 200;
  private hp: Graphics;
  private headCount: Text;
  private count = 0;

  constructor() {
    super(new Container());
  }

  start() {
    this.screenObj.position.set(20, 20);
    this.startHP();
    this.startHeadCount();
  }

  createCount() {
    return `BOOMS: ${this.count}`;
  }

  addCount() {
    this.count += 1;
  }

  startHP() {
    const ghostBar = new Graphics();
    ghostBar.beginFill(0x525151);
    ghostBar.drawRect(0, 0, this.maxHpRef, 20);
    this.screenObj.addChild(ghostBar);

    this.hp = new Graphics();
    this.hp.beginFill(0xFF0000);
    this.hp.drawRect(0, 0, this.maxHpRef, 20);
    this.screenObj.addChild(this.hp);
  }

  startHeadCount() {
    const style = new TextStyle({
      fill: "white",
      fontFamily: "Impact",
      fontSize: 40,
      fontWeight: "bolder"
    });
    const text = new Text(this.createCount(), style);
    text.anchor.set(1, 0.5)

    this.headCount = text;
    this.headCount.position.set(innerWidth - 50, 20);
    this.screenObj.addChild(text);
  }

  update() {
    const player: Player = game.findGameObjectInCurrentScene('Player');
    this.hp.width = (this.maxHpRef / player.maxHpRef) * player.lifes;
    this.headCount.text = this.createCount();
  }
}

export default Hud;
