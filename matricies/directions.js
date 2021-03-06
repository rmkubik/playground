import { pick, map, pipe, toPairs, filter } from "ramda";

const getCrossDirections = () => [
  { up: true },
  { left: true },
  { right: true },
  { down: true }
];

const getDiagonalDirections = () => [
  { up: true, left: true },
  { up: true, right: true },
  { down: true, right: true },
  { down: true, left: true }
];

const getAllDirections = () => [
  ...getCrossDirections(),
  ...getDiagonalDirections()
];

const isPairConnected = ([, connected]) => connected;
const buildDirection = ([direction]) => ({
  [direction]: true
});
const getConnectedDirections = pipe(
  pick(["up", "down", "left", "right"]),
  toPairs,
  filter(isPairConnected),
  map(buildDirection)
);

export {
  getCrossDirections,
  getDiagonalDirections,
  getAllDirections,
  getConnectedDirections
};
