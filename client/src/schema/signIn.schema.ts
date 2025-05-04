import { string, z } from "zod";
export const signInSchema = z.object({
    identity:string().min(3,{message:"Can be of atleast 3 character long."}),
    password:string().min(4,{message:"Can be of atleast 4 character long."}),
})