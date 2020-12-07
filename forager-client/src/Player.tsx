import { Sphere } from 'drei';
import React from 'react';
import { Mesh, Vector3 } from 'three';

import { useGameLoop } from './useGameLoop';
import { useKeyPress } from './useKeyPress';

const keyDirections: { [key: string]: Vector3 } = {
  w: new Vector3(0, 1, 0),
  a: new Vector3(-1, 0, 0),
  s: new Vector3(0, -1, 0),
  d: new Vector3(1, 0, 0),
};

const SPEED = 0.1;

export function Player(): React.ReactElement {
  const ref = React.useRef<Mesh>(null);

  const keys = useKeyPress();

  useGameLoop(() => {
    if (!ref.current) {
      return;
    }

    const inputDirection = [...keys]
      .filter((k) => keyDirections[k])
      .map((k) => keyDirections[k])
      .reduce((prev, curr) => prev.add(curr), new Vector3())
      .normalize()
      .multiplyScalar(SPEED);

    ref.current.position.addVectors(ref.current.position, inputDirection);
  });

  return (
    <Sphere ref={ref}>
      <meshBasicMaterial attach="material" color="hotpink" />
    </Sphere>
  );
}
