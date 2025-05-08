import { clerkClient } from '@clerk/express'
import { Request, Response } from 'express'


export async function CreateUser(req:Request, res: Response){
    let userData = req.body;
    userData = {...userData, email_address:[userData.email_address]};

    console.log(userData);  
    try {
      const user = await clerkClient.users.createUser(userData)
      res.status(200).json({ message: 'User created', user })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error creating user' })
    }
  }