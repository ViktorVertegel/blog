import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidator, loginValidator, postCreateValidator } from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js'


import { UserController, PostController } from './controllers/index.js'



mongoose
 .connect('mongodb+srv://vertegel:1096517qQ@cluster0.ezu2x.mongodb.net/blog?retryWrites=true&w=majority')
 .then(() => console.log('MongoDB zaebis'))
 .catch((err) => console.log('Mongo error',err));


const app = express();

const storage = multer.diskStorage({
    destination: (_, des_, cb) => {
        cb(null, 'uploads')    
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)    
    },
})

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidationErrors,  UserController.register );
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidator, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationErrors, PostController.update)



app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server zaebis') 
});