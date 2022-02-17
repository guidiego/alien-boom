import GameObject from "../../Core/GameObject";
import HealthBar from "./HealthBar";
import Player from "../Player";

import { game } from "../../Manager/Game";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import KillBar from "./KillBar";
import TimeCounter from "./TimeCounter";

export class Hud extends GameObject<Container> {
  private hpBar: HealthBar;
  private killCounter: KillBar;
  private timeCounter: TimeCounter;

  constructor() {
    super(new Container());
    this.hpBar = new HealthBar();
    this.killCounter = new KillBar();
    this.timeCounter = new TimeCounter();
  }

  start() {
    this.screenObj.position.set(20, 20);
    this.screenObj.addChild(this.hpBar.realObject);
    this.screenObj.addChild(this.killCounter.realObject);
    this.screenObj.addChild(this.timeCounter.realObject);
  }

  update() {
    this.hpBar.update();
    this.killCounter.update();
    this.timeCounter.update();
  }
}

export default Hud;
