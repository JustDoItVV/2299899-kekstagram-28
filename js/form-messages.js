import { isEscapeKey } from './util.js';

const setOnMessageClick = (messageType) => (evt) => {
  const elementClose = document.querySelector(`.${messageType}__button`);
  if (evt.target.matches(`.${messageType}`)) {
    elementClose.click();
  }
};

const setOnMessageEscape = (messageType) => (evt) => {
  const elementClose = document.querySelector(`.${messageType}__button`);
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    elementClose.click();
  }
};

const onMessageInteraction = {
  click: {
    success: setOnMessageClick('success'),
    error: setOnMessageClick('error'),
  },
  keydown: {
    success: setOnMessageEscape('success'),
    error: setOnMessageEscape('error'),
  },
};

const setOnSendSendMessageClose =
  (messageType, onMessageClick, onMessageEscape) => () => {
    const element = document.querySelector(`.${messageType}`);
    const elementClose = element.querySelector(`.${messageType}__button`);
    elementClose.removeEventListener('click', setOnSendSendMessageClose);
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEscape);
    element.remove();
  };

const onSendMessageClose = {
  success: setOnSendSendMessageClose(
    'success',
    onMessageInteraction.click.success,
    onMessageInteraction.keydown.success
  ),
  error: setOnSendSendMessageClose(
    'error',
    onMessageInteraction.click.error,
    onMessageInteraction.keydown.error
  ),
};

const showSendMessage =
  (messageType, onMessageClose, onMessageClick, onMessageEscape) => () => {
    const template = document
      .querySelector(`#${messageType}`)
      .content.cloneNode(true);
    document.body.appendChild(template);
    const element = document.querySelector(`.${messageType}`);
    const elementClose = element.querySelector(`.${messageType}__button`);
    elementClose.addEventListener('click', onMessageClose);
    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscape);
  };

const showSendSuccess = showSendMessage(
  'success',
  onSendMessageClose.success,
  onMessageInteraction.click.success,
  onMessageInteraction.keydown.success
);
const showSendError = showSendMessage(
  'error',
  onSendMessageClose.error,
  onMessageInteraction.click.error,
  onMessageInteraction.keydown.error
);

export { showSendError, showSendSuccess };
