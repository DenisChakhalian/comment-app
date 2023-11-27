import express from 'express';
import cors from 'cors';
import http from 'http';
import WebSocket from 'ws';
import commentsRoute from './routes/comments.route';
import { ResponseData, ResponseType } from './interfaces/responses.interfaces';
import { RequestData } from './interfaces/requests.interfaces';

export function createServer() {
  const app = express();

  app.use(cors());

  const server = http.createServer(app);

  const webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on('connection', ws => {
    ws.on('message', async m => {
      const message: RequestData = m.toString() ? JSON.parse(m.toString()) : null;
      let data: ResponseData;

      switch (message?.event) {
        case 'comments': {
          data = await commentsRoute.commentsRouter(message);
          ws.send(JSON.stringify(data));
          break;
        }
        default:
          ws.send(JSON.stringify({ error: 'Bad request!' }));
      }

      if (data && message && message.action === 'post' && data?.type !== ResponseType.Error) {
        webSocketServer.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    });

    ws.on('error', error => ws.send(JSON.stringify(error)));

    ws.send(JSON.stringify({ message: 'Hi there, I am a WebSocket server' }));
  });

  return server;
}
