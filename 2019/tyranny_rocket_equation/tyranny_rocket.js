const feulRequired = (mass) => mass / 3 - 2;

const sum = (x, y) => x + y;

export const totalFeulRequired = (masses) => {
  const massesInString = masses;
  const feulRequiredForEach = massesInString
    .split("\n")
    .map((mass) => Math.floor(feulRequired(mass)))
    .reduce((totalFeul, feul) => sum(totalFeul, feul), 0);

  return feulRequiredForEach;
};

console.log(totalFeulRequired(Deno.readTextFileSync("../input.txt")))