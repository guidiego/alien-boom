import 'pixi-spine';

import { Application, IApplicationOptions, Ticker, TickerCallback } from "pixi.js";
import { IScene, Scene } from "./Scene";
import { setDeltaTime, setStartTime } from '../Manager/Time';
import GameObject from './GameObject';

export class Game extends Application {
  private scenes: Record<string, IScene> = {};
  private scene: Scene;
  private ticketFunction: TickerCallback<any>;

  constructor(props: IApplicationOptions) {
    super(props);
    document.body.append(this.view);

    window.addEventListener('resize', () => {
      this.renderer.resize(
        window.innerWidth,
        window.innerHeight,
      )
    });

  }

  get currentScene() {
    return this.scene;
  }

  stop() {
    this.ticker.destroy();
  }

  callScene(sceneName: string) {
    this.ticker.remove(this.ticketFunction);
    this.scene.parent.removeChild(this.scene);
    this.startScene(sceneName);
  }

  addScene(scene: IScene) {
    this.scenes[scene.name] = scene;
  }

  findGameObjectInCurrentScene<T>(name: string): T {
    return this.scene.findGameObject(name);
  }

  addGameObjectInCurrentScene(name: string, go: GameObject) {
    this.scene.addOnScene(name, go);
  }

  startScene(sceneName: string) {
    const Scene = this.scenes[sceneName];
    this.scene = new Scene();

    this.scene.setupStart();
    this.loader.load((_, resources) => {
      this.scene.setupEnd(resources);
      this.stage.addChild(this.scene);
      this.scene.start();

      setStartTime()
      this.ticketFunction = (delta) => {
        setDeltaTime(delta);

        if (!this.scene.blockLoop) {
          this.scene.update();
        }
      };

      this.ticker.add(this.ticketFunction)
    });
  }
}

export default Game;
