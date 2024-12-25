import { getPhoto } from './data.js';

/*
ОПИСАНИЕ
Раздление на модули
main.js - точка входа

utils.js - модуль свспомогательными фукнцияи

data.js - модуль с получением(генерацией) фотографий

comments.js - модуль для получения(генерации) комментариев к фотографии

miniatures.js - модуль по отрисовке миниатюр
*/


const photos = Array.from({length: 25}, getPhoto());

export default photos;
