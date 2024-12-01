/* eslint-disable no-unused-vars */
const checkLength = (string, maxLength) => string.length <= maxLength;

const checkPalindrome = (string) => {
  const normaisedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normaisedString.length - 1; i >= 0; i--) {
    reversedString += normaisedString[i];
  }
  return reversedString === normaisedString;
};


const getInt = (number) => {
  if (typeof number === 'number') {
    return parseInt(String(number).replaceAll('.', ''), 10);
  }

  let numberChars = '';
  for (let i = 0; i < number.length; i++) {
    if ('0123456789'.includes(number[i])) {
      numberChars += number[i];
    }
  }

  return parseInt(numberChars, 10);
};


const isMeetingNotOutOfBounds = (workdayStart, workdayEnd, meetingStart, meetingDuration) => {
  // Переводим начало дня в минуты
  let start = workdayStart.split(':').map((value, index) => Number.parseInt(value, 10));
  start = start[0] * 60 + start[1];
  // Переводим конец дня в минуты
  let end = workdayEnd.split(':').map((value) => Number.parseInt(value, 10));
  end = end[0] * 60 + end[1];
  // Переводим конец встречи в минуты
  let meeting = meetingStart.split(':').map((value) => Number.parseInt(value, 10));
  meeting = meeting[0] * 60 + meeting[1] + meetingDuration;
  return start <= meeting && meeting <= end;
};
