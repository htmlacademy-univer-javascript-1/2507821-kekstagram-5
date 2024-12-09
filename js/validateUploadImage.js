const inputPhotoLoader = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseBtn = overlay.querySelector('.img-upload__cancel');
const hashTags = overlay.querySelector('.text__hashtags');
const comment = overlay.querySelector('.text__description');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');

const scalerSmaller = document.querySelector('.scale__control--smaller');
const scalerBigger = document.querySelector('.scale__control--bigger');
const scalerValue = document.querySelector('.scale__control--value');
const scalerStep = 25;
const picturePreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderEffects = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');


const onKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onChangeScale = () => {
  let value = /\d+/.exec(scalerValue.value);
  value = (Number.parseInt(value, 10) < 100) ? Number.parseFloat(`0.${value}`, 10) : 1;
  picturePreview.style.transform = `scale(${value})`;
};

const closeOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  inputPhotoLoader.value = '';
  hashTags.textContent = '';
  comment.textContent = '';
  comment.removeEventListener('keydown', onKeyDown);
  scalerValue.removeEventListener('change', onChangeScale);
};

const onClickPopupClose = () => {
  closeOverlay();
  overlayCloseBtn.removeEventListener('click', onClickPopupClose);
};

const onKeyDownPopupClose = (evt) => {
  if (evt.key === 'Escape') {
    closeOverlay();
    body.removeEventListener('keydown', onKeyDownPopupClose);
  }
};

const onScaleInc = () => {
  if (Number.parseInt(scalerValue.value, 10) + scalerStep <= 100) {
    const newValue = Number.parseInt(scalerValue.value, 10) + scalerStep;
    scalerValue.value = `${newValue}%`;
    scalerValue.dispatchEvent(new Event('change'));
  }
};

const onScaleDec = () => {
  if (Number.parseInt(scalerValue.value, 10) - scalerStep >= 25) {
    const newValue = Number.parseInt(scalerValue.value, 10) - scalerStep;
    scalerValue.value = `${newValue}%`;
    scalerValue.dispatchEvent(new Event('change'));
  }
};

inputPhotoLoader.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  comment.addEventListener('keydown', onKeyDown);
  overlayCloseBtn.addEventListener('click', onClickPopupClose);
  body.addEventListener('keydown', onKeyDownPopupClose);
  scalerBigger.addEventListener('click', onScaleInc);
  scalerSmaller.addEventListener('click', onScaleDec);
  scalerValue.addEventListener('change', onChangeScale);
});

// Валидация
const validateHashTags = (value) => {
  const regExp = /^#[a-zа-яё0-9]{1,19}$/i;
  if (value) {
    value = value.trim().split(/\s+/);
    const valueLower = value.map((item) => item.toLowerCase());
    if (value.length <= 5) {
      const hashTagsValid = value.every((hash) => regExp.test(hash));
      const hashTagsUnique = value.length === value.filter((item, index) => valueLower.indexOf(item.toLowerCase()) === index).length;
      return hashTagsValid && hashTagsUnique;
    }
    return false;
  }
  return true;
};

const pristine = new Pristine(form);
pristine.addValidator(hashTags, validateHashTags);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// Слайдер
let currentEffect = 'none';
sliderContainer.style.display = 'none';

const sliderOptions = {
  none: {
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1
    },
    func: 'grayscale($)',
    units: ''
  },
  chrome: {
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1
    },
    func: 'grayscale($)',
    units: ''
  },
  sepia: {
    settings: {
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
      start: 1
    },
    func: 'sepia($)',
    units: ''
  },
  marvin: {
    settings: {
      range: {
        min: 0,
        max: 100
      },
      step: 1,
      start: 100
    },
    func: 'invert($)',
    units: '%'
  },
  phobos: {
    settings: {
      range: {
        min: 0,
        max: 3
      },
      step: 0.1,
      start: 3
    },
    func: 'blur($)',
    units: 'px'
  },
  heat: {
    settings: {
      range: {
        min: 1,
        max: 3
      },
      step: 0.1,
      start: 3
    },
    func: 'brightness($)',
    units: ''
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 10,
    max: 100
  },
  start: 100,
  step: 25
});

sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  if (currentEffect !== 'none') {
    picturePreview.style.filter = sliderOptions[currentEffect].func.replace('$', sliderValue.value + sliderOptions[currentEffect].units);
  } else {
    picturePreview.style.filter = '';
  }
});

const onChangeEffect = (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    sliderElement.noUiSlider.updateOptions(sliderOptions[currentEffect].settings);
    if (currentEffect !== 'none') {
      sliderContainer.style.display = '';
    } else {
      sliderContainer.style.display = 'none';
    }
  }
};


sliderEffects.addEventListener('change', onChangeEffect);