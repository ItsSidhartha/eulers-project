const isDivisible = (divisor: number, divider: number): boolean => divisor % divider === 0;

const isPrime = (num: number): boolean => {
  if (num === 2) return true;
  const largestFactor = Math.sqrt(num);
  if (num % 2 === 0) return false;
  for (let term = 3; term <= largestFactor; term += 2) {
    if (isDivisible(num, term)) return false;
  }

  return true;
};

function* primeCandidates(): Generator<number> {
  let term = 6;
  while (true) {
    yield term - 1;
    yield term + 1;
    term += 6;
  }
}

function* primes(): Generator<number> {
  yield 2;
  yield 3;
  const candidates = primeCandidates();
  let term = candidates.next().value;
  while (true) {
    if (isPrime(term)) yield term;
    term = candidates.next().value;
  }
}

const sumOfPrimes = (limit: number): number => {
  const allPrimes = primes();
  let sum = 0;
  let term = allPrimes.next().value;
  while (term < limit) {
    sum = sum + term;
    term = allPrimes.next().value;
  }
  return sum;
};

export const main = (): number => sumOfPrimes(2000000);
