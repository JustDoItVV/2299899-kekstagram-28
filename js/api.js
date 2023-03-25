import { showAlert } from './util.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .catch(() => showAlert('Данные на сервере не найдены или сервер недоступен'));

const sendData = () => {};

export { getData, sendData };
