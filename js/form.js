import { sendData } from './api.js';
import { createSlider, destroySlider } from './form-effects.js';
import { showSendError } from './form-messages.js';
import { isEscapeKey } from './util.js';

const HASHTAG_COUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Загружаю...',
};

const form = document.querySelector('.img-upload__form');
const formWindow = form.querySelector('.img-upload__overlay');
const formWindowClose = form.querySelector('#upload-cancel');
const buttonUpload = form.querySelector('#upload-file');
const formTextFieldset = form.querySelector('.img-upload__text');
const scaleInput = form.querySelector('.scale__control--value');
const formImage = form.querySelector('.img-upload__preview img');
const submitButton = form.querySelector('#upload-submit');
const fileField = document.querySelector('#upload-file');

fileField.addEventListener('change', () => {
  const file = fileField.files[0];
  formImage.src = URL.createObjectURL(file);
});

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt) && !document.querySelector('.error')) {
    evt.preventDefault();
    formWindowClose.click();
  }
};

const onInputKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.target.blur();
  }
};

const openLoadForm = () => {
  scaleInput.value = '100%';
  formImage.style.transform = 'scale(1.00)';
  formImage.className = 'effects__preview--none';
  formImage.style.removeProperty('filter');
  form.querySelector('.text__hashtags').value = '';
  form.querySelector('.text__description').value = '';
  createSlider();
  document.body.classList.add('modal-open');
  formWindow.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownEsc);
  formTextFieldset.addEventListener('keydown', onInputKeydownEsc);
};

const closeLoadForm = () => {
  document.querySelector('#upload-file').value = '';
  destroySlider();
  document.body.classList.remove('modal-open');
  formWindow.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  formTextFieldset.removeEventListener('keydown', onInputKeydownEsc);
};

buttonUpload.addEventListener('change', openLoadForm);
formWindowClose.addEventListener('click', closeLoadForm);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
});
const hashtagRules = {
  startSymbol: '<br>хэш-тег должен начинанаться с символа #',
  allowedSymbols: `<br>Строка после решётки должна состоять из букв и чисел и не может
   содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации
    (тире, дефис, запятая и т. п.), эмодзи и т. д.`,
  minLength: '<br>хеш-тег не может состоять только из одной решётки',
  maxLength:
    '<br>максимальная длина одного хэш-тега 20 символов, включая решётку',
  limitAmount: `<br>Не более ${HASHTAG_COUNT} хэштегов`,
  duplicates: '<br>Хештеги не должны повторяться',
};

const validateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  return (
    value === '' ||
    (hashtags.every((hashtag) => hashtag.match(HASHTAG_TEMPLATE)) &&
      hashtags.length <= HASHTAG_COUNT &&
      new Set(hashtags).size === hashtags.length)
  );
};

const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

const getHashtagError = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  if (hashtags.length > HASHTAG_COUNT) {
    return hashtagRules.limitAmount;
  } else if (new Set(hashtags).size !== hashtags.length) {
    return hashtagRules.duplicates;
  }

  const wrongHashtag = hashtags.find(
    (hashtag) => !hashtag.match(HASHTAG_TEMPLATE)
  );
  if (wrongHashtag[0] !== '#') {
    return hashtagRules.startSymbol;
  } else if (wrongHashtag.length === 1) {
    return hashtagRules.minLength;
  } else if (wrongHashtag.length > 20) {
    return hashtagRules.maxLength;
  }
  return hashtagRules.allowedSymbols;
};

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtag,
  getHashtagError
);
pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  `<br>Не более ${DESCRIPTION_MAX_LENGTH} символов`
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(showSendError)
        .finally(unblockSubmitButton);
    }
  });
};

export { setFormSubmit, closeLoadForm };
