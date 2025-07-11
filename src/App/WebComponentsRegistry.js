import {UserCard} from "../Pages/ExperimentWC/UserCard.js";

const componentsToDefine = [
	{tag: "user-card", class: UserCard},
];

/** Function that register user custom elements used in project */
export const registerWebComponents = () => {
	componentsToDefine.forEach((component) => {
		if (!customElements.get(component.tag)) {
			customElements.define(component.tag, component.class);
		}
	});
};
