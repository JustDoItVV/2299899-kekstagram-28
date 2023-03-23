// eslint-disable-next-line no-redeclare
/* global noUiSlider:readonly */
import { isEscapeKey } from './util.js';

const EFFECTS = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    ste: 0.1,
    units: '',
  },
};

const form = document.querySelector('.img-upload__form');
const formWindow = form.querySelector('.img-upload__overlay');
const formWindowClose = form.querySelector('#upload-cancel');
const buttonUpload = form.querySelector('#upload-file');
const formTextFieldset = form.querySelector('.img-upload__text');
const buttonScaleSmaller = form.querySelector('.scale__control--smaller');
const buttonScaleBigger = form.querySelector('.scale__control--bigger');
const scaleInput = form.querySelector('.scale__control--value');
const formImage = form.querySelector('.img-upload__preview img');
const effects = form.querySelector('.effects__list');
const effectSlider = form.querySelector('.effect-level__slider');
const effectSliderFieldset = form.querySelector('.img-upload__effect-level');
const effectInput = form.querySelector('.effect-level__value');

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
  scaleInput.value = '100%';
  formImage.style.transform = 'scale(1.00)';
  formImage.className = 'effects__preview--none';
  formImage.style.removeProperty('filter');
  effectSliderFieldset.classList.add('hidden');
  document.body.classList.add('modal-open');
  formWindow.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydownEsc);
  formTextFieldset.addEventListener('keydown', onInputKeydownEsc);
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

const closeLoadForm = () => {
  document.body.classList.remove('modal-open');
  formWindow.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  formTextFieldset.removeEventListener('keydown', onInputKeydownEsc);
  effectSlider.noUiSlider.destroy();
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
    (hashtags.every((hashtag) => hashtag.match(hashtagTemplate)) &&
      hashtags.length <= 5 &&
      new Set(hashtags).size === hashtags.length)
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

buttonScaleBigger.addEventListener('click', () => {
  const scale = parseInt(scaleInput.value, 10);
  if (scale <= 75) {
    formImage.style.transform = `scale(${(scale + 25) * 0.01})`;
    scaleInput.value = `${scale + 25}%`;
  }
});

buttonScaleSmaller.addEventListener('click', () => {
  const scale = parseInt(scaleInput.value, 10);
  if (scale >= 50) {
    formImage.style.transform = `scale(${(scale - 25) * 0.01})`;
    scaleInput.value = `${scale - 25}%`;
  }
});

effects.addEventListener('click', (evt) => {
  const previewThumbnail = evt.target.closest('.effects__item');
  if (previewThumbnail) {
    const effectRadio = previewThumbnail.querySelector('input');
    formImage.className = `effects__preview--${effectRadio.value}`;
    const effectFilter = EFFECTS[effectRadio.value].filter;
    const effectMin = EFFECTS[effectRadio.value].min;
    const effectMax = EFFECTS[effectRadio.value].max;
    const effectStart = EFFECTS[effectRadio.value].start;
    const effectStep = EFFECTS[effectRadio.value].step;
    const effectUnits = EFFECTS[effectRadio.value].units;
    effectInput.value = `${effectMax}${effectUnits}`;
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: effectMin,
        max: effectMax,
      },
      start: effectStart,
      step: effectStep,
    });
    effectSlider.noUiSlider.set(effectMax);
    if (effectRadio.value === 'none') {
      formImage.style.removeProperty('filter');
      effectSliderFieldset.classList.add('hidden');
    } else {
      effectSliderFieldset.classList.remove('hidden');
      effectSlider.noUiSlider.on('update', () => {
        if (effectRadio !== 'none') {
          const sliderValue = effectSlider.noUiSlider.get();
          const inputValue = `${effectFilter}(${sliderValue}${effectUnits})`;
          effectInput.value = inputValue;
          formImage.style.filter = inputValue;
        }
      });
    }
  }
});
