import { Application } from "pixi.js";

export let game;

export const setGameInManager = (_game: Application) => {
  game = _game;
}
