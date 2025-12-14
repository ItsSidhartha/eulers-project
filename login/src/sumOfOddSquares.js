export const sumOfOddSquares = (range) => {
  let sum = 0n;
  for (let index = 1n; index <= range; index += 2n) {
    sum = sum + (index * index);
  }
  return sum;
};
