import { verifyToken } from '../utils/auth.js'

export function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization
    if(!token || !token.startsWith('Bearer')) {
        return res.status(401).json({error: 'Unauthorized'})
    }
    const isValidToken = verifyToken(token.split(' ')[1])
    if(!isValidToken) {
        return res.status(401).json({error: 'Invalid token'})
    }
    next()

}