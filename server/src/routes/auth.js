
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        // Validate the data first. whatever is coming in req should be validated.

        // Encrypt the password. 10 is optimal no of salt rounds. it returns a promise
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        // creating instance of User Model
        const { password, ...rest } = req.body;
        const user = new User({ password: passwordHash, ...rest });
        const savedUser = await user.save();

        if (savedUser) {
            const data = { msg: "Data saved successfully", ...savedUser }
            res.status(200).send(data);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('Something went wrong! Not able to add ' + error.message);
    }
});

authRouter.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            throw new Error('Invalid credentials');
        }

        // Authentication
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            // the payload, here the id gets hidden inside the token
            const token = await user.getJWT();

            res.cookie("token", token);
            res.send('Logged In Successfully!');
        } else{
            throw new Error('Invalid credentials');
        }
    } catch(error){
        res.status(400).send('Something went wrong! '+ error.message);
    }
});

authRouter.post('/logout', async(req,res) =>{
    // do cleaning activities and logout
    res.cookie("token", null, {expiresIn: new Date(Date.now())});
    res.send('Logged Out');
})