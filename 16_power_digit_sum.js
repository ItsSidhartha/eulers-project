// const powerDigitSum = (a, x) =>
//   (BigInt(a) ** BigInt(x))
//     .toString()
//     .split("")
//     .map((x) => +x)
//     .reduce((sum, ele) => sum + ele);

const digitsOf = (num) => num.toString().split("").map(Number);

const multiplyBIG = (a, b) => {
  let carry = 0;
  const digits = digitsOf(a);
  for (let index = digits.length -1; index >=0 ; index--) {
    const mul = (digits[index] * b) + carry;

    digits[index] = mul % 10;
    carry = (mul / 10) | 0;
  }

  return [...digitsOf(carry), ...digits];
};
