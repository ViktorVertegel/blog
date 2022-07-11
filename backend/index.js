import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator'; 
import UserModel from './models/User.js'


mongoose
 .connect('mongodb+srv://vertegel:1096517qQ@cluster0.ezu2x.mongodb.net/blog?retryWrites=true&w=majority')
 .then(() => console.log('MongoDB zaebis'))
 .catch((err) => console.log('Mongo error',err));


const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: passwordHash
        })
    
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        },
        'secret123',
        {
          expiresIn: '30d',  
        })
    
        res.json(
            ...user,
            token)
    

    }  catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Registration ne zaebis'
        })
    }  
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server zaebis') 
});