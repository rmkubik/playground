import { app } from "hyperapp";
import h from "./hyperapp-jsx";

import titleTxt from "./assets/title.txt";
import "./main.scss";

const AddTodo = (state) => ({
  ...state,
  todos: state.todos.concat(state.value),
});

const NewValue = (state, event) => ({
  ...state,
  value: event.target.value,
});

const onClick = (() => {
  const subFn = (dispatch, options) => {
    const onClickFn = (event) => {
      dispatch(options.action, event);
    };

    document.addEventListener("click", onClickFn);

    return () => document.removeEventListener("click", onClickFn);
  };
  return (action) => [subFn, { action }];
})();

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
  subscriptions: (state) => [!state.clicked && onClick(Click)],
});
