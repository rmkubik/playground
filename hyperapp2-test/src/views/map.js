import h from "../hyperapp-jsx";

import tileSheet from "../../assets/tiles.png";

import { Server } from "../components";

const Map = () => {
  return (
    <main>
      <p>--- The Cloud -----------------------[x]---</p>
      <div class="map">
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="127.0.0.1"
          statusCode={200}
        />
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="com.google"
          statusCode={404}
        />
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="com.twitter"
          statusCode={500}
        />
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="com.wikipedia"
          statusCode={403}
        />
        <Server
          sheet={tileSheet}
          row={0}
          col={0}
          label="com.email"
          statusCode={403}
        />
      </div>
    </main>
  );
};

export default Map;
