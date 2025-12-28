import { numberToWords } from "/Users/sidharthamaji/workspace/js/assignments/js-number-to-words-ItsSidhartha/src/numberToWords.js";

const numberLetterCountTill = (n) => {
  const numbersAsWord = [];

  for (let term = 1; term <= n; term++) {
    numbersAsWord.push(numberToWords(term));
  }

  return numbersAsWord.map((x) => x.split(" ").join("")).join("").length +
    (99 * 9 * 3);
};

console.log(numberLetterCountTill(1000));
