import express from "express";
import { UserModel } from "../models";
/*import { createJWToken } from "../utils";*/

class UserController {
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err:any, user:any) => {
            if (err) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.json(user);
        });
    }

    getMe() {
        // TODO: Сделать возвращение инфы о самом себе (аутентификация)
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password
        };
        const user = new UserModel(postData);
        user
            .save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch(reason => {
                res.json(reason);
            });
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({_id: id})
            .then(user => {
                if (user) {
                    res.json({
                        message: `User ${user.fullname} deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `User not found`
                });
            });
    }
}

export default UserController;