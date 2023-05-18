class KeyPress {
	constructor(key, callback) {
		this.keydownFunction = function (event) {
			console.log(event);
			console.log(event.code);
			console.log('키 "' + event.key + '" 눌리는중 키프레스객체');
			if (event.key === key) {
				callback();
			}
		};

		document.addEventListener('keydown', this.keydownFunction);
		// document.addEventListener("keydown", custom);
	}
}

export default KeyPress;
