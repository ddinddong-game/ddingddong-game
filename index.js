import { readUserData, writeUserData } from './firebase.js';

(function () {
	console.log('실행');
	writeUserData('id1', '이름', 'gmail', './');
	readUserData('id1');
})(); // 앱이 부팅되자마자 실행되도록 할 즉시실행 함수
