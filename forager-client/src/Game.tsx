import { Cylinder } from 'drei';
import React from 'react';
import { Vector3 } from 'three';

import { Player } from './Player';

export function Game(): React.ReactElement {
  return (
    <>
      <Tree />
      <Player />
    </>
  );
}

function Tree() {
  return (
    <>
      <Cylinder />
    </>
  );
}
