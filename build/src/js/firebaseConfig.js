import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';

import {
	getDatabase,
	ref,
	set,
	onValue,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env.API_KEY);

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
