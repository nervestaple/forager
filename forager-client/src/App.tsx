import React from 'react';

import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import OfficeScene from './scenes/OfficeScene';
import OtherScene from './scenes/OtherScene';
import soundData from './soundData';
import spriteData from './spriteData';

function isString(s: unknown): s is string {
  return typeof s === 'string';
}

const urls = [
  ...Object.values(spriteData).map((data) => data.src),
  ...Object.values(soundData).map((data) => data.src),
]
  .flat()
  .filter(isString);

export function App(): React.ReactElement {
  const [width, height] = useWindowSize();

  return (
    <div style={{ width, height }}>
      <Game cameraZoom={80}>
        <AssetLoader urls={urls} placeholder="Loading assets ...">
          <SceneManager defaultScene="office">
            <Scene id="office">
              <OfficeScene />
            </Scene>
            <Scene id="other">
              <OtherScene />
            </Scene>
          </SceneManager>
        </AssetLoader>
      </Game>
    </div>
  );
}
