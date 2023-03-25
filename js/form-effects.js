const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;

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
const formImage = form.querySelector('.img-upload__preview img');
const scaleInput = form.querySelector('.scale__control--value');
const buttonScaleSmaller = form.querySelector('.scale__control--smaller');
const buttonScaleBigger = form.querySelector('.scale__control--bigger');
const effects = form.querySelector('.effects__list');
const effectInput = form.querySelector('.effect-level__value');
const effectSlider = form.querySelector('.effect-level__slider');
const effectSliderFieldset = form.querySelector('.img-upload__effect-level');

const createSlider = () => {
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
  effectSliderFieldset.classList.add('hidden');
};

buttonScaleBigger.addEventListener('click', () => {
  const scale = parseInt(scaleInput.value, 10);
  if (scale + SCALE_STEP <= SCALE_MAX) {
    formImage.style.transform = `scale(${(scale + SCALE_STEP) * 0.01})`;
    scaleInput.value = `${scale + SCALE_STEP}%`;
  }
});

buttonScaleSmaller.addEventListener('click', () => {
  const scale = parseInt(scaleInput.value, 10);
  if (scale - SCALE_STEP >= SCALE_MIN) {
    formImage.style.transform = `scale(${(scale - SCALE_STEP) * 0.01})`;
    scaleInput.value = `${scale - SCALE_STEP}%`;
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
    effectInput.value = effectMax;
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
          effectInput.value = sliderValue;
          formImage.style.filter = `${effectFilter}(${sliderValue}${effectUnits})`;
        }
      });
    }
  }
});

const destroySlider = () => effectSlider.noUiSlider.destroy();

export { createSlider, destroySlider };
