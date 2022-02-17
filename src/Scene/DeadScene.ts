import Scene from "../Core/Scene";
import { Container, Text, TextStyle } from "pixi.js";
import RetryButton from "../GameObject/GUI/RetryButton";
import { totalKill } from "../Manager/Score";
import { getFormatedCounter } from "../Manager/Time";

export class DeadScene extends Scene {
  constructor() {
    super();

    const textStyle = new TextStyle({
      fill: "white",
      fontFamily: "Impact",
      fontSize: 36,
    });

    const numberStyle = new TextStyle({
      fill: "white",
      fontFamily: "Impact",
      fontSize: 60,
      fontWeight: "bolder"
    })

    const timeLabel = new Text('You resist', textStyle);
    const scoreLabel = new Text(`Number of aliens killed`, textStyle);
    const timeValue = new Text(getFormatedCounter(), numberStyle);
    const scoreValue = new Text(totalKill.toString(), numberStyle);
    const centerBox = new Container();
    let offset = innerHeight / 2;

    [
      scoreValue,
      scoreLabel,
      timeValue,
      timeLabel,
    ].forEach((text, index, arr) => {
      const additionalOffset = index === 2 ? 40 : 0;

      text.anchor.set(0.5);
      text.position.set(innerWidth / 2, offset - additionalOffset);
      offset -= text.height + additionalOffset;

      centerBox.addChild(text);
    })

    this.addChild(centerBox);
    this.addGameObject(RetryButton);
  }
};

export default DeadScene;
