import { db, ref, onValue, get, update } from '../firebase/firebase.js';

export function setupPlayerTimerButton(timerRef) {
	const timerDisplay = document.querySelector('.timer-count');

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
					timerDisplay.textContent = 0;
					clearInterval(timerInterval);
				}
			}, 1000);
		}
	});
}

function resetAllPlayerCoins() {
	const allPlayersRef = ref(db, 'playerLists');

	get(allPlayersRef).then((snapshot) => {
		const allPlayers = snapshot.val() || {};
		for (const playerId in allPlayers) {
			const playerRef = ref(db, `playerLists/${playerId}`);
			update(playerRef, { coins: 0 });
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
	console.log(`Top scorer is ${topScorerName} with ${topScore} coins`);
	return topScorerName;
}
