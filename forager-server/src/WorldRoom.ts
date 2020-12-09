import { Room, Client } from 'colyseus';

import { PLAYER_INPUT } from '../../forager-client/src/constants';
import { Entity } from './Entity';
import { isPlayer, Player } from './Player';
import { State } from './State';
import { Vector3 } from './Vector3';

export class WorldRoom extends Room<State> {
  onCreate(): void {
    this.setState(new State());
    this.state.initialize();

    this.onMessage(PLAYER_INPUT, (client, vector) => {
      const entity: Entity | undefined = this.state.entities[client.sessionId];
      if (!entity) {
        console.log('DEAD PLAYER ACTING...');
        return;
      }

      if (!isPlayer(entity)) {
        return;
      }

      const { x, y, z } = vector;
      entity.direction = new Vector3().assign({ x, y, z });
    });

    this.setSimulationInterval(() => this.state.update());
  }

  onJoin(client: Client, options: unknown): void {
    console.log(client.sessionId, 'JOINED');
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client): void {
    console.log(client.sessionId, 'LEFT!');
    delete this.state.entities[client.sessionId];
  }
}
