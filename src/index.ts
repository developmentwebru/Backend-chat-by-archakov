import express  from 'express';
import dotenv from 'dotenv';
import socket from 'socket.io'
import {createServer as httpServer} from 'http'

import './core/db'
import createRoutes from "./core/routes";
const app = express();
const http = httpServer(app);
const io = socket(http);
dotenv.config();

createRoutes(app, io);

io.on('connection',  (socket: any) => {
    console.log('Connected!!!');
    socket.emit('test command', "dfs dslfkja lj");
});

http.listen(process.env.PORT, function() {
    console.log(`Example app listening on http://localhost:${process.env.PORT}`);
});
