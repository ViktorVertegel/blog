import express from 'express';
import mongoose from 'mongoose';
import { registerValidator, loginValidator, postCreateValidator } from './validations.js';
import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'


mongoose
 .connect('mongodb+srv://vertegel:1096517qQ@cluster0.ezu2x.mongodb.net/blog?retryWrites=true&w=majority')
 .then(() => console.log('MongoDB zaebis'))
 .catch((err) => console.log('Mongo error',err));


const app = express();

app.use(express.json());

app.post('/auth/login', loginValidator, UserController.login)
app.post('/auth/register', registerValidator, UserController.register );
app.get('/auth/me', checkAuth, UserController.getMe)

//app.get('/posts', PostController.getAll)
//app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidator,  PostController.create)
//app.delete('/posts', PostController.remove)
//app.patch('/posts', PostController.update)



app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server zaebis') 
});