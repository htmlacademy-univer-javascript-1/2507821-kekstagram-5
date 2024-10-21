import { getRandomInteger } from './utils.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'
  , 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'
  , 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
  , 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
  , 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// Генерация комментариев
// Функция получения сообщения комментария "sentancesNumber" - кол-во предложений в сообщении
const getCommentMessage = (sentancesNumber) => {
  const sentances = [];
  const messages = MESSAGES.slice();
  while (messages.length !== 0 && sentances.length < sentancesNumber) {
    const sentanceIndex = getRandomInteger(0, messages.length - 1);
    const sentance = messages[sentanceIndex];
    sentances.push(sentance);
    delete messages[sentanceIndex];
  }
  return sentances.join('\n');
};

// Функция-генератор комментариев
const getComment = (upperBorder = 200) => {
  const previousCommentIds = [];
  return () => {
    let currentValue = getRandomInteger(1, upperBorder);
    while (previousCommentIds.includes(currentValue)) {
      currentValue = getRandomInteger(1, upperBorder);
    }
    return {
      id: currentValue,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getCommentMessage(getRandomInteger(1, 2)),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    };
  };
};

export { getComment };
