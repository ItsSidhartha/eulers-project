let  counter = 0;
const specialPythororianTriplet = (sum) => {
  for (let a = 3; a < (sum - 3) / 3; a++) {
    for (let b = a + 1; b < (sum - 1 - a) / 2; b++) {
      counter++;
      const c = sum - a - b;
      if (c * c === a * a + b * b) return a * b * c;
    }
  }
  console.log(counter);
};

console.log(specialPythororianTriplet(1000));