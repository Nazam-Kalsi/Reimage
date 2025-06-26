import {z} from "zod";

export const OTPverifySchema = z.object({
    code: z.string().min(6,{message:"Must be 6 characters long."})
})