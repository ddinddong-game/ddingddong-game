import { db, update, ref, get } from './firebase/firebase.js';
import { store } from './game/store.js';

let video;
let classifier;
let label = '';

// let leftImages = 0;
// let rightImages = 0;
// let topImages = 0;
// let downImages = 0;

function convertLabelToKeycode(labelString) {
	// console.log(labelString);
	if (labelString === 'left') {
		return 'ArrowLeft';
	} else if (labelString === 'right') {
		return 'ArrowRight';
	} else if (labelString === 'top') {
		return 'ArrowUp';
	} else if (labelString === 'down') {
		return 'ArrowDown';
	}
}

function setUp() {
	// console.log('셋업 불림');
	video = document.getElementById('webcam');
	// console.log(video);
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((stream) => {
			video.srcObject = stream;
			video.onloadedmetadata = function () {
				video.play();
				draw();
			};
		})
		.catch((err) => {
			console.log(`An error occurred: ${err}`);
			console.log(`An error occurred: ${err.message}`);
		});

	const featureExtractor = ml5.featureExtractor('MobileNet', loadReady);
	classifier = featureExtractor.classification(video, 4, modelReady);
	const options = { numLabels: 4 };
	classifier = featureExtractor.classification(video, options, videoReady);
}

function draw() {
	requestAnimationFrame(draw);
}

function loadReady() {
	console.log('MobileNet 레디');
	// 이거 확인되면 화살표학습버튼이 눌릴수있음
}
function modelReady() {
	// console.log('모델 레디');
}
function videoReady() {
	// console.log('비디오 레디');
}

setUp();

console.log(store.state.playerId);
console.log(ref(db, `playerLists/${store.state.playerId}`));
console.log('상태찍어서 아이디 확인중');

function whileTraining(loss) {
	if (loss == null) {
		// console.log(loss);
		document.querySelector('.player-ready').innerHTML = '준비완료!';
		document.querySelector('.player-ready').style.backgroundColor = '#00FF6E';
		document.querySelector('.player-ready').style.cursor = 'auto';
		classifier.classify(gotResults);
		//상태 ready만들기

		const playerRef = ref(db, `playerLists/${store.state.playerId}`);
		update(playerRef, {
			ready: true,
		})
			.then(() => {
				console.log('Update successful');
			})
			.catch((error) => {
				console.error('Update failed: ', error);
			});
	} else {
		// console.log(loss);
		document.querySelector('.player-ready').innerHTML = '학습중';
		document.querySelector('.player-ready').style.backgroundColor = 'white';
	}
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		label = results[0].label;
		triggerKeyDownEvent(label);
		classifier.classify(gotResults);
	}
}
function triggerKeyDownEvent(label) {
	const makeKeycode = convertLabelToKeycode(label);
	const event = new KeyboardEvent('keydown', { key: makeKeycode });
	document.dispatchEvent(event);
}

function setArrowDirectionState(directionBtn) {
	document.querySelector(`.ready-${directionBtn}`).style.backgroundColor = '#00FF6E';
}

function setUpButtons() {
	//left button
	const leftButton = document.querySelector('.leftButton');
	leftButton.addEventListener('click', function () {
		classifier.addImage('left');
		// leftImages++;
		store.state.savedImages.left += 1;

		if (store.state.savedImages.left > 1) {
			setArrowDirectionState('left');
		}
	});

	//right button
	const rightButton = document.querySelector('.rightButton');
	rightButton.addEventListener('click', function () {
		classifier.addImage('right');
		// rightImages++;
		store.state.savedImages.right += 1;

		if (store.state.savedImages.right > 1) {
			setArrowDirectionState('right');
		}
	});

	//top button
	const topButton = document.querySelector('.topButton');
	topButton.addEventListener('click', function () {
		classifier.addImage('top');
		// topImages++;
		store.state.savedImages.top += 1;

		if (store.state.savedImages.top > 1) {
			setArrowDirectionState('top');
		}
	});

	//down button
	const downButton = document.querySelector('.downButton');
	downButton.addEventListener('click', function () {
		classifier.addImage('down');
		store.state.savedImages.down += 1;

		if (store.state.savedImages.down > 1) {
			setArrowDirectionState('down');
		}
	});

	//train button/start
	const playerReadyBtn = document.querySelector('.player-ready');
	playerReadyBtn.addEventListener('click', function () {
		if (!checkAllDirectionImage()) {
			alert('모든 방향의 동작을 등록해주세요');
		} else {
			classifier.train(whileTraining);
		}
	});
}
setUpButtons();

const playerStartBtn = document.querySelector('.player-start');
playerStartBtn.addEventListener('click', function () {
	if (!checkAllPlayerReady()) {
		alert('누군가... 준비가 덜 됐나 봅니다...');
	} else {
		alert('타이머를 가져옵시다');
		//외부에서 타이머 트리거 함수 가져오기
	}
});

function checkAllDirectionImage() {
	let savedImages = store.state.savedImages;

	for (let key in savedImages) {
		if (savedImages[key] < 2) {
			return false;
		}
	}

	return true;
}

function checkAllPlayerReady() {
	const playersRef = ref(db, 'playerLists');
	let isAllReady = false;
	get(playersRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const players = snapshot.val();
				let allReady = true;

				// players 객체의 모든 키(즉, playerId)에 대해 반복합니다.
				for (let playerId in players) {
					// 만약 해당 playerId의 ready 속성값이 false라면,
					if (!players[playerId].ready) {
						allReady = false;
						break;
					}
				}
				console.log(allReady);
				if (allReady) {
					isAllReady = true;
					console.log('이즈올레디 트루바꾸기');
					return isAllReady;
				} else {
					isAllReady = false;
					console.log('이즈올레디 펄스바꾸기');
					return isAllReady;
				}
			} else {
				console.log('No data available');
			}
		})
		.catch((error) => {
			console.error(error);
		});
}
