const isDivisible = (divisor, divider) => divisor % divider === 0;

const lcmOf = (x, y) => {
  let lcm = x;
  while (lcm % y !== 0) {
    lcm = lcm + x;
  }
  return lcm;
};

const LCM = (args) => {
  return args.reduce((lcm, ele) => {
    return lcmOf(lcm, ele);
  });
};

const numbers = [];

for (let num = 1; num <= 20; num++) {
  numbers.push(num);
}
console.log(numbers);

console.log(LCM(numbers));
