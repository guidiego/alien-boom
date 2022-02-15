import Game from "./Core/Game";
import MainScene from "./Scene/MainScene";

import { game, setGameInManager } from "./Manager/Game";


setGameInManager(
  new Game({
    width: window.innerWidth,
    height: window.innerHeight,
  })
);

game.addScene(MainScene);
game.startScene('MainScene');
