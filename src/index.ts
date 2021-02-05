import mongoose from 'mongoose';
import express  from 'express';

import bodyParser from "body-parser";
import {UserController} from "./controllers";

const app = express();

app.use(bodyParser.json());
const User =new UserController();
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
} ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
    err => { console.log(err)}
);

app.get('/user/:id', User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);




app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});
