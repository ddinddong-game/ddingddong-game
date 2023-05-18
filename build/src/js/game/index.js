import {
	auth,
	signInAnonymously,
	onAuthStateChanged,
	db,
	ref,
	set,
	get,
	onDisconnect,
	onValue,
	onChildAdded,
	onChildRemoved,
	update,
	remove,
} from '../firebase/firebase.js';

import { store } from './store.js';
import { initGame } from './initGame.js';
import { getRandomSafeSpot } from './helper.js';

(async function () {
	onAuthStateChanged(auth, (user) => {
		const { x, y } = getRandomSafeSpot();

		if (user) {
			store.setState({
				playerId: user.uid,
				playerRef: ref(db, `playerLists/${user.uid}`),
				playerInfo: {
					...store.state.playerInfo,
					id: user.uid,
					x,
					y,
				},
			});
			set(store.getState().playerRef, store.getState().playerInfo);

			onDisconnect(store.getState().playerRef)
				.remove()
				.catch((err) => {
					if (err) console.log('could not establish onDisconnect event', err);
				});

			initGame();
		} else {
			// 로그아웃
		}
	});

	try {
		await signInAnonymously(auth);
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		console.log(errorCode, errorMessage);
	}
})();
