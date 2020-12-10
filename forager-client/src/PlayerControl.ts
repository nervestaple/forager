import { Room } from 'colyseus.js';
import { Vector3 } from 'three';
import { PLAYER_MOVEMENT } from 'forager-server/src/constants';
import { State } from 'forager-server/src/State';

import { useGameLoop } from './useGameLoop';
import { useKeyPress } from './useKeyPress';

const keyDirections: { [key: string]: Vector3 } = {
  w: new Vector3(0, 0, -1),
  a: new Vector3(-1, 0, 0),
  s: new Vector3(0, 0, 1),
  d: new Vector3(1, 0, 0),
};

interface Props {
  room: Room<State>;
}

export function PlayerControl({ room }: Props): null {
  const keys = useKeyPress();

  useGameLoop(() => {
    const inputDirection = [...keys]
      .filter((k) => keyDirections[k])
      .map((k) => keyDirections[k])
      .reduce((prev, curr) => prev.add(curr), new Vector3())
      .normalize();

    if (inputDirection.lengthSq() > 0) {
      room.send(PLAYER_MOVEMENT, inputDirection);
    }
  });

  return null;
}
