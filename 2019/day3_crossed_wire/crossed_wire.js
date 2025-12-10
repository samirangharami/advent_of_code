import { intersect, runningReduce } from "@std/collections";

const findPath = (movements) => {
  return runningReduce(movements, (path, movement) => {
    let lastLocation = path.at(-1);
    const positions = [];
    for (let index = 1; index <= parseInt(movement.slice(1)); index++) {
      positions.push(PROBABLE_MOVEMENTS[movement[0]](lastLocation));
      lastLocation = positions.at(-1);
    }

    return path.concat(positions);
  }, [{ x: 0, y: 0 }]);
};

const PROBABLE_MOVEMENTS = {
  L: ({ x, y }) => ({ x: x + 1, y: y }),
  R: ({ x, y }) => ({ x: x - 1, y: y }),
  U: ({ x, y }) => ({ x: x, y: y + 1 }),
  D: ({ x, y }) => ({ x: x, y: y - 1 }),
};

const findShortestDistance = (locations) => {
  return locations.reduce((shortest, location) => {
    const distance = Math.abs(location.x) + Math.abs(location.y);
    const leastDistance = Math.abs(shortest.x) + Math.abs(shortest.y);

    if (distance < leastDistance) {
      shortest.x = location.x;
      shortest.y = location.y;
    }
    return shortest;
  }, { x: Infinity, y: Infinity });
};

const findIndex = (locations, target) => {
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].x === target.x && locations[i].y === target.y) {

      return i;
    }
  }
};

const leastStepsToIntersection = (wire1steps, wire2steps) => {
  return wire1steps.reduce((leastSteps, step, i) => {
    if (step + wire2steps[i] < leastSteps) {
      leastSteps = step + wire2steps[i];
    }
    return leastSteps;
  }, Infinity);
};

const stepsFromIntersections = (intersections, locations) =>
  intersections.map((intersection) => findIndex(locations, intersection));

const stepsToClosestIntersection = (movements) => {
  const wireMovements = movements.split("\n");
  const wire1Locations = findPath(wireMovements[0].split(",")).at(-1);
  const wire2Locations = findPath(wireMovements[1].split(",")).at(-1);

  const commonLocations = wire1Locations.flatMap((location1) =>
    wire2Locations.filter((location2) =>
      (location1.x === location2.x) && (location1.y === location2.y)
    )
  );
  commonLocations.shift();

  const stepsForWire1 = stepsFromIntersections(commonLocations, wire1Locations);
  const stepsForWire2 = stepsFromIntersections(commonLocations, wire2Locations);

  return leastStepsToIntersection(stepsForWire1, stepsForWire2);
};

console.log(stepsToClosestIntersection(Deno.readTextFileSync("input.txt")));
