import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Sprite, Grid } from "../components/index";

const UnitInfo = ({ name, icon, size, abilities, moves }) => {
  const header = `--[ ${name} ]--`;
  return (
    <div class="unit-info">
      <p>{header}</p>
      <Sprite sheet={tileSheet} icon={icon} scale={3} />
      <p>{`Size: ${size[0]}/${size[1]}`}</p>
      <p>{`Moves: ${moves[0]}/${moves[1]}`}</p>
      <p>{"-".repeat(header.length)}</p>
      <ul>
        {abilities.map((ability) => (
          <li>{ability}</li>
        ))}
      </ul>
      <p>{"-".repeat(header.length)}</p>
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
            [{ icon: [0, 1] }, 2, 3],
            [4, 5, 6],
          ]}
        />
        <UnitInfo
          name={"HACK.slsh"}
          icon={[0, 1]}
          size={[3, 4]}
          abilities={["hack"]}
          moves={[2, 3]}
        />
      </div>
    </main>
  );
};

export default Battle;
