import movesData from "../assets/moves.txt";

const moves = {};

movesData.split("\n").forEach((line) => {
  const [key, power] = line.split(" ");

  moves[key] = { key, power };
});

export default moves;
