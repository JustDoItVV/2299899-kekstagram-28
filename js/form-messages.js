import { isEscapeKey } from './util.js';

const onMessageClickOrEscape = (messageType) => (evt) => {
  const elementClose = document.querySelector(`.${messageType}__button`);
  if (isEscapeKey(evt) || evt.target.matches(`.${messageType}`)) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
    }
    elementClose.click();
  }
};

const onMessageHandlerSuccess = onMessageClickOrEscape('success');
const onMessageHandlerError = onMessageClickOrEscape('error');

const closeSendSuccess = () => {
  const elementSuccess = document.querySelector('.success');
  const elementSuccessClose = elementSuccess.querySelector('.success__button');
  elementSuccessClose.removeEventListener('click', closeSendSuccess);
  document.removeEventListener('click', onMessageHandlerSuccess);
  document.removeEventListener('keydown', onMessageHandlerSuccess);
  elementSuccess.remove();
};

const closeSendError = () => {
  const elementError = document.querySelector('.error');
  const elementErrorClose = elementError.querySelector('.error__button');
  elementErrorClose.removeEventListener('click', closeSendError);
  document.removeEventListener('click', onMessageHandlerError);
  document.removeEventListener('keydown', onMessageHandlerError);
  elementError.remove();
};

const showSendSuccess = () => {
  const templateSuccess = document
    .querySelector('#success')
    .content.cloneNode(true);
  document.body.appendChild(templateSuccess);

  const elementSuccess = document.querySelector('.success');
  const elementSuccessClose = elementSuccess.querySelector('.success__button');
  elementSuccessClose.addEventListener('click', closeSendSuccess);
  document.addEventListener('click', onMessageHandlerSuccess);
  document.addEventListener('keydown', onMessageHandlerSuccess);
};

const showSendError = () => {
  const templateError = document
    .querySelector('#error')
    .content.cloneNode(true);
  document.body.appendChild(templateError);

  const elementError = document.querySelector('.error');
  const elementErrorClose = elementError.querySelector('.error__button');
  elementErrorClose.addEventListener('click', closeSendError);
  document.addEventListener('click', onMessageHandlerError);
  document.addEventListener('keydown', onMessageHandlerError);
};

export { showSendError, showSendSuccess };
