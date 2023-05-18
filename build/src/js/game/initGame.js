import { setupPlayer } from './player.js';

export function initGame() {
	const $gameContainer = document.querySelector('.game-container');

	setupPlayer($gameContainer);
}
