import cors from "cors";
import socket from 'socket.io'
import express from 'express';
import bodyParser from "body-parser";
import {checkAuth, updateLastSeen} from "../middleware";
import { UserCtrl, DialogCtrl, MessageCtrl } from "../controllers";
import {loginValidation} from "../utils/validation";




const createRoutes = (app: express.Express, io: socket.Server) => {
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);



    app.use(cors);
    app.use(bodyParser.json());
    app.use(updateLastSeen);
    app.use(checkAuth)



    app.get('/user/me', UserController.getMe);
    app.get('/user/:id', UserController.show);
    app.delete("/user/:id", UserController.delete);
    app.post("/user/registration", UserController.create);
    app.post("/user/login", loginValidation, UserController.login);

    app.get('/dialogs', DialogController.index);
    app.post("/dialogs", DialogController.create);
    app.delete("/dialog/:id", DialogController.delete);

    app.get('/messages', MessageController.index);
    app.post("/messages", MessageController.create);
    app.delete("/messages/id", MessageController.delete);
}

export default createRoutes;