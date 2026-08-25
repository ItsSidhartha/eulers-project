type Lookup = Record<number, bigint>;

const fibonacci = (term: number, lookup: Lookup = {}): bigint | { fib: bigint; lookup: Lookup } => {
  if (term === 1 || term === 2) return 1n;
  if (term in lookup) return lookup[term];
  const fib = (fibonacci(term - 1, lookup) as bigint) + (fibonacci(term - 2, lookup) as bigint);
  return { fib, lookup };
};

const indexOfLargeFibb = (target: number): number => {
  const lookup: Lookup = {};
  for (let term = 1; true; term++) {
    const fibAndLookup = fibonacci(term, lookup) as { fib: bigint; lookup: Lookup };
    lookup[term] = fibAndLookup.fib;

    const digitCount = String(fibAndLookup.fib).length;
    if (digitCount === target) return term;
  }
};

console.log(indexOfLargeFibb(1000));
