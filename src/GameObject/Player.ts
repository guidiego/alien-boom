import SpineObject from "../Core/SpineObject";
import { game } from "../Manager/Game";
import Keyboard from "../Manager/Keyboard";
import { deltaTime } from '../Manager/Time';

export class Player extends SpineObject {
  static spineAssetPath = '/sprites/player/spineboy.json'

  private life = 5;
  private curAnimation = 'portal';
  private lastAnimation = null;

  get blockLoop() {
    return this.curAnimation === 'portal';
  }

  get maxHpRef() {
    return 5;
  }

  get lifes() {
    return this.life;
  }

  takeDamage(value: number) {
    this.life -= value;
  }

  getDistanceFromBoneToRoot = (bone, x = 0, y = 0) => {
    if (bone.data.name !== 'root') {
      return this.getDistanceFromBoneToRoot(bone.parent, x + bone.data.x, y + bone.data.y);
    }
    return { x, y };
  }

  start() {
    this.state.setAnimation(0, 'portal', false);
    this.scale.set(0.5, 0.5);
    this.position.set(window.innerWidth / 2, window.innerHeight);

    this.state.addListener({
      complete: (e) => {
        if (e.animation.name === 'death') {
          game.stop();
          return game.callScene('DeadScene');
        }

        if (e.animation.name === 'jump' || e.animation.name === 'shoot') {
          this.curAnimation = this.lastAnimation;
          this.state.setAnimation(0, this.lastAnimation, true);
        }

        if (e.animation.name === 'portal') {
          this.lastAnimation = this.curAnimation;
          this.curAnimation = 'idle'
          this.state.setAnimation(0, 'idle', true);
        }
      }
    });
  }

  update() {
    let blockAnimation = false;

    if (this.life === 0) {
      if (this.curAnimation !== 'death') {
        this.lastAnimation = this.curAnimation;
        this.curAnimation = 'death';
        this.state.setAnimation(0, 'death', false);
      }

      return;
    }

    if (this.curAnimation === 'jump' || this.curAnimation === 'shoot') {
      blockAnimation = true;
    }

    if (Keyboard.isSomePressed('KeyA', 'KeyD')) {
      if (this.curAnimation !== 'walk' && !blockAnimation) {
        this.lastAnimation = this.curAnimation;
        this.curAnimation = 'walk';
        this.state.setAnimation(0, 'walk', true);
      }

      const multiplicator = Keyboard.isPressed('KeyD') ? 1 : -1;
      this.position.set(this.position.x + (multiplicator * 10 * deltaTime), this.position.y);
      this.scale.set(multiplicator * 0.5, this.scale.y);
    }

    if (Keyboard.isPressed('Space')) {
      if (this.curAnimation !== 'shoot' && !blockAnimation) {
        this.lastAnimation = this.curAnimation;
        this.curAnimation = 'shoot';

        const bone = this.skeleton.findBone('rear-upper-arm');
        const {x: additionalX, y: additionalY} = this.getDistanceFromBoneToRoot(bone);
        this.state.setAnimation(0, 'shoot', true);

        const mult = this.scale.x > 0 ? 1 : -1;
        game.findGameObjectInCurrentScene('ShootContainer').newShoot(
          this.position.x + additionalX * mult,
          this.position.y - additionalY,
          mult
        );

        setTimeout(() => {
          bone.rotation = -130;
        }, 5)
      }
    }

    if (Keyboard.isPressed('KeyW')) {
      if (this.curAnimation !== 'shoot' && !blockAnimation) {
        this.lastAnimation = this.curAnimation;
        this.curAnimation = 'jump';
        this.state.setAnimation(0, 'jump', true);
      }
    }

    if (!Keyboard.isSomePressed('KeyA', 'KeyD', 'KeyW', 'Space')) {
      if (this.curAnimation !== 'idle') {
        this.lastAnimation = this.curAnimation;
        this.curAnimation = 'idle';
        this.state.setAnimation(0, 'idle', true);
      }
    }
  }
}

export default Player;
