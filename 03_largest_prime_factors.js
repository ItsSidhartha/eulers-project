const isDivisible = (divisor, divider) => divisor % divider === 0;

export const isPrime = (num) => {
  const largestFactor = Math.sqrt(num);

  for (let term = Math.floor(largestFactor); term >= 2; term--) {
    if (isDivisible(num, term)) return false;
  }
  return true;
};

export const nextPrime = (curr) => { 
  let term = curr + 1;
  while (!isPrime(term)) {
    term++;
  }
  return term;
};

const largestPrimeFactor = (num) => {
  let copyOfNum = num;
  const largestFactor = Math.ceil(num / 2);
  let term = 2;
  let primeFactor = 1;

  while (term <= largestFactor && term <= copyOfNum) {
    if (isDivisible(copyOfNum, term)) {
      primeFactor = term;
      copyOfNum = copyOfNum / term;
    }

    term = nextPrime(term);
  }

  return primeFactor;
};

console.log(largestPrimeFactor(600851475143));
