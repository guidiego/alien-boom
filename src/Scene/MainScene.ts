import Scene from "../Core/Scene";
import Map from "../GameObject/Map";
import Enemy from "../GameObject/Enemy";
import Hud from "../GameObject/GUI/Hud";
import Laser from "../GameObject/Laser";
import Player from "../GameObject/Player";
import KillBar from "../GameObject/GUI/KillBar";
import EnemySpawn from "../GameObject/EnemySpawn";
import HealthBar from "../GameObject/GUI/HealthBar";
import TimeCounter from "../GameObject/GUI/TimeCounter";
import ShootContainer from "../GameObject/ShootContainer";

export class MainScene extends Scene {
  constructor() {
    super();

    this.loadGameObjectAsset(HealthBar);
    this.loadGameObjectAsset(TimeCounter);
    this.loadGameObjectAsset(KillBar)
    this.loadGameObjectAsset(Enemy);
    this.loadGameObjectAsset(Laser);

    this.addGameObject(Map);
    this.addGameObject(Player);
    this.addGameObject(ShootContainer);
    this.addGameObject(EnemySpawn);
    this.addGameObject(Hud);
  }
};

export default MainScene;
