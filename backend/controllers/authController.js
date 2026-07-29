import {login, register} from '../models/authModel.js';
import { generateToken } from '../utils/auth.js';
import dotenv from 'dotenv'
dotenv.config({
  path: './.env',
})

export const registerUser = async (req, res) => {
    try {
        const user = await register(req.body);
        const registeredUser = await register(user);
        const token = generateToken(registeredUser);
        return res.status(201).json({data: {
            _id: registeredUser._id,
            email: registeredUser.email,
            name: registeredUser.name,
            isAdmin: registeredUser.isAdmin
            , token}});
    }catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const loginUser = async (req, res) => {
    try { 
        console.log(req.body);    
        const user = await login(req.body);
        const token = generateToken(user);
        return res.status(200).json({data: {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token}});
    }catch (error) {
        return res.status(500).json({message: error.message});
    }}