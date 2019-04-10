import { pipe, update, adjust } from "ramda";
import { fillArray } from "../arrays";

const fillMatrix = ({ width, height }) =>
  pipe(
    fillArray(width),
    fillArray(height)
  );

const initMatrix = dimensions => fillMatrix(dimensions)(0);

const mapMatrix = cb => matrix =>
  matrix.map((array, row) =>
    array.map((value, col) => cb(value, { row, col }, matrix))
  );

const constructMatrix = constructor =>
  pipe(
    initMatrix,
    mapMatrix(constructor)
  );

const updateMatrix = location => value => matrix =>
  adjust(
    location.row,
    update(location.col, value, matrix[location.row]),
    matrix
  );

export { fillMatrix, initMatrix, mapMatrix, constructMatrix, updateMatrix };
