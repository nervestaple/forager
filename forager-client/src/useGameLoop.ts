import { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

export function useGameLoop(callback: FrameRequestCallback): void {
  const callbackRef = useRef<FrameRequestCallback>();
  callbackRef.current = callback;

  useFrame(({ clock }) => {
    const time = clock.oldTime; // clock.elapsedTime / 1000;

    callback(time);
  });
}
