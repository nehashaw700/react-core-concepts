import express from 'express';
import { userAuth } from '../middlewares/auth.js';

export const profileRouter = express.Router();

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        // this user is set in req, after authentication. not to run db query again. see userAuth
        if (req.user) {
            res.send("Profile data fetched for " + req.user.firstName);
        } else {
            res.send("UnAuthorized Access");
        }

    } catch (error) {
        res.status(400).send('Something went wrong! ' + error.message);
    }
})