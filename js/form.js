import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const formWindow = form.querySelector('.img-upload__overlay');
const formWindowClose = form.querySelector('#upload-cancel');
const buttonUpload = form.querySelector('#upload-file');
const formTextFieldset = form.querySelector('.img-upload__text');

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    formWindowClose.click();
  }
};

const onInputKeydownEsc = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

const openLoadForm = () => {
  document.body.classList.add('modal-open');
  formWindow.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownEsc);
  formTextFieldset.addEventListener('keydown', onInputKeydownEsc);
};

const closeLoadForm = () => {
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
const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagRules = {
  startSymbol: '<br>хэш-тег должен начинанаться с символа #',
  allowedSymbols: `<br>Строка после решётки должна состоять из букв и чисел и не может
   содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации
    (тире, дефис, запятая и т. п.), эмодзи и т. д.`,
  minLength: '<br>хеш-тег не может состоять только из одной решётки',
  maxLength:
    '<br>максимальная длина одного хэш-тега 20 символов, включая решётку',
  limitAmount: '<br>Не более 5 хэштегов',
  duplicates: '<br>Хештеги не должны повторяться',
};

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  return (
    value === '' ||
    hashtags.every((hashtag) => hashtag.match(hashtagTemplate)) &&
    hashtags.length <= 5 &&
    new Set(hashtags).size === hashtags.length
  );
};

const validateDescription = (value) => value.length <= 140;

const getHashtagError = (value) => {
  const hashtags = value.split(' ');
  if (hashtags.length > 5) {
    return hashtagRules.limitAmount;
  } else if (new Set(hashtags).size !== hashtags.length) {
    return hashtagRules.duplicates;
  }

  const wrongHashtag = hashtags.find(
    (hashtag) => !hashtag.match(hashtagTemplate)
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
  '<br>Не более 140 символов'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    formWindowClose.click();
  }
});
