const sum = (n) => (n * (n + 1)) / 2;
const sumOfSquare = (n) => (n * (n + 1) * (2 * n + 1)) / 6;
const sqr = (x) => Math.pow(x, 2);
const sumSquareDiff = (n) => sqr(sum(n)) - sumOfSquare(n);

console.log(sumSquareDiff(100));
