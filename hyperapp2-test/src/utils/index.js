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

export {
  deepClone,
  updateArray,
  isUnitHeadAtLocation,
  isUnitAtLocation,
  isLocationInBounds,
  getNeighbors,
  getNeighborLocations,
};
