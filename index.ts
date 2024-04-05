import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import authRoute from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({ 
    origin: process.env.ACCES_POINT as string, 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoute)

app.listen(PORT, () => {
    console.log("Server is running!");
});
