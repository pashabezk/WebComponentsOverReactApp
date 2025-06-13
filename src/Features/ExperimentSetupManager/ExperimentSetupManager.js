class ExperimentSetupManager {
	/** Param that configures how much cards should be rendered */
	#cardsCount = 10;

	getCardsCount() {
		return this.#cardsCount;
	}

	setCardsCount(newValue) {
		if (Number.isSafeInteger(newValue)) {
			this.#cardsCount = newValue;
		}
	}
}

export const experimentSetupManager = new ExperimentSetupManager();
