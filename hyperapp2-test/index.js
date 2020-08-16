import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import titleTxt from "./assets/title.txt";
import tileSheet from "./assets/tiles.png";

import "./main.scss";

const TILE_SIZE = 16;

const onDomEvent = (eventType) =>
  (() => {
    const subFn = (dispatch, options) => {
      const onEventFn = (event) => {
        dispatch(options.action, event);
      };

      document.addEventListener(eventType, onEventFn);

      return () => document.removeEventListener(eventType, onEventFn);
    };
    return (action) => [subFn, { action }];
  })();

const onClick = onDomEvent("click");

const onKeyDown = onDomEvent("keydown");

const Click = (state, event) => {
  if (state.view === "main") {
    return {
      ...state,
      view: "map",
    };
  }
};

const StartBattle = (state, event) => {
  return {
    ...state,
    view: "battle",
  };
};

const Sprite = ({ sheet, row, col, scale = 1 }) => {
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
          background: `url(${sheet}) -${col * TILE_SIZE}px -${
            row * TILE_SIZE
          }px`,
          width: `${TILE_SIZE}px`,
          height: `${TILE_SIZE}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      ></div>
    </div>
  );
};

const Server = ({ sheet, row, col, label, statusCode }) => {
  const color = Math.floor(statusCode / 100) === 2 ? "green" : "red";

  return (
    <div class="server" onclick={StartBattle}>
      <Sprite sheet={sheet} row={row} col={col} scale={3} />
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

const Main = () => {
  return (
    <main>
      <pre>{titleTxt}</pre>
      <p>
        Press any key to continue...{" "}
        <span class="flash animated infinite">|</span>
      </p>
    </main>
  );
};

const Map = () => {
  return (
    <main>
      <p>--- The Cloud -----------------------[x]---</p>
      <div class="map">
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="127.0.0.1"
          statusCode={200}
        />
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="com.google"
          statusCode={404}
        />
      </div>
    </main>
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
      }}
    >
      {[].concat(
        ...tiles.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Sprite sheet={sheet} row={0} col={0} scale={scale} />
          ))
        )
      )}
    </div>
  );
};

const Battle = () => {
  return (
    <main>
      <div class="battle-map">
        <Grid
          sheet={tileSheet}
          tiles={[
            [1, 2, 3],
            [4, 5, 6],
          ]}
        />
      </div>
    </main>
  );
};

const views = {
  main: Main,
  map: Map,
  battle: Battle,
};

const App = ({ view = "main" }) => {
  const CurrentView = views[view];

  return <CurrentView />;
};

app({
  init: { view: "main" },
  view: App,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    state.view === "main" && onClick(Click),
    state.view === "main" && onKeyDown(Click),
  ],
});
