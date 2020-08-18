import level1 from "../assets/level1.txt";

const parse = (level) => {
  const lines = level.split("\n");
  const icon = lines[1].split(" ");
  const tiles = lines.slice(2).map((row) =>
    row.split(" ").map((char) => {
      switch (char) {
        case "s":
          return { icon: [0, 1], color: "#5454ff" };
        case "x":
          return { icon: [0, 2], color: "#ff5454" };
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

export default [parse(level1)];
