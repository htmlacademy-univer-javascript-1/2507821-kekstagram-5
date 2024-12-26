import { downloadImages } from './requests.js';
import { showPhotos } from './miniatures.js';
import { debounce, getRandomInteger } from './utils.js';

const filterButtons = document.querySelectorAll('.img-filters button');
let currentFilter = 'default';
const filterList = {
  'filter-default': 'default',
  'filter-random': 'random',
  'filter-discussed': 'discussed'
};

const photos = await downloadImages();

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

const debouncedShowPhotos = debounce(() => showPhotos(getFilteredPhotos(photos, currentFilter)), 500);

filterButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    filterButtons.forEach((btn) => (btn === evt.target) ? btn.classList.add('img-filters__button--active') : btn.classList.remove('img-filters__button--active'));
    currentFilter = filterList[evt.target.id];
    debouncedShowPhotos();
  });
});


if (photos) {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}
showPhotos(getFilteredPhotos(photos, currentFilter));


export default photos;
