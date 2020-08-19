import level1 from "../assets/level1.txt";
import level2 from "../assets/level2.txt";

const parse = (level) => {
  const lines = level.split("\n");
  const icon = lines[1].split(" ");
  const units = [];
  const tiles = lines.slice(2).map((row, rowIndex) =>
    row.split(" ").map((char, colIndex) => {
      switch (char) {
        case "s":
          units.push({
            icon: [0, 1],
            bg: "#5454ff",
            name: "HACK.slsh",
            size: 4,
            abilities: ["hack"],
            moves: [3, 3],
            tiles: [[rowIndex, colIndex]],
          });
          break;
        case "x":
          units.push({
            icon: [0, 2],
            bg: "#ff5454",
            name: "GUARD_AV",
            size: 3,
            abilities: ["bash"],
            moves: [2, 2],
            tiles: [[rowIndex, colIndex]],
          });
          break;
        default:
          break;
      }

      return undefined;
    })
  );

  return {
    name: lines[0],
    icon,
    tiles,
    units,
  };
};

export default [parse(level1), parse(level2)];
