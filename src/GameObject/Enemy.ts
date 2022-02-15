import Hud from "./Hud";
import Laser from "../GameObject/Laser";
import SpineObject from "../Core/SpineObject";

import { game } from "../Manager/Game";
import { LoaderResource } from "pixi.js";
import { deltaTime } from '../Manager/Time';
import ShootContainer from "./ShootContainer";
import Player from "./Player";


export class Enemy extends SpineObject {
  static spineAssetPath = '/sprites/alien/alien.json'
  static assetHolder: LoaderResource['spineData'];

  private speed = 3;
  private curAnimation = 'run';
  private dead = false;

  get isDead() {
    return this.dead;
  }

  constructor(x, y) {
    super(Enemy.assetHolder);

    this.scale.set(0.5, 0.5);
    this.position.set(x, y);
    this.state.setAnimation(0, 'run', true);
    this.state.addListener({
      complete: (e) => {
        if (e.animation.name === 'jump') {
          game.findGameObjectInCurrentScene('Player').takeDamage(1);
          setTimeout(() => {
            this.curAnimation = 'idle';
          }, 500)
        }
      }
    })
  }

  destroy() {
    this.realObject.parent.removeChild(this.realObject);
  }

  private _followPlayer() {
    const player: Player = game.findGameObjectInCurrentScene('Player');
    const distance = player.position.x - this.position.x;
    const multiplicator = distance < 0 ? -1 : 1;

    if (!this.dead) {
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
        this.scale.set(0.5 * multiplicator, 0.5);
      }
    }
  }

  private _handleCollision() {
    const shootContainer: ShootContainer = game.findGameObjectInCurrentScene('ShootContainer');
    const hud: Hud = game.findGameObjectInCurrentScene('Hud');

    const collisionObject: Laser = shootContainer.getCollision(this);
    if (collisionObject) {
      console.log(collisionObject);
      if (!this.dead) {
        this.dead = true;
        shootContainer.removeLaser(collisionObject.hash);
        collisionObject.destroy();

        this.state.setAnimation(0, 'death', false);
        hud.addCount();
      }
    }
  }

  update() {
    this._followPlayer();
    this._handleCollision();
  }
}

export default Enemy;
