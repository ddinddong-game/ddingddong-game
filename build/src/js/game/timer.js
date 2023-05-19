import { db, ref, onValue, get, update } from '../firebase/firebase.js';
import { resetAllPlayerCoins } from './coin.js';

export function setupPlayerTimerButton(timerRef) {
	const timerDisplay = document.querySelector('.timer-count');
	const playerScore = document.querySelector('.player-score');

	let timerStart = null;
	let timerInterval = null;

	// Setting up the listener for timer
	onValue(timerRef, (snapshot) => {
		timerStart = snapshot.val();
		if (timerStart) {
			if (timerInterval) {
				clearInterval(timerInterval);
			}
			timerInterval = setInterval(() => {
				const timeLeft = 60 - Math.floor((Date.now() - timerStart) / 1000);
				if (timeLeft >= 0) {
					timerDisplay.textContent = timeLeft;
				} else {
					findTopScorePlayer();
					resetAllPlayerCoins();
					playerScore.textContent = 0;
					timerDisplay.textContent = 0;
					clearInterval(timerInterval);
				}
			}, 1000);
		}
	});
}

function findTopScorePlayer() {
	const allPlayersRef = ref(db, 'playerLists');
	let topScorerName = '';
	let topScore = -1;

	onValue(allPlayersRef, (snapshot) => {
		const allPlayers = snapshot.val() || {};
		for (const playerId in allPlayers) {
			const player = allPlayers[playerId];
			if (player.coins > topScore) {
				topScore = player.coins;
				topScorerName = player.name;
			}
		}
	});

	console.log(`Top scorer is ${topScorerName} with ${topScore * 100} coins`);
	renderWinner(topScorerName, topScore);
	return topScorerName;
}

function renderWinner(topScorerName, topScore) {
	const winnerElement = document.querySelector('.victory-text');
	winnerElement.innerHTML = `
	<p class="victory-text-yellow">승리자! ${topScorerName}가 ${topScore}만큼 행복해합니다</p>
	<p class="victory-text-green">승리자! ${topScorerName}가 ${topScore}만큼 행복해합니다</p>
	<p class="victory-text-pink">승리자! ${topScorerName}가 ${topScore}만큼 행복해합니다</p>
  `;
	winnerElement.style.display = 'block';
}
