export const store = {
	state: {
		allPlayersRef: null,
		playerRef: null,
		playerId: null,
		playerLists: {}, // players를 playerLists로 이름 바꿈
		playerElements: {},

		allCoinsRef: null,
		coins: {},
		coinElements: {},

		playerInfo: {
			id: null,
			name: '남세를 꾸짖는 띵똥',
			ready: false,
			direction: 'right',
			x: null,
			y: null,
			coins: 0,
		},

		savedImages: {
			left: 0,
			right: 0,
			top: 0,
			down: 0,
		},
	},

	setState(newState) {
		this.state = { ...this.state, ...newState };
	},

	getState() {
		return this.state;
	},
};
