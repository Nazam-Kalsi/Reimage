import { clerkMiddleware,requireAuth, getAuth, clerkClient  } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { ReqWithUser } from "../types/globals";
import { ApiErr } from "../utils/apiErr";


export const authVerification = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const { userId } = getAuth(req)
        if(!userId)
            return next(new ApiErr(400, "Not authenticated."));
        const user = await clerkClient.users.getUser(userId as string);
        req.user = user;
        next();
    }catch(error){
        console.log("Internal server error", error);
      }
} 