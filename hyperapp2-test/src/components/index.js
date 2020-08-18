import h from "../hyperapp-jsx";

const TILE_SIZE = 16;

const Sprite = ({
  sheet,
  icon: [row, col] = [],
  color = "white",
  bg = "transparent",
  scale = 1,
  onclick,
  selected,
  moveTarget,
  attackTarget,
}) => {
  return (
    <div
      class={`sprite${selected ? " selected" : ""}${
        moveTarget ? " move-target" : ""
      }${attackTarget ? " attack-target" : ""}`}
      style={{
        width: `${TILE_SIZE * scale}px`,
        height: `${TILE_SIZE * scale}px`,
        backgroundColor: bg,
      }}
      onclick={onclick}
    >
      {row !== undefined && (
        <div
          style={{
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            backgroundColor: color,
            webkitMaskImage: `url(${sheet})`,
            webkitMaskPosition: `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`,
            position: "absolute",
          }}
        ></div>
      )}
      {moveTarget && (
        <div
          style={{
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            backgroundColor: "cyan",
            webkitMaskImage: `url(${sheet})`,
            webkitMaskPosition: `-${4 * TILE_SIZE}px -${0 * TILE_SIZE}px`,
            position: "absolute",
          }}
        ></div>
      )}
      {attackTarget && (
        <div
          style={{
            width: `${TILE_SIZE}px`,
            height: `${TILE_SIZE}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            backgroundColor: "red",
            webkitMaskImage: `url(${sheet})`,
            webkitMaskPosition: `-${5 * TILE_SIZE}px -${0 * TILE_SIZE}px`,
            position: "absolute",
          }}
        ></div>
      )}
    </div>
  );
};

const Server = ({ sheet, icon, label, statusCode, onclick }) => {
  const color = Math.floor(statusCode / 100) === 2 ? "green" : "red";

  return (
    <div class="server" onclick={onclick}>
      <Sprite sheet={sheet} icon={icon} scale={3} />
      <p>{label}</p>
      <p class="statusCode">
        <span class="flash animated infinite" style={{ color }}>
          ●{" "}
        </span>{" "}
        {statusCode}
      </p>
    </div>
  );
};

const Grid = ({ sheet, tiles, onTileClick, selected }) => {
  const scale = 3;
  return (
    <div
      class="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `${TILE_SIZE * scale + 16}px `.repeat(
          tiles[0].length
        ),
        gridTemplateRows: `${TILE_SIZE * scale + 16}px `.repeat(tiles.length),
      }}
    >
      {[].concat(
        ...tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Sprite
              onclick={(state) => onTileClick(state, [rowIndex, colIndex])}
              sheet={sheet}
              scale={scale}
              selected={selected[0] === rowIndex && selected[1] === colIndex}
              {...tile}
            />
          ))
        )
      )}
    </div>
  );
};

export { Sprite, Server, Grid };
