import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Server } from "../components";
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

const Map = ({ map: { servers } }) => {
  return (
    <main>
      <p>--- The Cloud -----------------------[x]---</p>
      <div class="map">
        {servers.map((server, index) => (
          <Server
            sheet={tileSheet}
            icon={server.icon}
            label={server.name}
            statusCode={server.statusCode}
            onclick={(state) => StartBattle(state, index)}
          />
        ))}
      </div>
    </main>
  );
};

export default Map;
