import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Grid } from "../components/index";

const Battle = () => {
  return (
    <main>
      <div class="battle-map">
        <Grid
          sheet={tileSheet}
          tiles={[
            [{ icon: [0, 1] }, 2, 3],
            [4, 5, 6],
          ]}
        />
      </div>
    </main>
  );
};

export default Battle;
