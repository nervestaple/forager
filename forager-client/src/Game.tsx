import { Cone, Cylinder } from 'drei';
import React from 'react';
import { Vector3 } from 'three';
import { random, range } from 'lodash-es';

import { Player } from './Player';
import { Tree } from './Tree';

export function Game(): React.ReactElement {
  return (
    <>
      {range(20).map((k) => {
        const age = random(0, 100);
        return (
          <Tree
            position={new Vector3(random(-100, 100), 0, random(-100, 100))}
            levels={random(1, 3, false)}
            key={k}
            scale={random(0.1, 1)}
          />
        );
      })}
      <Player />
    </>
  );
}
