import photoes from './main.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photoes.forEach(({id, url, description, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('a').id = id;
  const img = newPicture.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  fragment.append(newPicture);
});

picturesContainer.append(fragment);
