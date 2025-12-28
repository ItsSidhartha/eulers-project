const sumofEvenFibbs = (range) => {
  let prev = 1;
  let curr = 2;
  let sum = 0;
  while (curr < range) {
    if (curr % 2 === 0) {
      sum = sum + curr;
    }

    curr = curr + prev;
    prev = curr - prev;
  }
  return sum;
};

console.log(sumofEvenFibbs(4000000))
