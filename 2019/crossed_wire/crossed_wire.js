const findPath = (movements) => {
  movements.reduce((path, movement) => {
    movement[0]({x:movement[1]})
  });
};

const MOVEMENTS = {
  L: ({ x, y }) => ({ x: x + 1, y: y }),
  R: ({ x, y }) => ({ x: x - 1, y: y }),
  U: ({ x, y }) => ({ x: x, y: y + 1 }),
  D: ({ x, y }) => ({ x: x, y: y - 1 }),
};

const intersections = (movements) => {
  wireMovements = movements.split("\n");
  wire1Locations = findPath(wireMovements[0]);
  wire2Locations = findPath(wireMovements[1]);
};
