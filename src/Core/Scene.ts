import { Application, Container, LoaderResource } from "pixi.js";
import { GameObject, IGameObject } from "./GameObject";
export interface IScene {
  new(...args: any[]): Scene;
}

export class Scene extends Container {
  protected goAssets: IGameObject[] = [];
  protected goClasses: IGameObject[] = [];
  protected goIntances: Record<string, GameObject> = {};
  protected app: Application;

  get blockLoop() {
    return Object.values(this.goIntances).some((go) => go.blockLoop);
  }

  loadGameObjectAsset(go: IGameObject) {
    this.goAssets.push(go);
  }

  addGameObject(go: IGameObject) {
    this.goClasses.push(go);
  }

  start() {
    Object.values(this.goIntances).forEach((go) => go.start());
  }

  update() {
    Object.values(this.goIntances).forEach((go) => go.update());
  }

  setupEnd(resources: LoaderResource) {
    this.goAssets.forEach((GO) => {
      GO.assetHolder = resources[GO.name][GO.dataProp];
    });

    this.goClasses.forEach((GO) => {
      const props = GO.setup ? resources[GO.name][GO.dataProp] : null;
      const obj = new GO(props);
      this.goIntances[GO.name] = obj;
      this.addChild(obj.realObject);
    });
  }

  findGameObject(name) {
    return this.goIntances[name];
  }


  addOnScene(name: string, go: GameObject) {
    this.goIntances[name] = go;
    this.addChild(go.realObject);
    this.start();
  }

  setupStart() {
    this.goClasses.forEach((a) => a.setup && a.setup());
    this.goAssets.forEach((a) => a.setup && a.setup());
  }
}

export default Scene;
