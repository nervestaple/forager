import { Schema, type, MapSchema } from '@colyseus/schema';

import { Player } from './Player';
import { Entity } from './Entity';
import { Vector3Schema } from './Vector3Schema';
import { Vector3 } from 'three';

const WORLD_SIZE = 200;

export class State extends Schema {
  width = WORLD_SIZE;
  height = WORLD_SIZE;

  @type(Player)
  player: Player = new Player().assign({
    position: new Vector3Schema({
      x: 0,
      y: 0,
      z: 0,
    }),
  });

  @type({ map: Entity })
  entities = new MapSchema<Entity>();

  initialize(): void {
    // noop
  }

  createPlayer(sessionId: string): void {
    this.player = new Player().assign({
      position: new Vector3Schema({
        x: 0,
        y: 0,
        z: 0,
      }),
    });
  }

  update(): void {
    this.entities.forEach((entity, sessionId) => {
      // noop
    });

    const { direction, position } = this.player;

    if (
      !direction ||
      (direction.x === 0 && direction.y === 0 && direction.z === 0)
    ) {
      return;
    }

    const directionVec = new Vector3(
      direction.x,
      direction.y,
      direction.z,
    ).normalize();

    position.assign({
      x: position.x + directionVec.x,
      y: position.y + directionVec.y,
      z: position.z + directionVec.z,
    });

    this.player.direction = null;
  }
}
