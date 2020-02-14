// REVIEW : Надо исправить
// Прочитайте задание:
// setSubmitButtonState, чтобы делать кнопку сабмита активной и неактивной.
// Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет.
// Сейчас у вас метод checkInputValidity отрабатывает валидацию полей, визуализирует ошибки но
// не делает главного -- не управляет кнопкой сабмита.
// setSubmitButtonState должна, например, вызываться по результатам работы checkInputValidity
// и банально включать или выключать кнопку
// setSubmitButtonState дублирует отчасти функционал метода валидации
class FormValidator {
  constructor(element) {
    this.element = element;
    // setEventListeners();

  }
  
  
  checkInputValidity(event) {
    const errorElement = event.target.nextElementSibling;
    const activateError = () => errorElement.style.display = 'block';
    // REVIEW : Можно лучше
    // так плохо код читается, лучше сделать
    // const resetError = () => {
    //   errorElement.style.display = 'none';
    //   errorElement.textContent = '';
    // }
    const inputs = Array.from(event.target.form.elements);
    const isValid = !inputs.map(elem => elem.checkValidity()).filter(input => !input).length;

    const resetError = () => {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    } 

    if (event.target.validity.valueMissing) {
      errorElement.textContent = 'Это обязательное поле'
      activateError();
      return;
    }

    if (event.target.validity.tooShort) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
      activateError();
      return;
    }

    if (event.target.validity.typeMismatch) {
      errorElement.textContent = 'Здесь должна быть ссылка';
      activateError();
      return;
    }

    if (event.target.validity.valid) {
      resetError();
      return;
    }
    this.setSubmitButtonState(isValid);
  }

  setSubmitButtonState(isValid) {
    const popupWindow = event.target.closest('.popup__form');
    const button = popupWindow.querySelector('.popup__button');
    // А если вам передадут форму с тремя полями? Переписывать класс?
    // debugger
    
    if (isValid) {
      console.log('true')
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
      return
    } 
    if (!isValid) {
      console.log('false')
      button.classList.add('popup__button_disabled');
      return
    }
  }

  setEventListeners() {
    // REVIEW : Надо исправить
    // Некорректная логика -- обработка событий происходит асинхронно а не по порядку,
    // поэтому нет нельязя вызыват валидацию полей и кнопки через события
    this.element.addEventListener('input', this.checkInputValidity);
    this.element.addEventListener('input', this.setSubmitButtonState);
  }
}
