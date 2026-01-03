const isDivisible = (divisor, divider) => divisor % divider === 0;

const isPrime = (num) => {
  if (num % 2 === 0) return false;
  const largestFactor = Math.sqrt(num);

  for (let term = 3; term <= Math.floor(largestFactor); term += 2) {
    if (isDivisible(num, term)) return false;
  }

  return true;
};

function* primeCandidates() {
  let term = 6;
  while (true) {
    yield term - 1;
    yield term + 1;
    term += 6;
  }
}

function* primes() {
  yield 2;
  yield 3;
  const candidates = primeCandidates();
  while (true) {
    const candidate = candidates.next().value;
    if (isPrime(candidate)) yield candidate;
  }
}

const nthprime = (n) => {
  const allPrimes = primes();

  return [...allPrimes.take(n)].at(-1);
};

console.log(nthprime(10001));
