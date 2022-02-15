import GameObject from "../Core/GameObject";

import { Container } from "pixi.js";
import { Laser } from "./Laser";
import { v4 as uuid } from "uuid";

export class ShootContainer extends GameObject<Container> {
  private lasers: Laser[] = []
  constructor() {
    super(new Container());
  }

  newShoot(x, y, multiplicator) {
    const hash = uuid();
    const laser = new Laser(hash);
    this.screenObj.addChild(laser.realObject);
    this.lasers.push(laser);

    laser.position.set(x, y + 100);
    laser.scale.set(0.5 * multiplicator, 0.5);
  }

  private checkCollision(laser, body) {
    const laserBounds = laser.bounds;
    const bodyBounds = body.bounds;

    return laserBounds.x[1] > bodyBounds.x[0] &&
           laserBounds.x[0] < bodyBounds.x[1] &&
           laserBounds.y[1] > bodyBounds.y[0] &&
           laserBounds.y[0] < bodyBounds.y[1]

  }

  getCollision(body) {
    return this.lasers.find((laser) => this.checkCollision(laser, body));
  }

  removeLaser(hash) {
    this.lasers = this.lasers.filter((laser) => laser.hash == hash)
  }

  update() {
    this.lasers.forEach((laser) => laser.update());
  }
}

export default ShootContainer;
