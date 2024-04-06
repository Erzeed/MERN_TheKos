import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const createToken = (id: string, admin: boolean, expiresIn: string) => {
    const payload = { id, admin}
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET_KEY as string,
        { expiresIn }
    )
    return token
}

export const verifyToken = (req: Request, res:Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if(!token) {
        return res.status(401).json({message: "unAuthorized"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.id = (decode as JwtPayload).id;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "unAuthorized"})
    }
}