import level1 from "../assets/level1.txt";
import level2 from "../assets/level2.txt";

const parse = (level) => {
  const lines = level.split("\n");
  const icon = lines[1].split(" ");
  const tiles = lines.slice(2).map((row) =>
    row.split(" ").map((char) => {
      switch (char) {
        case "s":
          return { icon: [0, 1], bg: "#5454ff" };
        case "x":
          return { icon: [0, 2], bg: "#ff5454" };
        default:
          return {};
      }
    })
  );

  return {
    name: lines[0],
    icon,
    tiles,
  };
};

export default [parse(level1), parse(level2)];
