const isLeapYear = (year) => {
  const isDivisibleByFour = year % 4 === 0;
  const isCentury = year % 100 === 0;
  const isDivisibleBy400 = year % 400 === 0;
  return (!isCentury && isDivisibleByFour) || isDivisibleBy400;
};

const dayCountOfFeb = (year) => isLeapYear(year) ? 29 : 28;

const sundayCount = () => {
  const dayOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let curr = 2;
  let count = 0;

  for (let year = 1901; year <= 2000; year++) {
    dayOfMonths[1] = dayCountOfFeb(year);
    for (let index = 0; index < dayOfMonths.length; index++) {
      if (curr === 0) {
        count++;
      }

      curr = (curr + dayOfMonths[index]) % 7;
    }
  }
  return count;
};

console.log(sundayCount());
