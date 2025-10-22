const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Landscape",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

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
const profileNewPostExitBtn = profileNewPostModal.querySelector(
  "#new-post__exit-button"
);
const profileAddInput = document.querySelector("#modal__input_caption");
const profileLinkInput = document.querySelector("#modal__input_link");
const profileAddForm = document.querySelector("#profile-add-form");

const previewModal = document.querySelector("#modal__card-preview");
const previewCloseBtn = previewModal.querySelector(".modal__preview-close");
const previewImg = previewModal.querySelector(".modal__preview-img");
const previewCaption = previewModal.querySelector(".modal__preview-caption");

const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");

const cardList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
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
  profileNameEl.textContent = profileNameInput.value;
  profileDescriptionEl.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
});

initialCards.forEach(function (card) {
  const newCardElement = getCardElement(card);
  cardList.prepend(newCardElement);
});
profileAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCardElement = getCardElement({
    name: profileAddInput.value,
    link: profileLinkInput.value,
  });
  cardList.prepend(newCardElement);

  closeModal(profileNewPostModal);
  this.reset(profileAddForm);
  evt.target.removeEventListener(profileAddForm);
});

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
  cardDeleteBtn.addEventListener("click", function () {
    cardDeleteBtn.closest(".card").remove();
  });

  cardImage.addEventListener("click", function () {
    previewImg.src = data.link;
    previewImg.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});
