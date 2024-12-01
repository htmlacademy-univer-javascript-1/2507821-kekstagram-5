import { getPhoto } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const pictures = Array.from({length: 25}, getPhoto());
const fragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  const img = newPicture.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  fragment.append(newPicture);
});

picturesContainer.append(fragment);
