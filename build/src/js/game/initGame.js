import { setupPlayer } from './player.js';
// import { setupCoin } from './coin.js';
import KeyPress from './KeyPress.js';
import { handleArrowPress } from './handleArrow.js';

export function initGame(name) {
	new KeyPress('ArrowUp', () => handleArrowPress(0, -1));
	new KeyPress('ArrowDown', () => handleArrowPress(0, 1));
	new KeyPress('ArrowLeft', () => handleArrowPress(-1, 0));
	new KeyPress('ArrowRight', () => handleArrowPress(1, 0));

	const $gameContainer = document.querySelector('.game-container');
	const $playerName = document.querySelector('.player-name');

	$playerName.textContent = name;
	setupPlayer($gameContainer);
	// setupCoin($gameContainer);
}
