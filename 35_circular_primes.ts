/*

The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime
There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97
How many circular primes are there below one million

1,000,000

999999

The numbers can only be made of 1,3,7,9
*/

import { isPrime } from "./10_sum_of_primes.js";

function* candidateGenerator() {
  yield 2;
  yield 3;
  yield 5;
  const digits = [1, 3, 7, 9];
  let last = [0, 0, 0, 0, 0, 7];
  yield Number(last.join(""));
  while (true) {
    const next = [...last];
    let i = last.length - 1;
    while (i >= 0) {
      const index = digits.indexOf(last[i]);
      if (index !== 3) {
        next[i] = digits[index + 1];
        break;
      }

      next[i] = digits[0];
      i--;
    }
    yield Number(next.join(""));

    last = next;
  }
}

const rotations = (num: number): number[] => {
  const s = num.toString();

  return Array.from({ length: s.length }, (_, i) =>
    Number(s.slice(i) + s.slice(0, i))
  );
};

const isCircularPrime = (candidate: number, checked: Map<number, boolean>) => {
  const allRotations = rotations(candidate);


  for (const rotation of allRotations) {
    if (checked.has(rotation)) return checked.get(rotation);
    if (!isPrime(rotation)) {
      checked.set(rotation, false);
      return false;
    }
  }

  allRotations.forEach(r => checked.set(r, true));
  return true;
}



const sumOfCircularPrimes = (range: number) => {
  let count = 0;
  const candidates = candidateGenerator();
  const checked = new Map<number, boolean>();

  while (true) {
    const candidate = candidates.next().value;

    if (!candidate) return count;
    if (candidate >= range - 1) return count;
    if (isPrime(candidate) && isCircularPrime(candidate, checked)) count++;
  }
}

console.log(sumOfCircularPrimes(1000000));