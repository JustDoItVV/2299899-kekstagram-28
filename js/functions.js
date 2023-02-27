const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrom = (string) => {
  const stringLowerNoSpaces = string.replaceAll(' ', '').toLowerCase();
  let palindrom = true;
  for (let i = 0; i < Math.ceil(stringLowerNoSpaces.length * 0.5); i++) {
    if (
      stringLowerNoSpaces.at(i) !==
      stringLowerNoSpaces.at(stringLowerNoSpaces.length - i - 1)
    ) {
      palindrom = false;
      break;
    }
  }
  return palindrom;
};

const extractDigits = (string) => parseInt(string.replaceAll(/\D/g, ''), 10);

const expandString = (string, expandLength, additionalSymbols) => {
  const delta = expandLength - string.length;
  if (delta > 0) {
    const addNumber = Math.floor(delta / additionalSymbols.length);
    const addEnd = delta % additionalSymbols.length;
    return (
      additionalSymbols.slice(0, addEnd) +
      additionalSymbols.repeat(addNumber) +
      string
    );
  }
  return string;
};

export { checkStringLength, isPalindrom, extractDigits, expandString };
