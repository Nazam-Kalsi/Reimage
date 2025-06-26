import {z} from "zod";

export const imageUploadSchema = z.object({
     file: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0 && fileList[0] instanceof File, {
      message: "Image is required",
    })
    .refine(
      (fileList) =>
        fileList.length > 0 &&
        ["image/png", "image/jpeg", "image/jpg"].includes(fileList[0].type),
      {
        message: "The image must be of type jpg, jpeg, or png",
      }
    ),
    title:z.string().min(1,{message:"Name is required"}),
    description:z.string().min(1,{message:"Description is required"}),
})