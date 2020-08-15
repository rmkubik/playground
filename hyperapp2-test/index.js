import { app } from "hyperapp";
import h from "./hyperapp-jsx";
import { onAnimationFrame } from "@hyperapp/events";
import titleTxt from "./assets/title.txt";

const AddTodo = (state) => ({
  ...state,
  todos: state.todos.concat(state.value),
});

const NewValue = (state, event) => ({
  ...state,
  value: event.target.value,
});

console.log(titleTxt);

const Todos = ({ todos = [], value }) => {
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

app({
  init: { todos: [], value: "" },
  view: Todos,
  node: document.getElementById("app"),
});
