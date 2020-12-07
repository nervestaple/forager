import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Game } from './Game';

import { useWindowSize } from './useWindowSize';

export function App(): React.ReactElement {
  const [width, height] = useWindowSize();
  const [cameraZoom] = React.useState(15);

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
          position: [0, 100, 100],
          zoom: cameraZoom,
          near: 0.01,
          far: 300,
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
          args={[100, 50, 'blue', 'hotpink']}
          rotation={[0, Math.PI / 4, 0]}
        />
      </Canvas>
    </div>
  );
}
