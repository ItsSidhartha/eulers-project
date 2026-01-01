const sumOfFactorsOf = (num) => {
  if (num === 1) return 1;
  const largestFactor = Math.sqrt(num);
  let sum = 1;
  for (let term = 2; term < largestFactor; term++) {
    if (num % term === 0) {
      sum = sum + term + (num / term);
    }
  }
  if (largestFactor === Math.floor(largestFactor)) sum += largestFactor;
  return sum;
};

const isAmicable = (num) => {
  const sumOfFactors = sumOfFactorsOf(num);
  if (num === sumOfFactors) return false;
  return num === sumOfFactorsOf(sumOfFactors);
};

const sumOfAmicableNums = (limit) => {
  let sum = 0;
  let candidate = 0;
  while (candidate < limit) {
    if (isAmicable(candidate)) {
      const compliment = sumOfFactorsOf(candidate);
      sum = sum + candidate + compliment;
      candidate = compliment;
    }
    candidate++;
  }
  return sum;
};

console.log(sumOfAmicableNums(99999));
