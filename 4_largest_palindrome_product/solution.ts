const isPalindrome = (num: number): boolean => num === +[...`${num}`].reverse().join("");

const largestPlaindrome = (): number => {
  let largestPali = 0;

  for (let term1 = 999; term1 >= 100; term1--) {
    let term2 = term1;
    while (term2 >= 100 && term1 * term2 > largestPali) {
      if (isPalindrome(term1 * term2)) {
        largestPali = Math.max(largestPali, term1 * term2);
      }
      term2--;
    }
  }
  return largestPali;
};

export const main = (): number => largestPlaindrome();
