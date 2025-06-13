export const UserCardEvent = {
	subscribe: "subscribe",
};

export class UserCardEditable extends HTMLElement {
	#name = "";
	#surname = "";
	#imgSrc = "";

	#subscribeButton;
	#nameParagraph;
	#userImage;

	/** Устанавливает отслеживание изменения атрибутов */
	static get observedAttributes() {
		return ["name", "surname", "img-src"];
	}

	/** Вызывается при добавлении компонента в DOM */
	connectedCallback() {
		this.#name = this.getAttribute("name") || "";
		this.#surname = this.getAttribute("surname") || "";
		this.#imgSrc = this.getAttribute("img-src") || "assets/profile-user.png";

		this.render();
		this.#subscribeButton.addEventListener("click", () => this.onSubscribe());
	}

	render() {
		// Создаём элементы
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

		// Добавляем элементы в DOM
		this.appendChild(userCardDiv);
		userCardDiv.appendChild(this.#userImage);
		userCardDiv.appendChild(userInfoDiv);
		userInfoDiv.appendChild(this.#nameParagraph);
		userInfoDiv.appendChild(this.#subscribeButton);
	}

	/** Вызывается при изменении одного из аттрибутов, указанных в observedAttributes */
	attributeChangedCallback(attrName, oldValue, newValue) {
		switch (attrName) {
			case "name":
				this.#name = newValue;
				this.#updateNameParagraph();
				break;
			case "surname":
				this.#surname = newValue;
				this.#updateNameParagraph();
				break;
			case "imgSrc":
				this.#imgSrc = newValue;
				this.#updateImageSrc();
				break;
		}
	}

	onSubscribe() {
		const details = {name: this.#name, surname: this.#surname};
		this.dispatchEvent(new CustomEvent(UserCardEvent.subscribe, {detail: details}));
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
}
