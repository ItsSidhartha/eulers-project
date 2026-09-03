const sum = (n: number): number => (n * (n + 1)) / 2;
const sumOfSquare = (n: number): number => (n * (n + 1) * (2 * n + 1)) / 6;
const sqr = (x: number): number => Math.pow(x, 2);
const sumSquareDiff = (n: number): number => sqr(sum(n)) - sumOfSquare(n);

export const main = (): number => sumSquareDiff(100);
