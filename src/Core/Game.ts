import 'pixi-spine';
import { Application, IApplicationOptions } from "pixi.js";
import { IScene, Scene } from "./Scene";
import { setDeltaTime, setStartTime } from '../Manager/Time';
import GameObject from './GameObject';

export class Game extends Application {
  private scenes: Record<string, IScene> = {};
  private scene: Scene;

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

  addScene(scene: IScene) {
    this.scenes[scene.name] = scene;
  }

  findGameObjectInCurrentScene(name: string) {
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
      this.ticker.add((delta) => {
        setDeltaTime(delta);

        if (!this.scene.blockLoop) {
          this.scene.update();
        }
      })
    });
  }
}

export default Game;
