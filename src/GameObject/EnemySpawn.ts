import GameObject from "../Core/GameObject";
import Enemy from "./Enemy";

import { Container } from "pixi.js";
import { time } from "../Manager/Time";

export class EnemySpawn extends GameObject<Container> {
  private enemies: Enemy[] = [];
  private nextMob: number = 0;
  private mobSpawnRation: number = 999;

  constructor() {
    super(new Container());
  }

  getRandomEnemySpawnValues() {
    const offset = 50;
    const rand = Math.random() * 1;
    // const mult = rand > 0.5 ? 1 : -1;
    const mult = -1;

    return {
      x: (mult === -1 ? 0 : window.innerWidth) + (mult * offset),
      y: window.innerHeight,
    }
  }

  update() {
    if (time >= this.nextMob) {
      const { x, y } = this.getRandomEnemySpawnValues();
      const enemy = new Enemy(x, y);
      this.enemies.push(enemy);
      this.screenObj.addChild(enemy.realObject);
      this.nextMob += this.mobSpawnRation;
    }

    this.enemies.forEach((enemy, index) => {
      enemy.update();

      if (enemy.isDead) {
        setTimeout(() => {
          enemy.destroy();
        }, 5000);

        this.enemies = [
          ...this.enemies.slice(0, index),
          ...this.enemies.slice(index + 1, this.enemies.length)
        ];
      }
    });
  }
}

export default EnemySpawn;
