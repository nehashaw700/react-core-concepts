import express from 'express';
import { adminAuth, userAuth } from './middlewares/auth.js';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';
import brcypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const secret = "DEV@Sherwood$7860512";
const app = express();
app.use(express.json());
app.use(cookieParser());
// In this Router, b is optional
// app.get("/ab?c", (req, res) => {
//     res.send("hahah");
// }); 

// In this Router, bc is optional
// app.get("/a(bc)?d", (req, res) => {
//     res.send("hahah");
// });

// In this Router, b can occur any no of times. its a regex pattern
// app.get("/ab+c", (req, res) => {
//     res.send("hahah");
// }); 


app.use('/admin', adminAuth);

app.post("/signup", async (req, res) => {
    try {
        // Validate the data first. whatever is coming in req should be validated.

        // Encrypt the password. 10 is optimal no of salt rounds. it returns a promise
        const passwordHash = await brcypt.hash(req.body.password, 10);

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

app.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            throw new Error('Invalid credentials');
        }

        // Authentication
        const isPasswordValid = await brcypt.compare(req.body.password, user.password);
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
})

app.get('/profile', userAuth, async(req, res) => {
    try{
        // this user is set in req, after authentication. not to run db query again. see userAuth
        if(req.user){
            res.send("Profile data fetched for " + req.user.firstName);
        } else{
            res.send("UnAuthorized Access");
        }
        
    } catch(error){
        res.status(400).send('Something went wrong! '+ error.message);
    }
})

app.get('/user/:firstName', userAuth, async (req, res) => {
    try {
        const users = await User.find({}); // to get all users
        const user = await User.find({ firstName: req.params.firstName });
        if (!User.length) {
            res.status(404).send('User not found');
        }

        res.send(user);
    } catch (error) {
        res.status(401).send('Something went wrong ' + + error.message);
    }
});


app.patch('/user/:id', userAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true });

        if (user) {
            res.status(200).send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('Something went wrong! Not able to update ' + error.message);
    }
});

app.delete('/user/:id',userAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });

        if (user) {
            res.status(200).send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('Something went wrong! Not able to delete ' + + error.message);
    }
});

connectDB().then(() => {
    app.listen(7777, () => {
        console.log("Server is listening at port 7777");
    });
}).catch((err) => {
    console.log("error");
})

