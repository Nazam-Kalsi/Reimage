import {z} from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    username:z.string().min(3,{message:"Must be atleast 3 character long."}),
    password:z.string().min(4,{message:"Must be atleast 4 character long."}),    
})
