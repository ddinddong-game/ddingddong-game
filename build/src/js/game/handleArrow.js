import { isSolid, getKeyString } from './helper.js';
import { db, ref, set, remove, update } from '../firebase/firebase.js';
import { store } from '../game/store.js';
import { mapData } from '../game/mapData.js';

export function handleArrowPress(xChange = 0, yChange = 0) {
	const playersLists = store.getState().playerLists;
	const playerId = store.state.playerId;
	const playerRef = store.getState().playerRef;

	const newX = playersLists[playerId].x + xChange;
	const newY = playersLists[playerId].y + yChange;

	if (!isSolid(newX, newY, mapData)) {
		// move to the next space
		playersLists[playerId].x = newX;
		playersLists[playerId].y = newY;
		if (xChange === 1) {
			playersLists[playerId].direction = 'right';
		}
		if (xChange === -1) {
			playersLists[playerId].direction = 'left';
		}
		set(playerRef, playersLists[playerId]);

		attempGrabCoin(newX, newY);
	}
}

function attempGrabCoin(x, y) {
	const key = getKeyString(x, y);
	const playerId = store.state.playerId;
	const coins = store.getState().coins;
	const playerRef = store.getState().playerRef;
	const playersLists = store.getState().playerLists;

	if (coins[key]) {
		const coinRef = ref(db, `coins/${getKeyString(x, y)}`);
		remove(coinRef);
		update(playerRef, {
			coins: playersLists[playerId].coins + 1,
		});
	}
}
