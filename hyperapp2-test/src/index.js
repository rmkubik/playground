import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import "./main.scss";

import { views } from "./views";
import levels from "./levels";

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

const App = ({ view = "main", map, battle }) => {
  const CurrentView = views[view];

  return <CurrentView map={map} battle={battle} />;
};

app({
  init: {
    view: "main",
    map: {
      servers: levels.map((level) => ({ ...level, statusCode: 404 })),
      selected: -1,
    },
    battle: {
      tiles: [[]],
      selected: [],
      units: [],
    },
  },
  view: App,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    state.view === "main" && onClick(Click),
    state.view === "main" && onKeyDown(Click),
  ],
});
