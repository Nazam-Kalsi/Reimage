import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  clerkMiddleware,
  requireAuth,
  getAuth,
  clerkClient,
} from "@clerk/express";
import { ReqWithUser } from "./types/globals"; //why?


dotenv.config();
export const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(clerkMiddleware());

import { authVerification } from "./middleware/auth.middleware";

app.get("/test", authVerification, async (req:ReqWithUser, res:Response) => {
  res.status(200).json(ApiRes(200,'success',{'user':'found',"details":req.user}));
});

import userRouter from "./routes/user.route";
import { ApiRes } from "./utils/apiRes";
app.use(userRouter);


import { errorHandler } from "./middleware/error.middleware";
app.use(errorHandler);