import { downloadImages } from './requests.js';
import { photoSetter } from './utils.js';

const body = document.body;

const main = async () => {
  await downloadImages(photoSetter);
};

main();

export {body};
