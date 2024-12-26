import { downloadErrorMessage } from './messages.js';
import { addFilterFunctions, debouncedShowPhotos } from './utils.js';

const url = 'https://29.javascript.htmlacademy.pro/kekstagram/data';

const sendImage = async (data) => {
  data.submitter.disabled = true;
  const requestData = new FormData(data.form);
  requestData.set('hashtags', requestData.get('hashtags').trim().split(/\s+/).join(' '));

  fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'post',
    body: requestData
  }).then((response) => {
    if (response.ok) {
      data.clearWindow(true);
      data.success();
    } else {
      data.error();
    }
  }).finally(() => {
    data.submitter.disabled = false;
  });
};

const downloadImages = async (setter) => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    setter(data);
    downloadErrorMessage.closeMessage();
    addFilterFunctions(debouncedShowPhotos);
    return;
  }
  downloadErrorMessage.showDownloadError(downloadImages, setter);
  downloadErrorMessage.setDownloadErrorShowen(true);
};

export {sendImage, downloadImages};
