const isEven = (num: number): boolean => !(num & 1);

const nextTerm = (term: number): number => isEven(term) ? term / 2 : (3 * term) + 1;

const lookup: Record<number, number> = { 1: 1, 2: 2, 4: 3 };

const countCollatz = (term: number): number => {
  if (term in lookup) return lookup[term];
  term = nextTerm(term);
  const count = countCollatz(term);
  lookup[term] = count;
  return 1 + count;
};

const longestCollatz = (n: number): { term: number; count: number } => {
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
