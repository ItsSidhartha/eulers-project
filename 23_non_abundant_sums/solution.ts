const sumOfDivisors = (num: number): number => {
  let sum = 1;
  let divisor = 2;

  while (divisor * divisor <= num && num > 1) {
    if (num % divisor === 0) {
      let exponent = divisor * divisor;
      num = Math.floor(num / divisor);

      while (num % divisor === 0) {
        exponent = exponent * divisor;
        num = Math.floor(num / divisor);
      }

      sum = sum * (exponent - 1);
      sum = Math.floor(sum / (divisor - 1));
    }

    divisor = (divisor === 2) ? 3 : divisor + 2;
  }

  if (num > 1) sum = sum * (num + 1);
  return sum;
};

const sumOfFactorsOf = (num: number): number => {
  return sumOfDivisors(num) - num;
};

const isAbundant = (candidate: number): boolean => sumOfFactorsOf(candidate) > candidate;

const allAbundants = (limit: number): number[] => {
  const abundants: number[] = [];

  for (let candidate = 1; candidate < limit; candidate++) {
    if (isAbundant(candidate)) {
      abundants.push(candidate);
    }
  }

  return abundants;
};

const markAbundantSums = (abundants: number[], limit: number): boolean[] => {
  const abundantMarkedArray = Array<boolean>(limit + 1).fill(false);

  for (let i = 0; i < abundants.length; i++) {
    for (let j = i; j < abundants.length; j++) {
      const sum = abundants[i] + abundants[j];
      if (sum > limit) break;
      abundantMarkedArray[sum] = true;
    }
  }

  return abundantMarkedArray;
};

const sumOfNonAbundants = (markedArray: boolean[]): number =>
  markedArray.reduce((sum: number, ele, i) => {
    if (!ele) sum = sum + i;
    return sum;
  }, 0);

const countNonAbundantSums = (limit: number): number => {
  const abundants = allAbundants(limit);
  const markedAbundandSums = markAbundantSums(abundants, limit);

  return sumOfNonAbundants(markedAbundandSums);
};

console.log(countNonAbundantSums(28123));
