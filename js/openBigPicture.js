import photos from './main.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('#picture-cancel');
const commentsLoaderBtn = bigPicture.querySelector('.comments-loader');
let commentsLoaderBtnLink = '';
const fragment = document.createDocumentFragment();
const commentTemplate = document.querySelector('#bigPictureComment').content;
const body = document.querySelector('body');

const picturePreview = document.querySelector('.img-upload__preview img');
const overlay = document.querySelector('.img-upload__overlay');
const inputPhotoLoader = document.querySelector('.img-upload__input');
const overlayCloseBtn = overlay.querySelector('.img-upload__cancel');
const commentOverlay = overlay.querySelector('.text__description');
const hashTags = overlay.querySelector('.text__hashtags');
const scalerSmaller = document.querySelector('.scale__control--smaller');
const scalerBigger = document.querySelector('.scale__control--bigger');
const scalerValue = document.querySelector('.scale__control--value');
const SCALERSTEP = 25;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
let messageShowen = false;

const form = document.querySelector('.img-upload__form');
const submitter = form.querySelector('.img-upload__submit');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderEffects = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');


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
    body.removeEventListener('keydown', closeBigPicturePopupEsc);
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
};

const openBigPicturePopup = (miniatureElement, miniature) => {
  bigPicture.classList.remove('hidden');
  fillPictureInformation(miniatureElement, miniature);
  body.classList.add('modal-open');
  body.addEventListener('keydown', closeBigPicturePopupEsc);
  bigPictureCloseBtn.addEventListener('click', closeBigPicturePopupClick);
};

pictures.addEventListener('click', (evt) => {
  if (evt.target.parentElement.matches('a.picture')) {
    evt.preventDefault();
    const miniatureElement = evt.target.parentElement;
    const miniatureId = miniatureElement.id;
    const miniature = photos.filter(({id}) => id === Number.parseInt(miniatureId, 10))[0];
    openBigPicturePopup(miniatureElement, miniature);
  }
});

///
const onKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onChangeScale = () => {
  let value = /\d+/.exec(scalerValue.value);
  value = (parseInt(value, 10) < 100) ? parseFloat(`0.${value}`, 10) : 1;
  picturePreview.style.transform = `scale(${value})`;
};

const closeOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  inputPhotoLoader.value = '';
  hashTags.textContent = '';
  commentOverlay.textContent = '';
  commentOverlay.removeEventListener('keydown', onKeyDown);
  scalerValue.removeEventListener('change', onChangeScale);
};

const onClickPopupClose = () => {
  closeOverlay();
  overlayCloseBtn.removeEventListener('click', onClickPopupClose);
};

const closeMessage = () => {
  messageShowen = false;
  document.querySelector('body > section:last-of-type').remove();
};

const onKeyDownPopupClose = (evt) => {
  if (evt.key === 'Escape') {
    if (!messageShowen) {
      closeOverlay();
      body.removeEventListener('keydown', onKeyDownPopupClose);
    } else {
      closeMessage();
    }
  }
};

const onScaleInc = () => {
  if (parseInt(scalerValue.value, 10) + SCALERSTEP <= 100) {
    const newValue = parseInt(scalerValue.value, 10) + SCALERSTEP;
    scalerValue.value = `${newValue}%`;
    scalerValue.dispatchEvent(new Event('change'));
  }
};

const onScaleDec = () => {
  if (parseInt(scalerValue.value, 10) - SCALERSTEP >= 25) {
    const newValue = parseInt(scalerValue.value, 10) - SCALERSTEP;
    scalerValue.value = `${newValue}%`;
    scalerValue.dispatchEvent(new Event('change'));
  }
};

inputPhotoLoader.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  commentOverlay.addEventListener('keydown', onKeyDown);
  overlayCloseBtn.addEventListener('click', onClickPopupClose);
  body.addEventListener('keydown', onKeyDownPopupClose);
  scalerBigger.addEventListener('click', onScaleInc);
  scalerSmaller.addEventListener('click', onScaleDec);
  scalerValue.addEventListener('change', onChangeScale);
});

const clearImageUploadForm = (closePopup = false) => {
  scalerValue.value = '100%';
  sliderValue.value = 'none';
  picturePreview.style.filter = '';
  sliderContainer.style.display = 'none';
  hashTags.value = '';
  commentOverlay.value = '';
  inputPhotoLoader.value = null;

  scalerValue.dispatchEvent(new Event('change'));
  sliderEffects.dispatchEvent(new Event('change'));
  if (closePopup) {
    closeOverlay();
  }
};

const showSuccessMessage = () => {
  messageShowen = true;
  const message = successTemplate.cloneNode(true);
  const section = message.querySelector('.success');
  const button = message.querySelector('.success__button');
  body.appendChild(message);

  const onClickMessageClose = (evt) => {
    if (evt.target === section) {
      closeMessage();
    }
  };

  const onCloseMessage = () => {
    closeMessage();
  };

  button.addEventListener('click', onCloseMessage);
  section.addEventListener('click', onClickMessageClose);
};

const showErrorMessage = () => {
  messageShowen = true;
  const message = errorTemplate.cloneNode(true);
  const section = message.querySelector('.error');
  const button = message.querySelector('.error__button');
  body.appendChild(message);

  const onClickMessageClose = (evt) => {
    if (evt.target === section) {
      closeMessage();
    }
  };

  const onCloseMessage = () => {
    closeMessage();
  };

  button.addEventListener('click', onCloseMessage);
  section.addEventListener('click', onClickMessageClose);
};

const data = {
  form: form,
  submitter: submitter,
  clearWindow: clearImageUploadForm,
  success: showSuccessMessage,
  error: showErrorMessage,
  body: body,
  popupClose: onKeyDownPopupClose
};

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

export {data};
