import { Request, Response } from "express";
import { handler } from "../utils/handler";
import {
  clerkMiddleware,
  requireAuth,
  getAuth,
  clerkClient,
} from "@clerk/express";
import { ApiRes } from "../utils/apiRes";
import { ApiErr } from "../utils/apiErr";

export async function CreateUser(req: Request, res: Response) {
  let userData = req.body;
  userData = { ...userData, email_address: [userData.email_address] };

  console.log(userData);
  try {
    const user = await clerkClient.users.createUser(userData);
    res.status(200).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" });
  }
}

export const getCurrentUser = handler(async (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) return next(new ApiErr(400, "Not Authenticated."));  
  const user = await clerkClient.users.getUser(userId as string);
  res.status(200).json(ApiRes(200, "success", user ));   
});
