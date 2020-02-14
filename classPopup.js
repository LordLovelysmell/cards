// REVIEW : Надо исправить
// Все, к сожалению, опять на глобальных переменных, их нужно передавать в класс
// Хорошо что вы постарались сделать один класс попапа для всех форм и зума,
// но постаратесь его чуть разгрузить по функциональности, чтобы он не занимался настройкой
// полей форм, может быть лучше это вынести в отдельный класс для форм, например.
class Popup {
  open(event) {
    // REVIEW : Надо исправить
    // Здесь стоит заводить локальные методы для открытия и зкарытия окна
    // заведите метод класса togglePopup и в нем переключайте класс popup_is-opened
    // У вас сейчас по сути функционал дублируется с close
    function openPopup(element) {
      element.classList.add('popup_is-opened');
    }

    if (event.target.classList.contains('user-info__button')) {
      openPopup(cardsPopup);
      // REVIEW : Можно лучше
      // Вы постоянно прикаждом открытии попапа добавляете новые слушатели
      // Но не снимаете их при закрытии, что не совсем корректно
      // Это касается всех трех вариантов попапа
      // А нужно один раз при инициализации объекта класса
      addCardValidity.setEventListeners();
      return;
    }

    if (event.target.classList.contains('user-info__edit-button')) {
      openPopup(editPopup);
      editButton.removeAttribute('disabled');
      editButton.classList.remove('popup__button_disabled');
      nameError.style.display = 'none';
      nameError.textContent = '';
      jobError.style.display = 'none';
      jobError.textContent = '';
      addEditValidity.setEventListeners();
      return;
    }

    if (event.target.classList.contains('place-card__image')) {
      openPopup(mediaPopup);
      const getImageStyle = event.target.getAttribute('style');
      
      const linkFromImageStyle = getImageStyle.substring(23).slice(0, -3);
      mediaPopupImage.setAttribute('src', linkFromImageStyle);
    
      return
    }
  }

  close(event) {
    // REVIEW : Надо исправить -- см. выше
    function closePopup(element) {
      element.classList.remove('popup_is-opened');
    }
    // REVIEW : Можно лучше
    // Возможно стоит внутри класса завести переменную this.currentPopupContent
    // (значение задается в методе open)
    // в которой и будет то содержимое, которое сейчас у вас в cardsPopup и ему подобных
    // и тогда можно будет повесить обработчик на кнопку закрытия, и закрывать this.currentPopupContent
    // без перебора всех попапов
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      closePopup(cardsPopup);
      closePopup(editPopup);
      closePopup(mediaPopup);
    }
    // REVIEW : Можно лучше
    // Так нельзя, совмещать сабмит и выход по Esc -- сабмит на сервер может быть неудачным, и тогда
    // попап должен остаться открытым с сообщением об ошибке (например)
    // А Esc именно закрывает окно, поэтому совмещать их нельзя никак

    // И кстати, сейчас у вас даже если попап не открыт, но нажимается Esc -- каждый раз
    // этот кусок кода выполняется, что крайне неоптимально
    if (event.keyCode === 27 || event.type === 'submit') {
      closePopup(cardsPopup);
      closePopup(editPopup);
      closePopup(mediaPopup);
    }
  }
}