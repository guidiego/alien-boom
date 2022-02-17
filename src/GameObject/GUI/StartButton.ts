import GameObject from "../../Core/GameObject";
import { Text, TextStyle } from "pixi.js";
import Keyboard from "../../Manager/Keyboard";
import { game } from "../../Manager/Game";

export class StartButton extends GameObject<Text> {
  private going = false;
  constructor() {
    super(
      new Text(
        'Click "Space" To Start',
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
    this.realObject.position.set(innerWidth / 2, innerHeight / 2)
  }

  update() {
    if (Keyboard.isPressed('Space') && !this.going) {
      this.going = true;
      game.callScene('MainScene');
    }
  }
};

export default StartButton;
