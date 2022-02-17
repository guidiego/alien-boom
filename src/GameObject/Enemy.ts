import Laser from "../GameObject/Laser";
import SpineObject from "../Core/SpineObject";

import { game } from "../Manager/Game";
import { LoaderResource } from "pixi.js";
import { deltaTime } from '../Manager/Time';
import ShootContainer from "./ShootContainer";
import Player from "./Player";
import { increaseKill } from "../Manager/Score";

interface IEnemy {
  x: number;
  y: number;
  health: number;
  speed: number;
  scale: number
}

export class Enemy extends SpineObject {
  static spineAssetPath = '/sprites/alien/alien.json'
  static assetHolder: LoaderResource['spineData'];

  private life = 1;
  private speed = 3;
  private _scale = 0.5;
  private curAnimation = 'run';
  private onDeadProcess = false;

  get isDead() {
    return this.life === 0 && this.onDeadProcess;
  }

  constructor({x, y, health, speed, scale }: IEnemy) {
    super(Enemy.assetHolder);

    this.speed = speed
    this.life = health
    this._scale = scale;

    this.scale.set(this._scale);
    this.position.set(x, y);
    this.state.setAnimation(0, 'run', true);
    this.state.addListener({
      complete: (e) => {
        const player = game.findGameObjectInCurrentScene<Player>('Player');
        if (e.animation.name === 'jump' && player.lifes > 0) {
          player.takeDamage(1);
          setTimeout(() => {
            this.curAnimation = 'hit';
          }, 500)
        }
      }
    })
  }

  private _followPlayer() {
    const player = game.findGameObjectInCurrentScene<Player>('Player');
    const distance = player.position.x - this.position.x;
    const multiplicator = distance < 0 ? -1 : 1;

    if (player.lifes === 0) {
      this.curAnimation = 'death';
      this.state.setAnimation(0, 'death', false);
      return;
    }

    if (!this.isDead) {
      if (distance < 100 && distance > -100 && player.position.y === this.position.y) {
        if (this.curAnimation !== 'jump') {
          this.curAnimation = 'jump';
          this.state.setAnimation(0, 'jump', false);
        }
      } else {
        if (this.curAnimation !== 'run') {
          this.curAnimation = 'run';
          this.state.setAnimation(0, 'run', true);
        }

        this.position.set(
          this.position.x + (multiplicator * this.speed * deltaTime), this.position.y
        );
        this.scale.set(this._scale * multiplicator, this._scale);
      }
    }
  }

  private _handleCollision() {
    const shootContainer = game.findGameObjectInCurrentScene<ShootContainer>('ShootContainer');
    const collisionObject: Laser = shootContainer.getCollision(this);

    if (collisionObject) {
      if (this.life === 0 && !this.onDeadProcess) {
        this.onDeadProcess = true;
        collisionObject.destroy();
        this.state.setAnimation(0, 'death', false);
        increaseKill();
      } else {
        this.life -= 1;
        this.state.setAnimation(0, 'hit', false);
      }
    }
  }

  update() {
    this._followPlayer();
    this._handleCollision();
  }
}

export default Enemy;
