const isDivisible = (divisor, divider) => divisor % divider === 0;

const isPrime = (num) => {
  const largestFactor = Math.sqrt(num);

  for (let term = Math.floor(largestFactor); term >= 2; term--) {
    if (isDivisible(num, term)) return false;
  }
  return true;
};

function* _primes() {
  let term = 2;
  while (true) {
    if (isPrime(term)) yield term;
    term++;
  }
}

const nthprime = (n) => {
  const allPrimes = _primes();
  return [...allPrimes.take(n)].at(-1);
};

console.log(nthprime(10001));
