import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import titleTxt from "./assets/title.txt";
import tiles from "./assets/tiles.png";

import "./main.scss";

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

// const SpriteContainer = styled.div`
//   width: ${(props) => props.width * props.scale}px;
//   height: ${(props) => props.height * props.scale}px;
//   background-color: ${(props) => props.theme.palette[props.background]};
// `;

// const Sprite = styled.div`
//   background: url(${(props) => props.sheet}) -${(props) =>
//       props.col * props.width}px -${(props) => props.row * props.height}px;
//   image-rendering: pixelated;
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height}px;
//   transform: scale(${(props) => props.scale});
//   transform-origin: top left;
// `;

const Sprite = ({ sheet, row, col, width, height, scale = 1 }) => {
  return (
    <div
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }}
    >
      <div
        style={{
          background: `url(${sheet}) -${col * width}px -${row * height}px`,
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      ></div>
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
      <p>Map View</p>
      <Sprite sheet={tiles} row={0} col={0} width={16} height={16} scale={3} />
      <p>127.0.0.1</p>
      <p>
        <span style={{ color: "green" }}>● </span> 200
      </p>
    </main>
  );
};

const views = {
  main: Main,
  map: Map,
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
