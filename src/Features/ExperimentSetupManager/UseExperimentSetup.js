import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {SearchQueryParams} from "../../Shared/Constants/SearchQueryConstants.js";
import {experimentSetupManager} from "./ExperimentSetupManager.js";

/**
 * Hook for reading experiments parameters from search params
 * @return {{cardsCount: number}}
 */
export const useExperimentSetup = () => {
	const [searchParams] = useSearchParams();

	const cardCountFromSP = parseInt(searchParams.get(SearchQueryParams.InitialCardsCount));
	const cardsCount = Number.isSafeInteger(cardCountFromSP) ? cardCountFromSP : experimentSetupManager.getCardsCount();

	// effect to save new values to manager
	useEffect(() => {
		if (cardsCount !== experimentSetupManager.getCardsCount()) {
			experimentSetupManager.setCardsCount(cardsCount);
		}
	}, []);

	return {cardsCount};
};
