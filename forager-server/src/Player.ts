import { Entity } from './Entity';

export class Player extends Entity {
  direction: { x: 0; y: 0; z: 0 } | null = null;
}
