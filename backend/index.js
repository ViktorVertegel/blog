import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator'; 

mongoose
 .connect('mongodb+srv://vertegel:1096517qQ@cluster0.ezu2x.mongodb.net/?retryWrites=true&w=majority')
 .then(() => console.log('MongoDB connected'))
 .catch((err) => console.log('Mongo error',err));


const app = express();

app.use(express.json());

app.post('/auth/register', registerValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true
    })

});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server - zaebis') 
});