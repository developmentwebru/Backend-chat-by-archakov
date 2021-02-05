import express from "express";
import {DialogModel, MessageModel} from "../models";
import {NativeError} from "mongoose";
/*import { createJWToken } from "../utils";*/

class DialogController {
    index(req: express.Request, res: express.Response) {
        const authorId = '601d13f4a627b85738b27df9';
        DialogModel.find({ author: authorId })
            .populate(["author", "partner"])
            .exec(function(err, dialogs) {
                console.log(err);
                if (err) {
                    return res.status(404).json({
                        message: "Dialogs not found"
                    });
                }
                return res.json(dialogs);
            });
    }


    getMe() {
        // TODO: Сделать возвращение инфы о самом себе (аутентификация)
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        };
        const dialog = new DialogModel(postData);

        dialog
            .save()
            .then((dialogObj: any) => {
                const message = new MessageModel({
                    text: req.body.text,
                    user: req.body.author,
                    dialog: dialogObj._id
                });

                message
                    .save()
                    .then(() => {
                        res.json(dialogObj);
                    })
                    .catch(reason => {
                        res.json(reason);
                    });
            })
            .catch(reason => {
                res.json(reason);
            });
    }
    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        DialogModel.findOneAndRemove({ _id: id })
            .then(dialog => {
                if (dialog) {
                    res.json({
                        message: `Dialog deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `Dialog not found`
                });
            });
    }
}


export default DialogController;