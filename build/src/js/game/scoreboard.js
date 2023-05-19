export function updateScoreboard(playerLists) {
	const scoreboardElement = document.querySelector('.score-board-bg');
	scoreboardElement.innerHTML = '';

	Object.keys(playerLists).forEach((playerId) => {
		const player = playerLists[playerId];
		const playerScoreElement = createScoreboardElement(player.name, player.coins);
		scoreboardElement.appendChild(playerScoreElement);
	});
}

export function createScoreboardElement(name, coins) {
	const playerScoreElement = document.createElement('li');
	playerScoreElement.classList.add('character-score-list');
	playerScoreElement.innerHTML = `
  <div class="character-arrow"></div>
  <p class="score-character-name">${name}</p>
  <p class="character-score">${coins * 100}</p>
  `;
	return playerScoreElement;
}
