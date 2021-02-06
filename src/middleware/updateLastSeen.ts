import express from "express";
import { UserModel } from "../models";

export default (
    _: express.Request,
    __: express.Response,
    next: express.NextFunction
) => {
    UserModel.findOneAndUpdate(
        { _id: "601d13f4a627b85738b27df9" },
        {
            fullname: "TEst2",
            last_seen: new Date()
        },
        { new: true },
        () => {}
    );
    next();
};