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
];

const profileEditMdl = document.querySelector("#edit-profile-modal");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileExitBtn = profileEditMdl.querySelector("#profile__exit-button");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#modal__input_name");
const profileDescriptionInput = document.querySelector(
  "#modal__input_description"
);
const profileEditForm = document.querySelector("#edit-profile-form");
const profileNewPostMdl = document.querySelector("#new-post-modal");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileNewPostExitBtn = profileNewPostMdl.querySelector(
  "#new-post__exit-button"
);
const profileAddInput = document.querySelector("#modal__input_caption");
const profileLinkInput = document.querySelector("#modal__input_link");
const profileAddForm = document.querySelector("#profile-add-form");
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
  openModal(profileEditMdl);
  profileNameInput.value = profileNameEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
});

profileExitBtn.addEventListener("click", function () {
  closeModal(profileEditMdl);
});

profileAddBtn.addEventListener("click", function () {
  openModal(profileNewPostMdl);
});

profileNewPostExitBtn.addEventListener("click", function () {
  closeModal(profileNewPostMdl);
});
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileNameEl.textContent = profileNameInput.value;
  profileDescriptionEl.textContent = profileDescriptionInput.value;

  closeModal(profileEditMdl);
});

initialCards.forEach(function (card) {
  const newCardElement = getCardElement(card);
  cardList.prepend(newCardElement);
  // console.log(card.name);
  // console.log(card.link);
});
profileAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCardElement = getCardElement({
    name: profileAddInput.value,
    link: profileLinkInput.value,
  });
  cardList.prepend(newCardElement);

  closeModal(profileNewPostMdl);
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
  return cardElement;
}
