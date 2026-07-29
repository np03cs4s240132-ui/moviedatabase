import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
    path: './backend/.env',
});

export function generateToken(user) {
    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '30d'});
    return token;
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}