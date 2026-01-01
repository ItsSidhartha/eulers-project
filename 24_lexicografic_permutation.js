const factorial = (number) => {
  if (number === 1) return 1;
  return number * factorial(number - 1);
};

const main = (target) => {
  let targetIndex = target - 1;
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let digitsRemaining = 10;
  const result = [];
  while (digitsRemaining !== 0) {
    const countInGroup = factorial(digitsRemaining) / digitsRemaining;
    const index = Math.floor(targetIndex / countInGroup);
    const digit = nums[index];
    result.push(digit);
    nums.splice(nums.indexOf(digit), 1);
    digitsRemaining--;
    targetIndex = targetIndex % countInGroup;
  }

  return Number(result.join(''));
};

console.log(main(1000000));
