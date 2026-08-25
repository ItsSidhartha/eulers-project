const isDivisible = (divisor: number, divider: number): boolean => divisor % divider === 0;

const lcmOf = (x: number, y: number): number => {
  let term1 = Math.max(x, y);
  const term2 = Math.min(x, y);
  let lcm = term1;
  while (lcm % term2 !== 0) {
    lcm = lcm + term1;
  }
  return lcm;
};

const LCM = (args: number[]): number => {
  return args.reduce((lcm, ele) => {
    return lcmOf(lcm, ele);
  });
};

export const main = (n: number): number => {
  const numbers: number[] = [];

  for (let num = 1; num <= n; num++) {
    numbers.push(num);
  }

  return LCM(numbers);
};

console.log(main(20));
