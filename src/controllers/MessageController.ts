import express from "express";
import {MessageModel, DialogModel} from "../models";

import socket from "socket.io";

class MessageController {
    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: express.Request, res: express.Response) => {
        const dialogId  = req.query.dialog;

        MessageModel.find({dialog: dialogId})
            .populate(["dialog", "user"])
            .exec(function(err, messages) {
                console.log(err);
                if (err) {
                    return res.status(404).json({
                        message: "Messages not found"
                    });
                }
                return res.json(messages);
            });
    }


    getMe() {
        // TODO: Сделать возвращение инфы о самом себе (аутентификация)
    }

   create = (req: any, res: express.Response) => {
        const userId = req.user._id;

        const postData = {
            dialog: req.body.dialog_id,
            text: req.body.text,
            user: userId
        };
        const message = new MessageModel(postData);
        message

            .save()
            .then((obj: any) => {
                obj.populate(["dialog", "user"], (err: any, message: any) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        });
                    }

                    DialogModel.findOneAndUpdate(
                        { _id: postData.dialog },
                        { lastMessage: message._id },
                        { upsert: true, new: true },
                        function(err) {
                            if (err) {
                                return res.status(500).json({
                                    status: "error",
                                    message: err
                                });
                            }
                        }
                    );



                    res.json(message);
                    this.io.emit("SERVER:NEW_MESSAGE", message);
                });
            })
            .catch(reason => {
                res.json(reason);
            });
    }
       delete=(req: express.Request, res: express.Response) => {
          const id: string = req.params.id;
          MessageModel.findOneAndRemove({_id: id})
              .then(message => {
                  if (message) {
                      res.json({
                          message: `Message ${message._id} deleted`
                      });
                  }
              })
              .catch(() => {
                  res.json({
                      message: `Message not found`
                  });
              });
      }

}

export default MessageController;