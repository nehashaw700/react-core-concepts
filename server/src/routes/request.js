import express from 'express';
import { userAuth } from '../middlewares/auth.js';

export const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest', userAuth, (req, res) => {
    try{
        const user = req.user;
        res.send(user + 'sent a request');
    } catch(error){
        res.send(400).send('Error sending connection request!', error);
    }
});

