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

profileEditBtn.addEventListener("click", function () {
  profileEditMdl.classList.add("modal_is-opened");
  profileNameInput.value = profileNameEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
});

profileExitBtn.addEventListener("click", function () {
  profileEditMdl.classList.remove("modal_is-opened");
});

profileAddBtn.addEventListener("click", function () {
  profileNewPostMdl.classList.add("modal_is-opened");
});

profileNewPostExitBtn.addEventListener("click", function () {
  profileNewPostMdl.classList.remove("modal_is-opened");
});
profileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileNameEl.textContent = profileNameInput.value;
  profileDescriptionEl.textContent = profileDescriptionInput.value;

  profileEditMdl.classList.remove("modal_is-opened");
});

initialCards.forEach(function (card) {
  console.log(card.name);
  console.log(card.link);
});
profileAddForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  // profileAddEl.textContent = profileAddInput.value;
  // profileLinkEl.textContent = profileLinkInput.value;

  profileNewPostMdl.classList.remove("modal_is-opened");
});
