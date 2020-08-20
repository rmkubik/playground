import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Sprite, Grid } from "../components/index";
import {
  deepClone,
  updateArray,
  isUnitHeadAtLocation,
  isUnitAtLocation,
  getNeighbors,
  findAllIndices,
  manhattanDistance,
  pickRandomlyFromArray,
} from "../utils";

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

const isLocationValidMoveTarget = (
  { units, tiles, selected, selectedAction },
  location
) => {
  const neighbors = getNeighbors(tiles, location);
  // is neighboring tile selected and a unit's head
  const neighborUnitHead = units.find((unit) =>
    isUnitHeadAtLocation(unit, selected)
  );

  return (
    neighbors.some(
      (neighbor) =>
        selected[0] === neighbor[0] &&
        selected[1] === neighbor[1] && // is selected tile a neighbor of this one
        neighborUnitHead && // is the selected tile a unit head
        !units.some((unit) => isUnitAtLocation(unit, location)) && // is the selected tile empty
        neighborUnitHead.moves[0] > 0
    ) && selectedAction === -1
  );
};

const isLocationValidAttackTarget = (
  { units, tiles, selected, selectedAction },
  location
) => {
  const neighbors = getNeighbors(tiles, location);
  // is neighboring tile selected and a unit's head
  return (
    neighbors.some(
      (neighbor) =>
        selected[0] === neighbor[0] &&
        selected[1] === neighbor[1] && // is selected tile a neighbor of this one
        units.some((unit) => isUnitHeadAtLocation(unit, selected)) // is the selected tile a unit head
      // && units.some((unit) => isUnitAtLocation(unit, selected)) // is the selected tile an enemy unit
    ) && selectedAction !== -1
  );
};

const MoveUnit = (state, selectedUnitIndex, location) => {
  return {
    ...state,
    battle: {
      ...state.battle,
      units: updateArray(state.battle.units, selectedUnitIndex, (unit) => {
        if (unit.moves[0] === 0) {
          // if we're out of moves, make no unit changes
          return unit;
        }

        const tiles = [location, ...unit.tiles];

        if (tiles.length > unit.size) {
          tiles.pop();
        }

        return {
          ...unit,
          moves: [unit.moves[0] - 1, unit.moves[1]],
          tiles,
        };
      }),
      selected: location,
    },
  };
};

const UseAbility = (state, selectedUnitIndex, location) => {
  // if (selectedAction === 'hack') {
  //
  // }

  const selectedUnit = state.battle.units[selectedUnitIndex];
  const ability =
    state.moves[selectedUnit.abilities[state.battle.selectedAction]];

  if (selectedUnit.ap[0] === 0) {
    // if we're out of ap, make no changes
    return state;
  }

  const targetUnitIndex = state.battle.units.findIndex((unit) =>
    isUnitAtLocation(unit, location)
  );

  if (targetUnitIndex === -1) {
    return state;
  }

  const apUpdatedState = updateArray(
    state.battle.units,
    selectedUnitIndex,
    (unit) => {
      return {
        ...unit,
        ap: [unit.ap[0] - 1, unit.ap[1]],
      };
    }
  );

  const damagedEnemyUnit = updateArray(
    apUpdatedState,
    targetUnitIndex,
    (unit) => {
      const tiles = unit.tiles.slice(0, unit.tiles.length - ability.power);

      return {
        ...unit,
        tiles,
      };
    }
  ).filter((unit) => unit.tiles.length > 0);

  return {
    ...state,
    battle: {
      ...state.battle,
      units: damagedEnemyUnit,
      selectedAction: -1,
    },
  };
};

const ClickTile = (state, location) => {
  const deselectedAbilityState = DeselectAbility(state);
  const selectedUnitIndex = state.battle.units.findIndex((unit) =>
    isUnitHeadAtLocation(unit, state.battle.selected)
  );
  const selectedUnit = state.battle.units[selectedUnitIndex];

  if (
    state.battle.selected[0] === location[0] &&
    state.battle.selected[1] === location[1]
  ) {
    return DeselectUnit(deselectedAbilityState);
  } else if (
    state.battle.selected.length === 2 &&
    state.battle.selectedAction === -1 &&
    isLocationValidMoveTarget(state.battle, location) &&
    selectedUnit.owner === 0 // only let player move own units
  ) {
    // move action
    return MoveUnit(state, selectedUnitIndex, location);
  } else if (
    state.battle.selected.length === 2 &&
    state.battle.selectedAction !== -1 &&
    isLocationValidAttackTarget(state.battle, location) &&
    selectedUnit.owner === 0 // only let player use action of own units
  ) {
    // ability action
    return UseAbility(state, selectedUnitIndex, location);
  } else {
    return SelectUnit(deselectedAbilityState, location);
  }
};

const EndTurn = (state) => {
  // perform enemy actions
  const isNotActedEnemyUnit = (unit) => !unit.acted && unit.owner !== 0;

  let newState = deepClone(state);

  state.battle.units.forEach((unit, index) => {
    if (isNotActedEnemyUnit(unit)) {
      // find x and y distance to nearest player unit
      // const playerUnitDistances = state.battle.units
      //   .map((unit, index) => [manhattanDistance(), unit, index])
      //   .filter((unit) => unit.owner === 0);
      // const nearestPlayerUnit = {};
      // move x or y toward nearest player unit
      // recurse until moves are 0
      // is neighboring player unit?
      // use ability on player unit
      newState = SelectUnit(newState, unit.tiles[0]);
      const neighbors = getNeighbors(newState.battle.tiles, unit.tiles[0]);
      const moveOptions = neighbors.filter((neighbor) =>
        isLocationValidMoveTarget(newState.battle, neighbor)
      );

      if (moveOptions.length > 0) {
        newState = MoveUnit(
          newState,
          index,
          pickRandomlyFromArray(moveOptions)
        );
      }

      newState = DeselectAbility(newState);
      newState = DeselectUnit(newState);
    }
  });

  // reset units
  const units = newState.battle.units.map((unit) => ({
    ...unit,
    moves: [unit.moves[1], unit.moves[1]],
    ap: [unit.ap[1], unit.ap[1]],
    acted: false,
  }));

  return {
    ...state,
    battle: {
      ...state.battle,
      turn: state.battle.turn + 1,
      units,
    },
  };
};

const UnitInfo = ({
  unit: {
    name = "NONE SELECTED",
    icon = [0, 3],
    size = undefined,
    ap = [],
    abilities = [],
    moves = [],
    tiles = [],
  },
}) => {
  const header = `--[ ${name} ]--`;
  const HR = () => <p>{"-".repeat(header.length)}</p>;

  return (
    <div class="unit-info">
      <p>{header}</p>
      <Sprite sheet={tileSheet} icon={icon} scale={3} />
      <p>{`Size: ${tiles.length ?? "?"}/${size ?? "?"}`}</p>
      <p>{`Moves: ${moves[0] ?? "?"}/${moves[1] ?? "?"}`}</p>
      <p>{`Actions: ${ap[0] ?? "?"}/${ap[1] ?? "?"}`}</p>
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
  battle: { tiles, selected, units, selectedAction, turn },
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
              if (tile === null) {
                tile = {
                  name: undefined,
                  icon: undefined,
                  size: undefined,
                  abilities: [],
                  moves: [],
                  tiles: [],
                };
              }

              const moveTarget = isLocationValidMoveTarget(
                { tiles, selected, units, selectedAction },
                [rowIndex, colIndex]
              );
              const attackTarget = isLocationValidAttackTarget(
                { tiles, selected, units, selectedAction },
                [rowIndex, colIndex]
              );

              const unitHead = units.find((unit) =>
                isUnitHeadAtLocation(unit, [rowIndex, colIndex])
              );
              if (unitHead) {
                return {
                  ...unitHead,
                  attackTarget,
                };
              }

              const unitPiece = units.find((unit) =>
                isUnitAtLocation(unit, [rowIndex, colIndex])
              );
              if (unitPiece) {
                return {
                  ...unitPiece,
                  icon: [],
                  attackTarget,
                };
              }

              return {
                ...tile,
                moveTarget,
                attackTarget,
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
      <p>Turn: {turn + 1}</p>
      <button onclick={EndTurn}>End Turn</button>
    </main>
  );
};

export default Battle;
