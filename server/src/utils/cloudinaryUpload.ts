import  cloudinary  from "cloudinary";
import fs from "fs";
import { ApiErr } from "./apiErr";

interface IcloudinartUpload {
  public_id: string;
  [key: string]: any;
}
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

enum CloudinaryResourceType {
  image = "image",
  vodeo = "video",
  raw = "raw",
  auto = "auto",
}

export const cloudinaryUpload = async (
  filepath: string,
  // type: CloudinaryResourceType
  type: "image" | "video" | "raw" | "auto"
): Promise<any> => {
  try {
    const byteArrayBuffer = fs.readFileSync(filepath);
    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({folder:'reimage',resource_type: type},(error, uploadResult) => {
            if(error) {console.log("cloudinary error : ",error);
                resolve(null); // as i want to use the error handler in controller
            }
            return resolve(uploadResult as IcloudinartUpload);
        }).end(byteArrayBuffer);
    });
    await fs.unlinkSync(filepath);
    return uploadResult;
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    throw new Error("Cloudinary upload failed");
  }
};
