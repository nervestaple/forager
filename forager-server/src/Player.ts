import { type } from '@colyseus/schema';

import { Entity } from './Entity';
import { Vector3 } from './Vector3';

export class Player extends Entity {
  isPlayer = true;
  @type(Vector3) direction!: Vector3;
}

export function isPlayer(entity: Entity): entity is Player {
  return (entity as Player).isPlayer;
}
