import { Schema, type } from '@colyseus/schema';
import { Vector3 } from './Vector3';

export class Entity extends Schema {
  @type(Vector3) position!: Vector3;
}
