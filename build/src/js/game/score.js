export function score(coins) {
	console.log(coins);
	document.querySelector('.player-score').innerText = coins * 100;
}

export function renderScoreBoardLists(name) {
	const characterElement = document.createElement('li');
	characterElement.classList.add('character-score-list');

	characterElement.innerHTML = `
  <div class="character-arrow"></div>
  <p class="score-character-name">${name}</p>
  <p class="character-score">0</p>
  `;
	document.querySelector('.score-board-bg').appendChild(characterElement);
}
