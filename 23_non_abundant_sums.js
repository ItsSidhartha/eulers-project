function SumOfDivisors(n) {
  let sum = 1;
  let p = 2;
  while (p * p <= n && n > 1) {
    if (n % p === 0) {
      let j = p * p; // 9
      n = Math.floor(n / p);
      while (n % p === 0) {
        j = j * p;
        n = Math.floor(n / p);
      }
      sum = sum * (j - 1); // 26
      sum = Math.floor(sum / (p - 1)); // 13
    }
    if (p === 2) p = 3;
    else p = p + 2;
  }
  if (n > 1) sum = sum * (n + 1);
  return sum;
}

const sumOfFactorsOf = (num) => {
  // if (num === 1) return 1;
  // const largestFactor = Math.sqrt(num);
  // let sum = 1;
  // for (let term = 2; term < largestFactor; term++) {
  //   if (num % term === 0) {
  //     sum = sum + term + (num / term);
  //   }
  // }
  // if (largestFactor === Math.floor(largestFactor)) sum += largestFactor;
  // return sum;

  return SumOfDivisors(num) - num;
};

const isAbundant = (candidate) => sumOfFactorsOf(candidate) > candidate;

const allAbundants = (limit) => {
  const abundants = new Set();

  for (let candidate = 1; candidate < limit; candidate++) {
    if (isAbundant(candidate)) {
      console.log({candidate});
      abundants.add(candidate);
    }
  }
  return abundants;
};

const isAbundantSum = (num, abundants) => {
  for (const element of abundants) {
    const compliment = num - element;
    if (abundants.has(compliment)) return true;
  }
  return false;
};

const countNonAbundantSums = (limit) => {
  const abundants = allAbundants(limit);
  let count = 0;
  for (let term = 0; term < limit; term++) {
    if (!isAbundantSum(term, abundants)) count++;
  }
  return count;
};

console.log(countNonAbundantSums(28123));
