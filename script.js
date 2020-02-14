// REVIEW : Надо исправить -- обернуть в функцию.
// Перестаньте использовать глобальные переменные внутри классов и тогда IIFE будет работать как надо!

const cardContainer = document.querySelector('.places-list');
const cardsPopup = document.querySelector('.popup');
const addCardButton = document.querySelector('#cards-button');
const editPopup = document.querySelector('.popup-edit');
const editButton = editPopup.querySelector('#edit-button');
const mediaPopup = document.querySelector('.popup-media');
const mediaPopupImage = mediaPopup.querySelector('.popup__media-image');
const openEditForm = document.querySelector('.user-info__edit-button');
const cardForm = document.forms.new;
const editForm = document.forms.edit;
// const nameInput = document.querySelector('#input-name');
// const jobInput = document.querySelector('#input-job');
const nameError = document.querySelector('#error-name');
const jobError = document.querySelector('#error-job');
// const defaultName = document.querySelector('.user-info__name');
// const defaultJob = document.querySelector('.user-info__job');

const form1 = new FormValidator(cardForm);
const form2 = new FormValidator(editForm);
const popup = new Popup();
const userInfo = new UserInfo();
const addCardValidity = new FormValidator(cardForm);
const addEditValidity = new FormValidator(editForm);

const cardArray = [];
for (const element of initialCards) {
  cardArray.push(new Card(element));
}

const cardList = new CardList(cardContainer, cardArray);

cardList.render();
document.querySelector('.root').addEventListener('click', function(event) {
  const classList = event.target.classList;
  classList.forEach(className => {
    switch (className) {
      case 'place-card__delete-icon':
        new Card().remove(event.target);
        break;
      case 'place-card__like-icon':
        new Card().like(event.target);
        break;
    } 
  })
})
document.addEventListener('click', popup.open);
document.addEventListener('click', popup.close);
document.addEventListener('keydown', popup.close);
openEditForm.addEventListener('click', userInfo.setUserInfo);
document.addEventListener('invalid', (function () {
  return function (e) {
    //prevent the browser from showing default error bubble / hint
    e.preventDefault();
  };
})(), true);
cardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardObj = {
    name: document.getElementById('cards').querySelector('.popup__input_type_name').value,
    link: document.getElementById('cards').querySelector('.popup__input_type_link-url').value
  };
  cardForm.reset()
  cardList.addCard(new Card(cardObj).card);
  popup.close(event);
});
editForm.addEventListener('submit', userInfo.updateUserInfo);

// Подробный отчет в Review.md
