import { body } from './main.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('#picture-cancel');
const commentsLoaderBtn = bigPicture.querySelector('.comments-loader');
let commentsLoaderBtnLink = '';
const fragment = document.createDocumentFragment();
const commentTemplate = document.querySelector('#bigPictureComment').content;

const fillPictureInformation = (picture, pictureInfo) => {
  commentsLoaderBtn.classList.remove('hidden');
  const pictureImg = picture.querySelector('.picture__img');
  const likesCount = picture.querySelector('.picture__likes').textContent;
  const commentsCount = picture.querySelector('.picture__comments').textContent;
  const comments = pictureInfo.comments;
  bigPicture.querySelector('.big-picture__img img').src = pictureImg.src;
  bigPicture.querySelector('.likes-count').textContent = likesCount;
  bigPicture.querySelector('.comments-count').textContent = commentsCount;

  let currentCommentsCount = 0;
  let startSliceIndex = 0;
  let endSliceIndex = 5;
  const loadComments = () => {
    const currentComments = comments.slice(startSliceIndex, endSliceIndex);
    currentComments.forEach((comment) => {
      const clonedComment = commentTemplate.cloneNode(true);
      const clonedCommentImg = clonedComment.querySelector('img');
      const clonedCommentText = clonedComment.querySelector('p');
      clonedCommentImg.src = comment.avatar;
      clonedCommentImg.alt = comment.name;
      clonedCommentText.textContent = comment.message;
      fragment.append(clonedComment);
    });
    if (!currentCommentsCount) {
      currentCommentsCount = currentComments.length;
    } else {
      currentCommentsCount += currentComments.length;
    }
    if (comments.length === currentCommentsCount) {
      commentsLoaderBtn.classList.add('hidden');
    }
    bigPicture.querySelector('.social__comments').append(fragment);
    bigPicture.querySelector('.current-comments-count').textContent = currentCommentsCount;

    startSliceIndex += 5;
    endSliceIndex += 5;
  };

  commentsLoaderBtn.addEventListener('click', loadComments);
  commentsLoaderBtnLink = loadComments;
  loadComments(startSliceIndex, endSliceIndex);
  bigPicture.querySelector('.social__comments').append(fragment);
  bigPicture.querySelector('.social__caption').textContent = pictureImg.alt;
};

const closeBigPicturePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeBigPicturePopupEsc);
    bigPicture.querySelector('.social__comments').innerHTML = '';
    commentsLoaderBtn.removeEventListener('click', commentsLoaderBtnLink);
  }
};

const closeBigPicturePopupClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseBtn.removeEventListener('keydown', closeBigPicturePopupClick);
  bigPicture.querySelector('.social__comments').innerHTML = '';
  commentsLoaderBtn.removeEventListener('click', commentsLoaderBtnLink);
  document.removeEventListener('keydown', closeBigPicturePopupEsc);
};

const openBigPicturePopup = (miniatureElement, miniature) => {
  bigPicture.classList.remove('hidden');
  fillPictureInformation(miniatureElement, miniature);
  body.classList.add('modal-open');
  document.addEventListener('keydown', closeBigPicturePopupEsc);
  bigPictureCloseBtn.addEventListener('click', closeBigPicturePopupClick);
};

const addPhotoEventListeners = (photos) => {
  pictures.addEventListener('click', (evt) => {
    if (evt.target.parentElement.matches('a.picture')) {
      evt.preventDefault();
      const miniatureElement = evt.target.parentElement;
      const miniatureId = miniatureElement.id;
      const miniature = photos.filter(({id}) => id === parseInt(miniatureId, 10))[0];
      openBigPicturePopup(miniatureElement, miniature);
    }
  });
};

export {addPhotoEventListeners};
