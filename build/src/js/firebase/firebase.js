import firebaseConfig from './config.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import {
	getAuth,
	signInAnonymously,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import {
	getDatabase,
	ref,
	set,
	get,
	onDisconnect,
	onValue,
	onChildAdded,
	onChildRemoved,
	update,
	remove,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
	auth,
	db,
	signInAnonymously,
	onAuthStateChanged,
	ref,
	set,
	get,
	onDisconnect,
	onValue,
	onChildAdded,
	onChildRemoved,
	update,
	remove,
};
