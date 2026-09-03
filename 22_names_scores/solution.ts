const names: string[] = eval(`[${Deno.readTextFileSync("names.txt")}]`);

const sortedNames = names.sort();

const valueOf = (alphabet: string): number => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabets.indexOf(alphabet) + 1;
};

const sumOf = (sum: number, ele: number): number => sum + ele;

const sumOfNameScore = sortedNames
  .map((name) =>
    name
      .split("")
      .map(valueOf)
      .reduce(sumOf)
  )
  .map((x, i) => x * (i + 1))
  .reduce(sumOf);

export const main = (): number => sumOfNameScore;
