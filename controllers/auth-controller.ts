import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const Register = async (req:Request, res:Response) => {
    try {
        const { username, email, password } = req.body;
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(existingUser) {
            return res.status(400).json({message: "Email already registered"})
        }
        const hashedpass = await bcrypt.hash(password, 6);
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedpass
            }
        })
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "ERROR", cause: "something wrong" });
    }
}