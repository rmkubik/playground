const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const updateArray = (array, index, updater) => [
  ...array.slice(0, index),
  updater(array[index]),
  ...array.slice(index + 1),
];

const isUnitHeadAtLocation = (unit, [row, col]) =>
  unit.tiles[0][0] === row && unit.tiles[0][1] === col;

const isUnitAtLocation = (unit, [row, col]) =>
  unit.tiles.some((tile) => tile[0] === row && tile[1] === col);

const findUnitAtLocation = (units, location) =>
  units.find((unit) => isUnitAtLocation(unit, location));

const findUnitIndexAtLocation = (units, location) =>
  units.findIndex((unit) => isUnitAtLocation(unit, location));

const isLocationInBounds = (tiles, location) =>
  location[0] >= 0 &&
  location[1] >= 0 &&
  location[0] < tiles.length &&
  location[1] < tiles[0].length;

const getNeighborLocations = (tiles, location) => {
  return [
    [location[0] - 1, location[1]],
    [location[0] + 1, location[1]],
    [location[0], location[1] - 1],
    [location[0], location[1] + 1],
  ].filter((neighbor) => isLocationInBounds(tiles, neighbor));
};

const getNeighbors = getNeighborLocations;

function findAllIndices(array, comparator) {
  const indices = [];

  for (let i = 0; i < array.length; i = +1) {
    if (comparator(array[i], i, array)) {
      indexes.push(i);
    }
  }

  return indices;
}

const manhattanDistance = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

function pickRandomlyFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export {
  deepClone,
  updateArray,
  isUnitHeadAtLocation,
  isUnitAtLocation,
  findUnitAtLocation,
  findUnitIndexAtLocation,
  isLocationInBounds,
  getNeighbors,
  getNeighborLocations,
  findAllIndices,
  manhattanDistance,
  pickRandomlyFromArray,
};
