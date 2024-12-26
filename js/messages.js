import { onKeyDownPopupClose as popupClose } from './uploadImage.js';
import { body } from './main.js';

const downloadErrorTemplate = document.querySelector('#download-error').content;

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const MESSAGECLASSES = {
  success: {
    section: '.success',
    button: '.success__button'
  },
  error: {
    section: '.error',
    button: '.error__button'
  },
  downloadError: {
    button: '.error__button'
  }
};

const downloadErrorMessage = {
  downloadErrorShowen: false,
  setDownloadErrorShowen: (value) => {
    downloadErrorMessage.downloadErrorShowen = value;
  },
  showDownloadError: (cb, setter) => {
    const message = downloadErrorTemplate.cloneNode(true);
    const button = message.querySelector('.error__button');
    if (!downloadErrorMessage.downloadErrorShowen) {
      body.appendChild(message);
    }

    const onDownload = () => {
      cb(setter);
    };

    button.addEventListener('click', onDownload);
    downloadErrorMessage.downloadErrorShowen = true;
  },
  closeMessage: () => {
    downloadErrorMessage.setDownloadErrorShowen(false);
    const message = document.querySelector('body > section.download-error-section');
    if (message) {
      message.remove();
    }
  }
};

const uploadFormMessages = {
  messageShowen: false,
  message: '',
  setMessageShowen: (value, message) => {
    uploadFormMessages.messageShowen = value;
    uploadFormMessages.message = message;
  },
  showUploadSuccessMessage: () => {
    uploadFormMessages.setMessageShowen(true, MESSAGECLASSES.success.section);
    const message = successTemplate.cloneNode(true);
    const section = message.querySelector(MESSAGECLASSES.success.section);
    const button = message.querySelector(MESSAGECLASSES.success.button);
    body.appendChild(message);

    const onClickMessageClose = (evt) => {
      if (evt.target === section) {
        uploadFormMessages.closeMessage(MESSAGECLASSES.success.section);
        document.removeEventListener('keydown', popupClose);
      }
    };

    const onCloseMessage = () => {
      uploadFormMessages.closeMessage(MESSAGECLASSES.success.section);
      document.removeEventListener('keydown', popupClose);
    };

    button.addEventListener('click', onCloseMessage);
    section.addEventListener('click', onClickMessageClose);
  },
  showUploadErrorMessage: () => {
    uploadFormMessages.setMessageShowen(true, MESSAGECLASSES.error.section);
    const message = errorTemplate.cloneNode(true);
    const section = message.querySelector(MESSAGECLASSES.error.section);
    const button = message.querySelector(MESSAGECLASSES.error.button);
    if (uploadFormMessages.messageShowen) {
      body.appendChild(message);
    }

    const onClickMessageClose = (evt) => {
      if (evt.target === section) {
        uploadFormMessages.closeMessage(MESSAGECLASSES.error.section);
      }
    };

    const onCloseMessage = () => {
      uploadFormMessages.closeMessage(MESSAGECLASSES.error.section);
    };

    button.addEventListener('click', onCloseMessage);
    section.addEventListener('click', onClickMessageClose);
  },
  closeMessage: (messageClass) => {
    const message = document.querySelector(`body > section${messageClass}`);
    uploadFormMessages.setMessageShowen(false, '');
    if (message) {
      message.remove();
    }
  }
};

export {downloadErrorMessage, uploadFormMessages, MESSAGECLASSES};
