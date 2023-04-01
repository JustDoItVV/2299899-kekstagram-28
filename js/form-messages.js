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

const ClickKeyHandlers = {
  onSuccess: onMessageClickOrEscape('success'),
  onError: onMessageClickOrEscape('error'),
};

const closeSendMessage = (messageType, handler) => () => {
  const element = document.querySelector(`.${messageType}`);
  const elementClose = element.querySelector(`.${messageType}__button`);
  elementClose.removeEventListener('click', closeSendMessage);
  document.removeEventListener('click', handler);
  document.removeEventListener('keydown', handler);
  element.remove();
};

const CloseHandlers = {
  onSuccess: closeSendMessage('success', ClickKeyHandlers.onSuccess),
  onError: closeSendMessage('error', ClickKeyHandlers.onError),
};

const showSendMessage = (messageType, handlerClose, handlerOn) => () => {
  const template = document
    .querySelector(`#${messageType}`)
    .content.cloneNode(true);
  document.body.appendChild(template);
  const element = document.querySelector(`.${messageType}`);
  const elementClose = element.querySelector(`.${messageType}__button`);
  elementClose.addEventListener('click', handlerClose);
  document.addEventListener('click', handlerOn);
  document.addEventListener('keydown', handlerOn);
};

const showSendSuccess = showSendMessage(
  'success',
  CloseHandlers.onSuccess,
  ClickKeyHandlers.onSuccess
);
const showSendError = showSendMessage(
  'error',
  CloseHandlers.onError,
  ClickKeyHandlers.onError
);

export { showSendError, showSendSuccess };
