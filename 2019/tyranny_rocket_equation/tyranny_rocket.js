const feulRequired = (mass, type = "feul") => {
  const massOfObject = parseInt(mass);
  if (massOfObject < 0) return 0;
  const massOfFeul = massOfObject / 3 - 2;
  return type === "feul"
    ? (massOfObject + feulRequired(massOfFeul))
    : massOfFeul;
};

const sum = (x, y) => x + y;

const totalFeulRequired = (masses) => {
  const massesInString = masses;
  const feulRequiredForEach = massesInString
    .split("\n")
    .map((rocktMass) =>
      Math.floor(feulRequired(feulRequired(rocktMass, "rocket")))
    )
    .reduce((totalFeul, feul) => sum(totalFeul, feul), 0);

  return feulRequiredForEach;
};

console.log(totalFeulRequired(Deno.readTextFileSync("input.txt")));
