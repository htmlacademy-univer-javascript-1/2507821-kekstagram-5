const inputPhotoLoader = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCloseBtn = overlay.querySelector('.img-upload__cancel');
const hashTags = overlay.querySelector('.text__hashtags');
const comment = overlay.querySelector('.text__description');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');

const onKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const closeOverlay = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  inputPhotoLoader.value = '';
  hashTags.textContent = '';
  comment.textContent = '';
  comment.removeEventListener('keydown', onKeyDown);
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

inputPhotoLoader.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  comment.addEventListener('keydown', onKeyDown);
  overlayCloseBtn.addEventListener('click', onClickPopupClose);
  body.addEventListener('keydown', onKeyDownPopupClose);
});

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
