import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import cors from 'cors'
import { updateLastSeen, checkAuth } from "../middleware";
import { loginValidation, registerValidation } from "../utils/validation";

import { UserCtrl, DialogCtrl, MessageCtrl } from "../controllers";





const createRoutes = (app: express.Express, io: socket.Server) => {
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);
    app.use(cors())
    app.use(bodyParser.json());
    app.use(updateLastSeen);
    app.use(checkAuth);
    app.use(updateLastSeen);

    app.get("/user/me", UserController.getMe);

    app.post("/user/signup", registerValidation, UserController.create);
    app.post("/user/signin", loginValidation, UserController.login);
    app.get("/user/:id", UserController.show);
    app.delete("/user/:id", UserController.delete);
    app.get("/user/verify", UserController.verify);

    app.get("/dialogs", DialogController.index);
    app.delete("/dialogs/:id", DialogController.delete);
    app.post("/dialogs", DialogController.create);

    app.get("/messages", MessageController.index);
    app.post("/messages", MessageController.create);
    app.delete("/messages/:id", MessageController.delete);
};

export default createRoutes;