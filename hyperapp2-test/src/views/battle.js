import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Sprite, Grid } from "../components/index";
import { deepClone } from "../utils";

const isUnitHeadAtLocation = (unit, [row, col]) =>
  unit.tiles[0][0] === row && unit.tiles[0][1] === col;
const isUnitAtLocation = (unit, [row, col]) =>
  unit.tiles.some((tile) => tile[0] === row && tile[1] === col);

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

const UnitInfo = ({
  unit: {
    name = "NONE SELECTED",
    icon = [0, 3],
    size = [],
    abilities = [],
    moves = [],
  },
}) => {
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

const Battle = ({ battle: { tiles, selected, units } }) => {
  const selectedInfo =
    tiles[selected[0]] &&
    units.find((unit) => isUnitHeadAtLocation(unit, selected));

  return (
    <main>
      <div class="battle-map">
        <Grid
          sheet={tileSheet}
          tiles={tiles.map((row, rowIndex) =>
            row.map((tile, colIndex) => {
              const unitHead = units.find((unit) =>
                isUnitHeadAtLocation(unit, [rowIndex, colIndex])
              );
              if (unitHead) {
                return unitHead;
              }

              const unitPiece = units.find((unit) =>
                isUnitAtLocation(unit, [rowIndex, colIndex])
              );
              if (unitPiece) {
                return { ...unitPiece, icon: [] };
              }

              return tile;
            })
          )}
          onTileClick={SelectUnit}
          selected={selected}
        />
      </div>
      <UnitInfo unit={selectedInfo ? selectedInfo : {}} />
    </main>
  );
};

export default Battle;
