import h from "../hyperapp-jsx";

import { deepClone } from "../utils";

const StartBattle = (state, index) => {
  return {
    ...state,
    map: {
      ...state.map,
      selected: index,
    },
    battle: {
      ...state.battle,
      tiles: deepClone(state.map.servers[index].tiles),
      units: deepClone(state.map.servers[index].units),
    },
    view: "battle",
  };
};

const AdvanceStep = (state, event, finalStep) => {
  const step = state.connection.step + 1;

  if (step === finalStep) {
    return StartBattle(state, state.connection.battleIndex);
  }

  return {
    ...state,
    connection: {
      // prevent step from exceeding the finalStep
      step: Math.min(step, finalStep),
    },
  };
};

const Connection = ({ connection: { step } }) => {
  const steps = [
    <p className="animated flash" style={{ opacity: 0 }}>
      Establishing connection....
    </p>,
  ];

  return (
    <main onclick={(state, event) => AdvanceStep(state, event, steps.length)}>
      {steps.slice(0, step + 1)}
      <p className="" style={{ opacity: 1 }}>
        Press any key to{" "}
        {step === steps.length - 1 ? (
          <span class="flash animated" style={{ animationDelay: "750ms" }}>
            START
          </span>
        ) : (
          "continue"
        )}
        ... <span class="flash animated infinite">|</span>
      </p>
    </main>
  );
};

export default Connection;
