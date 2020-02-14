// REVIEW : Надо исправить
// В задании четко сказано: Это класс, создающий карточку. Добавьте ему методы
// constructor, like и remove. И ещё один — create. Он будет создавать DOM-элемент карточки.
// Ваша реализация класса Card не возвращает собранную карточку, а добавляет собранную карточку в DOM

class Card {
  constructor(data) {
    // REVIEW : Можно лучше
    // В конструкторе лучше инициализировать переменные, но не запускать методы
    // работы с DOM или добавлять обработчки, это лучше вынести в отдельый метод,
    // т.к. в случае наследования этого класса другим код в конструкторе все равно выполняется,
    // что может быть неудобно, а вот метод класса можно переопределить.
    if (data) {
      this.card = this.create(data);
    }
    // REVIEW : Надо исправить
    // Для обработки событий на карточках необходимо испоьзовать делегирование
    // Вы "вешаете" обработчики к каждой карточке
    // this.likeIcon = this.cardElement.querySelector('.place-card__like-icon');
    // this.cardElement
    //   .querySelector('.place-card__like-icon')
    //   .addEventListener('click', this.like);
  }

  like(card) {
    card.classList.toggle('place-card__like-icon_liked');
  }

  remove(card) {
    card.closest('.place-card').remove();
  }

  create(data) {
  
    const card = document.createElement('div');
    // REVIEW : Можно лучше
    // Используйте один тип кавычек '' или ""
    card.classList.add('place-card');
    card.insertAdjacentHTML('beforeend', `
        <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
        </div>`);
        
    card.querySelector('.place-card__name').textContent = data.name;
    card.querySelector('.place-card__image').style.backgroundImage = `url(${data.link})`;

    return card;
    // REVIEW : Надо исправить
    // Нельзя использовать глобальные переменные или методы внутри класса, он теряет независимость
    // и его будет невозможно использовать в другом проекте не перетащив весь кож из текущего
    // Необходимые переменные и методы нужно передавать в конструктор или метод класса,
    // Использовать глобальную cardContainer здесь -- нехорошая практика, этого следует избегать
  }
}

