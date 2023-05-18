import { setupPlayer } from './player.js';
import { setupCoin } from './coin.js';

export function initGame(name) {
	const $gameContainer = document.querySelector('.game-container');
	const $playerName = document.querySelector('.player-name');

	$playerName.textContent = name;
	setupPlayer($gameContainer);
	setupCoin($gameContainer);
}
