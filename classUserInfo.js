// REVIEW : Надо исправить
// Глобальные переменные внутри класса -- опять та же проблема.
// Но и сам класс не соответствует заданию:
// Класс для работы с данными пользователя. Экземпляр этого класса должен хранить
// в себе данные пользователя: имя и информацию о себе, а также отображать эту
// информацию на странице.

class UserInfo {

  setUserInfo() {
    const nameInput = document.querySelector('#input-name');
    const jobInput = document.querySelector('#input-job');
    const defaultName = document.querySelector('.user-info__name');
    const defaultJob = document.querySelector('.user-info__job');
    nameInput.value = defaultName.textContent;
    jobInput.value = defaultJob.textContent;
    defaultName.textContent = nameInput.value;
    defaultJob.textContent = jobInput.value;
  }

  updateUserInfo(event) {
    const nameInput = document.querySelector('#input-name');
    const jobInput = document.querySelector('#input-job');
    const defaultName = document.querySelector('.user-info__name');
    const defaultJob = document.querySelector('.user-info__job');
    defaultName.textContent = nameInput.value;
    defaultJob.textContent = jobInput.value;
    event.preventDefault();
    popup.close(event);
  }
}