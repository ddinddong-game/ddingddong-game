class KeyPress {
	constructor(key, callback) {
		this.keydownFunction = function (event) {
			if (event.key === key) {
				callback();
			}
		};

		document.addEventListener('keydown', this.keydownFunction);
	}
}

export default KeyPress;
