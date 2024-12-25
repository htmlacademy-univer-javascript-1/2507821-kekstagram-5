import sendImage from './requests.js';
import { data } from './openBigPicture.js';

const overlay = document.querySelector('.img-upload__overlay');
const hashTags = overlay.querySelector('.text__hashtags');
const form = document.querySelector('.img-upload__form');


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
  evt.preventDefault();
  if (pristine.validate()) {
    sendImage(data);
  }
});
