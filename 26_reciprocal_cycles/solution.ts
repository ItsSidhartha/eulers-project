const reciprocalCount = (num: number): number => {
  const lookup: number[] = [];
  let remainder = 1;
  while (!lookup.includes(remainder)) {
    if (remainder === 0) return 0;
    lookup.push(remainder);
    remainder = (remainder * 10) % num;
  }

  return lookup.length - lookup.indexOf(remainder);
};

const largestReciprocal = (): { count: number; term?: number } => {
  const largest: { count: number; term?: number } = { count: 0 };

  for (let term = 3; term < 1000; term++) {
    const count = reciprocalCount(term);
    if (largest.count < count) {
      largest.count = count;
      largest.term = term;
    }
  }
  return largest;
};

console.log(largestReciprocal());
