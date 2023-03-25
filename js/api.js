import { showAlert } from './util.js';

const getData = () =>
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .catch(() => showAlert('Не удалось загрузить данные с сервера. Попробуйте обновить страницу.'));

const sendData = () => {};

export { getData, sendData };
