import { Room, Client } from 'colyseus';

import { PLAYER_MOVEMENT } from './constants';
import { State } from './State';

export class WorldRoom extends Room<State> {
  onCreate(): void {
    this.setState(new State());
    this.state.initialize();

    this.onMessage(PLAYER_MOVEMENT, (client, vector) => {
      const { x, y, z } = vector;
      this.state.player.direction = { x, y, z };
    });

    this.setSimulationInterval(() => this.state.update());
    this.setPatchRate(20);
  }

  onJoin(client: Client, options: unknown): void {
    console.log(client.sessionId, 'JOINED');
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client): void {
    console.log(client.sessionId, 'LEFT!');
  }
}
