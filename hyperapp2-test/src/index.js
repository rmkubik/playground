import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import "./main.scss";

import { views } from "./views";
import levels from "./levels";
import moves from "./moves";

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

const App = (state) => {
  const { view = "main", map, battle, moves } = state;

  console.log(state);

  const CurrentView = views[view];

  return <CurrentView map={map} battle={battle} moves={moves} />;
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
      prevUnits: [],
      selectedAction: -1,
      turn: 0,
    },
    moves,
    animations: [],
  },
  view: App,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    state.view === "main" && onClick(Click),
    state.view === "main" && onKeyDown(Click),
  ],
});

// const animation = {
//  target: DOMElement,
//  new
//   target: {
//     lens: (state) => state.prop,
//     newValue: "newValue",
//   },
//   state: "UNSTARTED", // 'UNSTARTED', 'RUNNING', 'DONE'
// };

// instead of updating the new state change immediately
// track an animation in state
// the consuming component begins its animation
// oncomplete, update state

// to assign an animation I need:
// a ref to the dom element?
// I need to add a css class so that I can start the animation
// I need to attach an onanimationend event
// on the end event, i update state to set the final state change

//
