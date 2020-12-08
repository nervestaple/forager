import { Sphere } from 'drei';
import React from 'react';
import { Mesh, Vector3 } from 'three';
import * as Colyseus from 'colyseus.js';

import { useGameLoop } from './useGameLoop';
import { useKeyPress } from './useKeyPress';
import { PLAYER_INPUT } from './constants';

const client = new Colyseus.Client('ws://localhost:4000');

const keyDirections: { [key: string]: Vector3 } = {
  w: new Vector3(0, 0, -1),
  a: new Vector3(-1, 0, 0),
  s: new Vector3(0, 0, 1),
  d: new Vector3(1, 0, 0),
};

export function Player(): React.ReactElement {
  const ref = React.useRef<Mesh>(null);

  const room = useRoom();

  const keys = useKeyPress();

  useGameLoop(() => {
    if (!ref.current || !room) {
      return;
    }

    const inputDirection = [...keys]
      .filter((k) => keyDirections[k])
      .map((k) => keyDirections[k])
      .reduce((prev, curr) => prev.add(curr), new Vector3())
      .normalize();

    if (inputDirection.lengthSq() > 0) {
      room.send(PLAYER_INPUT, inputDirection);
    }

    ref.current.position.addVectors(ref.current.position, inputDirection);
  });

  return (
    <Sphere ref={ref} position={[0, 1, 0]}>
      <meshBasicMaterial attach="material" color="cyan" />
    </Sphere>
  );
}

function useRoom(): Colyseus.Room | null {
  const [room, setRoom] = React.useState<Colyseus.Room | null>(null);
  React.useEffect(() => {
    async function init() {
      // const rooms = await client.getAvailableRooms();
      const room = await client.joinOrCreate('world');
      setRoom(room);
    }

    init();
  }, []);

  return room;
}
