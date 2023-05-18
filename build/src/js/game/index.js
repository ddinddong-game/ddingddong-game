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

(async function () {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			store.setState({
				playerId: user.uid,
				playerRef: ref(db, `players/${user.uid}`),
			});

			set(store.getState().playerRef, store.getState().playerInfo);

			onDisconnect(store.getState().playerRef)
				.remove()
				.catch((err) => {
					if (err) console.log('could not establish onDisconnect event', err);
				});
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
var auth = 'good';
