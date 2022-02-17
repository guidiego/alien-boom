import Scene from "../Core/Scene";
import StartButton from "../GameObject/GUI/StartButton";

export class EntryScene extends Scene {
  constructor() {
    super();

    this.addGameObject(StartButton);
  }
};

export default EntryScene;
