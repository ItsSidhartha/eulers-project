const isDivisible = (divisor, divider) => divisor % divider === 0;

const isPrime = (num) => {
  const largestFactor = Math.sqrt(num);

  for (let term = Math.floor(largestFactor); term >= 2; term--) {
    if (isDivisible(num, term)) return false;
  }
  return true;
};

const nextPrime = (curr) => {
  let term = curr + 1;
  while (!isPrime(term)) {
    term++;
  }
  return term;
};

const sumOfPrimes = (limit) => {
  let sum = 0;
  let term = 2;

  while (term < limit) {
    sum = sum + term;
    console.log(term);
    
    term = nextPrime(term);
  }
  return sum;
};
