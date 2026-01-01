const fibonacci = (term, lookup = {}) => {
  if (term === 1 || term === 2) return 1n;
  if (term in lookup) return lookup[term];
  const fib = fibonacci(term - 1, lookup) + fibonacci(term - 2, lookup);
  return { fib, lookup };
};

const indexOfLargeFibb = (target) => {
  const lookup = {};
  for (let term = 1; true; term++) {
    const fibAndLookup = fibonacci(term, lookup);
    lookup[term] = fibAndLookup.fib;

    const digitCount = String(fibAndLookup.fib).length;
    if (digitCount === target) return term;
  }
};

console.log(indexOfLargeFibb(1000));
