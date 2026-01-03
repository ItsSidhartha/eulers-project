const reciprocalCount = (num) => {
  const lookup = [];
  let remainder = 1;
  while (!lookup.includes(remainder)) {
    lookup.push(remainder);
    remainder = (remainder * 10) % num;
  }

  return lookup.length - lookup.indexOf(remainder);
};

const largest = {count:0};

for (let term = 0; term < 1000; term++) {
  const count = reciprocalCount(term);
  if (largest.count < count) {
    largest.count = count;
    largest.term = term; 
  }
}

console.log(largest);

