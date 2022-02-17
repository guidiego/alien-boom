import Game from "./Core/Game";
import MainScene from "./Scene/MainScene";
import EntryScene from "./Scene/EntryScene";

import { game, setGameInManager } from "./Manager/Game";
import DeadScene from "./Scene/DeadScene";


setGameInManager(
  new Game({
    width: window.innerWidth,
    height: window.innerHeight,
  })
);

game.addScene(MainScene);
game.addScene(EntryScene);
game.addScene(DeadScene);

game.startScene('EntryScene');
