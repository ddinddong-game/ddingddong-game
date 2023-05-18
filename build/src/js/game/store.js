export const store = {
	state: {
		playerId: null,
		playerRef: null,
		players: {},

		playerInfo: {
			id: null,
			name: '이름',
			ready: false,
			direction: 'right',
			x: 1,
			y: 1,
			coins: 0,
		},
	},

	setState(newState) {
		if (newState.playerId !== undefined) {
			this.state.playerInfo.id = newState.playerId;
		}
		this.state = { ...this.state, ...newState };
	},

	getState() {
		return this.state;
	},
};
