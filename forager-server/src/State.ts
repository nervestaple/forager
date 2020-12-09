import { Schema, type, MapSchema } from '@colyseus/schema';

import { isPlayer, Player } from './Player';
import { Entity } from './Entity';
import { Vector3 } from './Vector3';

const WORLD_SIZE = 200;

export class State extends Schema {
  width = WORLD_SIZE;
  height = WORLD_SIZE;

  @type({ map: Entity })
  entities = new MapSchema<Entity>();

  initialize(): void {
    // // create some food entities
    // for (let i = 0; i < 20; i++) {
    //   this.createFood();
    // }
  }

  createPlayer(sessionId: string): void {
    this.entities.set(
      sessionId,
      new Player().assign({
        position: new Vector3({
          x: Math.random() * this.width,
          y: 0,
          z: Math.random() * this.height,
        }),
        direction: new Vector3({
          x: 0,
          y: 0,
          z: 0,
        }),
      }),
    );
  }

  update(): void {
    this.entities.forEach((entity, sessionId) => {
      if (!isPlayer(entity)) {
        return;
      }
      if (
        entity.direction.x === 0 &&
        entity.direction.y === 0 &&
        entity.direction.z === 0
      ) {
        return;
      }

      entity.position.assign({
        x: entity.position.x + entity.direction.x,
        y: entity.position.y + entity.direction.y,
        z: entity.position.z + entity.direction.z,
      });

      entity.direction.assign({
        x: 0,
        y: 0,
        z: 0,
      });
    });
  }
}
