import h from "../hyperapp-jsx";

const TILE_SIZE = 16;

const StartBattle = (state, event) => {
  return {
    ...state,
    view: "battle",
  };
};

const Sprite = ({ sheet, icon: [row, col], color = "white", scale = 1 }) => {
  return (
    <div
      class="sprite"
      style={{
        width: `${TILE_SIZE * scale}px`,
        height: `${TILE_SIZE * scale}px`,
      }}
    >
      <div
        style={{
          width: `${TILE_SIZE}px`,
          height: `${TILE_SIZE}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          backgroundColor: color,
          webkitMaskImage: `url(${sheet})`,
          webkitMaskPosition: `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`,
        }}
      ></div>
    </div>
  );
};

const Server = ({ sheet, row, col, label, statusCode }) => {
  const color = Math.floor(statusCode / 100) === 2 ? "green" : "red";

  return (
    <div class="server" onclick={StartBattle}>
      <Sprite sheet={sheet} icon={[row, col]} scale={3} />
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

const Grid = ({ sheet, tiles }) => {
  const scale = 3;
  return (
    <div
      class="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `${TILE_SIZE * scale + 16}px `.repeat(
          tiles[0].length
        ),
        gridTemplateRows: `${TILE_SIZE * scale + 16}px `.repeat(
          tiles[0].length
        ),
      }}
    >
      {[].concat(
        ...tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) =>
            tile.icon ? (
              <Sprite sheet={sheet} icon={tile.icon} scale={scale} />
            ) : (
              <div></div>
            )
          )
        )
      )}
    </div>
  );
};

export { Sprite, Server, Grid };
