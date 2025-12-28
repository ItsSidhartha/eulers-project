const isDivisible = (divisor, divider) => divisor % divider === 0;

const lcmOf = (x, y) => {
  let term1 = Math.max(x, y);
  const term2 = Math.min(x, y);
  let lcm = term1;
  while (lcm % term2 !== 0) {
    lcm = lcm + term1;
  }
  return lcm;
};

const LCM = (args) => {
  return args.reduce((lcm, ele) => {
    return lcmOf(lcm, ele);
  });
};

export const main = (n) => {
  const numbers = [];

  for (let num = 1; num <= n; num++) {
    numbers.push(num);
  }

  return LCM(numbers);
};

console.log(main(20));
