import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { createToken } from "../middleware/auth";

export const Register = async (req:Request, res:Response) => {
    try {
        const { username, email, password } = req.body;
        let existingUser = await prisma.user.findMany({
            where: {
                OR: [{ username }, { email }],
            }
        });
        if(existingUser) {
            return res.status(400).json({message: "Email or username already registered"})
        }
        const hashedpass = await bcrypt.hash(password, 6);
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedpass
            }
        })
        res.status(201).json({ message: "Created account succes" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "ERROR", cause: "something wrong" });
    }
}

export const Login = async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body;
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials!"})
        }
        //const { password: userPassword, ...userInfo } = user;
        const isPassValid = await bcrypt.compare(password, user.password);
        if(!isPassValid) {
            return res.status(400).json({message: "Invalid Credentials!"})
        }
        const token = createToken(user.id, false, "1d");
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).json({message: "Register Succes"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "ERROR", cause: "something wrong" });
    }
}

export const LogOut = (req:Request, res:Response) => {
    res.clearCookie("auth_token").status(200).json({ message: "Logout Successful" });
}