import mongoose from 'mongoose';
import express  from 'express';

import bodyParser from "body-parser";
import {UserController, DialogController, MessageController} from "./controllers";

const app = express();

app.use(bodyParser.json());
const User =new UserController();
const Dialog =new DialogController();
const Messages =new MessageController();

mongoose.connect('', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
} ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
    err => { console.log(err)}
);

app.get('/user/:id', User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);

app.get('/dialogs', Dialog.index);
app.post("/dialogs", Dialog.create);
app.delete("/dialog/:id", Dialog.delete);

app.get('/messages', Messages.index);
app.post("/messages", Messages.create);
app.delete("/messages/id", Messages.delete);


app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});
