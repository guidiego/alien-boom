import GameObject from "../Core/GameObject";
import Enemy from "./Enemy";

import { Container } from "pixi.js";
import { time } from "../Manager/Time";
import { game } from "../Manager/Game";
import Player from "./Player";

export class EnemySpawn extends GameObject<Container> {
  private enemies: Enemy[] = [];
  private nextMob: number = 0;
  private propsPerLife = [
    { speed: 7, scale: 0.5, ratio: 0.3 },
    { speed: 6, scale: 0.6, ratio: 0.3 },
    { speed: 5, scale: 0.7, ratio: 0.4 },
    { speed: 4, scale: 0.8, ratio: 0.6 },
    { speed: 3, scale: 1, ratio: 0.8 },
  ]

  constructor() {
    super(new Container());
  }

  getRandomEnemySpawnValues() {
    const offset = 50;
    const rand = Math.random() * 1;
    const mult = rand > 0.5 ? 1 : -1;
    const health = Math.round(Math.random() * 4) + 1;

    return {
      x: (mult === -1 ? 0 : window.innerWidth) + (mult * offset),
      y: window.innerHeight,
      health,
      ...this.propsPerLife[health - 1]
    }
  }

  update() {
    if (time >= this.nextMob && game.findGameObjectInCurrentScene<Player>('Player').lifes !== 0) {
      const { ratio, ...enemyProps } = this.getRandomEnemySpawnValues();
      const enemy = new Enemy(enemyProps);
      this.enemies.push(enemy);
      this.screenObj.addChild(enemy.realObject);
      this.nextMob += ratio;
    }

    this.enemies = this.enemies.filter((enemy) => {
      if (!enemy.isDead) return true;

      setTimeout(() => {
        this.screenObj.removeChild(enemy.realObject);
        enemy.realObject.destroy();
      }, 3000)
    });
    this.enemies.forEach((enemy) => enemy.update());
  }
}

export default EnemySpawn;
