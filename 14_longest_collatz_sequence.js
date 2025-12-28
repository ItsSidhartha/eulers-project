const isEven = (num) => !(num & 1);

const nextTerm = (term) => isEven(term) ? term / 2 : (3 * term) + 1;

const lookup = { 1: 1, 2: 2, 4: 3 };

const countCollatz = (term) => {
  if (term in lookup) return lookup[term];
  term = nextTerm(term);
  const count = countCollatz(term, lookup);
  lookup[term] = count;
  return 1 + count;
};

const longestCollatz = (n) => {
  let term = 1;
  let longest = { term, count: 0 };
  while (term < n) {
    const count = countCollatz(term);
    if (longest.count < count) {
      longest = { term, count };
    }
    term++;
  }
  return longest
};
