
import jwt from 'jsonwebtoken';

export function generateJWT(user) {
    console.log("FROM Token Generation->");
    console.log(user);
    const tokenData = { shopName: user.shopName, id: user._id,discount:user.discount,isAdmin:user.isAdmin };
    return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}

export function requireLogin(req, res, next) {
    const token = decodeToken(req);
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in.' });
    }
    next();
}


export function decodeToken(req) {
    const token = req.headers.authorization || req.headers['authorization'];

    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}

export function getUsername(req) {
    const token = decodeToken(req);
    if (!token) {
        return null;
    }
    return token.user.shopName;
}

export function getUserId(req) {
    const token = decodeToken(req);
    if (!token) {
        return null;
    }
    return token.user.id;
}