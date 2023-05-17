// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
	getDatabase,
	ref,
	set,
	onValue,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCJH9MYUjeAfJ-i5cNcc5k3vTiJlTi2wJw',
	authDomain: 'ddingddong-game.firebaseapp.com',
	databaseURL: 'https://ddingddong-game-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'ddingddong-game',
	storageBucket: 'ddingddong-game.appspot.com',
	messagingSenderId: '360917976342',
	appId: '1:360917976342:web:1863d5e56d8e1a9414fc37',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// 쓰기
export function writeUserData(userId, name, email, imageUrl) {
	set(ref(database, `users/${userId}`), {
		username: name,
		email,
		profile_picture: imageUrl,
	});
}

// 읽기
export function readUserData(userId) {
	const userCountRef = ref(database, `users/${userId}`);
	onValue(userCountRef, (snapshot) => {
		const data = snapshot.val();
		console.log(data);
	});
}
