import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Sprite, Grid } from "../components/index";
import { deepClone } from "../utils";

const isUnitHeadAtLocation = (unit, [row, col]) =>
  unit.tiles[0][0] === row && unit.tiles[0][1] === col;
const isUnitAtLocation = (unit, [row, col]) =>
  unit.tiles.some((tile) => tile[0] === row && tile[1] === col);

const isLocationInBounds = (tiles, location) =>
  location[0] >= 0 &&
  location[1] >= 0 &&
  location[0] < tiles.length &&
  location[1] < tiles[0].length;

const getNeighbors = (tiles, location) => {
  return [
    [location[0] + 1, location[1]],
    [location[0] - 1, location[1]],
    [location[0], location[1] + 1],
    [location[0], location[1] - 1],
  ].filter((neighbor) => isLocationInBounds(tiles, neighbor));
};

const SelectAbility = (state, index) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      selectedAction: index,
    },
  };
};

const DeselectAbility = (state) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      selectedAction: -1,
    },
  };
};

const ClickAbility = (state, index) => {
  if (state.battle.selectedAction === index) {
    return DeselectAbility(state);
  } else {
    return SelectAbility(state, index);
  }
};

const SelectUnit = (state, location) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      selected: location,
    },
  };
};

const DeselectUnit = (state) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      selected: [],
    },
  };
};

const ClickTile = (state, location) => {
  const deselectedAbilityState = DeselectAbility(state);

  if (
    state.battle.selected[0] === location[0] &&
    state.battle.selected[1] === location[1]
  ) {
    return DeselectUnit(deselectedAbilityState);
  } else {
    return SelectUnit(deselectedAbilityState, location);
  }
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
        {abilities.map((ability, index) => (
          <li
            onclick={(state) => ClickAbility(state, index)}
            class={ability.selected && "selected"}
          >{`${ability.key} - ${ability.power}`}</li>
        ))}
      </ul>
      <HR />
    </div>
  );
};

const Battle = ({
  battle: { tiles, selected, units, selectedAction },
  moves,
}) => {
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

              const neighbors = getNeighbors(tiles, [rowIndex, colIndex]);
              // is neighboring tile selected and a unit's head
              const isNeighborSelected = neighbors.some(
                (neighbor) =>
                  selected[0] === neighbor[0] &&
                  selected[1] === neighbor[1] &&
                  units.some((unit) => isUnitHeadAtLocation(unit, selected))
              );

              const unitPiece = units.find((unit) =>
                isUnitAtLocation(unit, [rowIndex, colIndex])
              );
              if (unitPiece) {
                return {
                  ...unitPiece,
                  icon: [],
                };
              }

              return {
                ...tile,
                moveTarget: isNeighborSelected && selectedAction === -1,
                attackTarget: isNeighborSelected && selectedAction !== -1,
              };
            })
          )}
          onTileClick={ClickTile}
          selected={selected}
        />
      </div>
      <UnitInfo
        unit={
          selectedInfo
            ? {
                ...selectedInfo,
                abilities: selectedInfo.abilities.map((ability, index) => ({
                  ...moves[ability],
                  selected: selectedAction === index,
                })),
              }
            : {}
        }
      />
    </main>
  );
};

export default Battle;
