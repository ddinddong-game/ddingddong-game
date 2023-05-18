let video;
let classifier;
let label = '';

let leftImages = 0;
let rightImages = 0;
let topImages = 0;
let downImages = 0;

function convertLabelToKeycode(labelString) {
	console.log(labelString);
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
	console.log('셋업 불림');
	video = document.getElementById('webcam');
	console.log(video);
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
}
function modelReady() {
	console.log('모델 레디');
}
function videoReady() {
	console.log('비디오 레디');
}

setUp();

function whileTraining(loss) {
	if (loss == null) {
		console.log(loss);
		document.querySelector('.player-ready').innerHTML = '준비완료!';
		document.querySelector('.player-ready').style.backgroundColor = '#00FF6E';
		document.querySelector('.player-ready').style.cursor = 'auto';
		classifier.classify(gotResults);
	} else {
		console.log(loss);
		document.querySelector('.player-ready').innerHTML = '준비중';
		document.querySelector('.player-ready').style.backgroundColor = 'white';
	}
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		label = results[0].label;
		// triggerKeyDownEvent(label);
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
		leftImages++;
		if (leftImages > 1) {
			setArrowDirectionState('left');
		}
	});

	//right button
	const rightButton = document.querySelector('.rightButton');
	rightButton.addEventListener('click', function () {
		classifier.addImage('right');
		rightImages++;
		if (rightImages > 1) {
			setArrowDirectionState('right');
		}
	});

	//top button
	const topButton = document.querySelector('.topButton');
	topButton.addEventListener('click', function () {
		classifier.addImage('top');
		topImages++;
		if (topImages > 1) {
			setArrowDirectionState('top');
		}
	});

	//down button
	const downButton = document.querySelector('.downButton');
	downButton.addEventListener('click', function () {
		classifier.addImage('down');
		downImages++;
		console.log(downImages);
		if (downImages > 1) {
			setArrowDirectionState('down');
		}
	});

	//train button/ready
	const playerReadyBtn = document.querySelector('.player-ready');
	playerReadyBtn.addEventListener('click', function () {
		classifier.train(whileTraining);
	});
}
setUpButtons();
