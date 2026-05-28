import express from 'express';
import { adminAuth, userAuth } from './middlewares/auth.js';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/auth.js';
import { profileRouter } from './routes/profile.js';
import { requestRouter } from './routes/request.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

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

app.get('/user/:firstName', userAuth, async (req, res) => {
    try {
        // const users = await User.find({}); // to get all users
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

app.delete('/user/:id', userAuth, async (req, res) => {
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
}).catch((error) => {
    console.log("error", error);
})

