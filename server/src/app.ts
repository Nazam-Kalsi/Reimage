import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware,requireAuth, getAuth, clerkClient  } from "@clerk/express";

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
app.get('/test',async(req,res)=>{
  const { userId } = getAuth(req)
  if(!userId)
    res.status(400).json("user not found");
  const user = await clerkClient.users.getUser(userId as string);
  console.log(user);
  res.status(200).json({user});
})
