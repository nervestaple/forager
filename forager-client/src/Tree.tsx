import { Cone, Cylinder } from 'drei';
import React from 'react';
import { Vector3 } from 'three';
import { range } from 'lodash-es';

interface Props {
  position: Vector3;
  levels: number;
  scale: number;
}

const TRUNK_POS = new Vector3(0, 5, 0);
const FOLIAGE_POS = new Vector3(0, 15, 0);
const FOLIAGE_LEVEL = new Vector3(0, 4, 0);

export function Tree({
  position,
  levels,
  scale = 1,
}: Props): React.ReactElement {
  const scaleVec = new Vector3(scale, scale, scale);
  return (
    <>
      <Cylinder
        args={[1, 1, 10]}
        position={position.clone().add(TRUNK_POS).multiplyScalar(scale)}
        scale={scaleVec}
      >
        <meshBasicMaterial attach="material" color="green" />
      </Cylinder>
      {range(levels).map((n) => (
        <Cone
          scale={scaleVec}
          key={n}
          args={[5, 10]}
          position={position
            .clone()
            .add(FOLIAGE_POS)
            .addScaledVector(FOLIAGE_LEVEL, n + 1)
            .multiplyScalar(scale)}
        >
          <meshBasicMaterial attach="material" color="purple" />
        </Cone>
      ))}
    </>
  );
}
