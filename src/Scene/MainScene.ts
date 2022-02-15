import Scene from "../Core/Scene";
import Enemy from "../GameObject/Enemy";
import EnemySpawn from "../GameObject/EnemySpawn";
import Hud from "../GameObject/Hud";
import Laser from "../GameObject/Laser";
import Player from "../GameObject/Player";
import ShootContainer from "../GameObject/ShootContainer";

export class MainScene extends Scene {
  constructor() {
    super();
    this.addGameObject(Player);
    this.addGameObject(ShootContainer);
    this.addGameObject(EnemySpawn);
    this.addGameObject(Hud);

    this.loadGameObjectAsset(Enemy);
    this.loadGameObjectAsset(Laser);
  }
};

export default MainScene;
