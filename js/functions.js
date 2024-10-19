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
