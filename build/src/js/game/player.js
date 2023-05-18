import { ref, onValue, onChildAdded, onChildRemoved, db } from '../firebase/firebase.js';
import { score } from './score.js';

import { store } from './store.js';

export function setupPlayer(gameContainer) {
	store.setState({ allPlayersRef: ref(db, 'playerLists') });

	const allPlayersRef = store.getState().allPlayersRef;

	onValue(allPlayersRef, (snapshot) => {
		let players = snapshot.val() || {};
		store.setState({ playerLists: players });

		updatePlayerElements(store.getState().playerLists, store.getState().playerElements);
	});

	onChildAdded(allPlayersRef, (snapshot) => {
		const addedPlayer = snapshot.val();
		const characterElement = createPlayerElement(
			addedPlayer,
			store.getState().playerId,
			store.getState().playerElements,
		);

		gameContainer.appendChild(characterElement);
	});

	onChildRemoved(allPlayersRef, (snapshot) => {
		const removedKey = snapshot.val().id;
		const playerElements = store.getState().playerElements;
		gameContainer.removeChild(playerElements[removedKey]);
		delete playerElements[removedKey];
	});
}

function updatePlayerElements(playerLists, playerElements) {
	Object.keys(playerLists).forEach((key) => {
		const characterState = playerLists[key];
		const element = playerElements[key];
		score(characterState.coins);
		element.querySelector('.Character_coins').innerText = characterState.coins;
		element.setAttribute('data-direction', characterState.direction);
		const left = 16 * characterState.x + 'px';
		const top = 16 * characterState.y - 4 + 'px';
		element.style.transform = `translate3d(${left}, ${top}, 0)`;
	});
}

function createPlayerElement(addedPlayer, playerId, playerElements) {
	const characterElement = document.createElement('div');
	characterElement.classList.add('Character', 'grid-cell');
	if (addedPlayer.id === playerId) {
		characterElement.classList.add('you');
	}
	characterElement.innerHTML = `
    <div class="Character_shadow grid-cell"></div>
    <div class="Character_sprite grid-cell"></div>
    <div class="Character_name-container">
        <span class="Character_name"></span>
        <span class="Character_coins">0</span>
    </div>
    <div class="Character_you-arrow"></div>
  `;
	playerElements[addedPlayer.id] = characterElement;

	characterElement.querySelector('.Character_name').textContent = addedPlayer.name;
	characterElement.querySelector('.Character_coins').textContent = addedPlayer.coins;
	characterElement.setAttribute('data-direction', addedPlayer.direction);
	const left = 16 * addedPlayer.x + 'px';
	const top = 16 * addedPlayer.y - 4 + 'px';
	characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;

	return characterElement;
}
