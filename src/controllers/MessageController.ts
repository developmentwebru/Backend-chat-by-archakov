import express from "express";
import {MessageModel} from "../models";
/*import { createJWToken } from "../utils";*/

class MessageController {
    index(req: any, res: express.Response) {
        const dialogId = req.query.dialog;

        MessageModel.find({dialog: dialogId})
            .populate(["dialog"])
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

   create(req: express.Request, res: express.Response) {
        const userId = '601d13f4a627b85738b27df9'

        const postData = {
            dialog: req.body.dialog_id,
            text: req.body.text,
            user: userId
        };
        const message = new MessageModel(postData);
        message
            .save()
            .then((Obj: any) => {
                res.json(Obj);
            })
            .catch(reason => {
                res.json(reason);
            });
    }
       delete(req: express.Request, res: express.Response) {
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