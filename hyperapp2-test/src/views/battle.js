import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Sprite, Grid } from "../components/index";
import { deepClone } from "../utils";

const SelectUnit = (state, location) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      selected: location,
    },
    view: "battle",
  };
};

const UnitInfo = ({ name, icon, size, abilities, moves }) => {
  const header = `--[ ${name} ]--`;
  const HR = () => <p>{"-".repeat(header.length)}</p>;

  return (
    <div class="unit-info">
      <p>{header}</p>
      <Sprite sheet={tileSheet} icon={icon} scale={3} />
      <p>{`Size: ${size[0] || "?"}/${size[1] || "?"}`}</p>
      <p>{`Moves: ${moves[0] || "?"}/${moves[1] || "?"}`}</p>
      <HR />
      <ul>
        {abilities.map((ability) => (
          <li>{ability}</li>
        ))}
      </ul>
      <HR />
    </div>
  );
};

const Battle = ({ battle: { tiles, selected } }) => {
  const selectedInfo = tiles[selected[0]] && tiles[selected[0]][selected[1]];

  return (
    <main>
      <div class="battle-map">
        <Grid
          sheet={tileSheet}
          tiles={tiles}
          onTileClick={SelectUnit}
          selected={selected}
        />
      </div>
      <UnitInfo
        name={selectedInfo ? selectedInfo.name : "NONE SELECTED"}
        icon={selectedInfo ? selectedInfo.icon : [0, 3]}
        size={selectedInfo ? selectedInfo.size : []}
        abilities={selectedInfo ? selectedInfo.abilities : []}
        moves={selectedInfo ? selectedInfo.moves : []}
      />
    </main>
  );
};

export default Battle;
