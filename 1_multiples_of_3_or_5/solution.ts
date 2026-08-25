const isDivisibleBy3 = (term: number): boolean => {
  return term % 3 === 0;
};

const isDivisibleBy5 = (term: number): boolean => {
  return term % 5 === 0;
};

const multiplesOf3And5 = (limit: number): number => {
  let sum = 0;
  for (let term = 0; term < limit; term++) {
    if (isDivisibleBy3(term) || isDivisibleBy5(term)) {
      sum = sum + term;
    }
  }
  return sum;
};

console.log(multiplesOf3And5(1000));
