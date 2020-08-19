const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const updateArray = (array, index, updater) => [
  ...array.slice(0, index),
  updater(array[index]),
  ...array.slice(index + 1),
];

export { deepClone, updateArray };
