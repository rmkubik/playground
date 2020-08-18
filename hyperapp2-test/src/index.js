import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import "./main.scss";

import { views } from "./views";

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
      servers: [
        {
          name: "127.0.0.1",
          icon: [0, 0],
          statusCode: 200,
          tiles: [
            [{ icon: [0, 1] }, 2, 3],
            [4, 5, 6],
          ],
        },
        {
          name: "com.google",
          icon: [0, 0],
          statusCode: 404,
          tiles: [
            [1, 2, 3],
            [4, { icon: [0, 1] }, 6],
          ],
        },
      ],
      selected: -1,
    },
    battle: {
      tiles: [
        [{ icon: [0, 1] }, 2, 3],
        [4, 5, 6],
      ],
      selected: [],
    },
  },
  view: App,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    state.view === "main" && onClick(Click),
    state.view === "main" && onKeyDown(Click),
  ],
});
