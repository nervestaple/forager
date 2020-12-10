import { Schema, type } from '@colyseus/schema';
import { Vector3Schema } from './Vector3Schema';

export class Entity extends Schema {
  @type(Vector3Schema) position: Vector3Schema = new Vector3Schema().assign({
    x: 0,
    y: 0,
    z: 0,
  });
}
