const profileEditMdl = document.querySelector("#edit-profile-modal");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileExitBtn = profileEditMdl.querySelector("#profile__exit-button");
const profileNewPostMdl = document.querySelector("#new-post-modal");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileNewPostExitBtn = profileNewPostMdl.querySelector(
  "#new-post__exit-button"
);

profileEditBtn.addEventListener("click", function () {
  profileEditMdl.classList.add("modal_is-opened");
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
