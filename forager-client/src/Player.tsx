import { Sphere } from 'drei';
import React from 'react';
import { Mesh, Vector3 } from 'three';
import * as Colyseus from 'colyseus.js';
import { State } from 'forager-server/src/State';

import { PlayerControl } from './PlayerControl';
import { useThree } from 'react-three-fiber';

const client = new Colyseus.Client('ws://localhost:4000');

export function Player(): React.ReactElement | null {
  const ref = React.useRef<Mesh>(null);
  const room = useRoom();
  const player = usePlayer(room);
  usePlayerPosition(player, ref);

  if (!room) {
    return null;
  }

  return (
    <>
      {room && player && <PlayerControl room={room} />}
      <Sphere ref={ref} position={[0, 1, 0]} args={[5]}>
        <meshBasicMaterial attach="material" color="cyan" />
      </Sphere>
    </>
  );
}

const CAMERA_OFFSET = new Vector3(0, 500, 500);

function usePlayerPosition(
  player: State['player'] | null,
  ref: React.RefObject<Mesh>,
) {
  const three = useThree();
  React.useEffect(() => {
    if (!player || !ref.current) {
      return;
    }

    player.position.onChange = (changes) => {
      if (!ref.current) {
        return;
      }
      const positionUpdate = changes.reduce(
        (acc, { field, value }) => ({ ...acc, [field]: value }),
        {},
      );
      Object.assign(ref.current.position, positionUpdate);
      three.camera.position.copy(
        ref.current.position.clone().add(CAMERA_OFFSET),
      );
    };
  }, [three.camera.position, player, ref]);
}
function usePlayer(room: Colyseus.Room<State> | null): State['player'] | null {
  const [player, setPlayer] = React.useState<State['player'] | null>(null);

  React.useEffect(() => {
    if (!room) {
      return;
    }
    room.state.player.onChange = () => {
      setPlayer(room.state.player);
    };
  }, [room]);

  return player;
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
