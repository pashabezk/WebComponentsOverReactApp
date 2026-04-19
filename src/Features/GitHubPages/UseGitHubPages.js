import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTER_BASENAME, RouterPath} from "../../Shared/Constants/RouterConstants.js";
import {SessionStorageKey} from "../../Shared/Constants/SessionStorageConstant.js";

/**
 * Checks redirect path in session storage after redirect from 404 page
 * and navigates if it exists
 */
export const useGitHubPages = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const ghPagesRedirect = sessionStorage.getItem(SessionStorageKey.ghPagesRedirect);
		sessionStorage.removeItem(SessionStorageKey.ghPagesRedirect);
		if (ghPagesRedirect && ghPagesRedirect !== location.href) {
			const [, redirect] = ghPagesRedirect.split(ROUTER_BASENAME);
			navigate(redirect ?? RouterPath.Main);
		}
	}, [navigate]);
};
