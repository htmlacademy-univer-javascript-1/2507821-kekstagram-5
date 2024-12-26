import { showPhotos } from './miniatures.js';
import { addPhotoEventListeners } from './openBigPicture.js';

const filterButtons = document.querySelectorAll('.img-filters button');
let currentFilter = 'default';
let photos;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const filterList = {
  'filter-default': 'default',
  'filter-random': 'random',
  'filter-discussed': 'discussed'
};

const filterRandomly = (array, picturesNumber = 10, upperBorder = 24) => {
  const previousIds = [];
  for (let i = 0; i < picturesNumber; i++) {
    let currentValue = getRandomInteger(1, upperBorder);
    while (previousIds.includes(currentValue)) {
      currentValue = getRandomInteger(1, upperBorder);
    }
    previousIds.push(currentValue);
  }
  return array.filter((element) => previousIds.includes(element.id));
};

const getFilteredPhotos = (photosToFilter, filter = 'none') => {
  if (filter === 'discussed') {
    return photosToFilter.slice().sort((a, b) => b.comments.length - a.comments.length);
  } else if (filter === 'random') {
    return filterRandomly(photosToFilter);
  }
  return photosToFilter;
};

const addFilterFunctions = (showPhoto) => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      filterButtons.forEach((btn) => (btn === evt.target) ? btn.classList.add('img-filters__button--active') : btn.classList.remove('img-filters__button--active'));
      currentFilter = filterList[evt.target.id];
      showPhoto();
    });
  });
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const photoSetterInit = (renderFunction) => {
  const render = renderFunction;
  return (value) => {
    photos = value;
    addPhotoEventListeners(photos);
    render();
  };
};

const debouncedShowPhotos = debounce(() => showPhotos(getFilteredPhotos(photos, currentFilter)), 500);
const photoSetter = photoSetterInit(debouncedShowPhotos);


export {getRandomInteger, debounce, throttle, addFilterFunctions, photoSetter, debouncedShowPhotos};
