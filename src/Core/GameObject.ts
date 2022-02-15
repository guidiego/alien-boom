export interface IGameObject {
  new(...args: any[]): GameObject;
  setup?(): void;
  dataProp: string;
  assetHolder: any;
}

export class GameObject<T = any> {
  static dataProp = '';
  static assetHolder = {};
  static preFab = false;

  protected screenObj: T = null;

  constructor(screenObj: T) {
    this.screenObj = screenObj;
  }

  get blockLoop () {
    return false;
  }

  get realObject() {
    return this.screenObj;
  }

  get bounds() {
    return {
      x: [0, 0],
      y: [0, 0],
    }
  }

  start() {

  }

  update() {

  }
}

export default GameObject;
