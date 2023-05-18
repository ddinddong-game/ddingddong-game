export const store = {
	state: {
		allPlayersRef: null,
		playerRef: null,
		playerId: null,
		playerLists: {}, // players를 playerLists로 이름 바꿈

		playerElements: {},

		playerInfo: {
			id: null,
			name: '남세를 꾸짖는 띵똥',
			ready: false,
			direction: 'right',
			x: null,
			y: null,
			coins: 0,
		},
	},

	setState(newState) {
		this.state = { ...this.state, ...newState };
	},

	getState() {
		return this.state;
	},
};
