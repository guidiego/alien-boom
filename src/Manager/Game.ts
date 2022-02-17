import Game from "../Core/Game";

export let game: Game;

export const setGameInManager = (_game: Game) => {
  game = _game;
}
