import { getComment } from './comments.js';

const comment = getComment();
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const fragment = document.createDocumentFragment();
const commentTemplate = document.querySelector('#bigPictureComment').content;
const body = document.querySelector('body');

const fillPictureInformation = (picture) => {
  const pictureImg = picture.querySelector('.picture__img');
  const likesCount = picture.querySelector('.picture__likes').textContent;
  const commentsCount = picture.querySelector('.picture__comments').textContent;
  bigPicture.querySelector('.big-picture__img img').src = pictureImg.src;
  bigPicture.querySelector('.likes-count').textContent = likesCount;
  bigPicture.querySelector('.comments-count').textContent = commentsCount;
  for (let i = 0; i < Number.parseInt(commentsCount, 10); i++) {
    const newComment = comment();
    const clonedComment = commentTemplate.cloneNode(true);
    const clonedCommentImg = clonedComment.querySelector('img');
    const clonedCommentText = clonedComment.querySelector('p');
    clonedCommentImg.src = newComment.avatar;
    clonedCommentImg.alt = newComment.name;
    clonedCommentText.textContent = newComment.message;
    fragment.append(clonedComment);
  }
  bigPicture.querySelector('.social__comments').append(fragment);
  bigPicture.querySelector('.social__caption').textContent = pictureImg.alt;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const closeBigPicturePopup = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    body.removeEventListener('keydown', closeBigPicturePopup);
  }
};

const openBigPicturePopup = (miniature) => {
  bigPicture.classList.remove('hidden');
  fillPictureInformation(miniature);
  body.classList.add('modal-open');
  body.addEventListener('keydown', closeBigPicturePopup);
};

pictures.addEventListener('click', (evt) => {
  if (evt.target.parentElement.matches('a.picture')) {
    openBigPicturePopup(evt.target.parentElement);
  }
});
