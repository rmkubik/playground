import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import titleTxt from "./assets/title.txt";
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

const Click = (state, event) => ({
  ...state,
  clicked: true,
});

const View = ({ clicked }) => {
  return (
    <main>
      <pre>{titleTxt}</pre>
      <p>
        Press any key to continue...{" "}
        <span class="flash animated infinite">|</span>
        {clicked ? <p>clicked!</p> : ""}
      </p>
    </main>
  );
};

app({
  init: { clicked: false },
  view: View,
  node: document.getElementById("app"),
  subscriptions: (state) => [
    !state.clicked && onClick(Click),
    !state.clicked && onKeyDown(Click),
  ],
});
