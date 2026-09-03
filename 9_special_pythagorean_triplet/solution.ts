const specialPythororianTriplet = (sum: number) => {
  let counter = 0;
  for (let a = 3; a < (sum - 3) / 3; a++) {
    for (let b = a + 1; b < (sum - 1 - a) / 2; b++) {
      counter++;
      const c = sum - a - b;
      if (c * c === a * a + b * b) return a * b * c;
    }
  }
};

export const main = (): number | undefined => specialPythororianTriplet(1000);
