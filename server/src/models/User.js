import { validate } from "graphql";
import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
const secret = "DEV@Sherwood$7860512";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email id is not valid');
            }
        }
    },
    
    password: {
        type: String,
        // select: false,
        required: true,
        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error('Password is not Strong');
        //     }
        // }
    },

    phoneNumber: {
        type: Number,
        trim: true,
        minLength: 10,
    },

    age:  {
        type: Number,
        trim: true,
        min: 18,
    },

    skills:[
        {type: String}
    ],

    about:{
        type: String,
        trim: true,
        default: "Default about section."
    },

    gender:{
        type: String,
        trim: true,
        validate(value){
            if(!['male', 'female', 'others'].includes(value)){
                throw new Error('Gender can be male, female or others');
            }
        }
    },
}, {timestamps: true}); // this will auto add createdAt and updatedAt for every user


// JWT- JSON WEB TOKEN contains 3 things - header, payload, signature
// important --> do not use arrow func here
userSchema.methods.getJWT = async function(){
    const user = this;
    // the payload, here the id gets hidden inside the token
    const token = await jwt.sign({_id: user._id}, secret, {expiresIn: '1h'});
    return token;
}

export const User = mongoose.models.User || mongoose.model('User', userSchema);

