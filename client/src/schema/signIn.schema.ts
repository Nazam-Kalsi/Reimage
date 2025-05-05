import { z } from "zod";
export const signInSchema = z.object({
    identity: z.string().min(3, { message: "Can be of at least 3 characters long." }),
    password:z.string().min(4,{message:"Can be of atleast 4 character long."}),
})