import "./index.css";
import { enableValidation, settings } from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f0ef6635-c105-4d3a-a000-6f501e464748", // Replace with your actual token
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    avatarImage.src = data.avatar;

    profileNameEl.textContent = data.name;
    profileDescriptionEl.textContent = data.about;
  })
  .catch(console.error);

api
  .getAppInfo()
  .then((cards) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardList.append(cardElement);
    });
  })

  .catch(console.error);

// log the error to the console

const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileExitBtn = profileEditModal.querySelector("#profile__exit-button");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#modal__input_name");
const profileDescriptionInput = document.querySelector(
  "#modal__input_description"
);
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNewPostModal = document.querySelector("#new-post-modal");
const profileAddBtn = document.querySelector(".profile__add-button");
const buttonElement = profileNewPostModal.querySelector(".modal__save-button");
const profileNewPostExitBtn = profileNewPostModal.querySelector(
  "#new-post__exit-button"
);

const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarBtn = document.querySelector(".profile__avatar-button");
const editAvatarForm = editAvatarModal.querySelector("#edit-avatar-form");
const editAvatarCloseBtn = editAvatarModal.querySelector(
  "#avatar__exit-button"
);
const avatarImage = document.querySelector(".profile__avatar");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");
const profileDeleteModal = document.querySelector("#profile-delete-modal");
const profileDeleteForm = profileDeleteModal.querySelector(
  "#profile-delete-form"
);

const profileAddInput = document.querySelector("#modal__input_caption");
const profileLinkInput = document.querySelector("#modal__input_link");
const profileAddForm = document.querySelector("#profile-add-form");

const previewModal = document.querySelector("#modal__card-preview");
const previewCloseBtn = previewModal.querySelector(".modal__preview-close");
const previewImg = previewModal.querySelector(".modal__preview-img");
const previewCaption = previewModal.querySelector(".modal__preview-caption");
const currentModal = document.querySelector(".modal_is-opened");

const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");

const cardList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeOnEscape);
  modal.addEventListener("click", closeOnOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeOnEscape);
  modal.removeEventListener("click", closeOnOverlay);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    let currentModal = document.querySelector(".modal_is-opened");
    closeModal(currentModal);
  }
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleCardDelete(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  console.log(cardId);
  openModal(profileDeleteModal);
}

function handleCardDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      if (selectedCard) {
        selectedCard.remove();
      }
      closeModal(profileDeleteModal);
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  api
    .editAvatarInfo(editAvatarInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;

      evt.target.reset();
      closeModal(editAvatarModal);
    })
    .catch(console.error);
}

profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  profileNameInput.value = profileNameEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
});

profileExitBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

profileAddBtn.addEventListener("click", function () {
  openModal(profileNewPostModal);
});

profileNewPostExitBtn.addEventListener("click", function () {
  closeModal(profileNewPostModal);
});

profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = profileNameInput.value;
      profileDescriptionEl.textContent = profileDescriptionInput.value;

      closeModal(profileEditModal);
    })
    .catch(console.error);
});

profileAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const name = profileAddInput.value;
  const link = profileLinkInput.value;

  api.postNewCards(name, link).then((data) => {
    const newCardElement = getCardElement(data);
    cardList.prepend(newCardElement);

    evt.target.reset();
    disableButton(buttonElement, settings);
  });
  closeModal(profileNewPostModal).catch(console.error);
});

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

editAvatarForm.addEventListener("submit", handleAvatarSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-button-active");
  });
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", (evt) =>
    handleCardDelete(cardElement, data._id)
  );

  cardImage.addEventListener("click", function () {
    previewImg.src = data.link;
    previewImg.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

profileDeleteForm.addEventListener("submit", handleCardDeleteSubmit);

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

enableValidation(settings);
