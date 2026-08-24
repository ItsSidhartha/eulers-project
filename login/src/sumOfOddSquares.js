export const sumOfOddSquares = (range) => {
  let sum = 0n;
  for (let index = 1n; index <= Number(range); index += 2n) {
    sum = sum + (index * index);
  }
  return sum;
};

console.log(sumOfOddSquares(Deno.args));
