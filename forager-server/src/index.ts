import { monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import { createServer } from 'http';
import express from 'express';
import basicAuth from 'express-basic-auth';

import { WorldRoom } from './WorldRoom';

const port = Number(process.env.port) || 4000;

const app = express();
app.use(express.json());

const gameServer = new Server({
  server: createServer(app),
});
gameServer.define('arena', WorldRoom);

const auth = basicAuth({ users: { admin: 'admin' }, challenge: true });
app.use('/colyseus', auth, monitor());

gameServer.listen(port);
console.log(`COLYSEUS LISTENING ON: ${port}`);
