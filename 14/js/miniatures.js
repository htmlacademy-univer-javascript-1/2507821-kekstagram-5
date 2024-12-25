const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');


const showPhotos = (photos) => {
  // Удаление старых фото
  const fragment = document.createDocumentFragment();
  picturesContainer.querySelectorAll('a.picture').forEach((link) => link.remove());
  // Добавление новых
  photos.forEach(({id, url, description, likes, comments}) => {
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
};


export {showPhotos};
