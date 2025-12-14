const isPalindrome = (num) => num === +[...`${num}`].reverse().join("");

const largestPlaindrome = () => {
  let largestPali = 0;

  for (let term1 = 999; term1 >= 100; term1--) {
    let term2 = term1;
    while (term2 >= 100) {
      if (term1 * term2 < largestPali) break;
      if (isPalindrome(term1 * term2)) {
        largestPali = Math.max(largestPali, term1 * term2);
      }
      term2--;
    }
  }
  return largestPali;
};

console.log(largestPlaindrome());
