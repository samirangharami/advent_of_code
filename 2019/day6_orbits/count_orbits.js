import { intersect } from "jsr:@std/collections";

const calculateOrbits = (mapOfOrbits, planet, anchorPlanet) => {
  if (mapOfOrbits[planet] === anchorPlanet) return 1;
  return 1 + calculateOrbits(mapOfOrbits, mapOfOrbits[planet], anchorPlanet);
};

const makeMapOfOrbits = (input) => {
  const mapOfOrbits = input.reduce((orbits, planets) => {
    orbits[planets[1]] = planets[0];
    return orbits;
  }, {});

  return mapOfOrbits;
};

const findOrbitPath = (mapOfOrbits, planet, orbits = []) => {
  if (mapOfOrbits[planet] === "COM") {
    orbits.push("COM");
    return orbits;
  }
  orbits.push(mapOfOrbits[planet]);
  return findOrbitPath(mapOfOrbits, mapOfOrbits[planet], orbits);
};

const findCommonPlanet = (orbitsOfPlanet1, orbitsOfPlanet2) => {
  return (intersect(orbitsOfPlanet1, orbitsOfPlanet2))[0];
};

const findAnchorPlanet = (mapOfOrbits, planet1, planet2) => {
  const orbitsOfPlanet1 = findOrbitPath(mapOfOrbits, planet1);
  const orbitsOfPlanet2 = findOrbitPath(mapOfOrbits, planet2);
  console.log({ orbitsOfPlanet1, orbitsOfPlanet2 });
  return findCommonPlanet(orbitsOfPlanet1, orbitsOfPlanet2);
};

const parseInput = (input) =>
  input.split("\n").map((orbit) => orbit.split(")"));

const countTotalOrbits = (input) => {
  const mapOfOrbits = makeMapOfOrbits(parseInput(input));
  const anchorPlanet = findAnchorPlanet(mapOfOrbits, "YOU", "SAN");
  let orbits = 0;
  orbits += calculateOrbits(mapOfOrbits, mapOfOrbits.YOU, anchorPlanet);
  orbits += calculateOrbits(mapOfOrbits, mapOfOrbits.SAN, anchorPlanet);

  return orbits;
};

const input = Deno.readTextFileSync("./input.txt");

console.log(countTotalOrbits(input));
