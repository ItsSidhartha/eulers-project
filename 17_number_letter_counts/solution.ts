const numberToWords = (number: number): string => {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (number === 1000) return "one thousand";
  if (number >= 100) {
    const remainder = number % 100;
    return `${ones[Math.floor(number / 100)]} hundred${remainder ? ` and ${numberToWords(remainder)}` : ""}`;
  }
  if (number >= 20) return `${tens[Math.floor(number / 10)]}${number % 10 ? ` ${ones[number % 10]}` : ""}`;
  if (number >= 10) return teens[number - 10];
  return ones[number];
};

const numberLetterCountTill = (n: number): number => {
  const numbersAsWord: string[] = [];

  for (let term = 1; term <= n; term++) {
    numbersAsWord.push(numberToWords(term));
  }

  return numbersAsWord.map((x) => x.split(" ").join("")).join("").length +
    (99 * 9 * 3);
};

export const main = (): number => numberLetterCountTill(1000);
