import GameObject from "../../Core/GameObject";
import { Text, TextStyle } from "pixi.js";
import Keyboard from "../../Manager/Keyboard";
import { game } from "../../Manager/Game";

export class RetryButton extends GameObject<Text> {
  private going = false;
  constructor() {
    super(
      new Text(
        'Click "Space" To Retry',
        new TextStyle({
          fill: "white",
          fontFamily: "Impact",
          fontSize: 40,
          fontWeight: "bolder"
        })
      )
    )
  }

  start() {
    this.realObject.anchor.set(0.5);

    // const y = (innerHeight / 2) + (this.screenObj.height + 100);
    this.realObject.position.set(innerWidth / 2, innerHeight / 2 + 200);
  }

  update() {
    if (Keyboard.isPressed('Space') && !this.going) {
      this.going = true;
      game.callScene('MainScene');
    }
  }
};

export default RetryButton;
