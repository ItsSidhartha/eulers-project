const countFactor = (num) => {
  let count = 0;
  const largestFactor = Math.sqrt(num);
  for (let term = 1; term < largestFactor; term++) {
    if (num % term === 0) {
      count += 2;
    }
  }

  if (largestFactor === Math.floor(largestFactor)) count++;
  
  return count;
};

function* apGenerator() {
  let term = 1;
  let sum = 0;
  while (true) {
    yield sum;
    sum = sum + term;
    term++;
  }
}

const largestTriangular = (n) => {
  const nextTerm = apGenerator();
  let count = 0;
  let term = 0;
  while (count < n) {
    term = nextTerm.next().value;
    count = countFactor(term);
  }
  return term;
};

console.log(largestTriangular(500));
