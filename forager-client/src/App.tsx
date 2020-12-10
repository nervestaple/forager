import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Game } from './Game';

import { useWindowSize } from './useWindowSize';

export function App(): React.ReactElement {
  const [width, height] = useWindowSize();
  const [cameraZoom] = React.useState(3);

  return (
    <div
      style={{
        position: 'relative',
        userSelect: 'none',
        width,
        height,
      }}
    >
      <Canvas
        camera={{
          position: [0, 300, 300],
          zoom: cameraZoom,
          near: 0.000001,
          far: 1000,
        }}
        orthographic
        noEvents
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gl2="true"
        gl={{ antialias: true }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Game />
        <gridHelper
          args={[500, 50, 'blue', 'hotpink']}
          rotation={[0, Math.PI / 4, 0]}
        />
      </Canvas>
    </div>
  );
}
