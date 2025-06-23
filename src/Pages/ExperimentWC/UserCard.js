/** Collection of UserCard element attribute names */
export const UserCardAttribute = {
	name: "name",
	surname: "surname",
	imgSrc: "img-src",
};

/** Collection of UserCard event names */
export const UserCardEvent = {
	subscribe: "subscribe",
};

export class UserCard extends HTMLElement {
	#name = "";
	#surname = "";
	#imgSrc = "";

	#subscribeButton;
	#nameParagraph;
	#userImage;

	/** Sets attribute change tracking */
	static get observedAttributes() {
		return [UserCardAttribute.name, UserCardAttribute.surname, UserCardAttribute.imgSrc];
	}

	/** Called when an element is added to the DOM */
	connectedCallback() {
		this.#name = this.getAttribute(UserCardAttribute.name) || "";
		this.#surname = this.getAttribute(UserCardAttribute.surname) || "";
		this.#imgSrc = this.getAttribute(UserCardAttribute.imgSrc) || "";

		this.#render();
		this.#subscribeButton.addEventListener("click", () => this.#onSubscribe());
	}

	/** Called when one of the attributes specified in observedAttributes changes */
	attributeChangedCallback(attrName, oldValue, newValue) {
		switch (attrName) {
			case UserCardAttribute.name:
				this.#name = newValue;
				this.#updateNameParagraph();
				break;
			case UserCardAttribute.surname:
				this.#surname = newValue;
				this.#updateNameParagraph();
				break;
			case UserCardAttribute.imgSrc:
				this.#imgSrc = newValue;
				this.#updateImageSrc();
				break;
		}
	}

	#render() {
		// create elements
		const userCardDiv = document.createElement("div");
		userCardDiv.classList.add("user-card");

		this.#userImage = document.createElement("img");
		this.#userImage.classList.add("user-image");
		this.#userImage.setAttribute("alt", "user photo");
		this.#updateImageSrc();

		const userInfoDiv = document.createElement("div");
		userInfoDiv.classList.add("user-info");

		this.#nameParagraph = document.createElement("p");
		this.#nameParagraph.classList.add("user-name");
		this.#updateNameParagraph();

		this.#subscribeButton = document.createElement("button");
		this.#subscribeButton.textContent = "Подписаться";
		this.#subscribeButton.classList.add("action-button");

		// add elements to DOM
		this.appendChild(userCardDiv);
		userCardDiv.appendChild(this.#userImage);
		userCardDiv.appendChild(userInfoDiv);
		userInfoDiv.appendChild(this.#nameParagraph);
		userInfoDiv.appendChild(this.#subscribeButton);
	}

	#updateNameParagraph() {
		if (this.#nameParagraph) {
			this.#nameParagraph.textContent = this.#name + " " + this.#surname;
		}
	}

	#updateImageSrc() {
		if (this.#userImage) {
			this.#userImage.src = this.#imgSrc;
		}
	}

	#onSubscribe() {
		const details = {name: this.#name, surname: this.#surname};
		this.dispatchEvent(new CustomEvent(UserCardEvent.subscribe, {detail: details}));
	}
}
