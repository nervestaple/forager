import { Sphere } from 'drei';
import React from 'react';
import { Mesh, Vector3 } from 'three';
import * as Colyseus from 'colyseus.js';
import { PLAYER_INPUT } from 'forager-server/src/constants';
import { State } from 'forager-server/src/State';

import { useGameLoop } from './useGameLoop';
import { useKeyPress } from './useKeyPress';

const client = new Colyseus.Client('ws://localhost:4000');

const keyDirections: { [key: string]: Vector3 } = {
  w: new Vector3(0, 0, -1),
  a: new Vector3(-1, 0, 0),
  s: new Vector3(0, 0, 1),
  d: new Vector3(1, 0, 0),
};

export function Player(): React.ReactElement | null {
  const ref = React.useRef<Mesh>(null);

  const room = useRoom();
  const playerId = usePlayerId(room);
  usePlayerInput(room, playerId);
  console.log({ playerId });

  if (!playerId) {
    return null;
  }

  return (
    <Sphere ref={ref} position={[0, 1, 0]}>
      <meshBasicMaterial attach="material" color="cyan" />
    </Sphere>
  );
}

function usePlayerId(room: Colyseus.Room<State> | null): string | null {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!room) {
      return;
    }
    room.state.entities.onAdd = (item, key) => {
      console.log('onAdd', { item, key });
      setId(key);
    };
  }, [room]);

  return id;
}

function usePlayerInput(
  room: Colyseus.Room | null,
  playerId: string | null,
): void {
  const keys = useKeyPress();

  useGameLoop(() => {
    if (!room || !playerId) {
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
  });
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
