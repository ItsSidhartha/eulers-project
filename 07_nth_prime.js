const isDivisible = (divisor, divider) => divisor % divider === 0;

const isPrime = (num) => {
  const largestFactor = Math.sqrt(num); 

  for (let term = Math.floor(largestFactor); term >= 2; term--) {
    if (isDivisible(num, term)) return false;
  }

  return true;
};

function* primes() {
  yield 2;
  yield 3
  let term = 6;
  while (true) {
    const candidate1 = term - 1;
    if (isPrime(candidate1)) yield candidate1;

    const candidate2 = term + 1;
    if (isPrime(candidate2)) yield candidate2;
    
    term += 6;
  }
}

const nthprime = (n) => {
  const allPrimes = primes(); 
  return [...allPrimes.take(n)].at(-1);
};

console.log(nthprime(10001));
